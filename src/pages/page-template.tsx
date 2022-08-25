import { FC } from 'react'
import SimpleLayout from '@layouts/Simple'
import { StaticImage } from 'gatsby-plugin-image'
import MarkdownContent from '@components/markdown/MarkdownContent'
import sampleImg from '../images/home/bobby-moving-a-pallet-iha.jpg'

const content = `
### Our Mission

We are re-imagining humanitarian aid delivery. We aim to help move **humanitarian aid** to where it is needed most, create an **efficient** and **time-saving** system for shipments of aid, and **lower carbon emissions** for humanitarian aid**.** Distribute Aid has the end goal of producing a platform for the use of aid collection and service providing groups that will incorporate all of these aims seamlessly. We offer support to a huge network of grassroots organisations working within the Refugee Aid movement in Europe, and COVID-19 response groups in Europe and the US.

Distribute Aid wants to bring more transparency to all groups involved around what donations are on offer, and make it easier to see what is needed where, which also prevents waste. Creating a platform for aid delivery will connect hundreds of independent groups working in the same field, for the same greater cause but who currently have little oversight. This platform will also provide a way to collect data on regional needs, providing a wider overview of needs and assist in securing in-kind donations to a scale never before possible!
`

const sampleImgAlt =
  'A photo of aid at a warehouse, showing boxes stacked on the floor next to baby carriages stacked on shevles, with stairs visible in the background.'

const PageTemplate: FC = () => (
  <SimpleLayout pageTitle="Page Template">
    <h1>Hello beautiful human!</h1>

    {/* single content centered */}
    <section className="flex justify-center">
      <div className="lg:max-w-screen-md">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/videoseries?list=PLduVuKz7pCauLnLopk3WhE4-d0cFF9IH0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </section>

    {/* side-by-side content */}
    <section className="flex justify-center space-x-8">
      <div className="lg:max-w-screen-sm">
        <MarkdownContent content={content} />
      </div>
      <div className="lg:max-w-screen-sm grow">
        <img src={sampleImg} alt={sampleImgAlt} />
      </div>
    </section>
  </SimpleLayout>
)

export default PageTemplate
