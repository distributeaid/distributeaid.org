import { FC } from 'react'
import { MarkdownContent } from '@components/markdown/MarkdownContent'

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
   * Image URL
   */
  hero: string
  /**
   * Image URLs
   */
  gallery: string[]
}

export const FundraiserCard: FC<{ fundraiser: Fundraiser }> = ({
  fundraiser,
}) => (
  <section className="card">
    <header>
      <FundraiserPhoto fundraiser={fundraiser} url={fundraiser.hero} />
      <h1>{fundraiser.title}</h1>
    </header>
    <MarkdownContent content={fundraiser.abstract} />
  </section>
)

export const FundraiserPhoto: FC<{ fundraiser: Fundraiser; url: string }> = ({
  fundraiser,
  url,
}) => <img alt={fundraiser.title} src={url} />
