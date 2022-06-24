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
      name: node.item.category,
      // NOTE: no value, Nivo will automatically sum up the children's value.
      children: {},
    }
    return categories
  }, {})

  // 2. setup the structure for item data
  const itemsByCategory = lineItems.reduce((categories: any, node) => {
    const category = categories[node.item.category]
    const items = category.children
    items[node.item.item] = {
      name: node.item.item,
      value: 0,
      children: {},
    }
    return categories
  }, categories)

  // 3. sum the values for each lineItem
  lineItems.forEach((lineItemData) => {
    const category = itemsByCategory[lineItemData.item.category]
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
    id: 'daLineItemValueViz',
    children: lineItemVizdata,
  }
  return nivoData
}

const RegionsPage: FC<Props> = ({ data: { lineItems, categoryVisItems } }) => {
  const nivoData = buildCategoryVisData(categoryVisItems.nodes)
  const totalValue = categoryVisItems.nodes.reduce((total, lineItem) => {
    return total + lineItem.value
  }, 0)

  return (
    <SimpleLayout pageTitle="Regions">
      <section className="h-screen w-full">
        <ResponsiveSunburst
          // docs: https://nivo.rocks/sunburst/

          // base
          data={nivoData}
          id="name"
          value="value"
          valueFormat=" >-$,.2f"
          // style
          childColor={{
            from: 'color',
            modifiers: [['brighter', 0.25]],
          }}
          borderWidth={2}
          // arc labels
          arcLabel="id"
          enableArcLabels={true}
          arcLabelsSkipAngle={2}
          // animation
          animate={false}
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
