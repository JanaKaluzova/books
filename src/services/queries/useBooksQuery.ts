import { useQuery } from '@apollo/client/react'
import { GetBooksDocument, GetWishlistDocument } from '../../api/graphql/generated/graphql'
import { toBook } from '../../api/graphql/queries'

export const useBooksQuery = () => {
  const { data, loading } = useQuery(GetBooksDocument)
  return {
    data: data?.books?.flatMap((b) => (b ? [toBook(b)] : [])),
    isLoading: loading,
  }
}

export const useWishlistQuery = () => {
  const { data, loading } = useQuery(GetWishlistDocument)
  return {
    data: data?.books?.flatMap((b) => (b ? [toBook(b)] : [])),
    isLoading: loading,
  }
}
