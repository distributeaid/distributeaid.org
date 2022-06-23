import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { graphql } from 'gatsby'

type Props = {
  data: {
    lineItems: {
      nodes: { shipment: string; value: number }[]
    }
    categoryVisItems: {
      nodes: {
        value: number
        item: {
          category: string
          item: string
          ageGender: string
          sizeStyle: string
        }
      }[]
    }
  }
}

const RegionsPage: FC<Props> = ({ data: { lineItems, categoryVisItems } }) => {
  const categories = categoryVisItems.nodes.reduce(
    (currentObj: any, node: any) => {
      currentObj[node.item.category] = {
        id: node.item.category,
        value: 0,
        children: [],
      }
      return currentObj
    },
    {},
  )
  categoryVisItems.nodes.forEach((lineItemData) => {
    const category = categories[lineItemData.item.category]
    category.value += lineItemData.value
    // category.children.push({
    //   id: lineItemData.item,
    //   value: lineItemData.value,
    //   children: []
    // })
  })
  const nivoData = {
    id: 'nivo',
    color: 'hsl(350, 70%, 50%)',
    children: Object.values(categories),
  }
  return (
    <SimpleLayout pageTitle="Regions">
      <section className="h-screen w-full">
        <ResponsiveSunburst
          data={nivoData}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          id="id"
          value="value"
          cornerRadius={2}
          borderColor={{ theme: 'background' }}
          colors={{ scheme: 'nivo' }}
          childColor={{
            from: 'color',
            modifiers: [['brighter', 0.1]],
          }}
          enableArcLabels={true}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 1.4]],
          }}
        />
      </section>
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
    categoryVisItems: allDaLineItem {
      nodes {
        value
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
