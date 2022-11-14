import { graphql } from 'gatsby'
import { getSrc, ImageDataLike } from 'gatsby-plugin-image'
import { FC } from 'react'

import { Fundraiser } from '../../types/fundraiser.d'

import Footer from '@components/Footer'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '../../layouts/Simple'

import { MarkdownContent } from '@components/markdown/MarkdownContent'

import { ProgressBar } from '@components/fundraiser/ProgressBar'
import { WaysToDonate } from '@components/fundraiser/WaysToDonate'
import { Gallery } from '@components/image/Gallery'

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

  fundraiser.body = body

  return (
    <SimpleLayout
      className={'donate breakout'}
      footer={<Footer showDonateButton={false} />}
    >
      <article className="flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-1/2">
          <header className="bg-white p-8">
            <div className="prose">
              <h1>
                {fundraiser.title.split(' ').map((word) => (
                  <>
                    {word}
                    <br />
                  </>
                ))}
              </h1>
            </div>
          </header>
          <section className="bg-navy-100 p-8">
            <div className="prose">
              <MarkdownContent content={fundraiser.body} />
            </div>
          </section>
        </div>
        <div className="flex flex-col lg:w-1/2">
          <aside className="">
            <Gallery photos={fundraiser.gallery} />
          </aside>
          <aside className="p-8 bg-white prose">
            <ProgressBar
              title={fundraiser.title}
              currency="EUR"
              allocated={(fundraiser.allocations ?? []).reduce(
                (total, { amountEUR }) => total + amountEUR,
                0,
              )}
              target={fundraiser.target}
            />
          </aside>
          <aside className="p-8 bg-white">
            <div className="prose">
              <h2 className="">
                Support Distribute Aid to help more people in need:
              </h2>
              <WaysToDonate />
            </div>
          </aside>
        </div>
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
        relativePath
        alt
        image {
          gatsbyImageData(
            height: 512
            aspectRatio: 1.5
            transformOptions: { cropFocus: CENTER }
          )
        }
      }
      body
      target
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
