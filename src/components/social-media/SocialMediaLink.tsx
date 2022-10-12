import ExternalLink from '@components/link/ExternalLink'
import { FC } from 'react'

interface Props {
  href: string
  src: string
  altText: string
}

const SocialMediaLink: FC<Props> = ({ href, src, altText }) => {
  return (
    <ExternalLink href={href}>
      <aside className="w-16 h-16 flex flex-col justify-center items-center -mr-4">
        <img width="40" src={src} alt={altText} />
      </aside>
    </ExternalLink>
  )
}

export default SocialMediaLink
