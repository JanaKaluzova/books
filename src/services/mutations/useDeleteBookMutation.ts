import { useMutation } from '@apollo/client/react'
import { DELETE_BOOK } from '../../api/graphql/mutations'

interface MutateOptions {
  onSuccess?: () => void
  onError?: () => void
}

export const useDeleteBookMutation = () => {
  const [deleteBookMutation, { loading }] = useMutation(DELETE_BOOK, {
    refetchQueries: ['GetBooks', 'GetWishlist'],
  })

  const mutate = (id: string, options?: MutateOptions) => {
    deleteBookMutation({
      variables: { documentId: id },
      onCompleted: () => options?.onSuccess?.(),
      onError: () => options?.onError?.(),
    })
  }

  return { mutate, isPending: loading }
}
