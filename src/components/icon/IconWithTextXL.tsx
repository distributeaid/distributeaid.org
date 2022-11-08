import { FC } from 'react'

type IconWithTextXLProps = {
  icon: string
  altText: string
  line1: string
  line2: string
  line3: string
}

const IconWithTextXL: FC<IconWithTextXLProps> = ({
  icon,
  altText,
  line1,
  line2,
  line3,
}) => {
  return (
    <div className="flex flex-wrap flex-col content-around w-1/2 h-40">
      <div className="flex items-center justify-center mx-auto h-20 w-40">
        <img className="w-20" src={icon} alt={altText} />
      </div>
      <p className="text-sm w-40 text-center mt-1.5">{line1}</p>
      <p className="text-sm w-40 text-center mt-1.5">{line2}</p>
      <p className="text-sm w-40 text-center mt-1.5">{line3}</p>
    </div>
  )
}

export default IconWithTextXL
