export interface Totals {
  shipmentsCount: number
  C02: number
  commercialValue: number
  weight: number
  distance: number
}

export function calculateTotalsShipments(shipments: Array<any>): Totals {
  return shipments.reduce(
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
}
