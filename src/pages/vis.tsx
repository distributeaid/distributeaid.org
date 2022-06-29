import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { ResponsiveSunburst } from '@nivo/sunburst'
import { graphql } from 'gatsby'
import Globe from 'react-globe.gl'
import { useState, useRef, useEffect } from 'react'
import { getCoordsAlpha3 } from 'utils/iso-3166'

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

function buildGlobeVisData(lineItems: LineItem[]) {
  const arcsData = lineItems
    .map((node) => {
      if (node?.shipment?.origin === node?.shipment?.destination) {
        return null
      }
      let originCoords = getCoordsAlpha3(node?.shipment?.origin)
      let destCoords = getCoordsAlpha3(node?.shipment?.destination)
      if (!originCoords || !destCoords) {
        console.log('WHAAAA')
        return null
      }
      return {
        startLat: originCoords?.lat,
        startLng: originCoords?.lon,
        endLat: destCoords?.lat,
        endLng: destCoords?.lon,
        color: ['blue', 'rgb(8, 43, 118)'],
      }
    })
    .filter((node) => {
      return node !== null
    })
  console.log('DATA', arcsData)
  return arcsData
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
  const globeEl = useRef() as any
  const nivoData = buildCategoryVisData(categoryVisItems.nodes)
  const arcsData = buildGlobeVisData(categoryVisItems.nodes) as any
  console.log('arcsData', arcsData)
  const totalValue = categoryVisItems.nodes.reduce((total, lineItem) => {
    return total + lineItem.value
  }, 0)

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().enableZoom = false
    globeEl.current.controls().autoRotate = true
    globeEl.current.controls().autoRotateSpeed = 0.2
  }, [])
  return (
    <SimpleLayout pageTitle="Regions">
      <section className="h-screen w-full">
        <Globe
          ref={globeEl}
          globeImageUrl="/uploads/earth-light.jpg"
          bumpImageUrl="/uploads/earth-topology.png"
          backgroundColor="#eeeeee"
          arcsData={arcsData}
          arcColor={'color'}
          arcDashLength={0.8}
          arcDashGap={0.2}
          arcDashAnimateTime={() => Math.random() * 4000 + 500}
          arcStroke={1.1}
        />
      </section>
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
