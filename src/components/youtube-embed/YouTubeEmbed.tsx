import { FC, PropsWithChildren } from 'react'

export const YouTubeEmbed: FC<
  PropsWithChildren<{
    videoUrl: string
    videoTitle?: string | undefined
  }>
> = ({ videoUrl, videoTitle }) => (
  <figure>
    <iframe
      className="aspect-video w-full"
      src={videoUrl}
      title="YouTube embed"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
    {videoTitle && (
      <figcaption data-testid="videoTitle" className="text-sm mt-4">
        {videoTitle}
      </figcaption>
    )}
  </figure>
)
