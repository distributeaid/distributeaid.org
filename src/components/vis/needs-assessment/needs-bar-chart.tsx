import { BarDatum, ResponsiveBar } from '@nivo/bar'
import { FC } from 'react'
import { Need } from '../../../types/need-types'

import { nivoProps } from '../nivo-theme'

type Axis = {
  indexBy?: string | undefined
  groupBy: string | undefined
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

type Props = {
  needs: Need[]
  options?:
    | {
        axis?: Axis | undefined
        filters?: Filters | undefined
        sort?: Sort | undefined
      }
    | undefined
}

export const axisOptionValues = ['Product', 'Place', 'Time']

const index = (
  needs: Need[],
  indexBy: string | undefined,
): Record<string, Need[]> => {
  if (!indexBy || !axisOptionValues.includes(indexBy)) {
    indexBy = 'Product'
  }

  const needsByIndex = needs.reduce(function (
    needsByIndex: Record<string, Need[]>,
    need: Need,
  ) {
    let index = ''
    if (indexBy === 'Place') {
      index = need.place.region?.name || 'Other'
    } else if (indexBy === 'Time') {
      index = `${need.survey.year} ${need.survey.quarter}`
    }
    // default case: indexBy === 'Product' | unknown string | undefined
    else {
      index = need.product.category
    }

    const needs = needsByIndex[index] || []
    needs.push(need)
    needsByIndex[index] = needs
    return needsByIndex
  },
  {})

  return needsByIndex
}

type KeyPicker = (need: Need) => string

const getKeyPicker = (axisOptions: Axis | undefined): KeyPicker => {
  if (!axisOptions) {
    axisOptions = {
      indexBy: 'Product',
      groupBy: 'Place',
    }
  }
  if (!axisOptions.indexBy) {
    axisOptions.indexBy = 'Product'
  }
  if (!axisOptions.groupBy) {
    axisOptions.groupBy = 'Place'
  }

  if (axisOptions.groupBy === 'Product') {
    if (axisOptions.indexBy === 'Product') {
      return (need) => {
        const product = need.product
        return (
          (product.ageGender ? `${product.ageGender} ` : '') +
          (product.sizeStyle ? `${product.sizeStyle} ` : '') +
          `${product.item}`
        )
      }
    } else {
      return (need) => need.product.category
    }
  } else if (axisOptions.groupBy === 'Time') {
    return (need) => `${need.survey.year} ${need.survey.quarter}`
  }
  // default case: groupBy === 'Place' | unknown string | undefined
  else {
    if (axisOptions.indexBy === 'Place') {
      return (need) => need.place.subregion?.name || 'Other'
    } else {
      return (need) => need.place.region?.name || 'Other'
    }
  }
}

const buildNivoData = (
  needsByIndex: Record<string, Need[]>,
  keyPicker: KeyPicker,
): {
  data: BarDatum[]
  keys: string[]
} => {
  const data: BarDatum[] = []
  const keys: Set<string> = new Set()

  for (const [index, needs] of Object.entries(needsByIndex)) {
    const datum: BarDatum = { index }

    for (const need of needs) {
      const key = keyPicker(need)
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

  return needs.filter((need) => {
    const needString = `${need.need.toLocaleString()} ${
      need.product.category
    } ${need.product.item} ${need.product.ageGender} ${
      need.product.sizeStyle
    } ${need.place.region?.name} ${need.place.subregion?.name}`
    const searchMatch =
      !filters.search ||
      needString.toLowerCase().includes(filters.search.toLowerCase())

    const quarterMatch =
      !filters.quarter ||
      filters.quarter === `${need.survey.year} ${need.survey.quarter}`

    const regionMatch =
      !filters.region ||
      filters.region === need.place.region?.name ||
      (filters.region === 'Other' && !need.place.region)

    const categoryMatch =
      !filters.category || filters.category === need.product.category

    return searchMatch && quarterMatch && regionMatch && categoryMatch
  })
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

export const NeedsBarChart: FC<Props> = ({ needs, options }) => {
  const filteredNeeds = filter(needs, options?.filters)
  const needsByIndex = index(filteredNeeds, options?.axis?.indexBy)
  const keyPicker = getKeyPicker(options?.axis)
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
