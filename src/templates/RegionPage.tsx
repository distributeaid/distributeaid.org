import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FunctionComponent } from 'react'
import SimpleLayout from '../layouts/Simple'
import { ContentfulDataGeoRegion } from '../types/gatsby-graphql-types.gen'

interface Props {
  data: {
    contentfulDataGeoRegion: ContentfulDataGeoRegion
  }
}

const RegionPageTemplate: FunctionComponent<Props> = ({ data }) => {
  const pageContext = {
    pageTitle: 'TODO',
    siteTitle: 'TODO',
  }

  const region = data.contentfulDataGeoRegion

  return (
    <SimpleLayout pageContext={pageContext}>
      {/* page header */}
      <header>
        <h1>{region.name} Page!</h1>
      </header>

      {/* page body */}
      <p>Hello World</p>

      <GatsbyImage
        image={region.mapPhoto?.gatsbyImageData}
        alt="Map of {region.name}"
      />
      {/* page footer */}
      <footer>
        <p>Page Footer</p>
      </footer>
    </SimpleLayout>
  )
}

export default RegionPageTemplate

export const regionQuery = graphql`
  query RegionPageDetails($regionContentfulId: String!) {
    contentfulDataGeoRegion(contentful_id: { eq: $regionContentfulId }) {
      contentful_id
      name
      mapPhoto {
        gatsbyImageData
      }
    }
  }
`
