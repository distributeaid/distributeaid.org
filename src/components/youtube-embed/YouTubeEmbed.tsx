import { FC, PropsWithChildren } from 'react'

export const YouTubeEmbed: FC<
  PropsWithChildren<{
    url: string
    title?: string | undefined
  }>
> = ({ url, title }) => (
  <figure className="first:mt-0 last:mb-0">
    <iframe
      className="aspect-video w-full"
      src={url}
      title={title || 'Youtube Video'}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
    {title && (
      <figcaption data-testid="YouTubeEmbed-Title" className="text-sm mt-4">
        {title}
      </figcaption>
    )}
  </figure>
)
