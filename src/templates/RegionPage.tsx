import { graphql } from 'gatsby'
import { FC } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import slugify from 'utils/slugify'

import { Region } from '@components/regions/RegionComponentTypes'

import SimpleLayout from 'layouts/Simple'
import MarkdownContent from '@components/markdown/MarkdownContent'
import LinkList from '@components/list/LinkList'
import UpdateList from '@components/list/UpdateList'
import SmartLink from '@components/link/SmartLink'

type TemplateProps = {
  data: {
    region: Region
  }
}

const RegionPage: FC<TemplateProps> = ({ data: { region } }) => {
  return (
    <SimpleLayout pageTitle={`Region: ${region.name}`}>
      <h1 className="text-2xl font-semibold text-gray-800">{region.name}</h1>

      <div className="w-64">
        <GatsbyImage
          key={region.name}
          image={region.map.gatsbyImageData}
          alt={`Map highlighting the ${region.name} region.`}
          className="mb-4 w-full"
        />
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
        name
      }
    }
  }
`
