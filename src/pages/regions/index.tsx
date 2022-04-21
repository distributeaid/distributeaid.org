import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'

type Props = {
  data: {
    allMarkdownRemark: {
      nodes: [
        {
          frontmatter: {
            regionName: string
            subRegionName: string
            populationCount: number
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
    ({ frontmatter: { regionName, subRegionName, populationCount } }) => {
      console.log(regionName, subRegionName, populationCount)
      return (
        <li key={regionName + ' ' + subRegionName}>
          {regionName} - {subRegionName} - {populationCount}
        </li>
      )
    },
  )

  return (
    <SimpleLayout pageTitle="Regions">
      <ul>{regions}</ul>
    </SimpleLayout>
  )
}

export default RegionsPage

export const pageQuery = graphql`
  query RegionsPageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/content/pages/regions/**/*.md" } }
    ) {
      nodes {
        frontmatter {
          regionName
          subRegionName
          populationCount
        }
      }
    }
  }
`
