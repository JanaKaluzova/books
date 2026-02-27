import { FC, useState } from 'react'
import { Root as DialogRoot, Portal as DialogPortal, Overlay as DialogOverlay, Content as DialogContent, Close as DialogClose, Title as DialogTitle, Description as DialogDescription } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { Star, X } from 'lucide-react'
import { Book } from '../../types'
import { Button } from '../ui/Button'
import { TextField } from '../ui/TextField'
import {
  STAR_COLORS,
  MODAL_BACKDROP,
  INPUT,
} from '../../styles'

type BookFormData = Omit<Book, 'id'>

interface AddBookModalProps {
  onAdd: (book: BookFormData) => void
  open: boolean
  onClose: () => void
}

export const AddBookModal: FC<AddBookModalProps> = ({ onAdd, open, onClose }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const initialValues: BookFormData = {
    title: '',
    author: '',
    coverUrl: '',
    rating: 0,
    genre: '',
    year: 0,
    pages: 0,
    dateRead: '',
    description: '',
  }

  const { register, handleSubmit, setValue, watch } = useForm<BookFormData>({
    defaultValues: initialValues,
  })

  const rating = watch('rating')

  const onSubmit = (data: BookFormData) => {
    onAdd({
      ...data,
      coverUrl: data.coverUrl || 'https://via.placeholder.com/200x300?text=No+Cover',
      rating: data.rating || 1,
      year: Number(data.year),
      pages: Number(data.pages),
    })
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

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <TextField label="Title *" placeholder="Book title" {...register('title', { required: true })} />
                  <TextField label="Author *" placeholder="Author name" {...register('author', { required: true })} />
                </div>

                <TextField label="Cover URL" type="url" placeholder="https://example.com/cover.jpg" {...register('coverUrl')} />

                <div className="grid grid-cols-3 gap-4">
                  <TextField label="Genre *" placeholder="e.g. Sci-Fi" {...register('genre', { required: true })} />
                  <TextField label="Year *" type="number" placeholder="2024" {...register('year', { required: true, valueAsNumber: true })} />
                  <TextField label="Pages *" type="number" placeholder="300" {...register('pages', { required: true, valueAsNumber: true })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">Rating *</label>
                    <div className="flex items-center gap-1 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setValue('rating', star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform duration-150 hover:scale-110"
                        >
                          <Star
                            className="h-6 w-6"
                            fill={star <= (hoverRating || rating) ? STAR_COLORS.filled : 'none'}
                            stroke={star <= (hoverRating || rating) ? STAR_COLORS.filled : STAR_COLORS.empty}
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <TextField label="Date Read" placeholder="e.g. Jan 2024" {...register('dateRead')} />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text-secondary">Description</label>
                  <textarea
                    rows={3}
                    placeholder="What is this book about?"
                    {...register('description')}
                    className={`${INPUT} resize-none`}
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  Add Book
                </Button>
              </div>
            </form>
          </DialogContent>
        </div>
      </DialogPortal>
    </DialogRoot>
  )
}
