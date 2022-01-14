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
            mission_statement
            how_we_help_block {
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
            mission_statement
            about_our_mission
            timeline_items {
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
