import SmartLink from '@components/link/SmartLink'
import LinksList from '@components/list/LinksList'
import UpdatesList from '@components/list/UpdatesList'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { PageHeader } from '@components/PageHeader'
import { graphql } from 'gatsby'
import SimpleLayout from 'layouts/Simple'
import { FC } from 'react'
import { Subregion } from '../../../types/place.d'

type TemplateProps = {
  data: {
    subregion: Subregion
  }
}

export function Head({ data: { subregion } }: TemplateProps) {
  return (
    <PageHeader
      title={`Subregion: ${subregion.name} (${subregion.region.name})`}
    />
  )
}

const SubregionPage: FC<TemplateProps> = ({ data: { subregion } }) => {
  return (
    <SimpleLayout>
      <h1 className="text-2xl font-semibold text-gray-800">
        {subregion.name}
        <small>
          <SmartLink className="link" href={subregion.region.path}>
            {subregion.region.name}
          </SmartLink>
        </small>
      </h1>

      <div className="flex lg:space-x-4 space-y-4 lg:space-y-0 flex-col lg:flex-row">
        <div className="p-4 bg-navy-100">
          <h2 className="text-center text-2xl text-navy-700">Overview</h2>
          <MarkdownContent content={subregion.overview} />
        </div>
        <div className="p-4 bg-navy-50">
          <h2 className="text-center text-2xl text-navy-700">
            Government Response
          </h2>
          <MarkdownContent content={subregion.governmentResponse} />
        </div>
      </div>

      <UpdatesList list={subregion.newsUpdates} />
      <LinksList list={subregion.stayInformed} />
    </SimpleLayout>
  )
}

export default SubregionPage

export const query = graphql`
  query ($id: String!) {
    subregion: daSubregion(id: { eq: $id }) {
      name
      overview
      governmentResponse
      longText

      map {
        relativePath
        alt
        image {
          gatsbyImageData(
            width: 640
            aspectRatio: 1.2
            transformOptions: { fit: COVER }
          )
        }
      }
      population {
        needsTotal
        totalItemsRequested
        ngoBeneficiaries
        ngoPopulation
        ngoRespondents
        count
        trend
        description
      }
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

      region {
        path
        name
      }
    }
  }
`
