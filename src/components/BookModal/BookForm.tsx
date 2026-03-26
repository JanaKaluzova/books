import { zodResolver } from '@hookform/resolvers/zod'
import { type FC, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useFormInitialValues } from '../../hooks/useFormInitialValues'
import { MONTHS } from '../../utils/const'
import { bookFormSchema } from '../../utils/formValidation'
import { yearOptions } from '../../utils/options'
import { type Book, type BookFormValues, type BookSearchResult, Mode } from '../../utils/types'
import { RHFAutocomplete } from '../RHF/RHFAutocomplete'
import { RHFMonthYearPicker } from '../RHF/RHFMonthYearPicker'
import { RHFRating } from '../RHF/RHFRating'
import { RHFSelect } from '../RHF/RHFSelect'
import { RHFTextArea } from '../RHF/RHFTextArea'
import { RHFTextField } from '../RHF/RHFTextField'

const now = new Date()
const currentMonth = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`

const initialValues: BookFormValues = {
  title: '',
  author: '',
  coverUrl: '',
  rating: 0,
  genre: '',
  year: '',
  pages: '',
  dateRead: currentMonth,
  description: '',
}

interface BookFormProps {
  onSubmit: (values: BookFormValues) => void
  book?: Book
  mode: Mode
}

export const BookForm: FC<BookFormProps> = ({ onSubmit, book, mode }) => {
  const isNotWishlist = mode === Mode.MY_BOOKS

  const resolver = useMemo(() => zodResolver(bookFormSchema), [])

  const formMethods = useForm<BookFormValues>({
    mode: 'onSubmit',
    defaultValues: initialValues,
    resolver,
  })

  const handleBookSelect = (result: BookSearchResult) => {
    formMethods.setValue('author', result.author)
    formMethods.setValue('coverUrl', result.coverUrl)
    formMethods.setValue('genre', result.genre)
    formMethods.setValue('year', result.year)
    formMethods.setValue('pages', result.pages)
    formMethods.setValue('description', result.description)
  }

  useFormInitialValues(mapValues(book), formMethods.reset)

  return (
    <FormProvider {...formMethods}>
      <form
        id="bookForm"
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col overflow-y-auto px-6 py-5"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <RHFAutocomplete
              name="title"
              label="Title *"
              placeholder="Search for a book…"
              onBookSelect={handleBookSelect}
            />
            <RHFTextField name="author" label="Author *" placeholder="Author name" />
          </div>

          <RHFTextField
            name="coverUrl"
            label="Cover URL"
            placeholder="https://example.com/cover.jpg"
          />

          <div className="grid grid-cols-3 gap-4">
            <RHFTextField name="genre" label="Genre *" placeholder="e.g. Sci-Fi" />
            <RHFSelect name="year" label="Year *" placeholder="Year" options={yearOptions} />
            <RHFTextField name="pages" label="Pages *" placeholder="300" type="number" />
          </div>

          {isNotWishlist && (
            <div className="grid grid-cols-2 gap-4">
              <RHFRating name="rating" label="Rating" />
              <RHFMonthYearPicker name="dateRead" label="Date read" placeholder="e.g. Jan 2026" />
            </div>
          )}

          {isNotWishlist && (
            <RHFTextArea
              name="description"
              label="Description"
              rows={3}
              placeholder="What is this book about?"
            />
          )}
        </div>
      </form>
    </FormProvider>
  )
}

const mapValues = (entity: Book | undefined): BookFormValues | undefined => {
  if (!entity) return undefined

  return {
    author: entity.author,
    coverUrl: entity.coverUrl ?? '',
    genre: entity.genre,
    year: String(entity.year),
    pages: String(entity.pages),
    dateRead: entity.dateRead ?? '',
    description: entity.description ?? '',
    title: entity.title,
    rating: entity.rating,
  }
}
