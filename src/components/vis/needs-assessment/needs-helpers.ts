import { Need } from '../../../types/need-types'

/*
Selectors
================================================================================
Select a comparable string representing some aspect of a need.
*/
type KeySelector = (entry: Need) => string

export const selectQuarter: KeySelector = ({ survey }) =>
  `${survey.year} ${survey.quarter}`
export const selectRegion: KeySelector = ({ place }) =>
  place.region?.name || 'Other'
export const selectSubregion: KeySelector = ({ place }) =>
  place.subregion?.name || 'Other'
export const selectCategory: KeySelector = ({ product }) => product.category
export const selectItem: KeySelector = ({ product }) =>
  (product.ageGender ? `${product.ageGender} ` : '') +
  (product.sizeStyle ? `${product.sizeStyle} ` : '') +
  `${product.item}`

type ValueSelector = (entry: Need) => number

export const selectNeed: ValueSelector = ({ need }) => need

/*
Mapper
================================================================================
Maps a list of needs to a unique list of selector strings.
*/
type Mapper = (needs: Need[]) => string[]

const mapBy = (selector: KeySelector, desc: boolean = false): Mapper => {
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

export const getQuarters = mapBy(selectQuarter, true)
export const getRegions = mapBy(selectRegion)
export const getSubregions = mapBy(selectSubregion)
export const getCategories = mapBy(selectCategory)
export const getItems = mapBy(selectItem)

/*
Indexers
================================================================================
Group needs by a selector string.
*/
export type Index = Record<string, Need[]>

type Indexer = (needs: Need[]) => Index

const indexBy = (selector: KeySelector): Indexer => {
  return (needs) => {
    const needsByIndex: Index = {}
    return needs.reduce((needsByIndex, need) => {
      const index = selector(need)
      const needs = needsByIndex[index] || []
      needs.push(need)
      needsByIndex[index] = needs
      return needsByIndex
    }, needsByIndex)
  }
}

export const indexByQuarter = indexBy(selectQuarter)
export const indexByRegion = indexBy(selectRegion)
export const indexBySubregion = indexBy(selectSubregion)
export const indexByCategory = indexBy(selectCategory)
export const indexByItem = indexBy(selectItem)

/*
Filters
================================================================================
Filters the needs by selector strings.

Note that search acts as a filter against a partial case-insensitive match of
any selector string.
*/
type Filter = (needs: Need[], term: string) => Need[]

const filterBy = (selector: KeySelector): Filter => {
  return (needs, term) => {
    return needs.filter((need) => {
      return term === selector(need)
    })
  }
}

export const filterByQuarter = filterBy(selectQuarter)
export const filterByRegion = filterBy(selectRegion)
export const filterBySubregion = filterBy(selectSubregion)
export const filterByCategory = filterBy(selectCategory)
export const filterByItem = filterBy(selectItem)

export const filterBySearch: Filter = (needs, term) => {
  return needs.filter((need) => {
    const needString =
      `${selectQuarter(need)} ` +
      `${selectRegion(need)} ` +
      `${selectSubregion(need)} ` +
      `${selectCategory(need)} ` +
      `${selectItem(need)} `
    return needString.toLowerCase().includes(term.toLowerCase())
  })
}
