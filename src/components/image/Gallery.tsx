import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'

import { Photo } from '../../types/photo'

export const Gallery: FC<{ photos: Photo[] }> = ({ photos }) => {
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 mx-4 mb-4">
      {photos.map((photo, i) => {
        return (
          <GatsbyImage
            className=""
            alt={photo.alt}
            image={photo.image.gatsbyImageData}
          />
        )
      })}
    </div>
  )
}
