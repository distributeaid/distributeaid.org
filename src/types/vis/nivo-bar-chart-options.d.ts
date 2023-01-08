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
