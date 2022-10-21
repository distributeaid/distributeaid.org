import { BarDatum, ResponsiveBar } from '@nivo/bar'
import { FC } from 'react'
import { Need } from '../../../types/need-types'

import { nivoProps } from '../nivo-theme'

type Props = {
  needs: Need[]
  category: string
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
      datum[placeKey] = need
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

const filter = (needs: Need[], category: string) => {
  return needs.filter((need) => {
    return need.product.category === category
  })
}

const total = (needs: Need[]) => {
  const total = needs.reduce((total, need) => {
    return total + need.need
  }, 0)

  return Math.floor(total)
}

export const NeedsBarChart: FC<Props> = ({ needs, category }) => {
  const filteredNeeds = filter(needs, category)
  const totalNeed = total(filteredNeeds)
  const height = filteredNeeds.length * 18
  const dataProps = buildNivoData(filteredNeeds)

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
        {...nivoProps.bar.horizontal}
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
