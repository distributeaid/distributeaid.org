import { FC } from 'react'

type IconWithTextProps = {
  icon: string
  altText: string
  description: string
}

const IconWithText: FC<IconWithTextProps> = ({
  icon,
  altText,
  description,
}) => {
  return (
    <div className="flex flex-wrap flex-col content-around w-1/2 h-40">
      <div className="flex items-center justify-center mx-auto h-20 w-40">
        <img className="w-20" src={icon} alt={altText} />
      </div>
      <p className="text-sm w-40 text-center my-2">{description}</p>
    </div>
  )
}

export default IconWithText
