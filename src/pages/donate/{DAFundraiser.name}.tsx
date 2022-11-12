import { graphql } from 'gatsby'
import { getSrc, ImageDataLike } from 'gatsby-plugin-image'
import { FC } from 'react'

import { Fundraiser } from '../../types/fundraiser.d'

import Footer from '@components/Footer'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '../../layouts/Simple'

import { MarkdownContent } from '@components/markdown/MarkdownContent'

import { FundraiserProgress } from '@components/fundraiser/FundraiserProgress'
import { Gallery } from '@components/fundraiser/Gallery'
import { WaysToDonate } from '@components/fundraiser/WaysToDonate'

import '../../stylesheets/donate.css'

type Props = {
  data: {
    fundraiser: Fundraiser
    gallery: {
      nodes: {
        parent: {
          absolutePath: string
        }
        gatsbyImageData: ImageDataLike
      }[]
    }
  }
}

export function Head({ pageContext: fundraiser }: { pageContext: Fundraiser }) {
  return (
    <PageHeader
      title={`Donate to ${fundraiser.title}`}
      description={`Support Distribute Aid's project ${fundraiser.title} by donating`}
    />
  )
}

const FundraiserPage: FC<Props> = ({ data: { fundraiser, gallery } }) => {
  // Make inline images responsive
  const allImages = fundraiser.body.matchAll(/!\[[^\]]+\]\((?<url>[^)]+)\)/g)
  const replacements: Record<string, string> = {}
  for (const match of allImages) {
    const url = match.groups?.url
    if (url === undefined) continue
    const gatsbyImageData = gallery.nodes.find(({ parent: { absolutePath } }) =>
      absolutePath.endsWith(url),
    )?.gatsbyImageData
    if (gatsbyImageData === undefined) {
      console.error(`Failed to find gallery gatsbyImageData for photo ${url}!`)
      continue
    }
    const src = getSrc(gatsbyImageData)
    if (src === undefined) {
      console.error(`Failed to get src from gatsbyImageData for photo ${url}!`)
      continue
    }
    replacements[url] = src
  }

  const body = Object.entries(replacements)
    .sort(([k1], [k2]) => k1.localeCompare(k2))
    .reduce((body, [k, v]) => body.replaceAll(k, v), fundraiser.body)

  const processedFundraiser: Fundraiser = {
    id: fundraiser.id,
    name: fundraiser.name,
    title: fundraiser.title,
    gallery: fundraiser.gallery.map((photo) => {
      const gatsbyImageData = gallery.nodes.find(
        ({ parent: { absolutePath } }) => absolutePath.endsWith(photo.url),
      )?.gatsbyImageData
      if (gatsbyImageData === undefined) {
        console.error(
          `Failed to find thumbnails500px gatsbyImageData for photo ${photo.url}!`,
        )
      }
      return {
        ...photo,
        gatsbyImageData,
      }
    }),
    allocations: fundraiser.allocations,
    body,
  }

  return (
    <SimpleLayout
      className={'donate breakout'}
      footer={<Footer showDonateButton={false} />}
    >
      <article>
        <header className="max-w-5xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-semibold my-16">
            {processedFundraiser.title}
          </h1>
        </header>
        <aside className="gallery max-w-5xl mx-auto">
          <Gallery photos={processedFundraiser.gallery} />
        </aside>
        <section className="max-w-5xl mx-auto px-4 lg:px-8 py-12 lg:py-24">
          <MarkdownContent content={processedFundraiser.body} />
        </section>
        <aside className="bg-gray-100 mt-16">
          <FundraiserProgress
            currency="EUR"
            raisedTitle="Allocated funds so far"
            raised={(processedFundraiser.allocations ?? []).reduce(
              (total, { amountEUR }) => total + amountEUR,
              0,
            )}
          />
        </aside>
        <aside className="bg-gray-50">
          <div className="px-4 lg:px-8 py-12 lg:py-24 max-w-7xl mx-auto">
            <h2 className="text-center text-gray-800 text-3xl font-medium mb-20">
              Support Distribute Aid to help more people in need:
            </h2>
            <WaysToDonate />
          </div>
        </aside>
      </article>
    </SimpleLayout>
  )
}

export default FundraiserPage

export const query = graphql`
  query ($id: String!) {
    fundraiser: daFundraiser(id: { eq: $id }) {
      id
      name
      title
      gallery {
        url
        alt
      }
      body
      allocations {
        date
        amountEUR
        purpose
      }
    }
    gallery: allImageSharp(
      filter: { original: { src: { glob: "/static/**" } } }
    ) {
      nodes {
        parent {
          ... on File {
            absolutePath
          }
        }
        gatsbyImageData(width: 1024)
      }
    }
  }
`
