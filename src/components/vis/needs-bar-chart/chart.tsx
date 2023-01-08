import { ResponsiveBar } from '@nivo/bar'
import { FC } from 'react'

import { Need } from '../../../types/need.d'

import {
  buildNivoData,
  getTotalValue,
  indexCounter,
} from '../nivo/data-helpers'
import { nivoProps } from '../nivo/theme'

import { sort } from '../nivo/options-helpers'

import { filter, index, selectBy, valueBy } from './options-helpers'

import { NeedsBarChartOptions } from '../../../types/vis/needs-bar-chart-options.d'

type Props = {
  needs: Need[]
  title?: string | undefined
  options?: NeedsBarChartOptions | undefined
}

export const NeedsBarChart: FC<Props> = ({ needs, title, options }) => {
  const filteredNeeds = filter(needs, options?.filters)
  const needsByIndex = index(filteredNeeds, options?.axis?.indexBy)
  const keySelector = selectBy(options?.axis?.groupBy)
  const valueSelector = valueBy()
  const { data, keys } = buildNivoData(needsByIndex, keySelector, valueSelector)
  const sortedData = sort(data, options?.sort)

  const barProps = nivoProps.bar.horizontal
  const indexCount = indexCounter(sortedData)
  const height = barProps.margin.top + barProps.margin.bottom + 40 * indexCount

  const total = getTotalValue(sortedData)

  return (
    // docs: https://nivo.rocks/bar/
    <div
      className="w-full pt-8 border-t-2 mt-8"
      style={{
        height: `${height}px`,
      }}
    >
      <header
        className="prose mb-2"
        style={{
          marginLeft: barProps.margin.left,
          marginRight: barProps.margin.right,
        }}
      >
        <h1 className="mb-2 text-navy-800">{title}</h1>
        <h3 className="mt-2 text-navy-700 flex items-center gap-2">
          <span>Now showing</span>
          <span className="text-3xl text-navy-600 font-normal">
            {total.toLocaleString()}
          </span>
          <span>total known needs.</span>
        </h3>
      </header>
      <ResponsiveBar
        // base
        data={sortedData}
        indexBy="index"
        keys={keys}
        {...barProps}
        axisTop={{
          ...nivoProps.bar.horizontal.axisTop,
          legend: `# Items`,
          legendPosition: 'start',
          legendOffset: -40,
        }}
        axisBottom={
          indexCount <= 9
            ? nivoProps.bar.horizontal.axisBottom
            : {
                ...nivoProps.bar.horizontal.axisBottom,
                legend: `# Items`,
                legendPosition: 'start',
                legendOffset: 40,
              }
        }
      />
    </div>
  )
}

export default NeedsBarChart
