module.exports = {
  defineTeamTypes: ({ actions: { createTypes } }) => {
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
