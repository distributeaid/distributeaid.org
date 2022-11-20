import { CreateSchemaCustomizationArgs } from 'gatsby'

import { schema as blockTypes } from './generic-pages/content-blocks'
import { schema as pageTypes } from './generic-pages/pages'
import { schema as sectionTypes } from './generic-pages/sections'

export default {
  /*
  Page
  ================================================================================
  */
  definePageTypes: ({
    actions: { createTypes },
  }: CreateSchemaCustomizationArgs) => {
    createTypes(blockTypes)
    createTypes(sectionTypes)
    createTypes(pageTypes)
  },

  /*
  Need
  ================================================================================
  */
  defineNeedTypes: ({
    actions: { createTypes },
  }: CreateSchemaCustomizationArgs) => {
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
