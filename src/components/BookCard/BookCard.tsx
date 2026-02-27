
import { FC } from 'react'
import type { Book } from '../../types'
import { StarRating } from './StarRating'

interface BookCardProps {
  book: Book
}

export const BookCard: FC<BookCardProps> = ({ book }) => {
  return (
    <div className="group cursor-pointer rounded-2xl bg-white p-3 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface-200">
        <img
          src={book.coverUrl}
          alt={`${book.title} cover`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="p-4 pb-3">
            <span className="inline-block rounded-full bg-accent-500/90 px-3 py-1 text-xs font-medium text-white">
              {book.genre}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5 px-1">
        <h3 className="line-clamp-1 font-serif text-base font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent-500">
          {book.title}
        </h3>
        <p className="line-clamp-1 text-sm text-text-secondary">{book.author}</p>
        <div className="flex items-center justify-between">
          <StarRating rating={book.rating} size="sm" />
          <span className="text-xs text-text-muted">{book.dateRead}</span>
        </div>
      </div>
    </div>
  )
}
