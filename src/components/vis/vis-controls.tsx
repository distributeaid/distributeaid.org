import { FC, PropsWithChildren } from 'react'
import Select, { Props as SelectProps } from 'react-select'

/*
Control Section
================================================================================
*/
type ControlSectionProps = {
  label?: string
  margin?: {
    left?: number
    right?: number
  }
}

export const ControlSection: FC<PropsWithChildren<ControlSectionProps>> = ({
  label,
  margin,
  children,
}) => {
  return (
    <div
      className="flex items-center gap-2"
      style={{
        marginLeft: !label ? '${margin.left}px' : ``,
        marginRight: margin?.right ? `${margin.right}px` : '',
      }}
    >
      {label && (
        <h2
          className="shrink-0 text-right m-0"
          // leave space for the border & padding so it lines up with the chart
          style={{
            width: margin?.left ? `${margin.left - 10}px` : '',
          }}
        >
          {label}
        </h2>
      )}

      <div className="flex flex-wrap gap-5 border-l-2 py-5">
        {children && <>{children}</>}
      </div>
    </div>
  )
}

/*
Select Control
================================================================================
*/
type SelectOption = {
  value: string
  label: string
}

type SelectControlProps = {
  label: string
  values: string[]
  defaultValue?: string | undefined
  setValue: (value: string) => void
} & SelectProps

export const SelectControl: FC<SelectControlProps> = ({
  label,
  values,
  defaultValue,
  setValue,
  ...props
}) => {
  const options: SelectOption[] = values.map((value) => {
    return {
      value: value,
      label: value,
    }
  })
  const defaultOption = defaultValue
    ? { value: defaultValue, label: defaultValue }
    : null

  return (
    <div className="flex items-center">
      <label className="w-20 mr-2 text-right">{label}:</label>
      <Select
        className="w-64 react-select"
        options={options}
        defaultValue={defaultOption}
        onChange={(untypedOption: any, actionMeta) => {
          const option = untypedOption as SelectOption
          setValue(option?.value)
        }}
        {...props}
      />
    </div>
  )
}

/*
Input Control
================================================================================
*/
type TextInputControlProps = {
  label: string
  setValue: (value: string) => void
}

export const TextInputControl: FC<TextInputControlProps> = ({
  label,
  setValue,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <label className="w-20 mr-2 text-right">{label}:</label>
      <input
        className="w-64"
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value)
        }}
      />
    </div>
  )
}
