import type { FC, InputHTMLAttributes, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '../ui/TextField'

type RHFTextFieldProps = {
  name: string
  label: string
  startAdornment?: ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>

export const RHFTextField: FC<RHFTextFieldProps> = ({ name, label, startAdornment, ...rest }) => {
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
        <TextField
          label={label}
          startAdornment={startAdornment}
          error={!!errors[name]}
          errorMessage={errorMessage}
          name={field.name}
          value={field.value}
          onChange={(e) => {
            field.onChange(e)
            clearErrors(name)
          }}
          {...rest}
        />
      )}
    />
  )
}
