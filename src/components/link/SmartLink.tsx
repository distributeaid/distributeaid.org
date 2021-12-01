import { AnchorHTMLAttributes } from '@reach/router/node_modules/@types/react'
import React, { FC } from 'react'
import InternalLink from './InternalLink'
import ExternalLink from './ExternalLink'

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
