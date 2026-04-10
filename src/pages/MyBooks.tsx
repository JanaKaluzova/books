import { useQuery } from '@apollo/client/react'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { MyBooksDocument } from '../api/generated/graphql'
import { BookList } from '../components/BookList/BookList'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { useDeleteBookMutation } from '../services/mutations/useDeleteBookMutation'
import { mapGqlBook } from '../utils/mappers'
import { Mode } from '../utils/types'

export const MyBooks = () => {
  const [search, setSearch] = useState('')

  const { enqueueSnackbar } = useSnackbar()

  const { data } = useQuery(MyBooksDocument)
  const { mutate: deleteBook, isPending: isDeletingBook } = useDeleteBookMutation()

  const books = useMemo(
    () => data?.books?.filter((b) => b != null).map(mapGqlBook) ?? [],
    [data?.books],
  )

  //TODO: move the filtering to BE, we would like to use infinite scrolling instead of pagination
  const filteredBooks = useMemo(() => {
    if (!search.trim()) return books

    const q = search.toLowerCase()
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q),
    )
  }, [search, books])

  const handleDeleteBook = (id: string) => {
    deleteBook(id, {
      onSuccess: () => enqueueSnackbar('Book deleted successfully', { variant: 'success' }),
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
