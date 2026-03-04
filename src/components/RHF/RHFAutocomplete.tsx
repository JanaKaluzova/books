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
  const { data, isLoading, isFetching, isDebouncing, error } = useBookSearchQuery(value)

  const showLoading = (value.trim().length >= 3 && isDebouncing) || isLoading || isFetching

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
          isLoading={showLoading}
          errorMessage={error instanceof Error ? error.message : undefined}
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
