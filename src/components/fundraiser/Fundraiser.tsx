import Button from '@components/button/Button'
import SmartLink from '@components/link/SmartLink'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'
import { Fundraiser } from '../../types/fundraiser.d'
import { ProgressBar } from './ProgressBar'

export const FundraiserCard: FC<{ fundraiser: Fundraiser }> = ({
  fundraiser,
}) => {
  const bgImage = fundraiser.gallery[0]

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
          />
        </div>
        <div className="flex flex-row gap-4 justify-start items-center py-2">
          <SmartLink href={fundraiser.donateUrl} className="button">
            <Button variant="primary">Donate Now</Button>
          </SmartLink>
          <SmartLink href={`/donate/${fundraiser.name}`}>
            More Info &#10140;
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
