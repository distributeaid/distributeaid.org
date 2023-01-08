import { Need } from '../need.d'
import { NivoBarChartOptions, OptionUpdater } from './nivo-bar-chart-options.d'

/*
Needs Bar Chart Options
================================================================================
*/
export interface NeedsBarChartOptions extends NivoBarChartOptions {
  filters?: FilterOptions
  axis?: AxisOptions
}

export type NeedsOptionUpdater = OptionUpdater<Need, NeedsBarChartOptions>

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
