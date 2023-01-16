import { getLinksList, getUpdatesList } from './list.test-helpers'
import { Place, Population, Region, Subregion } from './place.d'

/*
Place
------------------------------------------------------------
*/
export const getPlace = (props?: Record<string, any>): Place => {
  return {
    region: getRegion(),
    subregion: getSubregion(),
    ...props,
  }
}

/*
Region
------------------------------------------------------------
*/
export const getRegion = (props?: Record<string, any>): Region => {
  return {
    slug: 'usa',
    path: '/regions/usa/',

    name: 'USA',
    overview: '# Overview',
    governmentResponse: '# Gov Response',
    longText: '# Long Text',
    needsUrl: '/needs-assessments/explorer',

    // map: {
    //   gatsbyImageData: IGatsbyImageData
    // }
    population: getPopulation(),
    newsUpdates: getUpdatesList(),
    stayInformed: getLinksList(),
    subregions: [] as Subregion[],

    ...props,
  } as Region
}

/*
Subregion
------------------------------------------------------------
*/
export const getSubregion = (props?: Record<string, any>): Subregion => {
  return {
    slug: 'usa-southeast',
    path: '/regions/usa/usa-southeast/',

    name: 'USA - SouthEast',
    overview: '# Overview',
    governmentResponse: '# Gov Response',
    longText: '# Long Text',
    needsUrl: '/needs-assessments/explorer',

    // map: {
    //   gatsbyImageData: IGatsbyImageData
    // }
    population: getPopulation(),
    newsUpdates: getUpdatesList(),
    stayInformed: getLinksList(),
    region: getRegion(),

    ...props,
  } as Subregion
}

/*
Population
------------------------------------------------------------
*/
export const getPopulation = (props?: Record<string, any>): Population => {
  return {
    needsTotal: 100000,
    totalItemsRequested: 400000,
    ngoBeneficiaries: 10000,
    ngoPopulation: 10000,
    ngoRespondents: 10000,
    count: 10000,
    trend: 'Increasing',
    description: '',

    ...props,
  }
}
