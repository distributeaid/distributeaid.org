import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import RegionCard from '@components/regions/RegionCard'
import {
  RegionSummary,
  SubregionSummary,
} from '@components/regions/RegionComponentTypes'

type Props = {
  data: {
    regions: {
      nodes: [
        {
          fileAbsolutePath: string
          frontmatter: RegionSummary
        },
      ]
    }
    subregions: {
      nodes: [
        {
          fileAbsolutePath: string
          frontmatter: SubregionSummary
        },
      ]
    }
  }
}

const RegionsPage: FC<Props> = ({
  data: {
    regions: { nodes: regions },
    subregions: { nodes: subregions },
  },
}) => {
  const subregionLookup = subregions.reduce(
    (
      lookup: Record<string, SubregionSummary>,
      { fileAbsolutePath, frontmatter: subregion },
    ) => {
      const fileRelativePath =
        'content/pages/regions/' +
        fileAbsolutePath.split('content/pages/regions/')[1]
      lookup[fileRelativePath] = subregion
      return lookup
    },
    {},
  )

  const regionCards = regions.map(
    ({ fileAbsolutePath, frontmatter: region }) => {
      const subregions = region.subregions.reduce(
        (collector: SubregionSummary[], fileRelativePath) => {
          collector.push(subregionLookup[fileRelativePath])
          return collector
        },
        [],
      )

      return <RegionCard region={region} subregions={subregions} />
    },
  )

  return (
    <SimpleLayout pageTitle="Regions">
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
        {regionCards}
      </section>
    </SimpleLayout>
  )
}

export default RegionsPage

export const pageQuery = graphql`
  query RegionsPageQuery {
    regions: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/content/pages/regions/*/index.md" }
      }
    ) {
      nodes {
        fileAbsolutePath
        frontmatter {
          name
          map
          overview
          subregions
        }
      }
    }
    subregions: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/content/pages/regions/*/!(index).md" }
      }
    ) {
      nodes {
        fileAbsolutePath
        frontmatter {
          name
          population {
            count
          }
        }
      }
    }
  }
`
