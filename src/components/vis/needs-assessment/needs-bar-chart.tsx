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

type Axis = {
  indexBy?: string | undefined
  groupBy?: string | undefined
}

type Filters = {
  search?: string | undefined
  quarter?: string | undefined
  region?: string | undefined
  category?: string | undefined
}

type Sort = {
  by?: string | undefined
  order?: string | undefined
}

type Options = {
  axis?: Axis
  filters?: Filters
  sort?: Sort
}

export const axisOptionValues = ['Product', 'Place', 'Time']

const index = (needs: Need[], indexBy: string | undefined): Index<Need> => {
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

const getSelector = (axisOptions: Axis | undefined): Selector => {
  const axis = {
    indexBy: axisOptions?.indexBy ? axisOptions.indexBy : 'Product',
    groupBy: axisOptions?.groupBy ? axisOptions.groupBy : 'Place',
  }

  switch (axis.groupBy) {
    case 'Product':
      return axis.indexBy !== 'Product' ? categorySelector : itemSelector

    case 'Place':
      return axis.indexBy !== 'Place' ? regionSelector : subregionSelector

    case 'Time':
      return quarterSelector

    default:
      return axis.indexBy !== 'Place' ? regionSelector : subregionSelector
  }
}

const buildNivoData = (
  needsByIndex: Index<Need>,
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

export const sortOptions = {
  by: ['Label', 'Need', 'Random'],
  order: ['Ascending', 'Descending'],
}

const sort = (data: BarDatum[], sort?: Sort) => {
  let sortBy = sortOptions.by[0]
  if (sort?.by !== undefined && sortOptions.by.includes(sort.by)) {
    sortBy = sort.by
  }

  let sortOrder = sortOptions.order[0]
  if (sort?.order !== undefined && sortOptions.order.includes(sort.order)) {
    sortOrder = sort.order
  }

  if (sortBy === 'Label') {
    data.sort((a, b) => {
      const aLabel = a.index as string
      const bLabel = b.index as string

      if (aLabel < bLabel) {
        return 1
      }
      if (aLabel > bLabel) {
        return -1
      }
      return 0
    })
  } else if (sortBy === 'Need') {
    data.sort((a, b) => {
      const aNeed = Object.entries(a).reduce((totalNeed, [key, need]) => {
        if (key !== 'index') {
          return totalNeed + (need as number)
        } else {
          return totalNeed
        }
      }, 0)

      const bNeed = Object.entries(b).reduce((totalNeed, [key, need]) => {
        if (key !== 'index') {
          return totalNeed + (need as number)
        } else {
          return totalNeed
        }
      }, 0)

      if (aNeed < bNeed) {
        return 1
      }
      if (aNeed > bNeed) {
        return -1
      }
      return 0
    })
  } else if (sortBy === 'Random') {
    data.sort(() => {
      return Math.random() - 0.5
    })
  }

  if (sortOrder === 'Descending') {
    data.reverse()
  }

  return data
}

const getBarsCount = (data: BarDatum[]): number => {
  const bars: Set<string> = new Set()

  for (const datum of data) {
    bars.add(datum.index as string)
  }

  return bars.size
}

type Props = {
  needs: Need[]
  options?: Options
}

export const NeedsBarChart: FC<Props> = ({ needs, options }) => {
  const filteredNeeds = filter(needs, options?.filters)
  const needsByIndex = index(filteredNeeds, options?.axis?.indexBy)
  const keyPicker = getSelector(options?.axis)
  const { data, keys } = buildNivoData(needsByIndex, keyPicker)
  const sortedData = sort(data, options?.sort)

  const barProps = nivoProps.bar.horizontal
  const height =
    barProps.margin.top + barProps.margin.bottom + 30 * getBarsCount(data)

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
