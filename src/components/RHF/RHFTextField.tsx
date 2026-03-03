import { Controller, useFormContext } from "react-hook-form"
import { TextField } from "../ui/TextField"
import { FC, InputHTMLAttributes, ReactNode } from "react"

type RHFTextFieldProps = {
  name: string
  label?: string
  startAdornment?: ReactNode
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>

export const RHFTextField: FC<RHFTextFieldProps> = ({ name, label, startAdornment, ...rest }) => {
  const {
    control,
    formState: { errors },
    clearErrors
  } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          label={label}
          startAdornment={startAdornment}
          error={!!errors[name]}
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