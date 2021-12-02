import { FC, useState } from 'react'
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
    </SimpleLayout>
  )
}

export default AboutUs
