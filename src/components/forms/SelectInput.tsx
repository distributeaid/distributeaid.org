import cx from 'classnames'
import { FunctionComponent, SelectHTMLAttributes } from 'react'
import { RegisterOptions } from 'react-hook-form'
import { FormRegisterType } from '../../types/form-types'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  /**
   * If true, the field will be displayed with a red border
   */
  hasError?: boolean
  /**
   * The register function from `react-hook-form`'s `useForm()` hook used for
   * validation and submission
   */
  register?: FormRegisterType
  /**
   * If true, the value of each option will be cast to a number using parseInt()
   */
  castAsNumber?: boolean
}

const SelectInput: FunctionComponent<Props> = ({
  hasError = false,
  register,
  castAsNumber,
  ...otherProps
}) => {
  const { disabled, className, children } = otherProps

  const classes = cx(
    className,
    'appearance-none w-full border px-3 py-2 rounded transition focus:outline-none focus:shadow-outline focus:ring ring-navy-300 focus:border-navy-600',
    {
      'border-gray-300 hover:border-gray-400': !hasError && !disabled,
      'border-red-400': hasError,
      'bg-gray-100': disabled,
      'cursor-not-allowed': disabled,
    },
  )

  const registerOptions: RegisterOptions = {
    required: otherProps.required,
    valueAsNumber: castAsNumber,
  }

  return (
    <select
      {...otherProps}
      style={{
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239fa6b2' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right .5rem center',
        backgroundSize: '1.5em 1.5em',
      }}
      className={classes}
      ref={register ? register(registerOptions) : undefined}
    >
      {children}
    </select>
  )
}

export default SelectInput
