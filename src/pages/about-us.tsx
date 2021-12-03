import { FC, useState } from 'react'
import logoBlueSrc from '../images/logomark_blue.svg'
import boardSrc from '../images/about-us/board.jpg'
import SimpleLayout from '@layouts/Simple'

const cardClasses = 'p-4 max-w-xl mx-auto flex flex-col items-center space-y-4'

const AboutUs: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <SimpleLayout pageTitle="About us">
      <div
        className="pt-8 md:pt-20 max-w-7xl mx-auto"
        style={{ minHeight: '80vh' }}
      >
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
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 text-navy-700 text-2xl lg:text-3xl lg:leading-snug">
            <div className="lg:flex justify-between items-center lg:space-x-8">
              <img
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
    </SimpleLayout>
  )
}

export default AboutUs
