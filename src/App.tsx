import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AddBookModal } from './components/AddBook/AddBookModal'
import { Header } from './components/Header/Header'
import { MyBooks } from './pages/MyBooks'
import { Wishlist } from './pages/Wishlist'
import { useCreateBookMutation } from './services/mutations/useCreateBookMutation'
import { useDeleteBookMutation } from './services/mutations/useDeleteBookMutation'
import { useUpdateBookMutation } from './services/mutations/useUpdateBookMutation'
import {
  booksQueryKey,
  useBooksQuery,
  useWishlistQuery,
  wishlistQueryKey,
} from './services/queries/useBooksQuery'
import { Path } from './utils/paths'
import { type Book, type ModalState, Mode } from './utils/types'

function App() {
  const location = useLocation()
  const queryClient = useQueryClient()
  const [modal, setModal] = useState<ModalState | null>(null)

  const { data: books } = useBooksQuery()
  const { data: wishlist } = useWishlistQuery()

  const { mutate: createBook, isPending: isCreatingBook } = useCreateBookMutation()
  const { mutate: updateBook, isPending: isUpdatingBook } = useUpdateBookMutation()
  const { mutate: deleteBook, isPending: isDeletingBook } = useDeleteBookMutation()

  const handleAddBookClick = () => {
    const mode = location.pathname === Path.WISHLIST ? Mode.WISHLIST : Mode.MY_BOOKS
    setModal({ mode })
  }

  const handleModalSubmit = (book: Book) => {
    const isWishlist = modal?.mode === Mode.WISHLIST
    if (modal?.book?.id) {
      updateBook(
        {
          id: modal.book.id,
          updates: book,
        },
        {
          onSuccess: () =>
            queryClient.invalidateQueries({
              queryKey: isWishlist ? wishlistQueryKey : booksQueryKey,
            }),
        },
      )
    } else {
      createBook(
        { book: book, isWishlist },
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

  const handleDeleteBook = (id: string) => {
    deleteBook(id, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: booksQueryKey }),
    })
  }

  const handleDeleteWishlistBook = (id: string) => {
    deleteBook(id, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: wishlistQueryKey }),
    })
  }

  const handleEditBook = (book: Book) => setModal({ mode: Mode.MY_BOOKS, book })
  const handleEditWishlistBook = (book: Book) => setModal({ mode: Mode.WISHLIST, book })

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
    <div className="min-h-screen bg-surface-50 text-text-primary">
      <Header onAddBookClick={handleAddBookClick} />
      <main className="mx-auto max-w-[1600px] px-8 py-10">
        <Routes>
          <Route
            path={Path.MY_BOOKS}
            element={
              <MyBooks
                books={books ?? []}
                onDeleteBook={handleDeleteBook}
                onEditBook={handleEditBook}
              />
            }
          />
          <Route
            path={Path.WISHLIST}
            element={
              <Wishlist
                books={wishlist ?? []}
                onDeleteBook={handleDeleteWishlistBook}
                onEditBook={handleEditWishlistBook}
                onAlreadyRead={handleMoveToMyBooks}
              />
            }
          />
        </Routes>
      </main>

      {modal && (
        <AddBookModal
          mode={modal.mode}
          book={modal.book}
          open
          onAdd={handleModalSubmit}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

export default App
