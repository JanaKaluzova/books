import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { BookList } from '../components/BookList/BookList'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { useDeleteBookMutation } from '../services/mutations/useDeleteBookMutation'
import { useUpdateBookMutation } from '../services/mutations/useUpdateBookMutation'
import { useWishlistQuery } from '../services/queries/useBooksQuery'
import { type Book, Mode } from '../utils/types'

export const Wishlist = () => {
  const [search, setSearch] = useState('')

  const { enqueueSnackbar } = useSnackbar()

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
      onSuccess: () => enqueueSnackbar('Book deleted successfully', { variant: 'success' }),
      onError: () => enqueueSnackbar('Failed to delete book', { variant: 'error' }),
    })
  }

  const handleMoveToMyBooks = (book: Book) => {
    updateBook({ id: book.id, updates: { isWishlist: false } })
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
