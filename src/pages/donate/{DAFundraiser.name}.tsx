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

import Button from '@components/button/Button'
import SmartLink from '@components/link/SmartLink'

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
      <article>
        <div className="m-8 bg-white flex flex-col lg:flex-row">
          <header className="p-4 text-right lg:w-1/2 lg:border-r-2 lg:border-navy-800 prose">
            <h1 className="mb-0">
              {fundraiser.title.split(' ').map((word) => {
                if (word.length > 2) {
                  return (
                    <>
                      {word}
                      <br />
                    </>
                  )
                } else {
                  return <>{word} </>
                }
              })}
            </h1>
          </header>

          <aside className="p-4 flex flex-col justify-center lg:w-1/2 lg:border-l-2 lg:border-navy-800">
            <ProgressBar
              currency="EUR"
              allocated={fundraiser.totalAllocated}
              target={fundraiser.target}
            />
            <div>
              <SmartLink href={fundraiser.donateUrl} className="button">
                <Button variant="primary">Donate Now &#10140;</Button>
              </SmartLink>
            </div>
          </aside>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:w-1/2">
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
          </div>
        </div>

        <aside className="bg-rosemary-50">
          <div className="px-4 py-12">
            <header className="prose max-w-none mx-auto mb-8">
              <h2 className="text-center text-rosemary-800">
                Ship aid to people in need.
                <br />
                Donate today:
              </h2>
            </header>
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
      donateUrl
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
      totalAllocated
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
