import { FC, ReactNode } from 'react'
import { Link } from 'gatsby'

type Props = {
  children?: ReactNode
  to: string
  className?: string | undefined
}

const InternalLink: FC<Props> = ({ children, ...otherProps }) => (
  <Link {...otherProps}>{children}</Link>
)

export default InternalLink
