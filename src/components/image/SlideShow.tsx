import { GatsbyImage } from 'gatsby-plugin-image'
import { FC, useEffect, useState } from 'react'

import { Photo } from '../../types/photo'

export const SlideShow: FC<{ photos: Photo[] }> = ({ photos }) => {
  const [current, setCurrent] = useState<string | undefined>(photos[0]?.image)

  useEffect(() => {
    if (photos.length === 0) return
    if (current === undefined) return
    const i = setInterval(() => {
      const currentPhoto = photos.find(({ image }) => image === current)
      if (currentPhoto === undefined) return
      const index = photos.indexOf(currentPhoto)
      setCurrent((photos[index + 1] ?? photos[0])?.image)
    }, 5000)
    return () => {
      clearInterval(i)
    }
  }, [photos, current])

  const photo = photos.find(({ image }) => image === current)

  if (photo === undefined) return null

  return (
    <GatsbyImage
      className="w-full"
      alt={photo.alt}
      image={photo.image.gatsbyImageData}
    />
  )
}
