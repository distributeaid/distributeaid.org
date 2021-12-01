import { FC } from 'react'
import { Link } from 'gatsby'

type Props = {
  to: string
  className?: string
}

const InternalLink: FC<Props> = ({ children, ...otherProps }) => (
  <Link {...otherProps}>{children}</Link>
)

export default InternalLink
