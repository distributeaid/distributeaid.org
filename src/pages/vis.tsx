import { FC, Suspense } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'
import ShipmentsOnGlobeVis from '@components/vis/shipments-on-globe'
import ValueByCategoryAndItemVis from '@components/vis/value-by-category-and-item'
import CountByCategoryAndItemVis from '@components/vis/count-by-category-and-item'
import LineItemTable from '@components/vis/line-item-table'
import SmartLink from '@components/link/SmartLink'

type Item = {
  category: string
  item: string
  ageGender: string
  sizeStyle: string
}

type Shipment = {
  year: string
  number: string
  origin: string
  destination: string
}
type LineItem = {
  value: number
  count: number
  item: Item
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

const RegionsPage: FC<Props> = ({ data: { lineItems, categoryVisItems } }) => {
  const isSSR = typeof window === 'undefined'
  return (
    <SimpleLayout pageTitle="Experimental Data Visualizations">
      <div className="grid grid-cols-3 gap-4">
        <section className="h-96 w-96">
          {!isSSR && (
            <Suspense fallback={<div />}>
              <ShipmentsOnGlobeVis categoryVisItems={categoryVisItems} />
            </Suspense>
          )}
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
