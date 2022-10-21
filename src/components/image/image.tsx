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
  alignment: 'left' | 'center' | 'right'
}

// const [isHovering, setIsHovering] = useState(false)

const Image: FC<Image> = ({
  image,
  width,
  height,
  altText,
  caption,
  attribution,
  alignment,
}) => {
  var flexAlignment = 'justify-center'
  var textAlignment = 'text-center'
  if (alignment === 'right') {
    flexAlignment = 'justify-end'
    textAlignment = 'text-right'
  } else if (alignment === 'left') {
    flexAlignment = 'justify-start'
    textAlignment = 'text-left'
  }

  return (
    <div className={`flex ${flexAlignment}`}>
      <div
        style={{
          width: width,
        }}
      >
        <div className="relative">
          <div
            className={`absolute inset-x-0 bottom-0 h-16 ${textAlignment} bg-gray-900 opacity-75`}
          >
            <span className="text-white mt-0.5">{attribution}</span>
          </div>
          <img src={image} alt={altText} height={height} />
        </div>
        <p className={`${textAlignment}`}>{caption}</p>
      </div>
    </div>
  )
}

export default Image
