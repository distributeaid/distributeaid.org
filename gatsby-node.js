const slugify = require('slugify')
var minimatch = require('minimatch')
const path = require('path')
const PageTreeTraversal = require('./src/utils/PageTreeTraversal.js')
const { spawn } = require('child_process')

/*
Run Scripts After Build
================================================================================
*/
// exports.onCreateDevServer = async ({ reporter }) => {
//   const genTypes = await spawn('yarn', ['run', 'gen-types'], {
//     stdio: 'inherit',
//     shell: true,
//   })
//   genTypes.on('exit', (code) => {
//     if (code === 0) {
//       reporter.success(
//         'graphql-codegen: types generated from gatsby graphql endpoint',
//       )
//     } else {
//       reporter.error(`graphql-codegen: exited with code ${code}`)
//     }
//   })
// }

/*
Transform Nodes
================================================================================
*/
exports.onCreateNode = ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  getNode,
}) => {
  const { createNode, createNodeField } = actions

  // Forestry Files
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.fileAbsolutePath &&
    minimatch(node.fileAbsolutePath, '**/content/**/*.md')
  ) {
    const fm = node.frontmatter

    // Regions
    if (
      minimatch(node.fileAbsolutePath, '**/content/pages/regions/*/index.md')
    ) {
      const fileRelativePath = path.join(
        'content',
        'pages',
        getNode(node.parent).relativePath,
      )

      createNode({
        // Node Data
        name: fm.name,
        overview: fm.overview,
        governmentResponse: fm.governmentResponse,
        newsUpdates: fm.newsUpdates,
        stayInformed: fm.stayInformed,
        subregionFileRelativePaths: fm.subregions,

        // Metadata
        fileRelativePath: fileRelativePath,
        mapFileRelativePath: fm.map,

        // Gatsby Fields
        id: createNodeId(`DA Region - ${fm.name}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'DARegion',
          contentDigest: createContentDigest(fm),
        },
      })
    }

    // Subregions
    else if (
      minimatch(node.fileAbsolutePath, '**/content/pages/regions/*/!(index).md')
    ) {
      const fileRelativePath = path.join(
        'content',
        'pages',
        getNode(node.parent).relativePath,
      )

      createNode({
        // Node Data
        name: fm.name,
        overview: fm.overview,
        population: fm.population,
        newsUpdates: fm.newsUpdates,

        // Metadata
        fileRelativePath: fileRelativePath,
        mapFileRelativePath: fm.map,

        // Gatsby Fields
        id: createNodeId(`DA Subregion - ${fm.name}`),
        parent: node.id,
        children: [],
        internal: {
          type: 'DASubregion',
          contentDigest: createContentDigest(fm),
        },
      })
    }

    // Other Pages
    else {
      // do nothing for now
    }
  }
}

/*
Customize the GraqphQL Schema
================================================================================
*/
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
}

/*
Create Resolvers for Looking Up Related Nodes
================================================================================
*/
exports.createResolvers = ({ createResolvers, getNode }) => {
  const resolvers = {
    DARegion: {
      subregions: {
        type: ['DASubregion'],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                fileRelativePath: { in: source.subregionFileRelativePaths },
              },
            },
            type: 'DASubregion',
          })
          return entries
        },
      },
      map: {
        type: 'ImageSharp',
        resolve: async (source, args, context, info) => {
          const entry = await context.nodeModel.findOne({
            query: {
              filter: {
                absolutePath: {
                  glob: `**/static${source.mapFileRelativePath}`,
                },
              },
            },
            type: 'File',
          })

          return getNode(entry.children[0])
        },
      },
    },
  }

  createResolvers(resolvers)
}

/*
Create Dynamic Pages
================================================================================
*/
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  /*
  Site Metadata
  ------------------------------------------------------------
  */
  const metadataResult = await graphql(`
    {
      site {
        siteMetadata {
          domain
        }
        pathPrefix
      }
    }
  `)

  if (metadataResult.errors) {
    reporter.panicOnBuild(`
      Error while running GraphQL query to get
      the siteMetadata set in gatsby-config.js.
    `)
    return
  }

  /*
  Regions & Subregions
  ------------------------------------------------------------ 
  */
  const regionsQuery = await graphql(`
    query RegionPagesQuery {
      regions: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { glob: "**/content/pages/regions/*/index.md" }
        }
      ) {
        nodes {
          fileAbsolutePath
          frontmatter {
            name
            map
            overview
            governmentResponse
            newsUpdates {
              title
              visibleCount
              updates {
                title
                content
                date
                pinned
              }
            }
            stayInformed {
              title
              links {
                label
                url
                description
              }
            }
            subregions
          }
        }
      }
    }
  `)

  await Promise.all(
    regionsQuery.data.regions.nodes.map(async (regionNode) => {
      const region = regionNode.frontmatter
      const regionSlug = slugify(region.name, {
        lower: true,
        strict: true,
      })

      const regionMapGlob = `**/static${region.map}`
      const regionMapImageQuery = await graphql(
        `
          query RegionMapImageQuery($regionMapGlob: String) {
            regionMapImage: file(absolutePath: { glob: $regionMapGlob }) {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        `,
        { regionMapGlob: regionMapGlob },
      )

      const regionMapImage = regionMapImageQuery.data
        ? regionMapImageQuery.data.regionMapImage.childImageSharp
            .gatsbyImageData
        : null

      const subregionRelativePaths = regionNode.frontmatter.subregions.map(
        (subregionPath) => {
          return subregionPath.slice('content/pages/'.length)
        },
      )

      const subregionsQuery = await graphql(
        `
          query SubregionsQuery($subregionRelativePaths: [String]) {
            subregions: allFile(
              filter: { relativePath: { in: $subregionRelativePaths } }
            ) {
              nodes {
                id
                relativePath
                childMarkdownRemark {
                  frontmatter {
                    name
                    map
                    overview
                    population {
                      count
                      trend
                      description
                    }
                    newsUpdates {
                      title
                      visibleCount
                      updates {
                        title
                        content
                        date
                        pinned
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        { subregionRelativePaths: subregionRelativePaths },
      )

      const subregions = subregionsQuery.data.subregions.nodes.map(
        ({ childMarkdownRemark: { frontmatter } }) => frontmatter,
      )

      console.info(`creating region page at /routes/${regionSlug}`)

      createPage({
        path: `/regions/${regionSlug}`,
        component: path.resolve(`./src/templates/RegionPage.tsx`),
        context: {
          region: region,
          regionMapImage: regionMapImage,
          subregions: subregions,
        },
      })

      subregions.forEach((subregion) => {
        const subregionSlug = slugify(subregion.name, {
          lower: true,
          strict: true,
        })

        console.info(
          `creating subregion page at /regions/${regionSlug}/${subregionSlug}`,
        )

        createPage({
          path: `/regions/${regionSlug}/${subregionSlug}`,
          component: path.resolve(`./src/templates/SubregionPage.tsx`),
          context: {
            region: region,

            // TODO: Don't love passing in subregions here, seems like it's
            //       mixing concerns.  How to fix:
            //         1) use a PageQuery to grab em
            //         2) replace the region.subregions property with them
            //            (may require refactoring types)
            subregions: subregions,
            subregion: subregion,
          },
        })
      })
    }),
  )

  /*
  Routes
  ------------------------------------------------------------
  For each page in the content/routes directory, we create a page using its path.
  */
  const routesQuery = await graphql(`
    query RoutePagesQuery {
      allFile(filter: { relativeDirectory: { eq: "routes" } }) {
        nodes {
          id
          childMarkdownRemark {
            frontmatter {
              pagePath
              routeOrigin
              routeDestination
              introduction
              mapUrl
              aidRequestFormUrl
              images {
                deliverySection
                reservationSection
                groupsSection
                storageSection
                palletsSection
              }
              costs {
                currency
                standardPaletteCost
                overflowPricing
                halfPaletteCost
              }
              deadlines {
                submissionsDeadline
                confirmationDate
                stagingBegins
                stagingEnds
                shipmentDeparture
              }
              frontlineGroups {
                logo
                name
              }
            }
          }
          relativeDirectory
        }
      }
    }
  `)

  routesQuery.data.allFile.nodes.forEach((route) => {
    if (route.childMarkdownRemark?.frontmatter) {
      console.info(
        `creating route page at /routes/${route.childMarkdownRemark.frontmatter.pagePath}`,
      )
      createPage({
        path: `/routes/${route.childMarkdownRemark.frontmatter.pagePath}`,
        component: path.resolve(`./src/templates/RoutePage.tsx`),
        context: {
          pageFields: route.childMarkdownRemark.frontmatter,
        },
      })
    }
  })
}

// https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#manual-babel-setup
// This should really be handled by Gatsby but here we are
exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}
