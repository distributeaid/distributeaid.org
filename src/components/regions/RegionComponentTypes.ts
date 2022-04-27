import { LinkList, UpdateList } from '@components/list/ListTypes'

/*
Region
================================================================================
*/

/*
Region
------------------------------------------------------------
*/
export type Region = {
  name: string
  map: string
  overview: string
  governmentResponse: string
  newsUpdates: UpdateList
  stayInformed: LinkList
  subregions: string[]
}

/*
Region Summary
------------------------------------------------------------
*/
export type RegionSummary = {
  name: string
  map: string
  overview: string
  subregions: [string]
}

/*
Subregion
================================================================================
*/

/*
Subregion
------------------------------------------------------------
*/
export type Subregion = {
  name: string
  map: string
  overview: string
  population: {
    count: number
    trend: string
    description: string
  }
  newsUpdates: UpdateList
}

/*
Subregion Summary
------------------------------------------------------------
*/
export type SubregionSummary = {
  name: string
  population: {
    count: number
  }
}
