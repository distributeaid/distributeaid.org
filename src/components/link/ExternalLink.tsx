import { AnchorHTMLAttributes, FC } from 'react'
import cx from 'classnames'

const ExternalLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  className,
  ...otherProps
}) => (
  <a
    className={cx('text-navy-700 hover:underline font-semibold', className)}
    rel="noopener noreferer"
    target="_blank"
    {...otherProps}
  />
)

export default ExternalLink
