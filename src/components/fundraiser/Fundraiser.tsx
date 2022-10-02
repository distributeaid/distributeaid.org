import { FC } from 'react'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
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
}

export const FundraiserCard: FC<{ fundraiser: Fundraiser }> = ({
  fundraiser,
}) => (
  <section className="card">
    <header>
      <div
        style={{ backgroundImage: `url('${fundraiser.gallery[0].url}')` }}
        className="bg"
      />
      <h1>{fundraiser.title}</h1>
    </header>
    <FundraiserProgressBar fundraiser={fundraiser} />
    <MarkdownContent content={fundraiser.abstract} />
  </section>
)
