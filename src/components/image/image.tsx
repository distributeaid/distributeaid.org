import React, { FC } from 'react'

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
  const [showSpan, setShowSpan] = React.useState(false)

  return (
    <div className={`flex ${flexAlignment}`}>
      <div
        style={{
          width: width,
        }}
      >
        <div
          data-testid="hover-trigger"
          className="relative"
          onMouseEnter={() => setShowSpan(true)}
          onMouseLeave={() => setShowSpan(false)}
        >
          <div
            data-testid="hover-result"
            className={`absolute inset-x-0 bottom-0 h-16 flow-root ${textAlignment} bg-blue-900 opacity-75 ${
              showSpan ? '' : 'hidden'
            } `}
          >
            <span className="relative top-5 text-white">{attribution}</span>
          </div>
          <img src={image} alt={altText} height={height} />
        </div>
        <p className={`${textAlignment}`}>{caption}</p>
      </div>
    </div>
  )
}

export default Image
