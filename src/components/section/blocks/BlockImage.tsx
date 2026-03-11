import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'
import { BlockImage as BlockImageType } from '../../../types/generic-page.d'

type BlockImageProps = {
  block: BlockImageType
  className?: string | undefined
}

export const BlockImage: FC<BlockImageProps> = ({ block, className }) => {
  return (
    <div className={`${className}`} data-testId="BlockImage">
      <GatsbyImage
        className="w-full"
        alt={block.alt}
        image={block.image.gatsbyImageData}
      />
    </div>
  )
}
