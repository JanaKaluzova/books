import { useMutation } from '@apollo/client/react'
import { UPDATE_BOOK } from '../../api/graphql/mutations'
import type { BookUpdates } from '../../utils/types'

interface UpdateBookParams {
  id: string
  updates: BookUpdates
}

interface MutateOptions {
  onSuccess?: () => void
  onError?: () => void
}

export const useUpdateBookMutation = () => {
  const [updateBookMutation, { loading }] = useMutation(UPDATE_BOOK, {
    refetchQueries: ['GetBooks', 'GetWishlist'],
  })

  const mutate = ({ id, updates }: UpdateBookParams, options?: MutateOptions) => {
    updateBookMutation({
      variables: { documentId: id, data: updates },
      onCompleted: () => options?.onSuccess?.(),
      onError: () => options?.onError?.(),
    })
  }

  return { mutate, isPending: loading }
}
