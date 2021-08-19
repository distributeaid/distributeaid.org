import { FunctionComponent } from 'react'
import { ContentfulDataGeoRegion } from '../../types/gatsby-graphql-types.gen'

const ShipmentCategoryIcon: FunctionComponent<any> = (props) => {
  const shipment: any = props.shipment
  const region: ContentfulDataGeoRegion = props.region
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
      </div>
    )
  } else if (isIncoming) {
    return (
      <div aria-label="Incoming" className="pl-6">
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

export default ShipmentCategoryIcon
