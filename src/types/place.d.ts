import { IGatsbyImageData } from 'gatsby-plugin-image'

/*
Place
================================================================================
*/
export type Place = {
  region?: Region
  subregion?: Subregion
}

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
  newsUpdates: UpdatesList
  stayInformed: LinksList
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
  newsUpdates: UpdatesList
  region: Region
}
