import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import RegionCard from '@components/regions/RegionCard'
import { Region } from '@components/regions/RegionComponentTypes'

type Props = {
  data: {
    regions: {
      nodes: Region[]
    }
  }
}

const RegionsPage: FC<Props> = ({
  data: {
    regions: { nodes: regions },
  },
}) => {
  return (
    <SimpleLayout pageTitle="Regions">
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
        {regions.map((region) => (
          <RegionCard region={region} />
        ))}
      </section>
    </SimpleLayout>
  )
}

export default RegionsPage

export const pageQuery = graphql`
  query RegionsQuery {
    regions: allDaRegion {
      nodes {
        name
        map {
          gatsbyImageData
        }
        overview
        subregions {
          name
          population {
            count
          }
        }
      }
    }
  }
`
