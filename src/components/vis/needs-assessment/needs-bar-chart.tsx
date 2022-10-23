import { BarDatum, ResponsiveBar } from '@nivo/bar'
import { FC } from 'react'
import { Need } from '../../../types/need-types'

import { nivoProps } from '../nivo-theme'

import {
  categorySelector,
  filterByCategory,
  filterByQuarter,
  filterByRegion,
  filterBySearch,
  Index,
  indexByCategory,
  indexByQuarter,
  indexByRegion,
  itemSelector,
  quarterSelector,
  regionSelector,
  Selector,
  subregionSelector,
} from './needs-helpers'

import {
  indexCounter,
  sortByLabel,
  sortByRandom,
  sortByValue,
} from '../nivo-helpers'

/*
Filter
================================================================================
*/
type Filters = {
  search?: string | undefined
  quarter?: string | undefined
  region?: string | undefined
  category?: string | undefined
}

const filter = (needs: Need[], filters?: Filters) => {
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
  if (filters.category) {
    needs = filterByCategory(needs, filters.category)
  }

  return needs
}

/*
Index & Group
================================================================================
*/
export enum AxisOption {
  Product = 'Product',
  Place = 'Place',
  Time = 'Time',
}

type Axis = {
  indexBy?: AxisOption | undefined
  groupBy?: AxisOption | undefined
}

export const axisOptionValues = ['Product', 'Place', 'Time']

const index = (needs: Need[], indexBy?: string): Index => {
  switch (indexBy) {
    case 'Product':
      return indexByCategory(needs)
    case 'Place':
      return indexByRegion(needs)
    case 'Time':
      return indexByQuarter(needs)
    default:
      return indexByCategory(needs)
  }
}

const groupBySelector = (axis?: Axis): Selector => {
  switch (axis?.groupBy) {
    case 'Product':
      return axis?.indexBy !== 'Product' ? categorySelector : itemSelector

    case 'Place':
      return axis?.indexBy !== 'Place' ? regionSelector : subregionSelector

    case 'Time':
      return quarterSelector

    default:
      return axis?.indexBy !== 'Place' ? regionSelector : subregionSelector
  }
}

/*
Build Nivo Data
================================================================================
*/
const buildNivoData = (
  needsByIndex: Index,
  selector: Selector,
): {
  data: BarDatum[]
  keys: string[]
} => {
  const data: BarDatum[] = []
  const keys: Set<string> = new Set()

  for (const [index, needs] of Object.entries(needsByIndex)) {
    const datum: BarDatum = { index }

    for (const need of needs) {
      const key = selector(need)
      const currentCount = (datum[key] as number) || 0
      datum[key] = currentCount + need.need
      keys.add(key)
    }

    data.push(datum)
  }

  return {
    data,
    keys: Array.from(keys).sort(),
  }
}

/*
Sort
================================================================================
*/
export enum SortByOption {
  Label = 'Label',
  Need = 'Need',
  Random = 'Random',
}

export enum SortOrderOption {
  Asc = 'Ascending',
  Desc = 'Descending',
}

type Sort = {
  by?: SortByOption | undefined
  order?: SortOrderOption | undefined
}

export const sortOptions = {
  by: ['Label', 'Need', 'Random'],
  order: ['Ascending', 'Descending'],
}

const sort = (data: BarDatum[], sort?: Sort) => {
  switch (sort?.by) {
    case 'Label':
      data = sortByLabel(data)
      break
    case 'Need':
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

/*
Needs Bar Chart
================================================================================
*/
type Props = {
  needs: Need[]
  options?: Options
}

type Options = {
  axis?: Axis
  filters?: Filters
  sort?: Sort
}

export const NeedsBarChart: FC<Props> = ({ needs, options }) => {
  const filteredNeeds = filter(needs, options?.filters)
  const needsByIndex = index(filteredNeeds, options?.axis?.indexBy)
  const keyPicker = groupBySelector(options?.axis)
  const { data, keys } = buildNivoData(needsByIndex, keyPicker)
  const sortedData = sort(data, options?.sort)

  const barProps = nivoProps.bar.horizontal
  const height =
    barProps.margin.top + barProps.margin.bottom + 30 * indexCounter(sortedData)

  return (
    // docs: https://nivo.rocks/bar/
    <div
      className="w-full"
      style={{
        height: `${height}px`,
      }}
    >
      <ResponsiveBar
        // base
        data={sortedData}
        indexBy="index"
        keys={keys}
        {...barProps}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          format: (value: number) => `${Number(value).toLocaleString()}`,
          legend: `Known Need (# Items)`,
          legendPosition: 'start',
          legendOffset: -40,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          format: (value: number) => `${Number(value).toLocaleString()}`,
          legend: `Known Need (# Items)`,
          legendPosition: 'start',
          legendOffset: 40,
        }}
      />
    </div>
  )
}

export default NeedsBarChart
