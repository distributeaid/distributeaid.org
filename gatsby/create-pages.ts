import { CreatePagesArgs, Node } from 'gatsby'
import path from 'path'
import slugify from 'slugify'
import {
  Region,
  Subregion,
} from '../src/components/regions/RegionComponentTypes'
import { Route } from '../src/components/routes/RouteComponentTypes'

export default {
  /*
  Region Pages
  ================================================================================
  */
  createRegionPages: async ({
    graphql,
    actions: { createPage },
  }: CreatePagesArgs) => {
    const regionsQuery = await graphql<{
      regions: { nodes: [Node & Region] }
    }>(`
      query RegionsQuery {
        regions: allDaRegion {
          nodes {
            id
            name
          }
        }
      }
    `)

    regionsQuery.data?.regions.nodes.forEach((region) => {
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
  createSubregionPages: async ({
    graphql,
    actions: { createPage },
  }: CreatePagesArgs) => {
    const subregionsQuery = await graphql<{
      subregions: { nodes: [Node & Subregion] }
    }>(`
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

    subregionsQuery.data?.subregions.nodes.forEach((subregion) => {
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
  createRoutePages: async ({
    graphql,
    actions: { createPage },
  }: CreatePagesArgs) => {
    const routesQuery = await graphql<{
      routes: { nodes: [Node & Route] }
    }>(`
      query RoutesQuery {
        routes: allDaRoute {
          nodes {
            id
            slug
          }
        }
      }
    `)

    routesQuery.data?.routes.nodes.forEach((route) => {
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
