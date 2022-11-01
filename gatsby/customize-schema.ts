import { CreateSchemaCustomizationArgs } from 'gatsby'

export default {
  /*
  Page
  ================================================================================
  */
  defineGenericPageTypes: ({
    actions: { createTypes },
  }: CreateSchemaCustomizationArgs) => {
    const typeDefs = `
      type DAPageGeneric implements Node @dontInfer {
        title: String!
        slug: String!
        desc: String
        sections: [DASectionTypes!]!
      }

      union DASectionTypes = DAPageSectionGrid

      type DAPageSectionGrid implements Node {
        options: DAPageSectionOptions!
        blocks: [DABlockTypes!]!
      }

      type DAPageSectionOptions {
        margin: DAPageSectionOptionMargin
        layout: DAPageSectionOptionLayout
        cols: Int
        rows: Int
        order: DAPageSectionOptionOrder
      }

      enum DAPageSectionOptionMargin {
        MARGINED
        BANNER
      }

      enum DAPageSectionOptionLayout {
        COL
        ROW
      }

      enum DAPageSectionOptionOrder {
        HORIZONTAL
        VERTICAL
        RANDOM
      }

      union DABlockTypes =
        DAPageBlockTitle |
        DAPageBlockText |
        DAPageBlockYoutube |
        DAPageBlockTimeline

      type DAPageBlockTitle implements Node {
        text: String!
      }

      type DAPageBlockText implements Node {
        text: String!
      }

      type DAPageBlockYoutube implements Node {
        title: String
        embedUrl: String!
      }

      type DAPageBlockTimeline implements Node {
        entries: [DAPageBlockTimelineEntry!]!
      }

      type DAPageBlockTimelineEntry implements Node {
        period: String
        description: String
      }
    `

    createTypes(typeDefs)
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
