import { Link } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import { FC } from 'react'
import { FundraiserProgressBar } from './FundraiserProgress'

export type Fundraiser = {
  id: string
  name: string
  title: string
  target: number
  raised: number
  currency: string
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
  const bgImage = fundraiser.gallery[0]?.gatsbyImageData

  return (
    <section className="card">
      <div>
        <Link to={`/donate/${fundraiser.name}`} className="title">
          <h2>{fundraiser.title}</h2>
        </Link>
        <FundraiserProgressBar fundraiser={fundraiser} />
      </div>
      {bgImage && (
        <Link
          to={`/donate/${fundraiser.name}`}
          className="bg"
          style={{
            backgroundImage: `url('${getSrc(bgImage)}')`,
          }}
        ></Link>
      )}
    </section>
  )
}
