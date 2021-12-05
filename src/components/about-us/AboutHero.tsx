import { FC } from 'react'

const AboutHero: FC = () => (
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
)

export default AboutHero
