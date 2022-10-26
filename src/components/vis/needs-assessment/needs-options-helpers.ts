import { Need } from '../../../types/need-types'

import {
  AxisOption,
  NeedsBarChartOptions,
  SortByOption,
  SortOrderOption,
} from './needs-bar-chart'

export const getDefaultOptions = (): NeedsBarChartOptions => {
  return {
    axis: {
      indexBy: AxisOption.Category,
      groupBy: AxisOption.Region,
    },
    filters: {
      quarter: undefined,
      region: undefined,
      subregion: undefined,
      category: undefined,
      item: undefined,
    },
    sort: {
      by: SortByOption.Label,
      order: SortOrderOption.Asc,
    },
  }
}

export const setOption = (
  needs: Need[],
  currentOptions: NeedsBarChartOptions,
  setState: React.Dispatch<React.SetStateAction<NeedsBarChartOptions>>,
  updateOption: OptionUpdater,
): ((value: string) => void) => {
  return (value) => {
    const newOptions = updateOption(needs, currentOptions, value)
    setState(newOptions)
  }
}

export type OptionUpdater = (
  needs: Need[],
  options: NeedsBarChartOptions,
  value: string,
) => NeedsBarChartOptions

export const updateAxisIndexByOption: OptionUpdater = (
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

export const updateAxisGroupByOption: OptionUpdater = (
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

export const updateFilterSearchOption: OptionUpdater = (
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

export const updateFilterQuarterOption: OptionUpdater = (
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

export const updateFilterCategoryOption: OptionUpdater = (
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

export const updateFilterItemOption: OptionUpdater = (
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

export const updateFilterRegionOption: OptionUpdater = (
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

export const updateFilterSubregionOption: OptionUpdater = (
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

export const updateSortByOption: OptionUpdater = (needs, options, value) => {
  let order = SortOrderOption.Asc
  if (value === 'Need') {
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

export const updateSortOrderOption: OptionUpdater = (needs, options, value) => {
  return {
    ...options,
    sort: {
      ...options.sort,
      order: value as SortOrderOption,
    },
  }
}
