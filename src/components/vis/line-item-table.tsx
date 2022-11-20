import { FC } from 'react'

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
