import { ResponsiveBar } from '@nivo/bar'
import { FC } from 'react'

import { Need } from '../../../types/need-types'

import { buildNivoData, indexCounter } from '../nivo-helpers'
import { nivoProps } from '../nivo-theme'

import { sort } from '../nivo-options-helpers'

import {
  filter,
  index,
  NeedsBarChartOptions,
  selectBy,
  valueBy,
} from './needs-options-helpers'

type Props = {
  needs: Need[]
  options?: NeedsBarChartOptions
}

export const NeedsBarChart: FC<Props> = ({ needs, options }) => {
  const filteredNeeds = filter(needs, options?.filters)
  const needsByIndex = index(filteredNeeds, options?.axis?.indexBy)
  const keySelector = selectBy(options?.axis?.groupBy)
  const valueSelector = valueBy()
  const { data, keys } = buildNivoData(needsByIndex, keySelector, valueSelector)
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
