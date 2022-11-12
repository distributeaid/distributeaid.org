import { GatsbyImage } from 'gatsby-plugin-image'
import { FC, useEffect, useState } from 'react'
import '../../stylesheets/donate.css'

import { Photo } from '../../types/fundraiser.d'

export const Gallery: FC<{ photos: Photo[] }> = ({ photos }) => {
  const [current, setCurrent] = useState<string | undefined>(photos[0]?.url)

  useEffect(() => {
    if (photos.length === 0) return
    if (current === undefined) return
    const i = setInterval(() => {
      const currentPhoto = photos.find(({ url }) => url === current)
      if (currentPhoto === undefined) return
      const index = photos.indexOf(currentPhoto)
      setCurrent((photos[index + 1] ?? photos[0])?.url)
    }, 5000)
    return () => {
      clearInterval(i)
    }
  }, [photos, current])

  const photo = photos.find(({ url }) => url === current)

  if (photo === undefined) return null

  return <GatsbyImage alt={photo.alt} image={photo.gatsbyImageData} />
}
