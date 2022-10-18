import Footer from '@components/Footer'
import { Fundraiser, Photo } from '@components/fundraiser/Fundraiser'
import { FundraiserProgress } from '@components/fundraiser/FundraiserProgress'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import { PageHeader } from '@components/PageHeader'
import SimpleLayout from '@layouts/Simple'
import { WaysToDonate } from '@pages/donate'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FC, useEffect, useState } from 'react'
import '../../stylesheets/donate.css'

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
        <section>
          <header>
            <h1>{fundraiser.title}</h1>
          </header>
          <div className="proseWrapper">
            <MarkdownContent content={fundraiser.body} />
          </div>
        </section>
        <aside>
          <div className="gallery">
            <Gallery photos={fundraiser.gallery} />
          </div>
          <FundraiserProgress
            fundraiser={fundraiser}
            title={'Campaign progress'}
          />
          <div className="ways-to-donate">
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
