import { Need } from '../../../types/need-types'

import {
  getDefaultNivoBarChartOptions,
  NivoBarChartOptions,
  OptionUpdater,
} from '../nivo-options-helpers'

import {
  filterByCategory,
  filterByItem,
  filterByQuarter,
  filterByRegion,
  filterBySearch,
  filterBySubregion,
  getCategories,
  getItems,
  getQuarters,
  getRegions,
  getSubregions,
  Index,
  indexByCategory,
  indexByItem,
  indexByQuarter,
  indexByRegion,
  indexBySubregion,
  selectCategory,
  selectItem,
  selectNeed,
  selectQuarter,
  selectRegion,
  selectSubregion,
} from './needs-helpers'

/*
Needs Options
================================================================================
*/
export interface NeedsBarChartOptions extends NivoBarChartOptions {
  filters?: FilterOptions
  axis?: AxisOptions
}

export type NeedsOptionUpdater = OptionUpdater<Need, NeedsBarChartOptions>

export const getDefaultOptions = (): NeedsBarChartOptions => {
  return {
    filters: {
      quarter: undefined,
      region: undefined,
      subregion: undefined,
      category: undefined,
      item: undefined,
    },
    axis: {
      indexBy: AxisOption.Category,
      groupBy: AxisOption.Region,
    },
    ...getDefaultNivoBarChartOptions(),
  }
}

/*
Filter Options
------------------------------------------------------------
*/
export type FilterOptions = {
  search?: string
  quarter?: string | undefined
  region?: string | undefined
  subregion?: string | undefined
  category?: string | undefined
  item?: string | undefined
}

export const filter = (needs: Need[], filters?: FilterOptions) => {
  if (filters === undefined) {
    return needs
  }

  if (filters.search) {
    needs = filterBySearch(needs, filters.search)
  }
  if (filters.quarter) {
    needs = filterByQuarter(needs, filters.quarter)
  }
  if (filters.region) {
    needs = filterByRegion(needs, filters.region)
  }
  if (filters.subregion) {
    needs = filterBySubregion(needs, filters.subregion)
  }
  if (filters.category) {
    needs = filterByCategory(needs, filters.category)
  }
  if (filters.item) {
    needs = filterByItem(needs, filters.item)
  }

  return needs
}

export const updateFilterSearchOption: NeedsOptionUpdater = (
  needs,
  options,
  value,
) => {
  return {
    ...options,
    filters: {
      ...options.filters,
      search: value,
    },
  }
}

export const getFilterQuarterOptions = (
  needs: Need[],
  options: NeedsBarChartOptions,
): string[] => {
  return getQuarters(needs)
}

export const updateFilterQuarterOption: NeedsOptionUpdater = (
  needs,
  options,
  value,
) => {
  return {
    ...options,
    filters: {
      ...options.filters,
      quarter: value,
    },
  }
}

export const getFilterCategoryOptions = (
  needs: Need[],
  options: NeedsBarChartOptions,
): string[] => {
  return getCategories(needs)
}

export const updateFilterCategoryOption: NeedsOptionUpdater = (
  needs,
  options,
  value,
) => {
  return {
    ...options,
    filters: {
      ...options.filters,
      category: value,
      // reset the item filter
      item: undefined,
    },
  }
}

export const getFilterItemOptions = (
  needs: Need[],
  options: NeedsBarChartOptions,
): string[] => {
  return options.filters?.category
    ? getItems(filterByCategory(needs, options.filters.category))
    : getItems(needs)
}

export const updateFilterItemOption: NeedsOptionUpdater = (
  needs,
  options,
  value,
) => {
  return {
    ...options,
    filters: {
      ...options.filters,
      item: value,
    },
  }
}

export const getFilterRegionOptions = (
  needs: Need[],
  options: NeedsBarChartOptions,
): string[] => {
  return getRegions(needs)
}

export const updateFilterRegionOption: NeedsOptionUpdater = (
  needs,
  options,
  value,
) => {
  return {
    ...options,
    filters: {
      ...options.filters,
      region: value,
      // reset the subregion filter
      subregion: undefined,
    },
  }
}

export const getFilterSubregionOptions = (
  needs: Need[],
  options: NeedsBarChartOptions,
): string[] => {
  return options.filters?.region
    ? getSubregions(filterByRegion(needs, options.filters.region))
    : getSubregions(needs)
}

export const updateFilterSubregionOption: NeedsOptionUpdater = (
  needs,
  options,
  value,
) => {
  return {
    ...options,
    filters: {
      ...options.filters,
      subregion: value,
    },
  }
}

/*
Axis Options
------------------------------------------------------------
*/
export type AxisOptions = {
  indexBy?: AxisOption
  groupBy?: AxisOption
}

export enum AxisOption {
  Survey = 'Survey',
  Region = 'Region',
  Subregion = 'Subregion',
  Category = 'Category',
  Item = 'Item',
}

export const index = (needs: Need[], indexBy?: AxisOption): Index => {
  switch (indexBy) {
    case AxisOption.Survey:
      return indexByQuarter(needs)
    case AxisOption.Category:
      return indexByCategory(needs)
    case AxisOption.Item:
      return indexByItem(needs)
    case AxisOption.Region:
      return indexByRegion(needs)
    case AxisOption.Subregion:
      return indexBySubregion(needs)
    default:
      return indexByCategory(needs)
  }
}

export const selectBy = (groupBy?: AxisOption) => {
  switch (groupBy) {
    case AxisOption.Survey:
      return selectQuarter
    case AxisOption.Category:
      return selectCategory
    case AxisOption.Item:
      return selectItem
    case AxisOption.Region:
      return selectRegion
    case AxisOption.Subregion:
      return selectSubregion
    default:
      return selectCategory
  }
}

// NOTE: could add options functionality if you wanted to be able to choose
//       different types of options, such as "# Needs" vs. "% Groups Needing"
export const valueBy = () => {
  return selectNeed
}

export const getAxisIndexByOptions = (
  needs: Need[],
  options: NeedsBarChartOptions,
): string[] => {
  return Object.values(AxisOption)
}

export const updateAxisIndexByOption: NeedsOptionUpdater = (
  needs,
  options,
  value,
) => {
  return {
    ...options,
    axis: {
      ...options.axis,
      indexBy: value as AxisOption,
    },
  }
}

export const getAxisGroupByOptions = (
  needs: Need[],
  options: NeedsBarChartOptions,
): string[] => {
  return Object.values(AxisOption)
}

export const updateAxisGroupByOption: NeedsOptionUpdater = (
  needs,
  options,
  value,
) => {
  return {
    ...options,
    axis: {
      ...options.axis,
      groupBy: value as AxisOption,
    },
  }
}
