import ShipmentCategoryIcon from '@components/icons/ShipmentCategoryIcon'
import SimpleLayout from '@layouts/Simple'
import {
  AllContentfulDataImpactShipment,
  ContentfulDataGeoRegion,
} from '@types/gatsby-graphql-types.gen'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FunctionComponent } from 'react'

interface Props {
  data: {
    contentfulDataGeoRegion: ContentfulDataGeoRegion
    toRegions: AllContentfulDataImpactShipment
    fromRegions: AllContentfulDataImpactShipment
  }
}

const RegionPageTemplate: FunctionComponent<Props> = ({ data }) => {
  const pageContext = {
    pageTitle: 'TODO',
    siteTitle: 'TODO',
  }

  const region = data.contentfulDataGeoRegion
  const toShipments = data.toRegions.nodes
  const fromShipments = data.fromRegions.nodes
  const allShipmentsWithDuplicates = toShipments.concat(fromShipments)

  // remove duplicate shipments
  const allShipments = allShipmentsWithDuplicates.reduce(
    (accumulator: Array<any>, shipment: any) => {
      const hasShipment = accumulator.find((item) => {
        return item.contentful_id === shipment.contentful_id
      })
      if (!hasShipment) {
        accumulator.push(shipment)
      }
      return accumulator
    },
    [],
  )

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
      <h1 className="text-xl">All Shipments</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date Delivered</th>
            <th>Total Com. Value</th>
            <th>Total Weight (kg)</th>
            <th>Total Distance (km)</th>
            <th>Total CO2 (Tons)</th>
          </tr>
        </thead>
        {allShipments.map((shipment) => {
          return (
            <tr>
              <td>{shipment.name}</td>
              <td>
                <ShipmentCategoryIcon shipment={shipment} region={region} />
              </td>
              <td>{shipment.deliveredOn}</td>
              <td>{shipment.totalCommercialValue}</td>
              <td>{shipment.totalWeight}</td>
              <td>{shipment.totalDistance}</td>
              <td>{shipment.totalC02}</td>
            </tr>
          )
        })}
      </table>

      {/* page footer */}
      <footer>
        <p>Page Footer</p>
      </footer>
    </SimpleLayout>
  )
}

/*
Scenario Outline:
Given shipment to and from "<region>"
When we ask for the to shipments
Then the destination is among "<destinations>"

Examples:
| region | destinations |
| Greece | Lesvos,Chios,Greece |
| France | Calais,Dunkirk,France |
*/

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
    toRegions: allContentfulDataImpactShipment(
      filter: {
        toSubregions: {
          elemMatch: { region: { contentful_id: { eq: $regionContentfulId } } }
        }
      }
    ) {
      nodes {
        contentful_id
        deliveredOn
        name
        slug
        numPickups
        numDropoffs
        totalCommercialValue
        totalDistance
        totalWeight
        totalC02
        fromSubregions {
          contentful_id
          name
          slug
          region {
            name
            slug
            contentful_id
          }
        }
        toSubregions {
          contentful_id
          name
          slug
          region {
            name
            slug
            contentful_id
          }
        }
      }
    }
    fromRegions: allContentfulDataImpactShipment(
      filter: {
        fromSubregions: {
          elemMatch: { region: { contentful_id: { eq: $regionContentfulId } } }
        }
      }
    ) {
      nodes {
        contentful_id
        deliveredOn
        name
        slug
        numPickups
        numDropoffs
        totalCommercialValue
        totalDistance
        totalWeight
        totalC02
        fromSubregions {
          contentful_id
          name
          slug
          region {
            name
            slug
            contentful_id
          }
        }
        toSubregions {
          contentful_id
          name
          slug
          region {
            name
            slug
            contentful_id
          }
        }
      }
    }
  }
`
