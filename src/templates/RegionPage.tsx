import { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import slugify from 'utils/slugify'

import { Region, Subregion } from '@components/regions/RegionComponentTypes'

import SimpleLayout from 'layouts/Simple'
import MarkdownContent from '@components/markdown/MarkdownContent'
import LinkList from '@components/list/LinkList'
import UpdateList from '@components/list/UpdateList'
import SmartLink from '@components/link/SmartLink'

type TemplateProps = {
  pageContext: {
    region: Region
    subregions: Subregion[]
  }
}

const RegionPage: FC<TemplateProps> = ({
  pageContext: { region, subregions },
}) => {
  return (
    <SimpleLayout pageTitle={`Region: ${region.name}`}>
      <h1 className="text-2xl font-semibold text-gray-800">{region.name}</h1>

      <ul>
        {subregions.map((subregion) => {
          const href = `/regions/${slugify(region.name)}/${slugify(
            subregion.name,
          )}`
          return (
            <li>
              <SmartLink className="link" href={href}>
                {subregion.name}
              </SmartLink>
            </li>
          )
        })}
      </ul>

      <h2>Overview</h2>
      <MarkdownContent content={region.overview} />

      <h2>Government Response</h2>
      <MarkdownContent content={region.governmentResponse} />

      <UpdateList list={region.newsUpdates} />
      <LinkList list={region.stayInformed} />
    </SimpleLayout>
  )
}

export default RegionPage
