import cx from 'classnames'
import { FunctionComponent } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import ButtonIcon from './ButtonIcon'

/**
 * A link that looks like a button!
 *
 * If it needs added weight, use the primary variant
 * If it's in a table row and needs to be shorter, use the slim variant
 *
 * Inspiration:
 * - https://polaris.shopify.com/components/actions/button
 * - https://primer.style/css/components/buttons
 *
 */

export type ButtonProps = LinkProps & {
  /**
   * Use this in a table or list to avoid increasing the height of the container.
   */
  slim?: boolean
  /**
   * Choose the right button for your context
   * @param default This is the default button. Use another style if the button requires a different visual weight.
   * @param primary Used to highlight the most important actions. Use sparingly! Avoid showing multiple primary buttons in the same section.
   */
  variant?: 'default' | 'primary'
}

const ButtonLink: FunctionComponent<ButtonProps> & {
  Icon: typeof ButtonIcon
} = ({ variant = 'default', slim = false, type = 'button', ...otherProps }) => {
  const { className, children } = otherProps

  const classes = cx(
    'inline-flex items-center border text-center text-sm leading-5 font-medium rounded whitespace-no-wrap focus:outline-none focus:ring-4 transition ease-in-out duration-100',
    className,
    {
      // Default
      'bg-white border-gray-300 text-gray-600 shadow-sm ring-gray-200 hover:text-gray-700 hover:shadow active:bg-gray-100 active:text-gray-900':
        variant === 'default',
      // Primary variant
      'bg-navy-700 border-transparent text-white ring-navy-300 hover:bg-navy-800 active:bg-navy-900':
        variant === 'primary',
      // Sizing
      'px-4 py-2': !slim,
      'px-3 py-1': slim,
    },
  )

  return (
    <Link {...otherProps} className={classes}>
      {children}
    </Link>
  )
}

ButtonLink.Icon = ButtonIcon

export default ButtonLink
