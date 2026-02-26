import { useMemo, useState } from 'react'
import { Header } from './components/Header/Header'
import { SearchBar } from './components/SearchBar'
import { mockBooks } from './data'
import { BookList } from './components/BookList'

function App() {
  const [search, setSearch] = useState('')

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return mockBooks
    const q = search.toLowerCase()
    return mockBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q),
    )
  }, [search])

  return (
    <div className="min-h-screen bg-surface-50 text-text-primary">
      <Header />
      <main className="mx-auto max-w-[1600px] px-8 py-10">
        <SearchBar value={search} onChange={setSearch} totalBooks={filteredBooks.length} />
        <BookList filteredBooks={filteredBooks} />
      </main>
    </div>
  )
}

export default App
