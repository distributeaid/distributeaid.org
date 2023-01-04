import { getLinksList, getUpdatesList } from './list.test-helpers'
import { Place, Region, Subregion } from './place.d'

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

    // map: {
    //   gatsbyImageData: IGatsbyImageData
    // }

    overview: '# Overview',
    governmentResponse: '# Gov Response',

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

    // map: {
    //   gatsbyImageData: IGatsbyImageData
    // }

    overview: '# Overview',
    population: {
      count: 10000,
      trend: 'Increasing',
      description:
        'Increasing hurricane intensity is displacing more and more folks along the Gulf Coast.',
    },
    newsUpdates: getUpdatesList(),
    region: getRegion(),

    ...props,
  } as Subregion
}
