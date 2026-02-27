import { X } from 'lucide-react'
import type { Book } from '../../types'
import { StarRating } from '../BookCard/StarRating'
import { FC } from 'react'
import { MetaItem } from './MetaItem'
import { MODAL_OVERLAY, MODAL_BACKDROP, MODAL_CLOSE_BUTTON } from '../../styles'

interface BookDetailModalProps {
  book: Book
  onClose: () => void
}

export const BookDetailModal: FC<BookDetailModalProps> = ({ book, onClose }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={MODAL_OVERLAY}
      onClick={onClose}
    >
      <div className={MODAL_BACKDROP} />
      <div
        role="dialog"
        aria-modal="true"
        className="modal-anim relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-2xl sm:flex-row"
      >
        <button
          type="button"
          onClick={onClose}
          className={MODAL_CLOSE_BUTTON}
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="relative flex-shrink-0 sm:w-56">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-64 w-full object-cover sm:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-white/60" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <span className="inline-block rounded-full bg-accent-500/10 px-3 py-1 text-xs font-medium text-accent-600">
            {book.genre}
          </span>

          <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-text-primary">
            {book.title}
          </h2>
          <p className="mt-1 text-text-secondary">by {book.author}</p>

          <div className="mt-4">
            <StarRating rating={book.rating} />
          </div>

          <p className="mt-5 text-sm leading-relaxed text-text-secondary">{book.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <MetaItem label="Year Published" value={String(book.year)} />
            <MetaItem label="Pages" value={String(book.pages)} />
            <MetaItem label="Date Read" value={book.dateRead} />
            <MetaItem label="Rating" value={`${book.rating} / 5`} />
          </div>
        </div>
      </div>
    </div>
  )
}



