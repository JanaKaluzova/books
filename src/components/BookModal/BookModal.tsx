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
import { type Book, type BookFormValues, type BookPayload, Mode } from '../../utils/types'
import { Button } from '../ui/Button'
import { BookForm } from './BookForm'
import { FormButtons } from './FormButtons'

interface BookModalProps {
  open: boolean
  book?: Book
  mode: Mode
  isPending: boolean
  onAdd: (book: BookPayload) => void
  onClose: () => void
}

export const BookModal: FC<BookModalProps> = ({ onAdd, open, onClose, book, mode, isPending }) => {
  const isWishlist = mode === Mode.WISHLIST

  const onSubmit = (data: BookFormValues) => {
    onAdd({
      ...data,
      year: Number(data.year),
      pages: Number(data.pages),
      coverUrl: data.coverUrl ?? '',
      dateRead: data.dateRead ?? '',
      description: data.description ?? '',
      rating: data.rating ?? 0,
    })
    onClose()
  }

  const getBookTitle = () => {
    if (book) return `Edit ${book.title}`
    return isWishlist ? 'Add to wishlist' : 'Add a new book'
  }

  const getBookDescription = () => {
    if (book) return 'Update the details of your book.'
    return isWishlist ? 'Save a book you want to read.' : 'Fill in the details of your latest read.'
  }

  return (
    <DialogRoot open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className={MODAL_BACKDROP} />
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 -translate-y-10">
          <DialogContent className="modal-anim relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-2xl">
            <DialogClose asChild>
              <Button variant="icon" onClick={onClose}>
                <X className="h-4 w-4" strokeWidth={2.5} />
              </Button>
            </DialogClose>

            <div className="p-6 pb-0">
              <DialogTitle className="font-serif text-2xl font-bold text-text-primary">
                {getBookTitle()}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-text-secondary">
                {getBookDescription()}
              </DialogDescription>
            </div>

            <BookForm onSubmit={onSubmit} book={book} mode={mode} />
            <FormButtons isEditing={!!book} isPending={isPending} />
          </DialogContent>
        </div>
      </DialogPortal>
    </DialogRoot>
  )
}
