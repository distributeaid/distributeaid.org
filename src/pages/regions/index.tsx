import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import RegionCard from '@components/regions/RegionCard'

type Props = {
  data: {
    allMarkdownRemark: {
      nodes: [
        {
          fileAbsolutePath: string
          frontmatter: {
            name: string
            map: string
            overview: string
          }
        },
      ]
    }
  }
}

const RegionsPage: FC<Props> = ({
  data: {
    allMarkdownRemark: { nodes },
  },
}) => {
  const regions = nodes.map(
    ({ fileAbsolutePath, frontmatter: { name, map, overview } }) => {
      return (
        <RegionCard
          name={name}
          subregions={['']}
          overview={overview}
          map={map}
        />
      )
    },
  )

  return (
    <SimpleLayout pageTitle="Regions">
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
        {regions}
      </section>
    </SimpleLayout>
  )
}

export default RegionsPage

export const pageQuery = graphql`
  query RegionsPageQuery {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { glob: "**/content/pages/regions/**/index.md" }
      }
    ) {
      nodes {
        frontmatter {
          name
          map
          overview
          governmentResponse
          newsUpdates {
            title
            visibleCount
            updates {
              content
              date
              pinned
              title
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
        }
        fileAbsolutePath
      }
    }
  }
`
