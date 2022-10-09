import { ReactNode } from '@reach/router/node_modules/@types/react'
import React, { FC } from 'react'
import { ResponsiveSunburst } from '@nivo/sunburst'

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
  lineItems: {
    nodes: Node[]
  }
}

type LineItemKey = keyof LineItem

const LineItemTable: FC<Props> = ({ lineItems }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
      {lineItems.nodes.map((lineItem, i) => {
        return <div key={i}>{lineItem.value}</div>
      })}
    </div>
  )
}

export default LineItemTable
