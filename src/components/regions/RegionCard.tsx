import { ReactNode } from '@reach/router/node_modules/@types/react'
import React, { FC } from 'react'
import SmartLink from '@components/link/SmartLink'
import MarkdownContent from '@components/markdown/MarkdownContent'
import {
  Region,
  Subregion,
  Subregions,
} from '@components/regions/RegionComponentTypes'

type Props = {
  region: Region
  subregions: Subregions
}

const RegionCard: FC<Props> = ({ region, subregions }) => {
  const subregionNames = Object.entries(subregions)
    .reduce((names: string, [relativeFilePath, subregion]) => {
      return names + subregion.name + ' // '
    }, '')
    .slice(0, -4)

  const populationCount = Object.entries(subregions)
    .reduce((count: number, [relativeFilePath, subregion]) => {
      return count + subregion.population.count
    }, 0)
    .toLocaleString()

  return (
    <article className="border">
      {region.map}
      <div className="text-left">
        <h2 className="text-xl font-semibold mb-1">{region.name}</h2>
        <p className="text-gray-600 mb-6">{subregionNames}</p>
        <p>
          <strong>Population:</strong> {populationCount}
        </p>
        {/*      <SmartLink
          className="inline-block bg-navy-700 hover:bg-navy-800 rounded text-white px-6 py-3 font-medium tracking-wide"
          href={ctaUrl}
        >
          {ctaLabel}
        </SmartLink>
  */}
      </div>
      <div className="m-4 mt-6 space-y-2 line-clamp-3">
        <MarkdownContent content={region.overview} />
      </div>
    </article>
  )
}

export default RegionCard
