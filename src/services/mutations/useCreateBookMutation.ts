import { useMutation } from '@tanstack/react-query'
import { createBook } from '../../api/strapiApi'
import type { Book } from '../../utils/types'

interface CreateBookParams {
  book: Omit<Book, 'id'>
  isWishlist: boolean
}

export const useCreateBookMutation = () =>
  useMutation({
    mutationFn: ({ book, isWishlist }: CreateBookParams) => createBook(book, isWishlist),
  })
