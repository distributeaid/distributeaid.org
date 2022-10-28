import { graphql } from 'gatsby'
import { FC } from 'react'

import { Route } from '@components/routes/RouteComponentTypes'

import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '../../layouts/Simple'

import Costs from '@components/routes/Costs'
import Delivery from '@components/routes/Delivery'
import Frontline from '@components/routes/Frontline'
import Pallets from '@components/routes/Pallets'
import Reservations from '@components/routes/Reservations'
import StagingHubs from '@components/routes/StagingHubs'

type TemplateProps = {
  data: {
    route: Route
  }
}

export function Head({ data: { route } }: TemplateProps) {
  return (
    <PageHeader
      title={`Route: ${route.routeOrigin} to ${route.routeDestination}`}
    />
  )
}

const Routes: FC<TemplateProps> = ({ data: { route } }) => (
  <SimpleLayout>
    <Delivery
      images={route.images}
      introduction={route.introduction}
      routeDestination={route.routeDestination}
      routeOrigin={route.routeOrigin}
      frontlineGroups={route.frontlineGroups}
    />
    <Reservations
      deadlines={route.deadlines}
      images={route.images}
      aidRequestFormUrl={route.aidRequestFormUrl}
    />
    <Frontline images={route.images} frontlineGroups={route.frontlineGroups} />
    <StagingHubs mapUrl={route.mapUrl} />
    <Costs images={route.images} costs={route.costs} />
    <Pallets images={route.images} />
  </SimpleLayout>
)

export default Routes

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
