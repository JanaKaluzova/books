import { useApolloClient, useMutation } from '@apollo/client/react'
import { useSnackbar } from 'notistack'
import { createContext, type FC, type PropsWithChildren, useContext, useState } from 'react'
import {
  CreateBookDocument,
  MyBooksListDocument,
  MyWishlistListDocument,
  UpdateBookDocument,
} from '../api/generated/graphql'
import { BookModal } from '../components/BookModal/BookModal'
import { type Book, type BookPayload, type ModalState, Mode } from '../utils/types'

interface BookModalContextValue {
  openAddModal: (mode: Mode) => void
  openEditModal: (book: Book, mode: Mode) => void
}

const BookModalContext = createContext<BookModalContextValue | null>(null)

export const useBookModal = () => {
  const ctx = useContext(BookModalContext)
  if (!ctx) throw new Error('useBookModal must be used within BookModalProvider')
  return ctx
}

export const BookModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const client = useApolloClient()
  const [modal, setModal] = useState<ModalState | null>(null)

  const [createBook, { loading: isCreating }] = useMutation(CreateBookDocument)
  const [updateBook, { loading: isUpdating }] = useMutation(UpdateBookDocument)

  const openAddModal = (mode: Mode) => setModal({ mode })
  const openEditModal = (book: Book, mode: Mode) => setModal({ mode, book })

  const handleSubmit = (book: BookPayload) => {
    const isWishlist = modal?.mode === Mode.WISHLIST
    if (modal?.book) {
      updateBook({
        variables: { documentId: modal.book.id, data: book },
        onCompleted: () => {
          client.refetchQueries({
            include: [isWishlist ? MyWishlistListDocument : MyBooksListDocument],
          })
          enqueueSnackbar('Book updated successfully', { variant: 'success' })
          setModal(null)
        },
        onError: () => enqueueSnackbar('Failed to update book', { variant: 'error' }),
      })
    } else {
      createBook({
        variables: { data: { ...book, isWishlist } },
        onCompleted: () => {
          client.refetchQueries({
            include: [isWishlist ? MyWishlistListDocument : MyBooksListDocument],
          })
          enqueueSnackbar('Book added successfully', { variant: 'success' })
          setModal(null)
        },
        onError: () => enqueueSnackbar('Failed to add book', { variant: 'error' }),
      })
    }
  }

  return (
    <BookModalContext.Provider value={{ openAddModal, openEditModal }}>
      {children}
      {modal && (
        <BookModal
          open
          mode={modal.mode}
          book={modal.book}
          isPending={isCreating || isUpdating}
          onAdd={handleSubmit}
          onClose={() => setModal(null)}
        />
      )}
    </BookModalContext.Provider>
  )
}
