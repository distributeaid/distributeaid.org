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
  images: {
    deliverySection: string
    reservationSection: string
    groupsSection: string
    storageSection: string
    palletsSection: string
  }
  costs: {
    currency: string
    standardPaletteCost: number
    overflowPricing: number
    halfPaletteCost: number
  }
  deadlines: {
    submissionsDeadline: string
    confirmationDate: string
    stagingBegins: string
    stagingEnds: string
    shipmentDeparture: string
  }
  frontlineGroups: {
    logo: string
    name: string
  }[]
}
