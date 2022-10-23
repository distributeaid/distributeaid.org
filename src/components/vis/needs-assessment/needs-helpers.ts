import { Need } from '../../../types/need-types'

export type Index<T> = Record<string, T[]>

/*
Selectors
================================================================================
Select a comparable string representing some aspect of a need.
*/
export type Selector = (need: Need) => string

export const quarterSelector: Selector = ({ survey }) =>
  `${survey.year} ${survey.quarter}`
export const regionSelector: Selector = ({ place }) =>
  place.region?.name || 'Other'
export const subregionSelector: Selector = ({ place }) =>
  place.subregion?.name || 'Other'
export const categorySelector: Selector = ({ product }) => product.category
export const itemSelector: Selector = ({ product }) =>
  (product.ageGender ? `${product.ageGender} ` : '') +
  (product.sizeStyle ? `${product.sizeStyle} ` : '') +
  `${product.item}`

/*
Mapper
================================================================================
Maps a list of needs to a unique list of selector strings.
*/
export type Mapper = (needs: Need[]) => string[]

const mapBy = (selector: Selector, desc: boolean = false): Mapper => {
  return (needs) => {
    const props = needs.map(selector)
    const uniqueProps = new Set(props)
    const sortedUniqueProps = Array.from(uniqueProps).sort()
    if (desc) {
      sortedUniqueProps.reverse()
    }

    return sortedUniqueProps
  }
}

export const getQuarters = mapBy(quarterSelector, true)
export const getRegions = mapBy(regionSelector)
export const getSubregions = mapBy(subregionSelector)
export const getCategories = mapBy(categorySelector)
export const getItems = mapBy(itemSelector)

/*
Indexers
================================================================================
Group needs by a selector string.
*/
type Indexer = (needs: Need[]) => Index<Need>

const indexBy = (selector: Selector): Indexer => {
  return (needs) => {
    const needsByIndex: Index<Need> = {}
    return needs.reduce((needsByIndex, need) => {
      const index = selector(need)
      const needs = needsByIndex[index] || []
      needs.push(need)
      needsByIndex[index] = needs
      return needsByIndex
    }, needsByIndex)
  }
}

export const indexByQuarter = indexBy(quarterSelector)
export const indexByRegion = indexBy(regionSelector)
export const indexBySubregion = indexBy(subregionSelector)
export const indexByCategory = indexBy(categorySelector)
export const indexByItem = indexBy(itemSelector)

/*
Filters
================================================================================
Filters the needs by selector strings.

Note that search acts as a filter against a partial case-insensitive match of
any selector string.
*/
export type Filter = (needs: Need[], term: string) => Need[]

const filterBy = (selector: Selector): Filter => {
  return (needs, term) => {
    return needs.filter((need) => {
      return term === selector(need)
    })
  }
}

export const filterByQuarter = filterBy(quarterSelector)
export const filterByRegion = filterBy(regionSelector)
export const filterBySubregion = filterBy(subregionSelector)
export const filterByCategory = filterBy(categorySelector)
export const filterByItem = filterBy(itemSelector)

export const filterBySearch: Filter = (needs, term) => {
  return needs.filter((need) => {
    const needString =
      `${quarterSelector(need)} ` +
      `${regionSelector(need)} ` +
      `${subregionSelector(need)} ` +
      `${categorySelector(need)} ` +
      `${itemSelector(need)} `
    return needString.toLowerCase().includes(term.toLowerCase())
  })
}
