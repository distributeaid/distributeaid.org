import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import React, { FC, Suspense } from 'react'
import { Product } from '../types/product-types'

// These modules have dependencies to libraries which depend on browser features
// Use React Suspense to only load them when the page is rendered in the browser
const ValueByCategoryAndItemVis = React.lazy(
  () => import('@components/vis/value-by-category-and-item'),
)
const CountByCategoryAndItemVis = React.lazy(
  () => import('@components/vis/count-by-category-and-item'),
)
const LineItemTable = React.lazy(
  () => import('@components/vis/line-item-table'),
)
const ShipmentsOnGlobeVis = React.lazy(
  () => import('@components/vis/shipments-on-globe'),
)

type Shipment = {
  year: string
  number: string
  origin: string
  destination: string
}
type LineItem = {
  value: number
  count: number
  item: Product
  shipment: Shipment
}

type Node = {
  shipment: {
    year: string
    number: string
    origin: string
    destination: string
  }
  value: number
}

type Props = {
  data: {
    lineItems: {
      nodes: Node[]
    }
    categoryVisItems: {
      nodes: LineItem[]
    }
  }
}

export function Head() {
  return <PageHeader title={'Experimental Data Visualizations'} />
}

const RegionsPage: FC<Props> = ({ data: { lineItems, categoryVisItems } }) => {
  const isSSR = typeof window === 'undefined'
  if (isSSR) return null
  return (
    <Suspense fallback={<div />}>
      <SimpleLayout>
        <div className="grid grid-cols-3 gap-4">
          <section className="h-96 w-96">
            <ShipmentsOnGlobeVis categoryVisItems={categoryVisItems} />
          </section>
          <section className="h-96 w-96">
            <ValueByCategoryAndItemVis categoryVisItems={categoryVisItems} />
          </section>
          <section className="h-96 w-96">
            <CountByCategoryAndItemVis categoryVisItems={categoryVisItems} />
          </section>
          <section>
            <LineItemTable lineItems={lineItems} />
          </section>
        </div>
      </SimpleLayout>
    </Suspense>
  )
}

export default RegionsPage

export const pageQuery = graphql`
  query VisQuery {
    lineItems: allDaLineItem(
      sort: { fields: value, order: DESC }
      filter: { value: { gt: 10000 } }
    ) {
      nodes {
        shipment {
          origin
          destination
        }
        value
      }
    }
    categoryVisItems: allDaLineItem {
      nodes {
        value
        count
        shipment {
          origin
          destination
        }
        item {
          category
          item
          ageGender
          sizeStyle
        }
      }
    }
  }
`
