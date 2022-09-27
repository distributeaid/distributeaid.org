import { FC } from 'react'
import boardSrc from '../../images/about-us/board.jpg'

type Image = {
  image: string
  altText: string
  caption: string
  attribution: string
  alignmentPhoto: string
  alignmentCaption: string
}
const Image: FC<Image> = ({
  image,
  altText,
  caption,
  attribution,
  alignmentPhoto,
  alignmentCaption,
}) => {
  return (
    <div>
      <img src={image} alt={altText} className={alignmentPhoto} />
      <p className={alignmentCaption}>{caption}</p>
      <p className={alignmentCaption}>{attribution}</p>
    </div>
  )
}

export default Image
