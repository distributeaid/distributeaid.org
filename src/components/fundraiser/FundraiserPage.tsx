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
      <article className="flex flex-row bg-navy-800">
        <div className="flex flex-col w-1/2">
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

        <div className="flex flex-col w-1/2">
          {fundraiser.gallery[1] && (
            <aside>
              <GatsbyImage
                className="w-full object-fill"
                alt={fundraiser.gallery[1].alt}
                image={fundraiser.gallery[1].gatsbyImageData}
              />
            </aside>
          )}
          {/*
          <aside className="gallery">
            <Gallery photos={fundraiser.gallery} />
          </aside>
*/}
          <aside className="px-8 py-16 bg-navy-700">
            <FundraiserProgress
              currency="EUR"
              raisedTitle={fundraiser.title}
              raised={66}
              goal={99}
            />
          </aside>
          <aside className="bg-white p-8">
            <div className="prose">
              <WaysToDonate />
            </div>
          </aside>
        </div>
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
