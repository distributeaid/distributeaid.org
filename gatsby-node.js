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
          const { entries: subregions } = await context.nodeModel.findAll({
            query: {
              filter: {
                fileRelativePath: { in: source.subregionFileRelativePaths },
              },
            },
            type: 'DASubregion',
          })
          return subregions
        },
      },
      map: {
        type: 'ImageSharp',
        resolve: async (source, args, context, info) => {
          const file = await context.nodeModel.findOne({
            query: {
              filter: {
                absolutePath: {
                  glob: `**/static${source.mapFileRelativePath}`,
                },
              },
            },
            type: 'File',
          })

          const imageSharp = file ? getNode(file.children[0]) : null

          return imageSharp
        },
      },
    },

    DASubregion: {
      region: {
        type: 'DARegion',
        resolve: async (source, args, context, info) => {
          const region = await context.nodeModel.findOne({
            query: {
              filter: {
                subregionFileRelativePaths: { eq: source.fileRelativePath },
              },
            },
            type: 'DARegion',
          })
          return region
        },
      },

      // NOTE: Same as resolver for DARegion.map above.
      // TODO: Refactor into a graphql fragment or reusable function.
      map: {
        type: 'ImageSharp',
        resolve: async (source, args, context, info) => {
          const file = await context.nodeModel.findOne({
            query: {
              filter: {
                absolutePath: {
                  glob: `**/static${source.mapFileRelativePath}`,
                },
              },
            },
            type: 'File',
          })

          const imageSharp = file ? getNode(file.children[0]) : null

          return imageSharp
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
    query RegionsQuery {
      regions: allDaRegion {
        nodes {
          name
          map {
            gatsbyImageData
          }
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
          subregions {
            name
          }
        }
      }
    }
  `)

  regionsQuery.data.regions.nodes.forEach((region) => {
    const regionSlug = slugify(region.name, {
      lower: true,
      strict: true,
    })

    console.info(`creating region page at /routes/${regionSlug}`)

    createPage({
      path: `/regions/${regionSlug}`,
      component: path.resolve(`./src/templates/RegionPage.tsx`),
      context: {
        region: region,
      },
    })
  })

  const subregionsQuery = await graphql(`
    query SubregionsQuery {
      subregions: allDaSubregion {
        nodes {
          name
          map {
            gatsbyImageData
          }
          overview
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
          region {
            name
          }
        }
      }
    }
  `)

  subregionsQuery.data.subregions.nodes.forEach((subregion) => {
    const regionSlug = slugify(subregion.region.name, {
      lower: true,
      strict: true,
    })

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
        subregion: subregion,
      },
    })
  })

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
