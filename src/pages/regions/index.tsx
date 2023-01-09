import { Card, ImageVariant } from '@components/card/Card'
import SmartLink from '@components/link/SmartLink'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import { FC } from 'react'
import { getOxfordCommaSeparator } from 'utils/strings'
import { Region } from '../../types/place.d'
import { getBackgroundColor } from '../../utils/site-theme'

type Props = {
  data: {
    regions: {
      nodes: Region[]
    }
  }
}

export function Head() {
  return <PageHeader title={'Regions'} />
}

const RegionsPage: FC<Props> = ({
  data: {
    regions: { nodes: regions },
  },
}) => {
  // creates subregion links for a given region
  const createSubregionLinks = (region: Region): JSX.Element[] => {
    return region.subregions.map((subregion, index, array) => {
      const seperator = getOxfordCommaSeparator(index, array)
      return (
        <span key={subregion.name}>
          {seperator}
          <SmartLink className="link" href={subregion.path}>
            {subregion.name}
          </SmartLink>
        </span>
      )
    })
  }

  const createRegionsCardBody = (region: Region): JSX.Element => {
    return (
      <>
        <p className="mb-3">
          <strong>Population:</strong>{' '}
          {region.population?.count?.toLocaleString() || 0}
        </p>
        <div className="mb-3 space-y-2 line-clamp-3">
          <MarkdownContent content={region.overview} />
        </div>
      </>
    )
  }

  return (
    <SimpleLayout>
      <header className="prose max-w-none text-center">
        <h1
          className="py-8"
          style={{
            backgroundColor: getBackgroundColor(),
          }}
        >
          Regions We Support
        </h1>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 lg:px-4 py-4 lg:py-8 max-w-7xl mx-auto">
        {regions.map((region) => (
          <Card
            key={region.name}
            dynamicCardImage={{
              image: region.map.image.gatsbyImageData,
              alt: region.map.alt,
            }}
            imageVariant={ImageVariant.circle}
            title={
              <SmartLink className="link text-3xl" href={region.path}>
                {region.name}
              </SmartLink>
            }
            additionalHeaderContent={
              <div style={{ minHeight: '48px' }}>
                {createSubregionLinks(region)}
              </div>
            }
            body={createRegionsCardBody(region)}
          />
        ))}
      </section>
    </SimpleLayout>
  )
}

export default RegionsPage

export const query = graphql`
  query RegionsPageQuery {
    regions: allDaRegion(sort: { fields: name }) {
      nodes {
        path
        name
        overview
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
          count
        }
        subregions {
          path
          name
          population {
            count
          }
        }
      }
    }
  }
`
