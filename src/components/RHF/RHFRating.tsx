import { Controller, useFormContext } from 'react-hook-form'
import { StarRating } from '../BookCard/StarRating'
import { FC } from 'react'

interface RHFRatingProps {
  name: string
  label?: string
}

export const RHFRating: FC<RHFRatingProps> = ({ name, label }) => {
  const {
    control
  } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          {label && (
            <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-text-secondary">
              {label}
            </label>
          )}
          <div className="pt-1">
            <StarRating rating={field.value} onChange={(value) => field.onChange(value)} />
          </div>
        </div>
      )}
    />
  )
}
