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
Dynamic Pages
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

  // Build the home page
  const homePageQuery = await graphql(`
    query HomePageQuery {
      file(relativePath: { eq: "home.md" }) {
        id
        childMarkdownRemark {
          frontmatter {
            headline
            missionStatement
            howWeHelpBlock {
              description
              location
              title
            }
          }
        }
      }
    }
  `)

  createPage({
    path: '/',
    component: path.resolve(`./src/templates/HomePage.tsx`),
    context: {
      pageFields: homePageQuery.data.file.childMarkdownRemark.frontmatter,
    },
  })

  // Build the About Us page
  const aboutUsPageQuery = await graphql(`
    query AboutUsPageQuery {
      file(relativePath: { eq: "about-us.md" }) {
        id
        childMarkdownRemark {
          frontmatter {
            missionStatement
            aboutOurMission
            timelineItems {
              period
              description
            }
          }
        }
      }
    }
  `)

  createPage({
    path: '/about-us',
    component: path.resolve(`./src/templates/AboutUsPage.tsx`),
    context: {
      pageFields: aboutUsPageQuery.data.file.childMarkdownRemark.frontmatter,
    },
  })

  /**
   * Build the routes! For each page in the content/routes directory, we create
   * a page using its path.
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
            }
          }
          relativeDirectory
        }
      }
    }
  `)

  routesQuery.data.allFile.nodes.forEach((route) => {
    if (route.childMarkdownRemark?.frontmatter) {
      console.log(
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
