import { useMemo, useState } from 'react'
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar'
import { mockBooks } from './data'
import { BookList } from './components/BookList'
import { AddBookModal } from './components/AddBook/AddBookModal'
import type { Book } from './utils/types'

function App() {
  const [books, setBooks] = useState<Book[]>(mockBooks)
  const [search, setSearch] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null)

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

  const handleAddBook = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev])
  }

  const handleDeleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  const handleEditBook = (updated: Book) => {
    setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
    setBookToEdit(null)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  return (
    <div className="min-h-screen bg-surface-50 text-text-primary">
      <Header onAddBookClick={() => setIsAddModalOpen(true)} />
      <main className="mx-auto max-w-[1600px] px-8 py-10">
        <SearchBar value={search} onChange={handleSearchChange} totalBooks={filteredBooks.length} />
        <BookList
          filteredBooks={filteredBooks}
          onDeleteBook={handleDeleteBook}
          onEditBook={(book) => setBookToEdit(book)}
        />
      </main>
      {isAddModalOpen && (
        <AddBookModal onAdd={handleAddBook} open={isAddModalOpen} onClose={handleCloseModal} />
      )}
      {bookToEdit && (
        <AddBookModal
          book={bookToEdit}
          onAdd={handleEditBook}
          open={!!bookToEdit}
          onClose={() => setBookToEdit(null)}
        />
      )}
    </div>
  )
}

export default App

