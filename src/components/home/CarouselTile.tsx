import { FC, useEffect, useRef } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

type Props = {
  images: any[]
  size: number
  currentIndex: number
  animationDelayMS?: number
}

const CarouselTile: FC<Props> = ({
  images,
  size,
  currentIndex,
  animationDelayMS = 0,
}) => {
  // Keep track of the previous value of currentIndex because we need to animate
  // the previous image in a specific way.
  const lastIndex = useRef(0)
  useEffect(() => {
    lastIndex.current = currentIndex
  })

  return (
    <div
      className="relative overflow-hidden hidden md:block"
      style={{ width: size, height: size }}
    >
      {images.map((image, index) => (
        <div
          className="absolute inset-0 rounded"
          style={{
            width: size,
            height: size,
            zIndex:
              currentIndex === index
                ? images.length + 2 // Always at the top
                : lastIndex.current === index
                ? images.length + 1 // Always right below the top image
                : 0,
            transition: 'opacity 500ms linear',
            opacity:
              currentIndex === index || index === lastIndex.current ? 1 : 0,
            transitionDelay: `${animationDelayMS}ms`,
          }}
          key={`image-${index}`}
        >
          <GatsbyImage key={index} image={getImage(image)!} alt="" />
        </div>
      ))}
    </div>
  )
}

export default CarouselTile
