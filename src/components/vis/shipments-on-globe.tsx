import { FC, useEffect, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { getCoordsAlpha3 } from 'utils/iso-3166'
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

function buildGlobeVisData(lineItems: LineItem[]) {
  const arcsData = lineItems
    .map((node) => {
      if (node?.shipment?.origin === node?.shipment?.destination) {
        return null
      }
      let originCoords = getCoordsAlpha3(node?.shipment?.origin)
      let destCoords = getCoordsAlpha3(node?.shipment?.destination)
      if (!originCoords || !destCoords) {
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
  return arcsData
}

const ShipmentsOnGlobeVis: FC<Props> = ({ categoryVisItems }) => {
  const globeEl = useRef() as any
  const arcsData = buildGlobeVisData(categoryVisItems.nodes) as any

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

  const [globeDimensions, setGlobeDimensions] = useState(384)

  const resizeGlobeSize = () => {
    const globeSectionWidth =
      document.getElementById('globe-section')?.clientWidth

    if (globeSectionWidth) {
      if (globeSectionWidth >= 384) {
        setGlobeDimensions(384)
      } else {
        setGlobeDimensions(globeSectionWidth)
      }
    } else {
      setGlobeDimensions(384)
    }
  }

  useEffect(() => {
    resizeGlobeSize()
    window.addEventListener('resize', resizeGlobeSize)
    return () => window.removeEventListener('resize', resizeGlobeSize)
  }, [])

  return (
    <div
      id="globe-section"
      className="hover:cursor-grab active:cursor-grabbing"
    >
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
        width={globeDimensions}
        height={globeDimensions}
      />
    </div>
  )
}

export default ShipmentsOnGlobeVis
