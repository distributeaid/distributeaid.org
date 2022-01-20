import { FC, useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import WordMark from '@components/brand/WordMark'
import CarouselTile from './CarouselTile'

const CAROUSEL_TIMER_MS = 5000 as const

type Props = { headline: string }

const ImageCarousel: FC<Props> = ({ headline }) => {
  // Load all the images from the home/carousel directory
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { relativeDirectory: { eq: "home/carousel" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(width: 400)
          }
        }
      }
    }
  `)

  const allImages = data.allFile.nodes.map((node: any) => node.childImageSharp)

  // We use a timeout to cycle through the images
  const [imageIndex, setImageIndex] = useState(0)
  const timeoutRef = useRef<number>(-1)

  const showNextImage = () => {
    setImageIndex((prev) => (prev + 1) % allImages.length)
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

  const leftImageIndex =
    imageIndex === 0 ? allImages.length - 1 : imageIndex - 1

  return (
    <section className="max-w-full flex gap-6 overflow-hidden px-4 lg:px-8 py-16 lg:py-36">
      {/* Central column for some text + an image */}
      <div className="max-w-4xl w-full flex relative mx-auto justify-between items-center">
        <div className="pb-8">
          <WordMark width={300} height="auto" />
          <h1 className="text-4xl text-navy-700 max-w-sm mt-4 leading-snug">
            {headline || 'Re-imagine Humanitarian Aid Delivery'}
          </h1>
        </div>
        <CarouselTile images={allImages} currentIndex={imageIndex} size={400} />

        {/* 1 image on the left, overflowing the column */}
        <div
          className="absolute opacity-25 hidden md:block"
          style={{ left: 'calc(-360px - 5vw)', top: 20 }}
        >
          <CarouselTile
            animationDelayMS={500}
            images={allImages}
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
            images={allImages}
            currentIndex={(imageIndex + 1) % allImages.length}
            size={360}
          />
        </div>
      </div>
    </section>
  )
}

export default ImageCarousel
