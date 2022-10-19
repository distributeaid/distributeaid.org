import { ResponsiveSunburst } from '@nivo/sunburst'
import { FC } from 'react'
import { Product } from '../../types/product-types'

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

type Props = {
  categoryVisItems: {
    nodes: LineItem[]
  }
}

type LineItemKey = keyof LineItem

function buildCategoryVisData(lineItems: LineItem[], selector: LineItemKey) {
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
    item.value += lineItemData[selector]
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

const ValueByCategoryAndItemVis: FC<Props> = ({ categoryVisItems }) => {
  const nivoData = buildCategoryVisData(categoryVisItems.nodes, 'value')

  return (
    // NOTE: the containing element must have a set width & height
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
  )
}

export default ValueByCategoryAndItemVis
