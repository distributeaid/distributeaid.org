import cx from 'classnames'
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react'

const ReadOnlyField: FunctionComponent<
  PropsWithChildren<{
    label: ReactNode
    /**
     * Hide the field if it has no children
     */
    hideIfEmpty?: boolean
    stacked?: boolean
  }>
> = (props) => {
  if (!props.children) {
    return null
  }

  return (
    <div
      className={cx({
        'flex space-x-4 items-center': props.stacked,
      })}
    >
      <label
        className={cx('block text-gray-600 text-sm', {
          'mb-0': props.stacked,
          'mb-2': !props.stacked,
        })}
      >
        {props.label}
      </label>
      <span>
        {props.children || <span className="text-gray-600">&lt;empty&gt;</span>}
      </span>
    </div>
  )
}

export default ReadOnlyField
