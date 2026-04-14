import { useApolloClient, useMutation, useQuery } from '@apollo/client/react'
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import {
  DeleteBookDocument,
  MyBooksDocument,
  MyWishlistDocument,
  UpdateBookDocument,
} from '../api/generated/graphql'
import { BookList } from '../components/BookList/BookList'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { mapGqlBook } from '../utils/mappers'
import { type Book, Mode } from '../utils/types'

export const Wishlist = () => {
  const [search, setSearch] = useState('')

  const { enqueueSnackbar } = useSnackbar()

  // TODO: change the query so it returns the attributes needed for the list, then create another query for the book details
  const client = useApolloClient()
  const { data } = useQuery(MyWishlistDocument)
  const [deleteBook, { loading: isDeletingBook }] = useMutation(DeleteBookDocument)
  const [updateBook, { loading: isUpdatingBook }] = useMutation(UpdateBookDocument)

  const books = useMemo(
    () => data?.books?.filter((b) => b != null).map(mapGqlBook) ?? [],
    [data?.books],
  )

  //TODO: move the filtering to BE, we would like to use infinite scrolling instead of pagination
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

  const handleDeleteWishlistBook = (id: string) => {
    deleteBook({
      variables: { documentId: id },
      onCompleted: () => {
        client.refetchQueries({ include: [MyWishlistDocument] })
        enqueueSnackbar('Book deleted successfully', { variant: 'success' })
      },
      onError: () => enqueueSnackbar('Failed to delete book', { variant: 'error' }),
    })
  }

  const handleMoveToMyBooks = (book: Book) => {
    updateBook({
      variables: { documentId: book.id, data: { isWishlist: false } },
      onCompleted: () => {
        client.refetchQueries({ include: [MyBooksDocument, MyWishlistDocument] })
      },
      onError: () => enqueueSnackbar('Failed to move book to My Books', { variant: 'error' }),
    })
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
