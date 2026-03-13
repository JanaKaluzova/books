import type { FC } from 'react'
import type { Book } from '../../utils/types'
import { BookCover } from './BookCover'

interface BookCardProps {
  book: Book
  onSelectBook: (book: Book) => void
}

export const BookCard2: FC<BookCardProps> = ({ book, onSelectBook }) => {
  return (
    <button
      type="button"
      onClick={() => onSelectBook(book)}
      className="group w-full text-left cursor-pointer rounded-2xl shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2"
    >
      <div className="relative aspect-[2/3] w-full bg-surface-200 [clip-path:inset(0_round_1rem)]">
        <BookCover
          src={book.coverUrl}
          alt={`${book.title} cover`}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105 rounded-2xl"
        />

        <div className="absolute inset-x-2 bottom-2 rounded-xl bg-white/75 backdrop-blur-md border border-white/40 px-3.5 py-2.5 shadow-lg opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <h3 className="line-clamp-1 font-serif text-sm font-bold text-text-primary">
            {book.title}
          </h3>
          <div className="mt-1 flex items-center justify-between">
            <p className="line-clamp-1 text-xs text-text-primary/70">{book.author}</p>
          </div>
        </div>

        <div className="absolute top-3 left-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-block rounded-full bg-accent-500/90 px-3 py-1 text-xs font-medium text-white shadow-sm">
            {book.genre}
          </span>
        </div>
      </div>
    </button>
  )
}
