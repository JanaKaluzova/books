import { useQuery } from '@tanstack/react-query'
import { fetchBooks, fetchWishlist } from '../../api/strapiApi'

export const booksQueryKey = ['books']
export const wishlistQueryKey = ['wishlist']

export const useBooksQuery = () =>
  useQuery({
    queryKey: booksQueryKey,
    queryFn: fetchBooks,
  })

export const useWishlistQuery = () =>
  useQuery({
    queryKey: wishlistQueryKey,
    queryFn: fetchWishlist,
  })
