const slugify = require('slugify')
const path = require('path')

module.exports = {
  /*
  Region Pages
  ================================================================================
  */
  createRegionPages: async ({ graphql, actions: { createPage } }) => {
    const regionsQuery = await graphql(`
      query RegionsQuery {
        regions: allDaRegion {
          nodes {
            id
            name
          }
        }
      }
    `)

    regionsQuery.data.regions.nodes.forEach((region) => {
      const regionSlug = slugify(region.name, {
        lower: true,
        strict: true,
      })

      console.info(`creating region page at /regions/${regionSlug}`)

      createPage({
        path: `/regions/${regionSlug}`,
        component: path.resolve(`./src/templates/RegionPage.tsx`),
        context: {
          id: region.id,
        },
      })
    })
  },

  /*
  Subregion Pages
  ================================================================================
  */
  createSubregionPages: async ({ graphql, actions: { createPage } }) => {
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
  },

  /*
  Route Pages
  ================================================================================
  */
  createRoutePages: async ({ graphql, actions: { createPage } }) => {
    const routesQuery = await graphql(`
      query RoutePagesQuery {
        allFile(filter: { relativeDirectory: { eq: "pages/routes" } }) {
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
  },
}
