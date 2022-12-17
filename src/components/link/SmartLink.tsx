import { AnchorHTMLAttributes, FC } from 'react'
import ExternalLink from './ExternalLink'
import InternalLink from './InternalLink'

const SmartLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href = '/',
  ...props
}) => {
  const useInternalLink = href.startsWith('/')

  if (useInternalLink) {
    return <InternalLink to={href} {...props} />
  }
  return <ExternalLink href={href} {...props} />
}

export default SmartLink
