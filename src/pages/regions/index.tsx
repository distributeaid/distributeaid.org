import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import RegionCard from '@components/regions/RegionCard'
import {
  Region,
  Subregion,
  Subregions,
} from '@components/regions/RegionComponentTypes'

type Props = {
  data: {
    regions: {
      nodes: [
        {
          fileAbsolutePath: string
          frontmatter: Region
        },
      ]
    }
    subregions: {
      nodes: [
        {
          fileAbsolutePath: string
          frontmatter: Subregion
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
    (lookup: Subregions, { fileAbsolutePath, frontmatter: subregion }) => {
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
        (collector: Subregions, relativeFilePath) => {
          collector[relativeFilePath] = subregionLookup[relativeFilePath]
          return collector
        },
        {},
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
