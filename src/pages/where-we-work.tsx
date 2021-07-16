import { graphql, Link } from 'gatsby'
import React, { FunctionComponent } from 'react'
import SimpleLayout from '../layouts/Simple'

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

      <ul className="list-disc list-inside">
        {data.allContentfulDataGeoRegion.nodes.map((node) => {
          return (
            <li key={node.contentful_id}>
              <Link to={`./${node.slug}`}>{node.name}</Link>
            </li>
          )
        })}
      </ul>
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
      }
    }
  }
`
