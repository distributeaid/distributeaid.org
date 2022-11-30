import { FC, ReactNode } from 'react'

type IconWithTextProps = {
  icon: string
  altText: string
  description: string | ReactNode
  positionOfVisual?: 'top' | 'left' | undefined
}

const IconWithText: FC<IconWithTextProps> = ({
  icon,
  altText,
  description,
  positionOfVisual,
}) => {
  if (positionOfVisual === undefined) {
    positionOfVisual = 'top'
  }

  let imgAlignment = getImgAlignment(positionOfVisual)
  let flexAlignment = getFlexAlignment(positionOfVisual)

  return (
    <div className={`flex ${imgAlignment}`}>
      <div className={`h-20  mb-1.5 ${flexAlignment}`}>
        <img className="w-20" src={icon} alt={altText} />
      </div>
      {typeof description === 'string' && (
        <p className="text-sm w-40 text-center">{description}</p>
      )}
      {typeof description !== 'string' && <>{description}</>}
    </div>
  )
}

export const getImgAlignment = (positionOfVisual: string) => {
  if (positionOfVisual === 'top') {
    return 'flex-wrap flex-col content-around w-1/2 h-40'
  } else {
    return 'justify-around py-4'
  }
}

export const getFlexAlignment = (positionOfVisual: string) => {
  if (positionOfVisual === 'top') {
    return 'flex items-center justify-center'
  } else {
    return ''
  }
}

export default IconWithText
