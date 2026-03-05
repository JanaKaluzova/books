import { type FC, useState } from 'react'
import type { Book, Mode } from '../utils/types'
import { BookCard2 } from './BookCard/BookCard2'
import { BookDetailModal } from './BookDetail/BookDetailModal'
import { NoResults } from './NoResults'

interface BookListProps {
  filteredBooks: Book[]
  mode: Mode
  onDeleteBook: (id: string) => void
  onEditBook: (book: Book) => void
  onAlreadyRead?: (book: Book) => void
}

export const BookList: FC<BookListProps> = ({
  filteredBooks,
  mode,
  onDeleteBook,
  onEditBook,
  onAlreadyRead,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book)
  }

  const handleCloseDetail = () => {
    setSelectedBook(null)
  }

  const handleDeleteBook = (id: string) => {
    onDeleteBook(id)
    handleCloseDetail()
  }

  const handleEditBook = (book: Book) => {
    onEditBook(book)
    handleCloseDetail()
  }

  const handleAlreadyRead = (book: Book) => {
    onAlreadyRead!(book)
    handleCloseDetail()
  }

  return (
    <>
      {filteredBooks.length === 0 && <NoResults />}

      {filteredBooks.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-2 lg:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredBooks.map((book) => (
            <BookCard2 book={book} key={book.id} onSelectBook={handleSelectBook} />
          ))}
        </div>
      )}
      {selectedBook && (
        <BookDetailModal
          mode={mode}
          book={selectedBook}
          open={!!selectedBook}
          onClose={handleCloseDetail}
          onDelete={handleDeleteBook}
          onEdit={handleEditBook}
          onAlreadyRead={handleAlreadyRead}
        />
      )}
    </>
  )
}
