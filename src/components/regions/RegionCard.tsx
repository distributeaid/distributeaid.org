import { ReactNode } from '@reach/router/node_modules/@types/react'
import React, { FC } from 'react'
import slugify from 'utils/slugify'
import { getOxfordCommaSeparator } from 'utils/strings'
import SmartLink from '@components/link/SmartLink'
import MarkdownContent from '@components/markdown/MarkdownContent'
import {
  RegionSummary,
  SubregionSummary,
} from '@components/regions/RegionComponentTypes'

type Props = {
  region: RegionSummary
  subregions: SubregionSummary[]
}

const RegionCard: FC<Props> = ({ region, subregions }) => {
  const regionSlug = slugify(region.name)
  const regionHref = '/regions/' + regionSlug

  const subregionLinks = subregions.map((subregion, index, array) => {
    const subregionSlug = slugify(subregion.name)
    const subregionHref = regionHref + '#' + subregionSlug
    const seperator = getOxfordCommaSeparator(index, array)
    return (
      <span>
        {seperator}
        <SmartLink className="link" href={subregionHref}>
          {subregion.name}
        </SmartLink>
      </span>
    )
  })

  const populationCount = subregions
    .reduce((count: number, subregion) => {
      return count + subregion.population.count
    }, 0)
    .toLocaleString()

  return (
    <article className="border">
      <div className="m-3">
        <h2 className="text-xl font-semibold mb-1">{region.name}</h2>
        <p className="mb-3">{subregionLinks}</p>
        <p className="mb-3">
          <strong>Population:</strong> {populationCount}
        </p>
        <div className="mb-3 space-y-2 line-clamp-3">
          <MarkdownContent content={region.overview} />
        </div>
        <SmartLink
          className="mb-3 inline-block bg-navy-700 hover:bg-navy-800 rounded text-white px-6 py-3 font-medium tracking-wide"
          href={regionHref}
        >
          View Region
        </SmartLink>
      </div>
    </article>
  )
}

export default RegionCard
