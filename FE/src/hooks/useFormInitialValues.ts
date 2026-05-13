import { useEffect, useRef } from 'react'
import type { FieldValues, UseFormReset } from 'react-hook-form'

export const useFormInitialValues = <T extends FieldValues>(
  initialValues: T | undefined,
  reset: UseFormReset<T>,
) => {
  const firstInitial = useRef(false)

  useEffect(() => {
    if (initialValues && !firstInitial.current) {
      firstInitial.current = true
      reset(initialValues)
    }
  }, [initialValues, reset])
}
