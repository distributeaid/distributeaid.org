import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'

import { Photo } from '../../types/photo'

export const Gallery: FC<{ photos: Photo[]; gridClasses: string }> = ({
  photos,
  gridClasses,
}) => {
  return (
    <div className={`grid grid-flow-row ${gridClasses} gap-4 mx-4 mb-4`}>
      {photos.map((photo, i) => {
        return (
          <GatsbyImage
            className="lg:first:row-span-2 lg:first:col-span-2"
            alt={photo.alt}
            image={photo.image.gatsbyImageData}
          />
        )
      })}
    </div>
  )
}
