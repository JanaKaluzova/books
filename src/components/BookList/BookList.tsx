import { type FC, useState } from 'react'
import type { Book, Mode } from '../../utils/types'
import { BookCard2 } from '../BookCard/BookCard2'
import { BookDetailModal } from '../BookDetail/BookDetailModal'
import { NoResults } from '../NoResults/NoResults'

interface BookListProps {
  filteredBooks: Book[]
  mode: Mode
  isDeleting: boolean
  isMovingBook: boolean
  onDeleteBook: (id: string) => void
  onAlreadyRead?: (book: Book) => void
}

export const BookList: FC<BookListProps> = ({
  filteredBooks,
  mode,
  onDeleteBook,
  onAlreadyRead,
  isDeleting,
  isMovingBook,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const handleCloseDetail = () => setSelectedBook(null)

  const handleDeleteBook = (id: string) => {
    onDeleteBook(id)
    handleCloseDetail()
  }

  const handleAlreadyRead = (book: Book) => {
    onAlreadyRead?.(book)
    handleCloseDetail()
  }

  return (
    <>
      {filteredBooks.length === 0 && <NoResults />}

      {filteredBooks.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-2 lg:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredBooks.map((book) => (
            <BookCard2 book={book} key={book.id} onSelectBook={setSelectedBook} />
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
          onAlreadyRead={handleAlreadyRead}
          isDeleting={isDeleting}
          isMovingBook={isMovingBook}
        />
      )}
    </>
  )
}
