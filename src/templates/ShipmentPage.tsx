import { graphql } from 'gatsby'
import { FunctionComponent } from 'react'
import SimpleLayout from '../layouts/Simple'
import { ContentfulDataImpactShipment } from '../types/gatsby-graphql-types.gen'

interface Props {
  data: {
    contentfulDataImpactShipment: ContentfulDataImpactShipment
  }
}

const ShipmentPageTemplate: FunctionComponent<Props> = ({ data }) => {
  const pageContext = {
    pageTitle: 'TODO',
    siteTitle: 'TODO',
  }

  const shipment = data.contentfulDataImpactShipment

  return (
    <SimpleLayout pageContext={pageContext}>
      {/* page header */}
      <header>
        <h1>{'shipment.name'} Page!</h1>
      </header>

      {/* page body */}
      <p>Hello World</p>

      {/* page footer */}
      <footer>
        <p>Page Footer</p>
      </footer>
    </SimpleLayout>
  )
}

export default ShipmentPageTemplate

export const shipmentQuery = graphql`
  query ShipmentPageDetails($shipmentContentfulId: String!) {
    contentfulDataImpactShipment(contentful_id: { eq: $shipmentContentfulId }) {
      contentful_id
      name
    }
  }
`
