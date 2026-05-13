import type { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Select, type SelectOption } from '../ui/Select'

type RHFSelectProps = {
  name: string
  label: string
  options: SelectOption[]
  placeholder: string
}

export const RHFSelect: FC<RHFSelectProps> = ({ name, label, options, placeholder }) => {
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
