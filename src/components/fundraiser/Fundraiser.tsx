import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'
import { Fundraiser } from '../../types/fundraiser.d'
import { FundraiserProgress } from './FundraiserProgress'

export const FundraiserCard: FC<{ fundraiser: Fundraiser }> = ({
  fundraiser,
}) => {
  const bgImage = fundraiser.gallery[0]

  return (
    <section className="card">
      <div>
        <Link to={`/donate/${fundraiser.name}`} className="title">
          <h2>{fundraiser.title}</h2>
          <FundraiserProgress
            currency="EUR"
            raisedTitle="Allocated funds so far"
            raised={(fundraiser.allocations ?? []).reduce(
              (total, { amountEUR }) => total + amountEUR,
              0,
            )}
          />
        </Link>
      </div>
      {bgImage && (
        <Link to={`/donate/${fundraiser.name}`} className="bg">
          <GatsbyImage alt={bgImage.alt} image={bgImage.gatsbyImageData} />
        </Link>
      )}
    </section>
  )
}
