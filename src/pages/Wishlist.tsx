import { useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { BookList } from '../components/BookList/BookList'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { useDeleteBookMutation } from '../services/mutations/useDeleteBookMutation'
import { useUpdateBookMutation } from '../services/mutations/useUpdateBookMutation'
import {
  booksQueryKey,
  useWishlistQuery,
  wishlistQueryKey,
} from '../services/queries/useBooksQuery'
import { type Book, Mode } from '../utils/types'

export const Wishlist = () => {
  const [search, setSearch] = useState('')

  const queryClient = useQueryClient()

  const { data: wishlist } = useWishlistQuery()
  const { mutate: deleteBook, isPending: isDeletingBook } = useDeleteBookMutation()
  const { mutate: updateBook, isPending: isUpdatingBook } = useUpdateBookMutation()

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return wishlist
    const q = search.toLowerCase()
    return wishlist?.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q),
    )
  }, [search, wishlist])

  const handleDeleteWishlistBook = (id: string) => {
    deleteBook(id, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: wishlistQueryKey }),
    })
  }

  const handleMoveToMyBooks = (book: Book) => {
    updateBook(
      { id: book.id, updates: { isWishlist: false } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: booksQueryKey })
          queryClient.invalidateQueries({ queryKey: wishlistQueryKey })
        },
      },
    )
  }

  return (
    <>
      <SearchBar
        title="Wishlist"
        countLabel="on your wishlist"
        value={search}
        onChange={setSearch}
        totalBooks={filteredBooks?.length ?? 0}
      />
      <BookList
        filteredBooks={filteredBooks ?? []}
        onDeleteBook={handleDeleteWishlistBook}
        onAlreadyRead={handleMoveToMyBooks}
        mode={Mode.WISHLIST}
        isDeleting={isDeletingBook}
        isMovingBook={isUpdatingBook}
      />
    </>
  )
}
