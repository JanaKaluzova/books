import { type FC, useState } from 'react'
import type { Book } from '../utils/types'
import { BookCard2 } from './BookCard/BookCard2'
import { BookDetailModal } from './BookDetail/BookDetailModal'
import { NoResults } from './NoResults'

interface BookListProps {
  filteredBooks: Book[]
  onDeleteBook: (id: string) => void
  onEditBook: (book: Book) => void
}

export const BookList: FC<BookListProps> = ({ filteredBooks, onDeleteBook, onEditBook }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book)
  }

  const handleCloseDetail = () => {
    setSelectedBook(null)
  }

  return (
    <>
      {filteredBooks.length === 0 && <NoResults />}

      {filteredBooks.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-2 lg:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredBooks.map((book) => (
            <BookCard2 book={book} key={book.id} onSelectBook={handleSelectBook} />
          ))}
        </div>
      )}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          open={!!selectedBook}
          onClose={handleCloseDetail}
          onDelete={(id) => {
            onDeleteBook(id)
            handleCloseDetail()
          }}
          onEdit={(book) => {
            onEditBook(book)
            handleCloseDetail()
          }}
        />
      )}
    </>
  )
}
