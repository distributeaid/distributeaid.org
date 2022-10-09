import { CreateSchemaCustomizationArgs } from 'gatsby'

export default {
  defineTeamTypes: ({
    actions: { createTypes },
  }: CreateSchemaCustomizationArgs) => {
    const typeDefs = `
      type DATeamTenure implements Node {
        role: DATeamRole
        start: Date
        end: Date
        isActive: Boolean
      }
    `

    createTypes(typeDefs)
  },
}
