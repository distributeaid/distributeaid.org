import { FC, ReactNode } from 'react'

type IconWithTextProps = {
  icon: string
  altText: string
  description: string | ReactNode
}

const IconWithText: FC<IconWithTextProps> = ({
  icon,
  altText,
  description,
}) => {
  return (
    <div className="flex flex-wrap flex-col content-around w-1/2 h-40">
      {icon && (
        <div className="flex items-center justify-center mx-auto h-20 w-40 mb-1.5">
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
