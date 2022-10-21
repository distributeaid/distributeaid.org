import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'

import { Region } from '../../types/place-types'

import SmartLink from '@components/link/SmartLink'
import LinkList from '@components/list/LinkList'
import UpdateList from '@components/list/UpdateList'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from 'layouts/Simple'

type TemplateProps = {
  data: {
    region: Region
  }
}

export function Head({ data: { region } }: TemplateProps) {
  return <PageHeader title={`Region: ${region.name}`} />
}

const RegionPage: FC<TemplateProps> = ({ data: { region } }) => {
  return (
    <SimpleLayout>
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

      <ul className="flex  justify-evenly my-5 text-2xl">
        {region.subregions.map((subregion, i) => {
          return (
            <li key={i}>
              <SmartLink className="link" href={subregion.path}>
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

export const query = graphql`
  query ($id: String!) {
    region: daRegion(id: { eq: $id }) {
      id
      name
      map {
        gatsbyImageData
      }
      overview
      governmentResponse
      newsUpdates {
        title
        visibleCount
        updates {
          title
          content
          date
          pinned
        }
      }
      stayInformed {
        title
        links {
          label
          url
          description
        }
      }
      subregions {
        path
        name
      }
    }
  }
`
