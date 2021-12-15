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
                ? images.length + 2
                : lastIndex.current === index
                ? images.length + 1
                : index,
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
