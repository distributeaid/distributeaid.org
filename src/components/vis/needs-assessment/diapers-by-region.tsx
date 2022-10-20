import { BarDatum, ResponsiveBar } from '@nivo/bar'
import { FC } from 'react'
import { Product } from '../../../types/product-types'

import { Region, Subregion } from '../../regions/RegionComponentTypes'

export type Need = {
  id: string
  need: number
  survey: {
    id: string
    year: string
    quarter: string
  }
  product: Product
  place: {
    region?: Region
    subregion?: Subregion
  }
}

type Props = {
  diapersByRegion: Need[]
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
      `${product.item}s`
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

export const DiapersByRegionVis: FC<Props> = ({ diapersByRegion }) => {
  const dataProps = buildNivoData(diapersByRegion)

  return (
    // NOTE: the containing element must have a set width & height
    // docs: https://nivo.rocks/bar/
    <ResponsiveBar
      // base
      {...dataProps}
      layout="horizontal"
      padding={0.25}
      innerPadding={1}
      margin={{ top: 80, right: 20, bottom: 20, left: 100 }}
      valueFormat={(value) => `${Number(value).toLocaleString('en-US')}`}
      // labels
      labelSkipWidth={20}
      labelSkipHeight={20}
      // grid & axis
      enableGridX={true}
      enableGridY={false}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        format: (value) => `${Number(value).toLocaleString('en-US')}`,
        legend: '# Items Needed',
        legendPosition: 'start',
        legendOffset: -40,
      }}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        legend: '',
        legendPosition: 'end',
        legendOffset: -20,
      }}
      // legends
      legends={[
        {
          dataFrom: 'keys',
          toggleSerie: true,
          anchor: 'top',
          direction: 'row',
          translateX: 0,
          translateY: -60,
          itemsSpacing: 2,
          itemWidth: 120,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.8,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}

export default DiapersByRegionVis
