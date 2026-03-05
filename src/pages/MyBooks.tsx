import { type FC, useMemo, useState } from 'react'
import { BookList } from '../components/BookList'
import { SearchBar } from '../components/SearchBar'
import { type Book, Mode } from '../utils/types'

interface MyBooksProps {
  books: Book[]
  onDeleteBook: (id: string) => void
  onEditBook: (book: Book) => void
}

export const MyBooks: FC<MyBooksProps> = ({ books, onDeleteBook, onEditBook }) => {
  const [search, setSearch] = useState('')

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

  return (
    <>
      <SearchBar
        title="My Books"
        countLabel="in your collection"
        value={search}
        onChange={setSearch}
        totalBooks={filteredBooks.length}
      />
      <BookList
        filteredBooks={filteredBooks}
        onDeleteBook={onDeleteBook}
        onEditBook={onEditBook}
        mode={Mode.MY_BOOKS}
      />
    </>
  )
}
