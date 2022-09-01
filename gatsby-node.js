const slugify = require('slugify')
var minimatch = require('minimatch')
const path = require('path')
const PageTreeTraversal = require('./src/utils/PageTreeTraversal.js')
const { spawn } = require('child_process')
const onCreateNode = require('./gatsby/transform-nodes')
const createResolvers = require('./gatsby/create-resolvers')
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
exports.onCreateNode = onCreateNode

/*
Customize the GraqphQL Schema
================================================================================
*/
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type DATeamTenure implements Node {
      role: DATeamRole
      start: Date
      end: Date
      isActive: Boolean
    }
  `

  createTypes(typeDefs)
}

/*
Create Resolvers for Looking Up Related Nodes
================================================================================
*/
exports.createResolvers = createResolvers

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
