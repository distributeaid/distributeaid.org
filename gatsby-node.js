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

  const domain = metadataResult.data.site.siteMetadata.domain
  const pathPrefix = metadataResult.data.site.pathPrefix

  const pageTemplates = {
    home: path.resolve(`./src/templates/HomePage.tsx`),
    main: path.resolve(`./src/templates/MainPage.tsx`),
    tabs: path.resolve(`./src/templates/TabPage.tsx`),
  }

  // Build the home page
  console.time('Building home page')
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

  console.log(homePageQuery.data)

  // make the page
  createPage({
    path: '/',
    component: pageTemplates.home,
    context: {
      pageFields: homePageQuery.data.file.childMarkdownRemark.frontmatter,
    },
  })

  console.timeEnd('Building home page')
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
