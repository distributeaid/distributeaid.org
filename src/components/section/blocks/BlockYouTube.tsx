import { YouTubeEmbed } from '@components/youtube-embed/YouTubeEmbed'
import { FC } from 'react'
import { BlockYoutube as BlockYoutubeType } from '../../../types/generic-page.d'

type BlockYouTubeProps = {
  block: BlockYoutubeType,
  className?: string | undefined
}

export const BlockYouTube: FC<BlockYouTubeProps> = ({ block, className }) => {
  return (
    <div className={className}>
      <YouTubeEmbed videoUrl={block.embedUrl} videoTitle={block.title} />
    </div>
  )
}
