import { ReactNode } from '@reach/router/node_modules/@types/react'
import React, { FC } from 'react'
import slugify from 'utils/slugify'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getOxfordCommaSeparator } from 'utils/strings'
import SmartLink from '@components/link/SmartLink'
import MarkdownContent from '@components/markdown/MarkdownContent'
import { Region } from '@components/regions/RegionComponentTypes'

type Props = {
  region: Region
}

const RegionCard: FC<Props> = ({ region }) => {
  const regionSlug = slugify(region.name)
  const regionHref = `/regions/${regionSlug}`

  const subregionLinks = region.subregions.map((subregion, index, array) => {
    const subregionSlug = slugify(subregion.name)
    const subregionHref = `${regionHref}/${subregionSlug}`
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

  const populationCount = region.subregions
    .reduce((count: number, subregion) => {
      return count + subregion.population.count
    }, 0)
    .toLocaleString()

  return (
    <article className="border">
      <GatsbyImage
        key={region.name}
        image={region.map.gatsbyImageData}
        alt={`Map highlighting the ${region.name} region.`}
        className="mb-4 w-full"
      />

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
