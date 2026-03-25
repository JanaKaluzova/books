import { useMutation } from '@tanstack/react-query'
import { deleteBook } from '../../api/strapiApi'

export const useDeleteBookMutation = () =>
  useMutation({
    mutationFn: (id: string) => deleteBook(id),
  })
