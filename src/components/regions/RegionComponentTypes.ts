import { IGatsbyImageData } from 'gatsby-plugin-image'
import { LinkList, UpdateList } from '@components/list/ListTypes'

/*
Region
================================================================================
*/

export type Region = {
  name: string
  map: {
    gatsbyImageData: IGatsbyImageData
  }
  overview: string //markdown string
  governmentResponse: string //markdown string
  newsUpdates: UpdateList
  stayInformed: LinkList
  subregions: Subregion[]
}

/*
Subregion
================================================================================
*/

export type Subregion = {
  name: string
  map: {
    gatsbyImageData: IGatsbyImageData
  }
  overview: string //markdown string
  population: {
    count: number
    trend: string
    description: string
  }
  newsUpdates: UpdateList
  region: Region
}
