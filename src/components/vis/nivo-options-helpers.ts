import { BarDatum } from '@nivo/bar'

import { sortByLabel, sortByRandom, sortByValue } from './nivo-helpers'

/*
Nivo Bar Chart Options
================================================================================
*/
export interface NivoBarChartOptions {
  sort?: SortOptions
}

export interface OptionUpdater<T, O> {
  (entries: T[], options: O, value: string): O
}

export type NivoOptionUpdater = OptionUpdater<any, NivoBarChartOptions>

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
export interface SortOptions {
  by?: SortByOption
  order?: SortOrderOption
}

export enum SortByOption {
  Label = 'Label',
  Value = 'Value',
  Random = 'Random',
}

export enum SortOrderOption {
  Asc = 'Ascending',
  Desc = 'Descending',
}

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
