import { FC, ReactNode } from 'react'

type IconWithTextProps = {
  icon: string
  altText: string
  description: string | ReactNode
  positionOfVisual: 'vertical' | 'horizontal'
}

const IconWithText: FC<IconWithTextProps> = ({
  icon,
  altText,
  description,
  positionOfVisual,
}) => {
  return (
    <div
      className={`flex ${
        positionOfVisual === 'vertical'
          ? 'flex-wrap flex-col content-around w-1/2 h-40'
          : 'justify-around border-b-2 mb-4 pb-4'
      }`}
    >
      {icon && (
        <div
          className={`h-20  mb-1.5 ${
            positionOfVisual === 'vertical'
              ? 'flex items-center justify-center'
              : ''
          }`}
        >
          <img className="w-20" src={icon} alt={altText} />
        </div>
      )}
      {description && typeof description === 'string' && (
        <p className="text-sm w-40 text-center">{description}</p>
      )}
      {description && typeof description !== 'string' && <>{description}</>}
    </div>
  )
}

export default IconWithText
