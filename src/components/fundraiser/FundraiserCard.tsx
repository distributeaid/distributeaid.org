import Button from '@components/button/Button'
import SmartLink from '@components/link/SmartLink'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'
import { Fundraiser } from '../../types/fundraiser.d'
import { Direction } from '../../types/layout.d'
import { ProgressBar } from './ProgressBar'

export const FundraiserCard: FC<{
  fundraiser: Fundraiser
  direction?: Direction
}> = ({ fundraiser, direction }) => {
  if (direction === undefined) {
    direction = Direction.LTR
  }

  const bgImage = fundraiser.gallery[0]
  const borderClasses = getBorderClasses(direction)
  const titleAlignClasses = getTitleAlignClasses(direction)
  const buttonFlexClasses = getButtonFlexClasses(direction)
  const moreInfoArrow = getMoreInfoArrow(direction)
  const bgOrderClasses = getBgOrderClasses(direction)

  return (
    <section className="card w-100 grid sm:grid-cols-2 items-center min-h-screen/3">
      <div className={`${borderClasses} px-4 py-6 my-6`}>
        <SmartLink
          href={`/donate/${fundraiser.name}`}
          className={`title ${titleAlignClasses} prose prose-sm md:prose-base lg:prose-lg hover:drop-shadow-md`}
        >
          <h1 className="font-bold uppercase">{fundraiser.title}</h1>
        </SmartLink>
        <div>
          <ProgressBar
            currency="EUR"
            allocated={fundraiser.totalAllocated}
            target={fundraiser.target}
            slim={true}
            direction={direction}
          />
        </div>
        <div className={`${buttonFlexClasses} py-2`}>
          <SmartLink href={fundraiser.donateUrl} className="button">
            <Button variant="primary">Donate Now</Button>
          </SmartLink>
          <SmartLink href={`/donate/${fundraiser.name}`}>
            <Button>{moreInfoArrow}</Button>
          </SmartLink>
        </div>
      </div>
      {bgImage && (
        <SmartLink
          href={`/donate/${fundraiser.name}`}
          className={`bg ${bgOrderClasses} w-full h-full flex justify-center items-center hover:opacity-80`}
        >
          <GatsbyImage
            className="w-full h-[192px] sm:h-full"
            alt={bgImage.alt}
            image={bgImage.image.gatsbyImageData}
          />
        </SmartLink>
      )}
    </section>
  )
}

const getBorderClasses = (direction?: Direction) => {
  const commonClasses = 'border-navy-300'
  const defaultVal = `${commonClasses} ml-4 border-l-4`

  switch (direction) {
    case Direction.LTR:
      return defaultVal

    case Direction.RTL:
      return `${commonClasses} mr-4 border-r-4`

    default:
      return defaultVal
  }
}

const getTitleAlignClasses = (direction?: Direction) => {
  const commonClasses = ''
  const defaultVal = `${commonClasses} text-left`

  switch (direction) {
    case Direction.LTR:
      return defaultVal

    case Direction.RTL:
      return `${commonClasses} text-right`

    default:
      return defaultVal
  }
}

const getButtonFlexClasses = (direction?: Direction) => {
  const commonClasses = 'flex gap-4 justify-start items-center'
  const defaultVal = `${commonClasses} flex-row`

  switch (direction) {
    case Direction.LTR:
      return defaultVal

    case Direction.RTL:
      return `${commonClasses} flex-row-reverse`

    default:
      return defaultVal
  }
}

const getMoreInfoArrow = (direction?: Direction) => {
  const defaultVal = <>More Info &#129170;</>

  switch (direction) {
    case Direction.LTR:
      return defaultVal

    case Direction.RTL:
      return <>&#129168; More Info</>

    default:
      return defaultVal
  }
}

const getBgOrderClasses = (direction?: Direction) => {
  const commonClasses = 'order-last'
  const defaultVal = `sm:order-first`

  switch (direction) {
    case Direction.LTR:
      return defaultVal

    case Direction.RTL:
      return `${commonClasses} sm:order-last`

    default:
      return defaultVal
  }
}
