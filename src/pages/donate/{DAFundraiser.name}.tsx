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

export function Head({
  data: { fundraiser: fundraiser },
}: {
  data: { fundraiser: Fundraiser }
}) {
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
        <div className="m-4 sm:my-8 sm:mx-4 bg-white flex flex-col sm:flex-row">
          <header className="flex items-center justify-center prose-sm uppercase text-center sm:justify-end sm:p-4 sm:pl-0 sm:text-right sm:w-1/2 sm:max-w-none sm:border-r-4 sm:border-navy-800 lg:prose lg:max-w-none prose-h1:mb-0">
            <h1 className="hidden md:block lg:mb-0">
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
            <h1 className="block md:hidden">{fundraiser.title}</h1>
          </header>

          <aside className="p-4 pr-0 flex flex-col justify-center sm:w-1/2">
            <div className="text-center sm:text-left">
              <SmartLink href={fundraiser.donateUrl} className="button">
                <Button variant="primary">Donate Now &#10140;</Button>
              </SmartLink>
            </div>
            <ProgressBar
              currency="EUR"
              allocated={fundraiser.totalAllocated}
              target={fundraiser.target}
            />
          </aside>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:w-1/2 bg-navy-100">
            <section className="p-8">
              <div className="prose">
                <MarkdownContent content={fundraiser.body} />
              </div>
            </section>
          </div>

          <div className="flex flex-col md:w-1/2">
            <aside className="">
              <Gallery
                gridClasses={`grid-cols-2 md:grid-cols-1 lg:grid-cols-2`}
                photos={fundraiser.gallery}
              />
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
