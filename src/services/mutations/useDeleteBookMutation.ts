import { useMutation } from '@apollo/client/react'
import { DeleteBookDocument } from '../../api/graphql/generated/graphql'

interface MutateOptions {
  onSuccess?: () => void
  onError?: () => void
}

export const useDeleteBookMutation = () => {
  const [deleteBookMutation, { loading }] = useMutation(DeleteBookDocument, {
    update: (cache) => {
      cache.evict({ fieldName: 'books' })
      cache.gc()
    },
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
