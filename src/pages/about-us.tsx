import { FC } from 'react'
import logoBlueSrc from '../images/logomark_blue.svg'
import boardSrc from '../images/about-us/board.jpg'
import SimpleLayout from '@layouts/Simple'
import Timeline from '@components/about-us/Timeline'

const AboutUs: FC = () => (
  <SimpleLayout pageTitle="About us">
    <div className="py-8 md:py-20 mx-auto" style={{ maxWidth: 800 }}>
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.5%',
          paddingTop: 30,
          height: 0,
          overflow: 'hidden',
        }}
      >
        <iframe
          className="max-w-full"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          src="https://www.youtube.com/embed/msizPweg3kE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
    <section className="bg-navy-50 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6 text-navy-700 text-2xl lg:text-3xl lg:leading-snug">
          <div className="lg:flex justify-between items-center lg:space-x-8">
            <img
              className="mx-auto my-6"
              width="130"
              height="60"
              src={logoBlueSrc}
              alt="Distribute Aid Logo: A flock of doves stylized by stacking wings behind the main outline of a dove."
            />
            <p className="flex-grow">
              Distribute Aid’s mission is to provide for basic human needs at
              scale by connecting communities and empowering people to uphold
              human dignity.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div className="max-w-7xl mx-auto text-center py-20 px-4 text-lg">
      <img
        className="mx-auto mb-4"
        style={{
          width: 600,
          height: 300,
          objectFit: 'cover',
          objectPosition: 'top',
        }}
        width="600"
        height="300"
        src={boardSrc}
        alt="Our board members from left to right: Rudayna Abdo, Sara Lönegård, and Stephanie Fairbank"
      />
      <p>
        Our board members from left to right:
        <br />
        Rudayna Abdo, Sara Lönegård, and Stephanie Fairbank
      </p>
    </div>
    <section className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12 lg:py-20 space-y-6 text-lg text-gray-700">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">
          About our mission
        </h2>
        <p>
          We are re-imagining humanitarian aid delivery. We aim to help move{' '}
          <strong>humanitarian aid</strong> to where it is needed most, create
          an <strong>efficient</strong> and <strong>time-saving</strong> system
          for shipments of aid, and <strong>lower carbon emissions</strong> for
          humanitarian aid. Distribute Aid has the end goal of producing a
          platform for the use of aid collection and service providing groups
          that will incorporate all of these aims seamlessly. We offer support
          to a huge network of grassroots organisations working within the
          Refugee Aid movement in Europe, and COVID-19 response groups in Europe
          and the US.
        </p>
        <p>
          Distribute Aid wants to bring more transparency to all groups involved
          around what donations are on offer, and make it easier to see what is
          needed where, which also prevents waste. Creating a platform for aid
          delivery will connect hundreds of independent groups working in the
          same field, for the same greater cause but who currently have little
          oversight. This platform will also provide a way to collect data on
          regional needs, providing a wider overview of needs and assist in
          securing in-kind donations to a scale never before possible!
        </p>
      </div>
    </section>
    <Timeline />
  </SimpleLayout>
)

export default AboutUs
