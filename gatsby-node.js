const Promise = require('bluebird')
const path = require('path')

/*
Dynamic Pages
================================================================================
*/
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  /*
  Gatsby Site Metadata
  ------------------------------------------------------------
  */
  const gatsbySiteResult = await graphql(`
    {
      site {
        siteMetadata {
          domain
          homePageSlug
        }
      }
    }
  `)

  if (gatsbySiteResult.errors) {
    reporter.panicOnBuild(`
      Error while running GraphQL query to get
      the siteMetadata set in gatsby-config.js.
    `)
    return
  }

  const siteMetadata = gatsbySiteResult.data.site.siteMetadata

  /*
  Contentful Site Pages
  ------------------------------------------------------------
  */
  const contentfulSitePagesResult = await graphql(
    `
      {
        contentfulSite {
          contentful_id

          pages {
            contentful_id
            slug

            tabs {
              contentful_id
              slug
            }
          }
        }
      }
    `,
  )

  if (contentfulSitePagesResult.errors) {
    reporter.panicOnBuild(`
      Error while running GraphQL query to get
      the site pages from Contentful.
    `)
    return
  }

  const contentfulSite = contentfulSitePagesResult.data.contentfulSite

  /*
  Create Pages
  ------------------------------------------------------------
  */
  const mainPageTemplate = path.resolve(`./src/templates/MainPage.tsx`)
  const tabPageTemplate = path.resolve(`./src/templates/TabPage.tsx`)

  contentfulSite.pages.forEach((mainPage) => {
    const mainPagePath =
      mainPage.slug !== siteMetadata.homePageSlug ? `/${mainPage.slug}` : `/`

    createPage({
      path: mainPagePath,
      component: mainPageTemplate,
      context: {
        siteContentfulId: contentfulSite.contentful_id,
        mainPageContentfulId: mainPage.contentful_id,
      },
    })

    if (mainPage.tabs !== null) {
      mainPage.tabs.forEach((tabPage) => {
        const tabPagePath = `${mainPagePath}/${tabPage.slug}`

        createPage({
          path: tabPagePath,
          component: tabPageTemplate,
          context: {
            siteContentfulId: contentfulSite.contentful_id,
            mainPageContentfulId: mainPage.contentful_id,
            tabPageContentfulId: tabPage.contentful_id,
          },
        })
      })
    }
  })
}
