import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FunctionComponent } from 'react'
import SimpleLayout from '../layouts/Simple'
import {
  AllContentfulDataImpactShipment,
  ContentfulDataGeoRegion,
} from '../types/gatsby-graphql-types.gen'

interface Props {
  data: {
    contentfulDataGeoRegion: ContentfulDataGeoRegion
    toRegions: AllContentfulDataImpactShipment
    fromRegions: AllContentfulDataImpactShipment
  }
}

const categorizeShipment = function (
  shipment: any,
  region: ContentfulDataGeoRegion,
) {
  const { fromSubregions, toSubregions } = shipment

  // fromSubregions might be null, guard against that
  const isOutgoing: Boolean = (fromSubregions || []).find((subregion: any) => {
    return subregion.region.contentful_id === region.contentful_id
  })

  // toSubregions might be null, guard against that
  const isIncoming: Boolean = (toSubregions || []).find((subregion: any) => {
    return subregion.region.contentful_id === region.contentful_id
  })

  if (isOutgoing && isIncoming) {
    return (
      <div aria-label="Internal Transfer">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
      </div>
    )
  } else if (isOutgoing) {
    return (
      <div aria-label="Outgoing">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    )
  } else if (isIncoming) {
    return (
      <div aria-label="Incoming">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
      </div>
    )
  } else {
    console.log('Invalid GraphQL Data')
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
        // Goal: categorize each shipment
        //   - incoming
        //   - outgoing
        //   - local-transfers
        shipment.category = categorizeShipment(shipment, region)

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
              <td>{shipment.category}</td>
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
