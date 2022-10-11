module.exports = {
  /*
  Need
  ================================================================================
  */
  defineNeedTypes: ({ actions: { createTypes } }) => {
    const typeDefs = `
      type DANeedSurvey {
        id: String!
        year: String!
        quarter: String!
      }

      type DANeedPlace {
        region: DARegion @link(by: "name")
        subregion: DASubregion @link(by: "name")
      }

      type DAProduct {
        category: String!
        item: String!
        ageGender: String
        sizeStyle: String
        unit: String!
      }

      type DANeed implements Node {
        survey: DANeedSurvey!
        place: DANeedPlace!
        product: DAProduct!
        need: Float
      }
    `

    createTypes(typeDefs)
  },

  /*
  Team Tenure
  ================================================================================
  */
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
