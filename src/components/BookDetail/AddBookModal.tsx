import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Star, X } from 'lucide-react'
import { Book } from '../../types'
import {
  STAR_COLORS,
  MODAL_OVERLAY,
  MODAL_BACKDROP,
  MODAL_CLOSE_BUTTON,
  BUTTON_PRIMARY,
  BUTTON_GHOST,
  INPUT,
} from '../../styles'

type BookFormData = Omit<Book, 'id'>

interface AddBookModalProps {
  onAdd: (book: BookFormData) => void
  onClose: () => void
}

export const AddBookModal: FC<AddBookModalProps> = ({ onAdd, onClose }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const { register, handleSubmit, setValue, watch } = useForm<BookFormData>({
    defaultValues: {
      title: '',
      author: '',
      coverUrl: '',
      rating: 0,
      genre: '',
      year: 0,
      pages: 0,
      dateRead: '',
      description: '',
    },
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
        className="modal-anim relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={MODAL_CLOSE_BUTTON}
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>

        <div className="p-6 pb-0">
          <h2 className="font-serif text-2xl font-bold text-text-primary">Add a new book</h2>
          <p className="mt-1 text-sm text-text-secondary">Fill in the details of your latest read.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-y-auto px-6 py-5">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">Title *</label>
                <input
                  type="text"
                  placeholder="Book title"
                  {...register('title', { required: true })}
                  className={INPUT}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">Author *</label>
                <input
                  type="text"
                  placeholder="Author name"
                  {...register('author', { required: true })}
                  className={INPUT}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-secondary">Cover URL</label>
              <input
                type="url"
                placeholder="https://example.com/cover.jpg"
                {...register('coverUrl')}
                className={INPUT}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">Genre *</label>
                <input
                  type="text"
                  placeholder="e.g. Sci-Fi"
                  {...register('genre', { required: true })}
                  className={INPUT}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">Year *</label>
                <input
                  type="number"
                  placeholder="2024"
                  {...register('year', { required: true, valueAsNumber: true })}
                  className={INPUT}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">Pages *</label>
                <input
                  type="number"
                  placeholder="300"
                  {...register('pages', { required: true, valueAsNumber: true })}
                  className={INPUT}
                />
              </div>
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
              <div>
                <label className="mb-1.5 block text-xs font-medium text-text-secondary">Date Read</label>
                <input
                  type="text"
                  placeholder="e.g. Jan 2024"
                  {...register('dateRead')}
                  className={INPUT}
                />
              </div>
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
            <button
              type="button"
              onClick={onClose}
              className={BUTTON_GHOST}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={BUTTON_PRIMARY}
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
