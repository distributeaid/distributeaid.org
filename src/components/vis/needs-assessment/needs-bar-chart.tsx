import { BarDatum, ResponsiveBar } from '@nivo/bar'
import { FC } from 'react'
import { Need } from '../../../types/need-types'

import { nivoProps } from '../nivo-theme'

type Filters = {
  quarter: string | undefined
  region: string | undefined
  category: string | undefined
}

type Props = {
  needs: Need[]
  options: {
    filters?: Filters
  }
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

  data.sort((a, b) => {
    const aLabel = a[indexBy] as string
    const bLabel = b[indexBy] as string

    if (aLabel > bLabel) {
      return -1
    }
    if (aLabel < bLabel) {
      return 1
    }
    return 0
  })

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
    const quarterMatch =
      !filters.quarter ||
      filters.quarter === `${need.survey.year} ${need.survey.quarter}`

    const regionMatch =
      !filters.region ||
      filters.region === need.place.region?.name ||
      (filters.region === 'Other' && !need.place.region)

    const categoryMatch =
      !filters.category || filters.category === need.product.category

    return quarterMatch && regionMatch && categoryMatch
  })
}

const total = (needs: Need[]) => {
  const total = needs.reduce((total, need) => {
    return total + need.need
  }, 0)

  return Math.floor(total)
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
  const filteredNeeds = filter(needs, options.filters)
  const totalNeed = total(filteredNeeds)
  const dataProps = buildNivoData(filteredNeeds)
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
        {...dataProps}
        {...barProps}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          format: (value: number) => `${Number(value).toLocaleString()}`,
          legend: `Known Need: ${Number(totalNeed).toLocaleString()} Items`,
          legendPosition: 'start',
          legendOffset: -40,
        }}
      />
    </div>
  )
}

export default NeedsBarChart
