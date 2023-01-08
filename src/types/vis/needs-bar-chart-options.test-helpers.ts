import {
  AxisOption,
  AxisOptions,
  FilterOptions,
  NeedsBarChartOptions,
} from './needs-bar-chart-options.d'

import { getSortOptions } from './nivo-bar-chart-options.test-helpers'

/*
Nivo Bar Chart Options
================================================================================
*/

export const getNeedsBarChartOptions = (
  props?: Record<string, any>,
): NeedsBarChartOptions => {
  return {
    sort: getSortOptions(),
    filters: getFilterOptions(),
    axis: getAxisOptions(),
    ...props,
  }
}

/*
Filter Options
------------------------------------------------------------
*/
export const getFilterOptions = (
  props?: Record<string, any>,
): FilterOptions => {
  return {
    search: '',
    ...props,
  }
}

/*
Axis Options
------------------------------------------------------------
*/
export const getAxisOptions = (props?: Record<string, any>): AxisOptions => {
  return {
    indexBy: AxisOption.Category,
    groupBy: AxisOption.Category,
    ...props,
  }
}
