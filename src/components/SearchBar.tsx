import { Search } from 'lucide-react'
import type { FC } from 'react'
import { TextField } from './ui/TextField'

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
      <div className="w-full sm:w-[480px]">
        <TextField
          startAdornment={<Search className="h-4 w-4" strokeWidth={2} />}
          placeholder="Search by title, author, or genre…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name="search"
          className="bg-white focus:border-accent-500/50 focus:ring-accent-500/15"
        />
      </div>
    </div>
  )
}
