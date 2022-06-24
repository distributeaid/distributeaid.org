import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { graphql } from 'gatsby'

type Item = {
  category: string
  item: string
  ageGender: string
  sizeStyle: string
}

type LineItem = {
  value: number
  item: Item
}

type Props = {
  data: {
    lineItems: {
      nodes: { shipment: string; value: number }[]
    }
    categoryVisItems: {
      nodes: LineItem[]
    }
  }
}

function buildCategoryVisData(lineItems: LineItem[]) {
  // 1. setup the structure for category data
  const categories = lineItems.reduce((categories: any, node) => {
    categories[node.item.category] = {
      id: node.item.category,
      value: 0,
      children: {},
    }
    return categories
  }, {})

  // 2. setup the structure for item data
  const itemsByCategory = lineItems.reduce((categories: any, node) => {
    const category = categories[node.item.category]
    const items = category.children
    items[node.item.item] = {
      id: node.item.item,
      value: 0,
      children: {},
    }
    return categories
  }, categories)

  // 3. sum the values for each lineItem
  lineItems.forEach((lineItemData) => {
    const category = itemsByCategory[lineItemData.item.category]
    category.value += lineItemData.value

    const item = category.children[lineItemData.item.item]
    item.value += lineItemData.value
  })

  // 4. format children attributes (object => array)
  const lineItemVizdata = Object.values(itemsByCategory).map(
    (category: any) => {
      return {
        ...category,
        children: Object.values(category.children),
      }
    },
  )

  const nivoData = {
    id: 'nivo',
    color: 'hsl(350, 70%, 50%)',
    children: lineItemVizdata,
  }
  return nivoData
}

const RegionsPage: FC<Props> = ({ data: { lineItems, categoryVisItems } }) => {
  const nivoData = buildCategoryVisData(categoryVisItems.nodes)
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
