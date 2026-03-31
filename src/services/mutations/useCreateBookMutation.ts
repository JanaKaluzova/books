import { useMutation } from '@apollo/client/react'
import { CreateBookDocument } from '../../api/graphql/generated/graphql'
import { toBook } from '../../api/graphql/queries'
import type { Book, BookPayload } from '../../utils/types'

interface CreateBookParams {
  book: BookPayload
  isWishlist: boolean
}

interface MutateOptions {
  onSuccess?: (book: Book) => void
  onError?: () => void
}

export const useCreateBookMutation = () => {
  const [createBookMutation, { loading }] = useMutation(CreateBookDocument, {
    update: (cache) => {
      cache.evict({ fieldName: 'books' })
      cache.gc()
    },
  })

  const mutate = ({ book, isWishlist }: CreateBookParams, options?: MutateOptions) => {
    createBookMutation({
      variables: { data: { ...book, isWishlist } },
      onCompleted: (data) => {
        if (data.createBook) options?.onSuccess?.(toBook(data.createBook))
      },
      onError: () => options?.onError?.(),
    })
  }

  return { mutate, isPending: loading }
}
