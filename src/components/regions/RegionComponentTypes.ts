import { LinkList, UpdateList } from '@components/list/ListTypes'
import { IGatsbyImageData } from 'gatsby-plugin-image'

/*
Region
================================================================================
*/

export type Region = {
  slug: string
  path: string

  name: string
  map: {
    gatsbyImageData: IGatsbyImageData
  }
  /**
   * Markdown string
   */
  overview: string
  /**
   * Markdown string
   */
  governmentResponse: string
  newsUpdates: UpdateList
  stayInformed: LinkList
  subregions: Subregion[]
}

/*
Subregion
================================================================================
*/

export type Subregion = {
  slug: string
  path: string

  name: string
  map: {
    gatsbyImageData: IGatsbyImageData
  }
  /**
   * Markdown string
   */
  overview: string
  population: {
    count: number
    trend: string
    description: string
  }
  newsUpdates: UpdateList
  region: Region
}
