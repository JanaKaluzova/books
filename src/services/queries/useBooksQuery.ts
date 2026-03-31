import { useQuery } from '@apollo/client/react'
import { GET_BOOKS, GET_WISHLIST, type GqlBook, toBook } from '../../api/graphql/queries'

interface BooksData {
  books: GqlBook[]
}

export const useBooksQuery = () => {
  const { data, loading } = useQuery<BooksData>(GET_BOOKS)
  return {
    data: data?.books?.map(toBook),
    isLoading: loading,
  }
}

export const useWishlistQuery = () => {
  const { data, loading } = useQuery<BooksData>(GET_WISHLIST)
  return {
    data: data?.books?.map(toBook),
    isLoading: loading,
  }
}
