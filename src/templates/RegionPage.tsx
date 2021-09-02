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

interface Totals {
  shipmentsCount: number
  C02: number
  commercialValue: number
  weight: number
  distance: number
}

function formatNumber(number: number) {
  return new Intl.NumberFormat('en-US').format(number)
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

  const totals: Totals = allShipments.reduce(
    (accumulator: Totals, shipment: any) => {
      accumulator.C02 += shipment.totalC02
      accumulator.commercialValue += shipment.totalCommercialValue
      accumulator.weight += shipment.totalWeight
      accumulator.distance += shipment.totalDistance
      accumulator.shipmentsCount += 1

      return accumulator
    },
    {
      C02: 0,
      commercialValue: 0,
      weight: 0,
      distance: 0,
      shipmentsCount: 0,
    },
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
      <h1 className="text-xl">{totals.shipmentsCount} Shipments</h1>
      <table className="table-auto">
        <thead>
          <tr className="border-b-2 border-navy-900 bg-navy-800 text-white">
            <th className="px-8 py-2">Title</th>
            <th className="px-8 py-2">Category</th>
            <th className="px-8 py-2">Date Delivered</th>
            <th className="px-8 py-2">Total Com. Value</th>
            <th className="px-8 py-2">Total Weight (kg)</th>
            <th className="px-8 py-2">Total Distance (km)</th>
            <th className="px-8 py-2">Total CO2 (Tons)</th>
          </tr>
          <tr className="text-left bg-navy-800 text-white border-b-2 border-navy-900">
            <th className="px-8 py-2">Totals:</th>
            <th className="px-8 py-2">---</th>
            <th className="px-8 py-2">---</th>
            <th className="px-8 py-2">
              {formatNumber(totals.commercialValue)}
            </th>
            <th className="px-8 py-2">{formatNumber(totals.weight)}</th>
            <th className="px-8 py-2">{formatNumber(totals.distance)}</th>
            <th className="px-8 py-2">{formatNumber(totals.C02)}</th>
          </tr>
        </thead>
        <tbody>
          {allShipments.map((shipment) => {
            return (
              <tr className="even:bg-navy-200 ">
                <td className="px-8 py-2">{shipment.name}</td>
                <td className="px-8 py-2">
                  <ShipmentCategoryIcon shipment={shipment} region={region} />
                </td>
                <td className="px-8 py-2">{shipment.deliveredOn}</td>
                <td className="px-8 py-2">
                  {formatNumber(shipment.totalCommercialValue)}
                </td>
                <td className="px-8 py-2">
                  {formatNumber(shipment.totalWeight)}
                </td>
                <td className="px-8 py-2">
                  {formatNumber(shipment.totalDistance)}
                </td>
                <td className="px-8 py-2">{formatNumber(shipment.totalC02)}</td>
              </tr>
            )
          })}
        </tbody>
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
