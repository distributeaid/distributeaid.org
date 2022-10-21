import SmartLink from '@components/link/SmartLink'
import UpdateList from '@components/list/UpdateList'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { PageHeader } from '@components/PageHeader'
import { graphql } from 'gatsby'
import SimpleLayout from 'layouts/Simple'
import { FC } from 'react'
import { Subregion } from '../../../types/place-types'

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

      <section className="text-center p-4 bg-navy-100 m-auto">
        <h2 className="text-center text-2xl text-navy-700">Overview</h2>
        <div className="text-center m-auto">
          <MarkdownContent content={subregion.overview} />
        </div>
      </section>

      <UpdateList list={subregion.newsUpdates} />
    </SimpleLayout>
  )
}

export default SubregionPage

export const query = graphql`
  query ($id: String!) {
    subregion: daSubregion(id: { eq: $id }) {
      name
      map {
        gatsbyImageData
      }
      overview
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
      region {
        path
        name
      }
    }
  }
`
