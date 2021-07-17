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

const RegionPageTemplate: FunctionComponent<Props> = ({ data }) => {
  const pageContext = {
    pageTitle: 'TODO',
    siteTitle: 'TODO',
  }

  const region = data.contentfulDataGeoRegion
  const toShipments = data.toRegions
  const fromShipments = data.fromRegions

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
      <h1 className="text-xl">To Shipments</h1>
      <table>
        <tr>{JSON.stringify(toShipments)}</tr>
      </table>
      <h1 className="text-xl">From Shipments</h1>
      <table>
        <tr>{JSON.stringify(fromShipments)}</tr>
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
