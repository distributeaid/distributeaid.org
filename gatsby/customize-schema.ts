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
  Place
  ================================================================================
  */

  /*
  Region
  ------------------------------------------------------------
  */
  definePlaceTypes: ({
    actions: { createTypes },
  }: CreateSchemaCustomizationArgs) => {
    const typeDefs = `
      type DARegion implements Node {
        slug: String!
        path: String!

        name: String!
        overview: String
        governmentResponse: String
        longText: String
        needsUrl: String

        map: DAPhoto
        population: DAPlacePopulation
        newsUpdates: DAUpdatesList
        stayInformed: DALinksList
        subregions: [DASubregion!]!
      }

      type DASubregion implements Node {
        slug: String!
        path: String!

        name: String!
        overview: String
        governmentResponse: String
        longText: String
        needsUrl: String

        map: DAPhoto
        population: DAPlacePopulation
        newsUpdates: DAUpdatesList
        stayInformed: DALinksList
        region: DARegion!
      }

      type DAPlacePopulation {
        needsTotal: Int
        totalItemsRequested: Int
        ngoBeneficiaries: Int
        ngoPopulation: Int
        ngoRespondents: Int
        count: Int
        trend: String
        description: String
      }

      type DAUpdatesList {
        title: String
        visibleCount: Int
        updates: [DAUpdate!]!
      }

      type DAUpdate {
        title: String!
        content: String!
        date: Date
        pinned: Boolean
      }

      type DALinksList {
        title: String
        links: [DAUpdate!]!
      }

      type DALink {
        label: String!
        url: String!
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
