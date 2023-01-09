import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'

import { Region } from '../../types/place.d'

import SmartLink from '@components/link/SmartLink'
import LinksList from '@components/list/LinksList'
import UpdatesList from '@components/list/UpdatesList'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from 'layouts/Simple'
import { getOxfordCommaSeparator } from 'utils/strings'
import { getBackgroundColor } from '../../utils/site-theme'

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
      <header
        style={{
          backgroundColor: getBackgroundColor(),
        }}
        className="prose max-w-none py-8 flex justify-center items-center gap-x-4"
      >
        <SmartLink href={region.path}>
          <div className="bg-white rounded-full p-2 drop-shadow-md hover:drop-shadow-lg">
            <GatsbyImage
              image={region.map.image.gatsbyImageData}
              alt={region.map.alt}
              className="w-36 h-36"
            />
          </div>
        </SmartLink>

        <div className="flex flex-col justify-center">
          <h1 className="mb-0">
            <SmartLink
              href={region.path}
              className="text-navy-700 no-underline"
            >
              {region.name}
            </SmartLink>
          </h1>
          <nav className="text-xl">
            {region.subregions.map((subregion, index, array) => {
              const seperator = getOxfordCommaSeparator(index, array)
              return (
                <span key={subregion.name}>
                  {seperator}
                  <SmartLink className="link" href={subregion.path}>
                    {subregion.name}
                  </SmartLink>
                </span>
              )
            })}
          </nav>
        </div>
      </header>

      {/*      <ul className="flex justify-evenly my-5 text-2xl">
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
*/}
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
      <UpdatesList list={region.newsUpdates} />
      <LinksList list={region.stayInformed} />
    </SimpleLayout>
  )
}

export default RegionPage

export const query = graphql`
  query ($id: String!) {
    region: daRegion(id: { eq: $id }) {
      id
      path

      name
      overview
      governmentResponse
      longText

      map {
        relativePath
        alt
        image {
          gatsbyImageData(
            width: 144
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

      subregions {
        path
        name
      }
    }
  }
`
