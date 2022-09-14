import { graphql } from 'gatsby'
import { FC } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import slugify from 'utils/slugify'

import { Region, Subregion } from '@components/regions/RegionComponentTypes'

import SimpleLayout from 'layouts/Simple'
import UpdateList from '@components/list/UpdateList'
import MarkdownContent from '@components/markdown/MarkdownContent'
import SmartLink from '@components/link/SmartLink'

type TemplateProps = {
  data: {
    subregion: Subregion
  }
}

const SubregionPage: FC<TemplateProps> = ({ data: { subregion } }) => {
  return (
    <SimpleLayout
      pageTitle={`Subregion: ${subregion.name} (${subregion.region.name})`}
    >
      <h1 className="text-2xl font-semibold text-gray-800">
        {subregion.name}
        <small>
          <SmartLink
            className="link"
            href={`/regions/${slugify(subregion.region.name)}`}
          >
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
        name
      }
    }
  }
`
