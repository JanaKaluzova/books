import type { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { MonthYearPicker } from '../ui/MonthYearPicker'

interface RHFMonthYearPickerProps {
  name: string
  label: string
  placeholder: string
}

export const RHFMonthYearPicker: FC<RHFMonthYearPickerProps> = ({ name, label, placeholder }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <MonthYearPicker
          name={field.name}
          label={label}
          placeholder={placeholder}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  )
}
