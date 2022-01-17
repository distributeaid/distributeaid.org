import { FC } from 'react'

const AboutHero: FC = () => (
  <div className="py-8 md:py-20 mx-auto" style={{ maxWidth: 800 }}>
    <div className="video-container">
      <iframe
        className="video-iframe"
        src="https://www.youtube.com/embed/msizPweg3kE"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
)

export default AboutHero
