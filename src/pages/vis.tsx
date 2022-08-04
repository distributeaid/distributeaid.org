import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { graphql } from 'gatsby'

type Props = {
  data: {
    lineItems: {
      nodes: { shipment: string; value: number }[]
    }
  }
}

const RegionsPage: FC<Props> = ({ data: { lineItems } }) => {
  return (
    <SimpleLayout pageTitle="Regions">
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
        {lineItems.nodes.map((lineItem) => {
          return <div>{lineItem.value}</div>
        })}
      </section>
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
        shipment
        value
      }
    }
  }
`
