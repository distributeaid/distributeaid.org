import {
  NivoBarChartOptions,
  SortByOption,
  SortOptions,
  SortOrderOption,
} from './nivo-bar-chart-options.d'

/*
Nivo Bar Chart Options
================================================================================
*/

export const getNivoBarChartOptions = (
  props?: Record<string, any>,
): NivoBarChartOptions => {
  return {
    sort: getSortOptions(),
    ...props,
  }
}

/*
Sort Options
------------------------------------------------------------
*/
export const getSortOptions = (props?: Record<string, any>): SortOptions => {
  return {
    by: SortByOption.Label,
    order: SortOrderOption.Asc,
    ...props,
  }
}
