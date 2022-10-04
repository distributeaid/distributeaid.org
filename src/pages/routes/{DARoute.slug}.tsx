import { graphql } from 'gatsby'
import React from 'react'

export default function Routes(props: any) {
  console.log('props', props)
  return <div>Routes</div>
}

export const query = graphql`
  query ($id: String!) {
    route: daRoute(id: { eq: $id }) {
      id
      routeOrigin
      routeDestination
      introduction
      mapUrl
      aidRequestFormUrl
      images {
        deliverySection
        reservationSection
        groupsSection
        storageSection
        palletsSection
      }
      costs {
        currency
        standardPaletteCost
        overflowPricing
        halfPaletteCost
      }
      deadlines {
        submissionsDeadline
        confirmationDate
        stagingBegins
        stagingEnds
        shipmentDeparture
      }
      frontlineGroups {
        logo
        name
      }
    }
  }
`
