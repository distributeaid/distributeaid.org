import { YouTubeEmbed } from '@components/youtube-embed/YouTubeEmbed'
import { FC } from 'react'

const AboutHero: FC = () => (
  <div className="py-8 md:py-20 mx-auto" style={{ maxWidth: 800 }}>
    <YouTubeEmbed
      videoUrl="https://www.youtube.com/embed/msizPweg3kE"
      videoTitle="My test title"
    />
  </div>
)

export default AboutHero
