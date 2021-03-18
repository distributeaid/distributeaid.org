import { nanoid } from 'nanoid'
import {
  ChangeEvent,
  FunctionComponent,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react'
import { FormRegisterType } from '../../types/form-types'
import InlineError from './InlineError'
import Label from './Label'
import TextInput from './TextInput'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * The ID of the input, used to map the label to the input element
   */
  id?: string
  /**
   * A required label for the field
   */
  label: ReactNode
  /**
   * A name added to the input element can be used for form parsing and
   * validation
   */
  name?: string
  /**
   * A placeholder value for the input
   */
  placeholder?: string
  /**
   * If true, the input will not be editable, but the text will remain
   * selectable
   */
  readOnly?: boolean
  /**
   * A string that represents a custom validation error
   */
  error?: string
  /**
   * The type of the input element. Defaults to "text"
   */
  type?: string
  /**
   * If true, the input field will not be editable or selectable
   */
  disabled?: boolean
  /**
   * Callback triggered when the text changes. Works the same way as a regular
   * input element.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /**
   * The register function from `react-hook-form`'s `useForm()` hook used for validation and submission
   */
  register?: FormRegisterType
}

const TextField: FunctionComponent<Props> = ({
  id,
  label,
  error = null,
  ...otherProps
}) => {
  // Create a unique ID in case the use doesn't provide one
  const [uniqueId] = useState(nanoid())

  const fieldId = id || uniqueId

  return (
    <div className="w-full">
      <Label htmlFor={fieldId} required={otherProps.required}>
        {label}
      </Label>
      {error && <InlineError>{error}</InlineError>}
      <TextInput {...otherProps} hasError={!!error} id={fieldId} />
    </div>
  )
}

export default TextField
