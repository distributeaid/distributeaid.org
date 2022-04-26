import { ReactNode } from '@reach/router/node_modules/@types/react'
import React, { FC } from 'react'
import SmartLink from '@components/link/SmartLink'
import MarkdownContent from '@components/markdown/MarkdownContent'

type Props = {
  name: ReactNode
  subregions: [ReactNode]
  overview: string
  map: ReactNode
}

const RegionCard: FC<Props> = ({ name, subregions, overview, map }) => (
  <article className="border">
    {map}
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-1">{name}</h2>
      <p className="text-gray-600 mb-6">{subregions}</p>
      {/*      <SmartLink
        className="inline-block bg-navy-700 hover:bg-navy-800 rounded text-white px-6 py-3 font-medium tracking-wide"
        href={ctaUrl}
      >
        {ctaLabel}
      </SmartLink>
*/}
    </div>
    <div className="m-4 mt-6 space-y-2 line-clamp-3">
      <MarkdownContent content={overview} />
    </div>
  </article>
)

export default RegionCard
