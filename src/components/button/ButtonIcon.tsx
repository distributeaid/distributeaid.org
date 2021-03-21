import cx from 'classnames'
import {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  ReactNode,
} from 'react'

interface ExplicitProps {
  /**
   * Specify whether the icon is before or after the text
   */
  placement: 'before' | 'after'
}

/**
 * Use this component to add the necessary classes to display icons inside
 * buttons. It is also exported from the `Button` component as `Button.Icon`.
 */
const ButtonIcon: FunctionComponent<ExplicitProps> = ({
  children,
  placement,
}) => {
  const iconClasses = cx('w-5 h-5 inline-block', {
    'mr-2 -ml-1': placement === 'before',
    'ml-2 -mr-1': placement === 'after',
  })

  // Add the classes on top of the existing ones
  const getModifiedChild = (child: ReactNode) => {
    if (!isValidElement(child)) {
      return null
    }
    return cloneElement(child, {
      className: cx(iconClasses, child.props.className),
    })
  }

  return <>{Children.map(children, (child) => getModifiedChild(child))}</>
}

export default ButtonIcon as FunctionComponent<ExplicitProps>
