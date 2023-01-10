import SmartLink from '@components/link/SmartLink'
import LinksList from '@components/list/LinksList'
import UpdatesList from '@components/list/UpdatesList'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { PageHeader } from '@components/PageHeader'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import SimpleLayout from 'layouts/Simple'
import { FC } from 'react'
import { Subregion } from '../../../types/place.d'
import { getBackgroundColor } from '../../../utils/site-theme'

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
      <header
        style={{
          backgroundColor: getBackgroundColor(),
        }}
        className="prose max-w-none py-8 flex justify-center items-center gap-x-4"
      >
        <div className="bg-white rounded-full drop-shadow-md">
          <GatsbyImage
            image={subregion.map.image.gatsbyImageData}
            alt={subregion.map.alt}
            className="w-36 h-36 rounded-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="mb-0">{subregion.name}</h1>
          <nav className="text-xl">
            <SmartLink className="link" href="/regions/">
              All Regions
            </SmartLink>
            &nbsp;&gt;&nbsp;
            <SmartLink className="link" href={subregion.region.path}>
              {subregion.region.name}
            </SmartLink>
          </nav>
        </div>
      </header>

      <ul className="flex justify-evenly my-5 text-2xl">
        <li>
          <SmartLink className="link" href={subregion.path}>
            Overview
          </SmartLink>
        </li>
        <li>
          <SmartLink
            className="link"
            href={`/needs-assessments/explorer/?InteractiveNeedsBarChartOptions=%7B%22filters%22%3A%7B%22search%22%3A%22%22%2C%22subregion%22%3A%22${subregion.name.replace(
              ' ',
              '+',
            )}%22%7D%2C%22axis%22%3A%7B%22indexBy%22%3A%22Item%22%2C%22groupBy%22%3A%22Category%22%7D%2C%22sort%22%3A%7B%22by%22%3A%22Label%22%2C%22order%22%3A%22Ascending%22%7D%7D&InteractiveNeedsBarChartTitle=Annual+Need+in+the+${subregion.name.replace(
              ' ',
              '+',
            )}+%28${subregion.name.replace(' ', '+')}%29`}
          >
            Needs
          </SmartLink>
        </li>
      </ul>

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
            width: 256
            aspectRatio: 1
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
