import { useMutation } from '@apollo/client/react'
import { UpdateBookDocument } from '../../api/graphql/generated/graphql'
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
  const [updateBookMutation, { loading }] = useMutation(UpdateBookDocument, {
    update: (cache) => {
      cache.evict({ fieldName: 'books' })
      cache.gc()
    },
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
