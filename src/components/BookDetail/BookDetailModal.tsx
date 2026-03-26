import {
  Close as DialogClose,
  Content as DialogContent,
  Description as DialogDescription,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
  Root as DialogRoot,
  Title as DialogTitle,
} from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { FC } from 'react'
import { MODAL_BACKDROP } from '../../styles'
import { type Book, Mode } from '../../utils/types'
import { StarRating } from '../BookCard/StarRating'
import { Button } from '../ui/Button'
import { BookDetailButtons } from './BookDetailButtons'
import { MetaItem } from './MetaItem'

interface BookDetailModalProps {
  book: Book
  open: boolean
  mode: Mode
  isDeleting: boolean
  isMovingBook: boolean
  onClose: () => void
  onDelete: (id: string) => void
  onAlreadyRead: (book: Book) => void
}

export const BookDetailModal: FC<BookDetailModalProps> = ({
  book,
  open,
  onClose,
  onDelete,
  onAlreadyRead,
  mode,
  isDeleting,
  isMovingBook,
}) => {
  const isNotWishlist = mode === Mode.MY_BOOKS

  return (
    <DialogRoot open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className={MODAL_BACKDROP} />
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <DialogContent className="modal-anim relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-2xl sm:flex-row">
            <DialogClose asChild>
              <Button variant="icon" onClick={onClose}>
                <X className="h-4 w-4" strokeWidth={2.5} />
              </Button>
            </DialogClose>

            <div className="relative flex-shrink-0 sm:w-56">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="h-64 w-full object-cover sm:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-white/60" />
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
              <span className="self-start rounded-full bg-accent-500/10 px-3 py-1 text-xs font-medium text-accent-600">
                {book.genre}
              </span>

              <DialogTitle className="mt-3 font-serif text-2xl font-bold leading-tight text-text-primary">
                {book.title}
              </DialogTitle>
              <p className="mt-1 text-text-secondary">by {book.author}</p>

              {isNotWishlist && (
                <div className="mt-4">
                  <StarRating rating={book.rating} />
                </div>
              )}

              <DialogDescription className="mt-5 text-sm leading-relaxed text-text-secondary">
                {book.description}
              </DialogDescription>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <MetaItem label="Year Published" value={String(book.year)} />
                <MetaItem label="Pages" value={String(book.pages)} />
                {isNotWishlist && <MetaItem label="Date Read" value={book.dateRead} />}
              </div>

              <BookDetailButtons
                book={book}
                onDelete={onDelete}
                onAlreadyRead={onAlreadyRead}
                onClose={onClose}
                mode={mode}
                isDeleting={isDeleting}
                isMovingBook={isMovingBook}
              />
            </div>
          </DialogContent>
        </div>
      </DialogPortal>
    </DialogRoot>
  )
}
