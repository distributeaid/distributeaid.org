import { BarDatum } from '@nivo/bar'

import {
  NivoBarChartOptions,
  NivoOptionUpdater,
  SortByOption,
  SortOptions,
  SortOrderOption,
} from '../../../types/vis/nivo-bar-chart-options.d'

import { sortByLabel, sortByRandom, sortByValue } from './data-helpers'

/*
Nivo Bar Chart Options
================================================================================
*/
export const getDefaultNivoBarChartOptions = (): NivoBarChartOptions => {
  return {
    sort: {
      by: SortByOption.Label,
      order: SortOrderOption.Asc,
    },
  }
}

/*
Sort Options
------------------------------------------------------------
*/
export const sort = (data: BarDatum[], sort?: SortOptions) => {
  switch (sort?.by) {
    case 'Label':
      data = sortByLabel(data)
      break
    case 'Value':
      data = sortByValue(data)
      break
    case 'Random':
      data = sortByRandom(data)
      break
    default:
      data = sortByLabel(data)
      break
  }

  if (sort?.order === 'Descending') {
    data = data.reverse()
  }

  return data
}

export const getSortByOptions = (
  entry: any[],
  options: NivoBarChartOptions,
): string[] => {
  return Object.values(SortByOption)
}

export const updateSortByOption: NivoOptionUpdater = (
  entries,
  options,
  value,
) => {
  let order = SortOrderOption.Asc
  if (value === SortByOption.Value) {
    order = SortOrderOption.Desc
  }

  return {
    ...options,
    sort: {
      by: value as SortByOption,
      order,
    },
  }
}

export const getSortOrderOptions = (
  entry: any[],
  options: NivoBarChartOptions,
): string[] => {
  return Object.values(SortOrderOption)
}

export const updateSortOrderOption: NivoOptionUpdater = (
  entries,
  options,
  value,
) => {
  return {
    ...options,
    sort: {
      ...options.sort,
      order: value as SortOrderOption,
    },
  }
}
