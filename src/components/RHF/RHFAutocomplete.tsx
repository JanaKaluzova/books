import { Controller, useFormContext } from 'react-hook-form'
import { Autocomplete } from '../ui/Autocomplete'
import { BookSearchResult } from '../../types'
import { useBookSearchQuery } from '../../hooks/useBookSearch'
import { FC } from 'react'

interface RHFAutocompleteProps {
  name: string
  label: string
  placeholder: string
  onBookSelect: (result: BookSearchResult) => void
}

export const RHFAutocomplete: FC<RHFAutocompleteProps> = ({
  name,
  label,
  placeholder,
  onBookSelect,
}) => {
  const {
    control,
    formState: { errors },
    clearErrors,
    watch,
  } = useFormContext()

  const value = watch(name) ?? ''
  const { data, isLoading } = useBookSearchQuery(value)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          label={label}
          placeholder={placeholder}
          error={!!errors[name]}
          name={field.name}
          value={field.value}
          results={data ?? []}
          isLoading={isLoading}
          onChange={(val) => {
            field.onChange(val)
            clearErrors(name)
          }}
          onSelect={(result) => {
            field.onChange(result.title)
            clearErrors(name)
            onBookSelect(result)
          }}
        />
      )}
    />
  )
}
