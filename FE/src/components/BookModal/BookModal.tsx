import {
  Close as DialogClose,
  Content as DialogContent,
  Description as DialogDescription,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
  Root as DialogRoot,
  Title as DialogTitle,
} from '@radix-ui/react-dialog'
import { useQuery } from '@apollo/client/react'
import { AlertTriangle } from 'lucide-react'
import { X } from 'lucide-react'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { MyBooksListDocument, MyWishlistListDocument } from '../../api/generated/graphql'
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
  const [currentTitle, setCurrentTitle] = useState('')

  const { data: booksData } = useQuery(MyBooksListDocument, { fetchPolicy: 'cache-only' })
  const { data: wishlistData } = useQuery(MyWishlistListDocument, { fetchPolicy: 'cache-only' })

  const duplicateIn = useMemo(() => {
    if (!currentTitle.trim() || book) return null

    const normalized = currentTitle.trim().toLowerCase()
    const inBooks = booksData?.books?.some((b) => b?.title?.toLowerCase() === normalized)
    const inWishlist = wishlistData?.books?.some((b) => b?.title?.toLowerCase() === normalized)
    if (inBooks) return 'your books'
    if (inWishlist) return 'your wishlist'
    return null
  }, [currentTitle, book, booksData, wishlistData])

  const onSubmit = (data: BookFormValues) => {
    onAdd({
      ...data,
      year: Number(data.year),
      pages: data.pages ? Number(data.pages) : undefined,
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
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center sm:justify-center sm:p-4">
          <DialogContent className="modal-anim relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden bg-white sm:h-auto sm:max-h-[90dvh] sm:max-w-lg sm:rounded-3xl sm:border sm:border-surface-200 sm:shadow-2xl">
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

            {duplicateIn && (
              <div className="mx-6 mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-700">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>This book is already in {duplicateIn}.</span>
              </div>
            )}
            <BookForm onSubmit={onSubmit} book={book} mode={mode} onTitleChange={setCurrentTitle} />
            <FormButtons isEditing={!!book} isPending={isPending} />
          </DialogContent>
        </div>
      </DialogPortal>
    </DialogRoot>
  )
}
