import { YouTubeEmbed } from '@components/youtube-embed/YouTubeEmbed'
import { FC } from 'react'
import { BlockYoutube as BlockYoutubeType } from '../../../types/generic-page.d'
import { BlockTitle } from './BlockTitle'

type BlockYouTubeProps = {
  block: BlockYoutubeType
  className?: string | undefined
}

export const BlockYouTube: FC<BlockYouTubeProps> = ({ block, className }) => {
  return (
    <>
      {block.title && (
        <BlockTitle className={className} block={{ text: block.title }} />
      )}
      <div className={`${className}`}>
        {/* NOTE: we're intentionally dropping the title so it doesn't get repeated */}
        <YouTubeEmbed url={block.embedUrl} />
      </div>
    </>
  )
}
