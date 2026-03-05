import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AddBookModal } from './components/AddBook/AddBookModal'
import { Header } from './components/Header/Header'
import { mockBooks, mockWishlist } from './data'
import { MyBooks } from './pages/MyBooks'
import { Wishlist } from './pages/Wishlist'
import { Path } from './utils/paths'
import { type Book, Mode } from './utils/types'

interface ModalState {
  mode: Mode
  book?: Book
}

function App() {
  const location = useLocation()

  const [books, setBooks] = useState<Book[]>(mockBooks)
  const [wishlist, setWishlist] = useState<Book[]>(mockWishlist)
  const [modal, setModal] = useState<ModalState | null>(null)

  const handleAddBookClick = () => {
    const mode = location.pathname === Path.WISHLIST ? Mode.WISHLIST : Mode.MY_BOOKS
    setModal({ mode })
  }

  const handleModalSubmit = (book: Book) => {
    if (modal?.mode === Mode.WISHLIST) {
      setWishlist((prev) =>
        modal.book ? prev.map((b) => (b.id === book.id ? book : b)) : [book, ...prev],
      )
    } else {
      setBooks((prev) =>
        modal?.book ? prev.map((b) => (b.id === book.id ? book : b)) : [book, ...prev],
      )
    }
    setModal(null)
  }

  const handleDeleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  const handleDeleteWishlistBook = (id: string) => {
    setWishlist((prev) => prev.filter((b) => b.id !== id))
  }

  const handleEditBook = (book: Book) => {
    setModal({ mode: Mode.MY_BOOKS, book })
  }

  const handleEditWishlistBook = (book: Book) => {
    setModal({ mode: Mode.WISHLIST, book })
  }

  const handleMoveToMyBooks = (book: Book) => {
    setWishlist((prev) => prev.filter((b) => b.id !== book.id))
    setBooks((prev) => [book, ...prev])
  }

  return (
    <div className="min-h-screen bg-surface-50 text-text-primary">
      <Header onAddBookClick={handleAddBookClick} />
      <main className="mx-auto max-w-[1600px] px-8 py-10">
        <Routes>
          <Route
            path={Path.MY_BOOKS}
            element={
              <MyBooks books={books} onDeleteBook={handleDeleteBook} onEditBook={handleEditBook} />
            }
          />
          <Route
            path={Path.WISHLIST}
            element={
              <Wishlist
                books={wishlist}
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
