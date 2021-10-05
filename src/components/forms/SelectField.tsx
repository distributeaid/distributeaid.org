import { FormRegisterType } from '@types/form-types'
import { nanoid } from 'nanoid'
import {
  ChangeEvent,
  FunctionComponent,
  ReactNode,
  SelectHTMLAttributes,
  useState,
} from 'react'
import InlineError from './InlineError'
import Label from './Label'
import SelectInput from './SelectInput'

export interface SelectOption {
  label: ReactNode
  value: string | number
  disabled?: boolean
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
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
   * A required list of options to display in the dropdown
   */
  options: SelectOption[]
  /**
   * Callback triggered when the text changes. Works the same way as a regular
   * input element.
   */
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  /**
   * The register function from `react-hook-form`'s `useForm()` hook used for validation and submission
   */
  register?: FormRegisterType
  /**
   * If true, the value of each option will be cast to a number using parseInt()
   */
  castAsNumber?: boolean
}

const SelectField: FunctionComponent<Props> = ({
  id,
  label,
  error = null,
  options = [],
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

      <SelectInput {...otherProps} hasError={!!error} id={fieldId}>
        {options.map((option) => (
          <option
            value={option.value}
            key={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </SelectInput>
    </div>
  )
}

export default SelectField
