import Footer from '@components/Footer'
import {
  Fundraiser,
  FundraiserCard,
  Photo,
} from '@components/fundraiser/Fundraiser'
import SimpleLayout from '@layouts/Simple'
import { WaysToDonate } from '@pages/donate'
import { FC } from 'react'
import { FundraiserProgress } from '@components/fundraiser/FundraiserProgress'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import '../../stylesheets/donate.css'

const FundraiserPhoto: FC<{ photo: Photo }> = ({ photo }) => (
  <div className="photo">
    <img alt={photo.alt} src={photo.url} />
    <span>{photo.alt}</span>
  </div>
)

export const FundraiserPage: FC<{ pageContext: Fundraiser }> = ({
  pageContext: fundraiser,
}) => {
  return (
    <SimpleLayout
      pageTitle={`Donate to ${fundraiser.title}`}
      pageDescription={`Support Distribute Aid's project ${fundraiser.title} by donating`}
      className={'donate fundraiser'}
      footer={<Footer showDonateButton={false} />}
    >
      <div className="bg" />
      <header>
        <h1>{fundraiser.title}</h1>
      </header>
      <FundraiserProgress fundraiser={fundraiser} title={'Campaign progress'} />
      <article className="fundraiser">
        <main>
          <div className="prose">
            <h1>{fundraiser.title}</h1>
          </div>
          <MarkdownContent content={fundraiser.body} />
        </main>
        <aside className="gallery">
          {fundraiser.gallery.map(({ alt, url }) => (
            <FundraiserPhoto photo={{ alt, url }} key={url} />
          ))}
        </aside>
      </article>
      <section className="ways-to-donate">
        <WaysToDonate />
      </section>
    </SimpleLayout>
  )
}
