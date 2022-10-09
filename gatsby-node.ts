import type { GatsbyNode } from 'gatsby'

import schema from './gatsby/customize-schema'
import transformers from './gatsby/transform-nodes'
import resolvers from './gatsby/create-resolvers'
import pages from './gatsby/create-pages'

/*
Customize the GraqphQL Schema
================================================================================
*/
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  (args) => {
    schema.defineTeamTypes(args)
  }

/*
Transform Nodes
================================================================================
*/
export const onCreateNode: GatsbyNode['onCreateNode'] = (args) => {
  transformers.createRegionsFromMarkdown(args)
  transformers.createSubregionsFromMarkdown(args)
  transformers.createRoutesFromMarkdown(args)
  transformers.createTeamRolesFromMarkdown(args)
  transformers.createTeamMembersFromMarkdown(args)
  transformers.createLineItemsFromJson(args)
}

/*
Create Resolvers for Looking Up Related Nodes
================================================================================
*/
export const createResolvers: GatsbyNode['createResolvers'] = (args) => {
  resolvers.resolveRegionFields(args)
  resolvers.resolveSubregionFields(args)
  resolvers.resolveTeamMemberFields(args)
}

/*
Create Dynamic Pages
================================================================================
*/
export const createPages: GatsbyNode['createPages'] = async (args) => {
  await pages.createRegionPages(args)
  await pages.createSubregionPages(args)
  await pages.createRoutePages(args)
}

/*
Config
================================================================================
*/
// https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#manual-babel-setup
// This should really be handled by Gatsby but here we are
export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({
  actions: { setBabelPlugin },
}) => {
  setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}
