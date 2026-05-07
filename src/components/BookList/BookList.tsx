import { useQuery } from '@apollo/client/react'
import { type FC, useState } from 'react'
import { BookDetailDocument } from '../../api/generated/graphql'
import { mapGqlBook } from '../../utils/mappers'
import type { Book, BookListItem, Mode } from '../../utils/types'
import { BookCard } from '../BookCard/BookCard'
import { BookDetailModal } from '../BookDetail/BookDetailModal'
import { NoResults } from '../NoResults/NoResults'

interface BookListProps {
  filteredBooks: BookListItem[]
  mode: Mode
  isLoading?: boolean
  isDeleting: boolean
  isMovingBook: boolean
  onDeleteBook: (id: string) => void
  onAlreadyRead?: (book: Book) => void
}

export const BookList: FC<BookListProps> = ({
  filteredBooks,
  mode,
  isLoading,
  onDeleteBook,
  onAlreadyRead,
  isDeleting,
  isMovingBook,
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null)

  const { data: detailData } = useQuery(BookDetailDocument, {
    variables: { documentId: selectedBookId! },
    skip: !selectedBookId,
  })

  const selectedBook = detailData?.book ? mapGqlBook(detailData.book) : null

  const handleCloseDetail = () => setSelectedBookId(null)

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
            <BookCard
              book={book}
              key={book.id}
              isLoading={isLoading}
              onSelectBook={setSelectedBookId}
            />
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
