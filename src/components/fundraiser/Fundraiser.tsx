import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC } from 'react'
import { FundraiserProgress } from './FundraiserProgress'

export type Fundraiser = {
  id: string
  name: string
  title: string
  /**
   * Markdown
   */
  abstract: string
  /**
   * Markdown
   */
  body: string
  /**
   * Image URLs
   */
  gallery: Photo[]
  /**
   * Describes the funds allocated for this fundraisers.
   */
  allocations: {
    /**
     * The date when the allocation was made.
     */
    date: Date
    /**
     * The allocated amount in EUR
     */
    amountEUR: number
    /**
     * Describes the purpose the allocated funds will be used for.
     */
    purpose: string
  }[]
}

export type Photo = {
  /**
   * URL to media file
   */
  url: string
  /**
   * Alternative text
   */
  alt: string
  /**
   * Image process by sharp
   */
  gatsbyImageData: any
}

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
            raisedTitle="Allocated funds"
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
