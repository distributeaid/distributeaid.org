import cx from 'classnames'
import { FunctionComponent, ThHTMLAttributes } from 'react'

interface Props extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
  canSort?: boolean
  isSorted?: boolean
  isSortedDesc?: boolean
}

/**
 * A <th> element augmented with styling and a representation of sort status.
 */
const TableHeader: FunctionComponent<Props> = ({
  children,
  canSort,
  isSorted,
  isSortedDesc,
  ...otherProps
}) => {
  return (
    <th
      className={cx(
        'p-2 first:pl-6 last:pr-6 bg-gray-50 text-gray-700 text-left font-semibold',
        {
          'hover:bg-gray-100': canSort,
          'bg-gray-100': isSorted,
        },
      )}
      {...otherProps}
    >
      {children}
      {canSort && (
        <span className="ml-2 inline-block text-gray-500 w-2">
          {isSorted ? (isSortedDesc ? '↓' : '↑') : ''}
        </span>
      )}
    </th>
  )
}

export default TableHeader
