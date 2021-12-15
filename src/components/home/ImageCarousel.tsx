import WordMark from '@components/brand/WordMark'
import { FC, useEffect, useRef, useState } from 'react'
import CarouselTile from './CarouselTile'
import truckImage from '../../images/home/carousel/loading_truck.png'
import moriaReliefImage from '../../images/home/carousel/moria_fire_relief.png'
import soapDonationImage from '../../images/home/carousel/soap_relief.png'
import calaisWaterImage from '../../images/home/carousel/water_relief.png'

const images = [
  {
    src: truckImage,
    alt: 'Volunteers loading a truck full of clothing donations',
  },
  {
    src: moriaReliefImage,
    alt: 'A volunteer sorting through clothing donations during the Moria fire relief efforts',
  },
  {
    src: soapDonationImage,
    alt: 'A volunteer handing out bars of soap to a refugee',
  },
  {
    src: calaisWaterImage,
    alt: 'A warehouse full of water bottles headed to refugee camps in Calais, France',
  },
]

const CAROUSEL_TIMER_MS = 5000 as const

const ImageCarousel: FC = () => {
  const [imageIndex, setImageIndex] = useState(0)

  const timeoutRef = useRef<number>(-1)

  const showNextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length)
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(showNextImage, CAROUSEL_TIMER_MS)
  }

  useEffect(() => {
    timeoutRef.current = window.setTimeout(showNextImage, CAROUSEL_TIMER_MS)

    return () => {
      window.clearTimeout(timeoutRef.current)
    }
  }, [])

  // On mobile, we don't show any images
  // On desktop, we animate between 3 slots

  const leftImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1

  return (
    <section className="max-w-full flex gap-6 overflow-hidden px-4 lg:px-8 py-16 lg:py-36">
      {/* Central column for some text + an image */}
      <div className="max-w-4xl w-full flex relative mx-auto justify-between items-center">
        <div className="pb-8">
          <WordMark width={300} height="auto" />
          <h1 className="text-4xl text-navy-700 max-w-sm mt-4 leading-snug">
            Re-imagine Humanitarian Aid Delivery
          </h1>
        </div>
        <CarouselTile images={images} currentIndex={imageIndex} size={400} />

        {/* 1 image on the left, overflowing the column */}
        <div
          className="absolute opacity-25 hidden md:block"
          style={{ left: 'calc(-360px - 5vw)', top: 20 }}
        >
          <CarouselTile
            animationDelayMS={500}
            images={images}
            currentIndex={leftImageIndex}
            size={360}
          />
        </div>

        {/* 1 image on the right, overflowing the column */}
        <div
          className="hidden md:block absolute opacity-25"
          style={{ right: 'calc(-360px - 5vw)', top: -20 }}
        >
          <CarouselTile
            animationDelayMS={250}
            images={images}
            currentIndex={(imageIndex + 1) % images.length}
            size={360}
          />
        </div>
      </div>
    </section>
  )
}

export default ImageCarousel
