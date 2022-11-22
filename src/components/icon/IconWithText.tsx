import { FC, ReactNode } from 'react'

type IconWithTextProps = {
  icon: string
  altText: string
  description: string | ReactNode
  positionOfVisual?: 'vertical' | 'horizontal' | undefined
}

const IconWithText: FC<IconWithTextProps> = ({
  icon,
  altText,
  description,
  positionOfVisual,
}) => {
  if (positionOfVisual === undefined) {
    positionOfVisual = 'vertical'
  }

  return (
    <div
      className={`flex ${
        positionOfVisual === 'vertical'
          ? 'flex-wrap flex-col content-around w-1/2 h-40'
          : 'justify-around py-4'
      }`}
    >
      <div
        className={`h-20  mb-1.5 ${
          positionOfVisual === 'vertical'
            ? 'flex items-center justify-center'
            : ''
        }`}
      >
        <img className="w-20" src={icon} alt={altText} />
      </div>
      {typeof description === 'string' && (
        <p className="text-sm w-40 text-center">{description}</p>
      )}
      {typeof description !== 'string' && <>{description}</>}
    </div>
  )
}

export default IconWithText
