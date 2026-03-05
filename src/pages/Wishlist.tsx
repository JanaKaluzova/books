import { type FC, useMemo, useState } from 'react'
import { BookList } from '../components/BookList'
import { SearchBar } from '../components/SearchBar'
import { type Book, Mode } from '../utils/types'

interface WishlistProps {
  books: Book[]
  onDeleteBook: (id: string) => void
  onEditBook: (book: Book) => void
}

export const Wishlist: FC<WishlistProps> = ({ books, onDeleteBook, onEditBook }) => {
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
        title="Wishlist"
        countLabel="on your wishlist"
        value={search}
        onChange={setSearch}
        totalBooks={filteredBooks.length}
      />
      <BookList
        filteredBooks={filteredBooks}
        onDeleteBook={onDeleteBook}
        onEditBook={onEditBook}
        mode={Mode.WISHLIST}
      />
    </>
  )
}
