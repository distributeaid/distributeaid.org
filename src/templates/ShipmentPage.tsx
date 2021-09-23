import { graphql } from 'gatsby'
import { FunctionComponent } from 'react'
import ImageCarousel from '../components/carousel/ImageCarousel'
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
  const formattedCommercialValue = shipment.totalCommercialValue + ' €'
  const formattedWeight = shipment.totalWeight + ' kg'
  const formattedDistance = shipment.totalDistance + ' km'
  const formattedCO2 = shipment.totalC02 + ' tons'

  return (
    <SimpleLayout pageContext={pageContext}>
      {/* page header */}
      <header>
        <h1>{shipment.name} Page!</h1>
      </header>

      {/* page body */}
      <p>Hello World</p>

      {/* page footer */}
      <footer>
        <p>Page Footer</p>
      </footer>

      <ImageCarousel />
    </SimpleLayout>
  )
}

export default ShipmentPageTemplate

// sendingHubs {
//   hub
// }
// receivingHubs {
//   hub
// }
// collectionGroups {
//   org
// }
// frontlineGroups {
//   org
// }

export const shipmentQuery = graphql`
  query ShipmentPageDetails($shipmentContentfulId: String!) {
    contentfulDataImpactShipment(contentful_id: { eq: $shipmentContentfulId }) {
      contentful_id
      name
      deliveredOn
      totalC02
      totalCommercialValue
      totalDistance
      totalWeight
      numDropoffs
      numPickups
      slug

      fromSubregions {
        region {
          mapPhoto {
            file {
              url
            }
          }
          overview {
            overview
          }
        }
        overview {
          overview
        }
        slug
      }
      toSubregions {
        region {
          mapPhoto {
            file {
              url
            }
          }
          slug
          overview {
            overview
          }
        }
        overview {
          overview
        }
      }
    }
  }
`
