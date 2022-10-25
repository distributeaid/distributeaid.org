/*
Route
================================================================================
*/

export type Route = {
  routeOrigin: string
  routeDestination: string
  introduction: string
  mapUrl: string
  aidRequestFormUrl: string
  population: number
  images: RouteImages
  costs: {
    currency: string
    standardPaletteCost: number
    overflowPricing: number
    halfPaletteCost: number
  }
  deadlines: RouteDeadlines
  frontlineGroups: RouteFrontlineGroup[]
}

export type RouteImages = {
  deliverySection: string
  reservationSection: string
  groupsSection: string
  storageSection: string
  palletsSection: string
}

export type RouteFrontlineGroup = {
  logo: string
  name: string
}

export type RouteDeadlines = {
  submissionsDeadline: string
  confirmationDate: string
  stagingBegins: string
  stagingEnds: string
  shipmentDeparture: string
}
