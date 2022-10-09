import { Link } from 'gatsby'
import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
  to: string
  className?: string | undefined
}

const InternalLink: FC<Props> = ({ children, ...otherProps }) => (
  <Link {...otherProps}>{children}</Link>
)

export default InternalLink
