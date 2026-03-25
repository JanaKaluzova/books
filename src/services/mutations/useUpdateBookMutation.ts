import { useMutation } from '@tanstack/react-query'
import { updateBook } from '../../api/strapiApi'
import type { BookUpdates } from '../../utils/types'

interface UpdateBookParams {
  id: string
  updates: BookUpdates
}

export const useUpdateBookMutation = () =>
  useMutation({
    mutationFn: ({ id, updates }: UpdateBookParams) => updateBook(id, updates),
  })
