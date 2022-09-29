import Footer from '@components/Footer'
import {
  Fundraiser,
  FundraiserCard,
  FundraiserPhoto,
} from '@components/fundraiser/Fundraiser'
import SimpleLayout from '@layouts/Simple'
import { WaysToDonate } from '@pages/donate'
import { FC } from 'react'
import { FundraiserProgress } from '@components/fundraiser/FundraiserProgress'
import { MarkdownContent } from '@components/markdown/MarkdownContent'
import '../stylesheets/donate.css'

const FundraiserPage: FC<{ pageContext: Fundraiser }> = ({
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
        <aside className="gallery">
          <FundraiserCard fundraiser={fundraiser} />
          {fundraiser.gallery.map((url) => (
            <FundraiserPhoto fundraiser={fundraiser} url={url} key={url} />
          ))}
        </aside>
        <main>
          <MarkdownContent content={fundraiser.body} />
        </main>
      </article>
      <section className="ways-to-donate">
        <WaysToDonate />
      </section>
    </SimpleLayout>
  )
}

export default FundraiserPage
