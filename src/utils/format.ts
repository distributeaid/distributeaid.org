import { BadgeColor } from '../components/Badge'
import { COUNTRY_CODES_TO_NAME, MONTHS } from '../data/constants'
import {
  GroupType,
  Maybe,
  Shipment,
  ShipmentQuery,
  ShipmentStatus,
} from '../types/api-types'

export function formatGroupType(type: GroupType) {
  switch (type) {
    case GroupType.DaHub:
      return 'DA hub'
    case GroupType.ReceivingGroup:
      return 'Receiving group'
    case GroupType.SendingGroup:
      return 'Sending group'
    default:
      throw new Error(`Unknown GroupType: ${type}`)
  }
}

/**
 * Format a month's 1-based number into a string.
 * @param labelMonth a Shipment.labelMonth
 * @example formatLabelMonth(1) // January
 */
export function formatLabelMonth(labelMonth: number) {
  return MONTHS[labelMonth - 1]
}

export function formatCountryCodeToName(countryCode?: Maybe<string>) {
  if (countryCode && COUNTRY_CODES_TO_NAME.hasOwnProperty(countryCode)) {
    return COUNTRY_CODES_TO_NAME[
      countryCode as keyof typeof COUNTRY_CODES_TO_NAME
    ]
  }

  return 'Unknown Country'
}

/**
 * Returns a BadgeColor based mapped to a ShipmentStatus
 * @param status a ShipmentStatus
 */
export function getShipmentStatusBadgeColor(
  status: ShipmentStatus,
): BadgeColor {
  switch (status) {
    case ShipmentStatus.Abandoned:
      return 'red'
    case ShipmentStatus.Announced:
      return 'blue'
    case ShipmentStatus.Complete:
      return 'green'
    case ShipmentStatus.InProgress:
      return 'blue'
    case ShipmentStatus.Open:
      return 'yellow'
    case ShipmentStatus.Staging:
    default:
      return 'gray'
  }
}

/**
 * Formats a shipment name for quick identification. Note that this is NOT a
 * unique identifier!
 * @param shipment
 * @returns A non-unique identifier for the shipment
 * @example "UK-2021-03"
 */
export function formatShipmentName(
  shipment:
    | Shipment
    | Pick<
        ShipmentQuery['shipment'],
        'labelMonth' | 'labelYear' | 'shippingRoute'
      >,
) {
  const month = shipment.labelMonth.toString().padStart(2, '0')
  return `${shipment.shippingRoute}-${shipment.labelYear}-${month}`
}
