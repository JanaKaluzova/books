import { Controller, useFormContext, RegisterOptions } from "react-hook-form"
import { TextField } from "../ui/TextField"
import { FC, InputHTMLAttributes, ReactNode } from "react"

type RHFTextFieldProps = {
  name: string
  label?: string
  startAdornment?: ReactNode
  rules?: RegisterOptions
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>

export const RHFTextField: FC<RHFTextFieldProps> = ({ name, label, startAdornment, rules, ...rest }) => {
  const {
    control,
    formState: { errors },
    clearErrors
  } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
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