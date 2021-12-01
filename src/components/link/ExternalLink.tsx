import { AnchorHTMLAttributes, FC } from 'react'

const ExternalLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  ...otherProps
}) => <a rel="noopener noreferer" target="_blank" {...otherProps} />

export default ExternalLink
