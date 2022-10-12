import { handler } from '@tailwindcss/line-clamp'
import { useStaticQuery } from 'gatsby'
import { FC } from 'react'
import { useEffect, useState } from 'react'
import { UseRowStateCellProps } from 'react-table'

type Image = {
  image: string
  width: number
  height: number
  altText: string
  caption: string
  attribution: string
  alignmentPhoto: string
  alignmentCaption: string
  span: string
}

// const [isHovering, setIsHovering] = useState(false)

const Image: FC<Image> = ({
  image,
  width,
  height,
  altText,
  caption,
  attribution,
  alignmentPhoto,
  alignmentCaption,
  span,
}) => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-16 text-center bg-gray-900 opacity-75">
          <span className="text-white mt-0.5">{attribution}</span>
        </div>
        <img
          src={image}
          alt={altText}
          className={alignmentPhoto}
          width={width}
          height={height}
        />
      </div>
      <p className={alignmentCaption}>{caption}</p>
      <p className={alignmentCaption}>{attribution}</p>
    </>
  )
}

export default Image
