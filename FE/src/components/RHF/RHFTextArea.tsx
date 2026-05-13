import type { FC, TextareaHTMLAttributes } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextArea } from '../ui/TextArea'

type RHFTextAreaProps = {
  name: string
  label: string
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>

export const RHFTextArea: FC<RHFTextAreaProps> = ({ name, label, ...rest }) => {
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
        <TextArea
          label={label}
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
