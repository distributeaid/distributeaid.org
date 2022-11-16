import Button from '@components/button/Button'
import SmartLink from '@components/link/SmartLink'
import { Link } from 'gatsby'
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
  const flexJustifyClass = getFlexClasses(direction)
  const moreInfoArrow = getMoreInfoArrow(direction)

  return (
    <section className="card">
      <div className="px-8">
        <Link to={`/donate/${fundraiser.name}`} className="title">
          <h2>{fundraiser.title}</h2>
        </Link>
        <div>
          <ProgressBar
            currency="EUR"
            allocated={fundraiser.totalAllocated}
            target={fundraiser.target}
            slim={true}
            direction={direction}
          />
        </div>
        <div className={`${flexJustifyClass} py-2`}>
          <SmartLink href={fundraiser.donateUrl} className="button">
            <Button variant="primary">Donate Now</Button>
          </SmartLink>
          <SmartLink href={`/donate/${fundraiser.name}`}>
            <Button>{moreInfoArrow}</Button>
          </SmartLink>
        </div>
      </div>
      {bgImage && (
        <Link to={`/donate/${fundraiser.name}`} className="bg">
          <GatsbyImage
            alt={bgImage.alt}
            image={bgImage.image.gatsbyImageData}
          />
        </Link>
      )}
    </section>
  )
}

const getFlexClasses = (direction?: Direction) => {
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
