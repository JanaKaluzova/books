import { Controller, useFormContext, RegisterOptions } from 'react-hook-form'
import { Select } from '../ui/Select'
import { FC } from 'react'
import { SelectOption } from '../ui/Select'

type RHFSelectProps = {
  name: string
  label?: string
  options: SelectOption[]
  placeholder?: string
  rules?: RegisterOptions
}

export const RHFSelect: FC<RHFSelectProps> = ({ name, label, options, placeholder, rules }) => {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <Select
          label={label}
          error={!!errors[name]}
          errorMessage={errorMessage}
          options={options}
          placeholder={placeholder}
          name={field.name}
          value={field.value}
          onChange={(value) => {
            field.onChange(value)
            clearErrors(name)
          }}
        />
      )}
    />
  )
}
