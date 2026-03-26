import { BookOpen, Loader2, Pencil, Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { useBookModal } from '../../context/BookModalContext'
import { type Book, Mode } from '../../utils/types'
import { ConfirmDialog } from '../ui/ConfirmDialog'

interface BookDetailButtonsProps {
  book: Book
  mode: Mode
  isDeleting: boolean
  isMovingBook: boolean
  onClose: () => void
  onDelete: (id: string) => void
  onAlreadyRead: (book: Book) => void
}

export const BookDetailButtons: FC<BookDetailButtonsProps> = ({
  book,
  onDelete,
  onAlreadyRead,
  onClose,
  mode,
  isDeleting,
  isMovingBook,
}) => {
  const { openEditModal } = useBookModal()
  const isWishlist = mode === Mode.WISHLIST

  const handleEdit = () => {
    openEditModal(book, mode)
    onClose()
  }

  const handleDelete = () => {
    onDelete(book.id)
  }

  return (
    <div className="mt-auto flex gap-3 justify-end pt-6">
      {isWishlist && (
        <button
          type="button"
          onClick={() => onAlreadyRead(book)}
          disabled={isMovingBook}
          className="mr-auto flex items-center gap-2 rounded-xl border border-green-200 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50 hover:text-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isMovingBook ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <BookOpen className="h-3.5 w-3.5" />
          )}
          Mark as read
        </button>
      )}
      <button
        type="button"
        onClick={handleEdit}
        className="flex items-center gap-2 rounded-xl border border-surface-200 px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent-400 hover:text-accent-500"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </button>
      <ConfirmDialog
        trigger={
          <button
            type="button"
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            Delete
          </button>
        }
        title="Delete book?"
        description={`"${book.title}" will be permanently removed from your library. This can't be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </div>
  )
}
