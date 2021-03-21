import { FunctionComponent, LabelHTMLAttributes } from 'react'

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * If true, we will display 'required' next to the label to signify that the
   * field is required.
   */
  required?: boolean
}

/**
 * Displays a label, usually above an input or select element.
 *
 * Pass the `required` attribute to add the proper markup to denote required
 * fields. Read more about that below:
 * https://a11y-101.com/development/required
 */
const Label: FunctionComponent<Props> = ({
  children,
  required,
  ...otherProps
}) => {
  return (
    <label
      className="block text-gray-600 text-sm mb-2"
      aria-required={required}
      {...otherProps}
    >
      {children}
      {required && <span className="text-gray-400 ml-2">required</span>}
    </label>
  )
}

export default Label
