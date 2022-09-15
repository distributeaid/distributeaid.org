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
            id
            name
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
          id: subregion.id,
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
      query RoutesQuery {
        routes: allDaRoute {
          nodes {
            id
            slug
          }
        }
      }
    `)

    routesQuery.data.routes.nodes.forEach((route) => {
      console.info(`creating route page at /routes/${route.slug}`)
      createPage({
        path: `/routes/${route.slug}`,
        component: path.resolve(`./src/templates/RoutePage.tsx`),
        context: {
          id: route.id,
        },
      })
    })
  },
}
