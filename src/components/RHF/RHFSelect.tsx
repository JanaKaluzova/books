import { Controller, useFormContext } from 'react-hook-form'
import { Select } from '../ui/Select'
import { FC } from 'react'
import { SelectOption } from '../ui/Select'

type RHFSelectProps = {
  name: string
  label?: string
  options: SelectOption[]
  placeholder?: string
}

export const RHFSelect: FC<RHFSelectProps> = ({ name, label, options, placeholder }) => {
  const {
    control,
    formState: { errors },
    clearErrors,
  } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          label={label}
          error={!!errors[name]}
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
