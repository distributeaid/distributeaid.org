import { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import slugify from 'utils/slugify'

import { Region, Subregion } from '@components/regions/RegionComponentTypes'

import SimpleLayout from 'layouts/Simple'
import LinkList from '@components/list/LinkList'
import MarkdownContent from '@components/markdown/MarkdownContent'
import SmartLink from '@components/link/SmartLink'

type TemplateProps = {
  pageContext: {
    region: Region
    subregions: Subregion[]
    subregion: Subregion
  }
}

const RegionPage: FC<TemplateProps> = ({
  pageContext: { region, subregions, subregion },
}) => {
  return (
    <SimpleLayout pageTitle={`Subregion: ${subregion.name} (${region.name})`}>
      <h1 className="text-2xl font-semibold text-gray-800">
        {subregion.name}
        <small>
          <SmartLink className="link" href={`/regions/${slugify(region.name)}`}>
            {region.name}
          </SmartLink>
        </small>
      </h1>

      <h2>Overview</h2>
      <MarkdownContent content={region.overview} />

      <LinkList list={region.stayInformed} />
    </SimpleLayout>
  )
}

export default RegionPage
