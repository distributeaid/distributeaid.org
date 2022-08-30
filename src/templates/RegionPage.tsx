import { FC } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
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
  }
}

const RegionPage: FC<TemplateProps> = ({ pageContext: { region } }) => {
  return (
    <SimpleLayout pageTitle={`Region: ${region.name}`}>
      <div className="relative mb-4">
        <div className="absolute inset-0 z-10 flex justify-center">
          <div className="bg-navy-700 bg-opacity-75 px-6 flex flex-col justify-center">
            <h1 className="text-4xl text-white flex-none">{region.name}</h1>
          </div>
        </div>
        <div className="w-full">
          <GatsbyImage
            key={region.name}
            image={region.map.gatsbyImageData}
            alt={`Map highlighting the ${region.name} region.`}
            className="w-full h-32"
          />
        </div>
      </div>

      <ul>
        {region.subregions.map((subregion) => {
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

      <div className="flex lg:space-x-4 space-y-4 lg:space-y-0 flex-col lg:flex-row">
        <div className="p-4 bg-navy-100">
          <h2 className="text-center text-2xl text-navy-700">Overview</h2>
          <MarkdownContent content={region.overview} />
        </div>
        <div className="p-4 bg-navy-50">
          <h2 className="text-center text-2xl text-navy-700">
            Government Response
          </h2>
          <MarkdownContent content={region.governmentResponse} />
        </div>
      </div>
      <UpdateList list={region.newsUpdates} />
      <LinkList list={region.stayInformed} />
    </SimpleLayout>
  )
}

export default RegionPage
