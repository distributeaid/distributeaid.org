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
    <div className="tile tile--column w-1/2">
      <div className="tile-icon mx-auto">
        <img className="icon icon--responsive" src={icon} alt={altText} />
      </div>
      <div className="w-40 m-auto">
        <p>{description}</p>
      </div>
    </div>
  )
}

export default IconWithText
