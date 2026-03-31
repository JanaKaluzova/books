import { useMutation } from '@apollo/client/react'
import { CREATE_BOOK } from '../../api/graphql/mutations'
import { type GqlBook, toBook } from '../../api/graphql/queries'
import type { Book } from '../../utils/types'

interface CreateBookParams {
  book: Omit<Book, 'id'>
  isWishlist: boolean
}

interface MutateOptions {
  onSuccess?: (book: Book) => void
  onError?: () => void
}

export const useCreateBookMutation = () => {
  const [createBookMutation, { loading }] = useMutation(CREATE_BOOK, {
    refetchQueries: ['GetBooks', 'GetWishlist'],
  })

  const mutate = ({ book, isWishlist }: CreateBookParams, options?: MutateOptions) => {
    createBookMutation({
      variables: { data: { ...book, isWishlist } },
      onCompleted: (data) =>
        options?.onSuccess?.(toBook((data as { createBook: GqlBook }).createBook)),
      onError: () => options?.onError?.(),
    })
  }

  return { mutate, isPending: loading }
}
