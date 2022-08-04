import React, { FC } from 'react'
import { useState, useRef, useEffect } from 'react'
import Globe from 'react-globe.gl'
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
  categoryVisItems: {
    nodes: LineItem[]
  }
}

type LineItemKey = keyof LineItem

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

const ShipmentsOnGlobeVis: FC<Props> = ({ categoryVisItems }) => {
  const globeEl = useRef() as any
  const arcsData = buildGlobeVisData(categoryVisItems.nodes) as any
  console.log('arcsData', arcsData)

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().enableZoom = false
    globeEl.current.controls().autoRotate = true
    globeEl.current.controls().autoRotateSpeed = 0.2

    const avgLng =
      arcsData.reduce((previous: number, current: { endLng: number }) => {
        return previous + current.endLng
      }, 0) / arcsData.length

    const avgLat =
      arcsData.reduce((previous: number, current: { endLat: number }) => {
        return previous + current.endLat
      }, 0) / arcsData.length

    // Set starting coordinates
    globeEl.current.pointOfView({ lat: avgLat, lng: avgLng, altitude: 2.5 })
  }, [])

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="/uploads/earth-light.jpg"
      bumpImageUrl="/uploads/earth-topology.png"
      backgroundColor="#eeeeee00"
      arcsData={arcsData}
      arcColor={'color'}
      arcDashLength={0.8}
      arcDashGap={0.2}
      arcDashAnimateTime={() => Math.random() * 4000 + 500}
      arcStroke={1.1}
      width={384}
      height={384}
    />
  )
}

export default ShipmentsOnGlobeVis
