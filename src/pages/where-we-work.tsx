import SimpleLayout from '@layouts/Simple'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { FunctionComponent } from 'react'

interface Props {
  data: {
    allContentfulDataGeoRegion
    allContentfulDataGeoRegionSubRegion
  }
}

const WhereWeWorkPage: FunctionComponent<Props> = ({ data }) => {
  const pageContext = {
    pageTitle: 'TODO',
    siteTitle: 'TODO',
  }

  return (
    <SimpleLayout pageContext={pageContext}>
      {/* page header */}
      <header>
        <h1>Where We Work</h1>
      </header>

      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.allContentfulDataGeoRegion.nodes.map((node) => (
            <tr key={node.contentful_id}>
              <td>
                <GatsbyImage
                  image={node.mapPhoto.gatsbyImageData}
                  alt={`Photo of ${node.name}`}
                />
              </td>
              <td>
                <Link to={`./${node.slug}`}>{node.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* page footer */}
      <footer>
        <p>Page Footer</p>
      </footer>
    </SimpleLayout>
  )
}

export default WhereWeWorkPage

export const pageQuery = graphql`
  query RegionsWithSubRegions {
    allContentfulDataGeoRegionSubRegion {
      nodes {
        contentful_id
        name
        slug
        region {
          contentful_id
        }
      }
    }
    allContentfulDataGeoRegion {
      nodes {
        contentful_id
        name
        slug
        mapPhoto {
          gatsbyImageData(layout: FULL_WIDTH, width: 200)
        }
      }
    }
  }
`
