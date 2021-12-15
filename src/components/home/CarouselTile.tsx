import { FC, useEffect, useRef } from 'react'

type Props = {
  images: {
    src: string
    alt: string
  }[]
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
      className="relative overflow-hidden"
      style={{ width: size, height: size }}
    >
      {images.map((image, index) => (
        <img
          className="absolute object-cover inset-0 rounded"
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
          src={image.src}
          alt={image.alt}
          key={index}
        />
      ))}
    </div>
  )
}

export default CarouselTile
