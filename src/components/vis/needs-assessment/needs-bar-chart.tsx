import { BarDatum, ResponsiveBar } from '@nivo/bar'
import { FC } from 'react'
import { Need } from '../../../types/need-types'

import { nivoProps } from '../nivo-theme'

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
        filters?: Filters | undefined
        sort?: Sort | undefined
      }
    | undefined
}

// # needs by item, key'd by subregion
const buildNivoData = (
  needs: Need[],
): {
  data: BarDatum[]
  indexBy: string
  keys: string[]
} => {
  const data: BarDatum[] = []
  const indexBy = 'product'
  const keys: Set<string> = new Set()

  const needsByProduct = needs.reduce(function (
    needsByProduct: Record<string, Need[]>,
    need: Need,
  ) {
    const product = need.product
    const name =
      (product.ageGender ? `${product.ageGender} ` : '') +
      (product.sizeStyle ? `${product.sizeStyle} ` : '') +
      `${product.item}`
    const needs = needsByProduct[name] || []
    needs.push(need)
    needsByProduct[name] = needs
    return needsByProduct
  },
  {})

  for (const [name, needs] of Object.entries(needsByProduct)) {
    const datum: BarDatum = {}
    datum[indexBy] = name

    for (const {
      need,
      place: { subregion },
    } of needs) {
      const placeKey = subregion ? subregion.name : 'Other'
      const currentCount = (datum[placeKey] as number) || 0
      datum[placeKey] = currentCount + need
      keys.add(placeKey)
    }

    data.push(datum)
  }

  return {
    data,
    indexBy,
    keys: Array.from(keys).sort(),
  }
}

const filter = (needs: Need[], filters?: Filters) => {
  if (filters === undefined) {
    return needs
  }

  return needs.filter((need) => {
    const needString = `${need.need} ${need.product.item} ${need.product.ageGender} ${need.product.sizeStyle} ${need.product.item} ${need.place.subregion}`
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

const sort = (indexBy: string, data: BarDatum[], sort?: Sort) => {
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
      const aLabel = a[indexBy] as string
      const bLabel = b[indexBy] as string

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
        if (key !== indexBy) {
          return totalNeed + (need as number)
        } else {
          return totalNeed
        }
      }, 0)

      const bNeed = Object.entries(b).reduce((totalNeed, [key, need]) => {
        if (key !== indexBy) {
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

const getBarsCount = ({
  data,
  indexBy,
}: {
  data: BarDatum[]
  indexBy: string
}): number => {
  const bars: Set<string> = new Set()

  for (const datum of data) {
    bars.add(datum[indexBy] as string)
  }

  return bars.size
}

export const NeedsBarChart: FC<Props> = ({ needs, options }) => {
  const barProps = nivoProps.bar.horizontal
  const filteredNeeds = filter(needs, options?.filters)
  const dataProps = buildNivoData(filteredNeeds)
  const sortedData = sort(dataProps.indexBy, dataProps.data, options?.sort)
  const height =
    barProps.margin.top + barProps.margin.bottom + 30 * getBarsCount(dataProps)

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
        indexBy={dataProps.indexBy}
        keys={dataProps.keys}
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
