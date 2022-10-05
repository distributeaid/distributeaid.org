import { FC, PropsWithChildren } from 'react'

export const YouTubeEmbed: FC<
  PropsWithChildren<{
    videoUrl: string
    videoTitle: string
  }>
> = ({ videoUrl, videoTitle }) => (
  <div className="video-container">
    <iframe
      className="aspect-video w-full"
      src={videoUrl}
      title="YouTube embed"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
    <div className="text-sm mt-4">{videoTitle}</div>
  </div>
)
