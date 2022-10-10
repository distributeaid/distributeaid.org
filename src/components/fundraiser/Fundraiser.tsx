import { MarkdownContent } from '@components/markdown/MarkdownContent'
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
      <header>
        {bgImage && (
          <div
            style={{
              backgroundImage: `url('${getSrc(bgImage)}')`,
            }}
            className="bg"
          />
        )}
        <h1>{fundraiser.title}</h1>
      </header>
      <FundraiserProgressBar fundraiser={fundraiser} />
      <MarkdownContent content={fundraiser.abstract} />
    </section>
  )
}
