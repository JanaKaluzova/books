import { useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { BookList } from '../components/BookList/BookList'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { useDeleteBookMutation } from '../services/mutations/useDeleteBookMutation'
import { booksQueryKey, useBooksQuery } from '../services/queries/useBooksQuery'
import { Mode } from '../utils/types'

export const MyBooks = () => {
  const [search, setSearch] = useState('')

  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()

  const { data: books } = useBooksQuery()
  const { mutate: deleteBook, isPending: isDeletingBook } = useDeleteBookMutation()

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return books
    const q = search.toLowerCase()
    return books?.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q),
    )
  }, [search, books])

  const handleDeleteBook = (id: string) => {
    deleteBook(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: booksQueryKey })
        enqueueSnackbar('Book deleted successfully', { variant: 'success' })
      },
      onError: () => enqueueSnackbar('Failed to delete book', { variant: 'error' }),
    })
  }

  return (
    <>
      <SearchBar
        title="My Books"
        countLabel="in your collection"
        value={search}
        onChange={setSearch}
        totalBooks={filteredBooks?.length ?? 0}
      />
      <BookList
        filteredBooks={filteredBooks ?? []}
        onDeleteBook={handleDeleteBook}
        mode={Mode.MY_BOOKS}
        isDeleting={isDeletingBook}
        isMovingBook={false}
      />
    </>
  )
}
