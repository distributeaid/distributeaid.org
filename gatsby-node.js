const path = require('path')
const schema = require('./gatsby/customize-schema')
const transformers = require('./gatsby/transform-nodes')
const resolvers = require('./gatsby/create-resolvers')
const pages = require('./gatsby/create-pages')

/*
Customize the GraqphQL Schema
================================================================================
*/
exports.createSchemaCustomization = (gatsbyUtils) => {
  schema.defineTeamTypes(gatsbyUtils)
}

/*
Transform Nodes
================================================================================
*/
exports.onCreateNode = (gatsbyUtils) => {
  transformers.createRegionsFromMarkdown(gatsbyUtils)
  transformers.createSubregionsFromMarkdown(gatsbyUtils)
  transformers.createRoutesFromMarkdown(gatsbyUtils)
  transformers.createTeamRolesFromMarkdown(gatsbyUtils)
  transformers.createTeamMembersFromMarkdown(gatsbyUtils)
  transformers.createLineItemsFromJson(gatsbyUtils)
}

/*
Create Resolvers for Looking Up Related Nodes
================================================================================
*/
exports.createResolvers = (gatsbyUtils) => {
  resolvers.resolveRegionFields(gatsbyUtils)
  resolvers.resolveSubregionFields(gatsbyUtils)
  resolvers.resolveTeamMemberFields(gatsbyUtils)
}

/*
Create Dynamic Pages
================================================================================
*/
exports.createPages = async (gatsbyUtils) => {
  await pages.createRegionPages(gatsbyUtils)
  await pages.createSubregionPages(gatsbyUtils)
  await pages.createRoutePages(gatsbyUtils)
}

/*
Config
================================================================================
*/
// https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#manual-babel-setup
// This should really be handled by Gatsby but here we are
exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
  setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}
