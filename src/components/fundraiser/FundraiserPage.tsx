import Footer from '@components/Footer'
import { Fundraiser, Photo } from '@components/fundraiser/Fundraiser'
import { FundraiserProgress } from '@components/fundraiser/FundraiserProgress'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC, useEffect, useState } from 'react'
import '../../stylesheets/donate.css'
import { WaysToDonate } from './WaysToDonate'

export function Head({ pageContext: fundraiser }: { pageContext: Fundraiser }) {
  return (
    <PageHeader
      title={`Donate to ${fundraiser.title}`}
      description={`Support Distribute Aid's project ${fundraiser.title} by donating`}
    />
  )
}

export const FundraiserPage: FC<{ pageContext: Fundraiser }> = ({
  pageContext: fundraiser,
}) => {
  return (
    <SimpleLayout
      className={'donate breakout'}
      footer={<Footer showDonateButton={false} />}
    >
      <article>
        <header className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-semibold my-16">{fundraiser.title}</h1>
        </header>
        <aside className="gallery max-w-5xl mx-auto">
          <Gallery photos={fundraiser.gallery} />
        </aside>
        <section className="max-w-5xl mx-auto">
          <MarkdownContent content={fundraiser.body} />
        </section>
        <aside className="bg-gray-100 mt-16">
          <FundraiserProgress
            currency="EUR"
            raisedTitle="Allocated funds so far"
            raised={(fundraiser.allocations ?? []).reduce(
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

const Gallery: FC<{ photos: Photo[] }> = ({ photos }) => {
  const [current, setCurrent] = useState<string | undefined>(photos[0]?.url)

  useEffect(() => {
    if (photos.length === 0) return
    if (current === undefined) return
    const i = setInterval(() => {
      const currentPhoto = photos.find(({ url }) => url === current)
      if (currentPhoto === undefined) return
      const index = photos.indexOf(currentPhoto)
      setCurrent((photos[index + 1] ?? photos[0])?.url)
    }, 5000)
    return () => {
      clearInterval(i)
    }
  }, [photos, current])

  const photo = photos.find(({ url }) => url === current)

  if (photo === undefined) return null

  return <GatsbyImage alt={photo.alt} image={photo.gatsbyImageData} />
}
