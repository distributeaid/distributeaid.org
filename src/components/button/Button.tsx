import cx from 'classnames'
import { ButtonHTMLAttributes, FunctionComponent, Ref } from 'react'

/**
 * By default, it should look like a neutral button
 *
 * If it needs added weight, use the primary variant
 * If it's in a table row and needs to be shorter, use the slim variant
 *
 * Inspiration:
 * - https://polaris.shopify.com/components/actions/button
 * - https://primer.style/css/components/buttons
 *
 */

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
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
  /**
   * An optional way to pass a ref down to the <button> element
   */
  forwardRef?: Ref<HTMLButtonElement>
}

const Button: FunctionComponent<ButtonProps> = ({
  variant = 'default',
  slim = false,
  type = 'button',
  forwardRef,
  ...otherProps
}) => {
  const { disabled, className, children } = otherProps

  const classes = cx(
    'inline-flex items-center border text-center text-sm leading-5 font-semibold tracking-wide rounded whitespace-no-wrap focus:outline-none focus:ring-4 transition ease-in-out duration-100',
    className,
    {
      // Default
      'bg-white border-gray-300 text-gray-600 shadow-sm ring-gray-200 hover:text-gray-700 hover:shadow active:bg-gray-100 active:text-gray-900':
        variant === 'default' && !disabled,
      'bg-gray-50 border-gray-300 text-gray-400':
        variant === 'default' && disabled,
      // Primary variant
      'bg-navy-700 border-transparent text-white ring-navy-300 hover:bg-navy-800 active:bg-navy-900':
        variant === 'primary' && !disabled,
      'bg-navy-500 border-transparent text-navy-100':
        variant === 'primary' && disabled,
      // Sizing
      'px-4 py-2': !slim,
      'px-3 py-1': slim,
      // Disabled stuff
      'cursor-not-allowed': disabled,
    },
  )

  if (disabled) {
    otherProps['aria-disabled'] = 'true'
  }

  return (
    <button {...otherProps} ref={forwardRef} type={type} className={classes}>
      {children}
    </button>
  )
}

export default Button
