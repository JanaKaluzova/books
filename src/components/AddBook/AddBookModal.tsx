import { FC } from 'react'
import { Root as DialogRoot, Portal as DialogPortal, Overlay as DialogOverlay, Content as DialogContent, Close as DialogClose, Title as DialogTitle, Description as DialogDescription } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Book } from '../../types'
import { Button } from '../ui/Button'
import {
  MODAL_BACKDROP,
} from '../../styles'
import { AddBookForm } from './AddBookForm'
import { FormButtons } from './FormButtons'

type BookFormValues = Omit<Book, 'id'>

interface AddBookModalProps {
  open: boolean
  onAdd: (book: Book) => void
  onClose: () => void
}

export const AddBookModal: FC<AddBookModalProps> = ({ onAdd, open, onClose }) => {

  const onSubmit = (data: BookFormValues) => {
    const newBook: Book = {
      ...data,
      id: crypto.randomUUID(),
    }
    onAdd(newBook)
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
                Add a new book
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-text-secondary">
                Fill in the details of your latest read.
              </DialogDescription>
            </div>

            <AddBookForm onSubmit={onSubmit} />
            <FormButtons />
          </DialogContent>
        </div>
      </DialogPortal>
    </DialogRoot>
  )
}
