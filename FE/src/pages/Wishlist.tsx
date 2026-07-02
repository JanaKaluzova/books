import { useApolloClient, useMutation, useQuery } from '@apollo/client/react'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DeleteBookDocument,
  MyBooksListDocument,
  MyWishlistListDocument,
  UpdateBookDocument,
} from '../api/generated/graphql'
import { BookList } from '../components/BookList/BookList'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { buildBookFilters, PAGE_SIZE } from '../utils/bookFilters'
import { mapGqlBookListItem } from '../utils/mappers'
import { type Book, Mode } from '../utils/types'

export const Wishlist = () => {
  const { enqueueSnackbar } = useSnackbar()
  const client = useApolloClient()

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const hasMore = useRef(true)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const filters = useMemo(() => buildBookFilters(true, debouncedSearch), [debouncedSearch])

  const { data, loading, fetchMore } = useQuery(MyWishlistListDocument, {
    variables: { filters, start: 0, limit: PAGE_SIZE },
  })

  const [deleteBook, { loading: isDeletingBook }] = useMutation(DeleteBookDocument)
  const [updateBook, { loading: isUpdatingBook }] = useMutation(UpdateBookDocument)

  const books = useMemo(
    () => data?.books?.filter((b) => b != null).map(mapGqlBookListItem) ?? [],
    [data?.books],
  )

  const loadMore = useCallback(() => {
    if (loading || !hasMore.current) return
    fetchMore({
      variables: { start: books.length, limit: PAGE_SIZE },
    }).then((result) => {
      if ((result.data?.books?.length ?? 0) < PAGE_SIZE) {
        hasMore.current = false
      }
    })
  }, [loading, books.length, fetchMore])

  const handleDeleteWishlistBook = (id: string) => {
    deleteBook({
      variables: { documentId: id },
      onCompleted: () => {
        client.refetchQueries({ include: [MyWishlistListDocument] })
        enqueueSnackbar('Book deleted successfully', { variant: 'success' })
      },
      onError: () => enqueueSnackbar('Failed to delete book', { variant: 'error' }),
    })
  }

  const handleMoveToMyBooks = (book: Book) => {
    updateBook({
      variables: { documentId: book.id, data: { isWishlist: false } },
      onCompleted: () => {
        client.refetchQueries({ include: [MyBooksListDocument, MyWishlistListDocument] })
        enqueueSnackbar('Book moved to My Books successfully', { variant: 'success' })
      },
      onError: () => enqueueSnackbar('Failed to move book to My Books', { variant: 'error' }),
    })
  }

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loadMore()
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore])

  useEffect(() => {
    hasMore.current = true
    const id = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(id)
  }, [search])

  return (
    <>
      <SearchBar
        title="Wishlist"
        countLabel="on your wishlist"
        value={search}
        onChange={setSearch}
        totalBooks={books.length}
      />
      <BookList
        filteredBooks={books}
        onDeleteBook={handleDeleteWishlistBook}
        onAlreadyRead={handleMoveToMyBooks}
        mode={Mode.WISHLIST}
        isLoading={loading}
        isDeleting={isDeletingBook}
        isMovingBook={isUpdatingBook}
      />
      <div ref={sentinelRef} className="h-4" />
    </>
  )
}
