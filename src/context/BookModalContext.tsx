import { useQueryClient } from '@tanstack/react-query'
import { createContext, useContext, useState, type FC, type ReactNode } from 'react'
import { BookModal } from '../components/BookModal/BookModal'
import { useCreateBookMutation } from '../services/mutations/useCreateBookMutation'
import { useUpdateBookMutation } from '../services/mutations/useUpdateBookMutation'
import { booksQueryKey, wishlistQueryKey } from '../services/queries/useBooksQuery'
import { type Book, type ModalState, Mode } from '../utils/types'

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

export const BookModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient()
  const [modal, setModal] = useState<ModalState | null>(null)

  const { mutate: createBook, isPending: isCreating } = useCreateBookMutation()
  const { mutate: updateBook, isPending: isUpdating } = useUpdateBookMutation()

  const openAddModal = (mode: Mode) => setModal({ mode })
  const openEditModal = (book: Book, mode: Mode) => setModal({ mode, book })

  const handleSubmit = (book: Book) => {
    const isWishlist = modal?.mode === Mode.WISHLIST
    if (modal?.book) {
      updateBook(
        { id: modal.book.id, updates: book },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({
              queryKey: isWishlist ? wishlistQueryKey : booksQueryKey,
            }),
        },
      )
    } else {
      createBook(
        { book, isWishlist },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({
              queryKey: isWishlist ? wishlistQueryKey : booksQueryKey,
            }),
        },
      )
    }
    setModal(null)
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
