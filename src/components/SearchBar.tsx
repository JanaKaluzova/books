import { Search } from 'lucide-react'
import { FC } from 'react'

interface SearchBarProps {
  value: string
  totalBooks: number
  onChange: (value: string) => void
}

export const SearchBar: FC<SearchBarProps> = ({ value, onChange, totalBooks }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-serif text-3xl font-bold text-text-primary">My Books</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {totalBooks} book{totalBooks !== 1 ? 's' : ''} in your collection
        </p>
      </div>
      <div className="relative w-full sm:w-[480px]">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" strokeWidth={2} />
        <input
          type="text"
          name='search'
          placeholder="Search by title, author, or genre…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-surface-200 bg-white py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/15"
        />
      </div>
    </div>
  )
}
