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
import type { Book, BookFormValues } from '../../utils/types'
import { Button } from '../ui/Button'
import { AddBookForm } from './AddBookForm'
import { FormButtons } from './FormButtons'

interface AddBookModalProps {
  open: boolean
  book?: Book
  onAdd: (book: Book) => void
  onClose: () => void
}

export const AddBookModal: FC<AddBookModalProps> = ({ onAdd, open, onClose, book }) => {
  const onSubmit = (data: BookFormValues) => {
    const saved: Book = {
      ...data,
      id: book?.id ?? crypto.randomUUID(),
      year: Number(data.year),
      pages: Number(data.pages),
      coverUrl: data.coverUrl ?? '',
      dateRead: data.dateRead ?? '',
      description: data.description ?? '',
      rating: data.rating ?? 0,
    }
    onAdd(saved)
    onClose()
  }

  return (
    <DialogRoot open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className={MODAL_BACKDROP} />
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <DialogContent className="modal-anim relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-2xl">
            <DialogClose asChild>
              <Button variant="icon" onClick={onClose}>
                <X className="h-4 w-4" strokeWidth={2.5} />
              </Button>
            </DialogClose>

            <div className="p-6 pb-0">
              <DialogTitle className="font-serif text-2xl font-bold text-text-primary">
                {book ? 'Edit book' : 'Add a new book'}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-text-secondary">
                {book
                  ? 'Update the details of your book.'
                  : 'Fill in the details of your latest read.'}
              </DialogDescription>
            </div>

            <AddBookForm onSubmit={onSubmit} book={book} />
            <FormButtons isEditing={!!book} />
          </DialogContent>
        </div>
      </DialogPortal>
    </DialogRoot>
  )
}
