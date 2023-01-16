import { Photo } from './photo.d'

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
  /**
   * Markdown string
   */
  overview: string
  /**
   * Markdown string
   */
  governmentResponse: string
  /**
   * Markdown string
   */
  longText: string
  /**
   * Relative URL path: /needs-assessments/explorer
   */
  needsUrl: string

  map: Photo
  population?: Population
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
  /**
   * Markdown string
   */
  overview: string
  /**
   * Markdown string
   */
  governmentResponse: string
  /**
   * Markdown string
   */
  longText: string
  /**
   * Relative URL path: /needs-assessments/explorer
   */
  needsUrl: string

  map: Photo
  population?: Population
  newsUpdates: UpdatesList
  stayInformed: LinksList
  region: Region
}

/*
Population
================================================================================
*/
export type Population = {
  needsTotal: number
  totalItemsRequested: number
  ngoBeneficiaries: number
  ngoPopulation: number
  ngoRespondents: number
  count: number
  trend: string
  description: string
}
