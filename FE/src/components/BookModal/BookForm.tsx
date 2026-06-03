import { zodResolver } from '@hookform/resolvers/zod'
import { ScanLine } from 'lucide-react'
import { type FC, useEffect, useMemo, useState } from 'react'
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
import { Button } from '../ui/Button'
import { CoverUpload } from './CoverUpload'
import { ISBNScanner } from './ISBNScanner'

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
  onTitleChange?: (title: string) => void
}

export const BookForm: FC<BookFormProps> = ({ onSubmit, book, mode, onTitleChange }) => {
  const isNotWishlist = mode === Mode.MY_BOOKS
  const [showScanner, setShowScanner] = useState(false)

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
    formMethods.trigger()
  }

  const handleIsbnFound = (result: BookSearchResult) => {
    formMethods.setValue('title', result.title)
    handleBookSelect(result)
    setShowScanner(false)
  }

  useFormInitialValues(mapValues(book), formMethods.reset)

  const title = formMethods.watch('title')
  useEffect(() => {
    onTitleChange?.(title ?? '')
  }, [title, onTitleChange])

  return (
    <FormProvider {...formMethods}>
      {showScanner && (
        <ISBNScanner onBookFound={handleIsbnFound} onClose={() => setShowScanner(false)} />
      )}
      <form
        id="bookForm"
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col overflow-y-auto px-6 py-5"
      >
        <div className="flex flex-1 flex-col gap-4">
          {!book && (
            <Button
              type="button"
              onClick={() => setShowScanner(true)}
              className="flex w-full items-center justify-center gap-2 md:hidden"
            >
              <ScanLine className="h-4 w-4" />
              Scan ISBN barcode
            </Button>
          )}
          <div className="grid grid-cols-2 gap-4">
            <RHFAutocomplete
              name="title"
              label="Title *"
              placeholder="Search for a book…"
              onBookSelect={handleBookSelect}
            />
            <RHFTextField name="author" label="Author *" placeholder="Author name" />
          </div>

          <CoverUpload />

          <div className="grid grid-cols-3 gap-4">
            <RHFTextField name="genre" label="Genre *" placeholder="e.g. Sci-Fi" />
            <RHFSelect name="year" label="Year *" placeholder="Year" options={yearOptions} />
            <RHFTextField name="pages" label="Pages" placeholder="300" type="number" />
          </div>

          {isNotWishlist && (
            <div className="grid grid-cols-2 gap-4">
              <RHFRating name="rating" label="Rating" />
              <RHFMonthYearPicker name="dateRead" label="Date read" placeholder="e.g. Jan 2026" />
            </div>
          )}

          {isNotWishlist && (
            <div className="flex flex-1 flex-col">
              <RHFTextArea
                name="description"
                label="Description"
                placeholder="What is this book about?"
              />
            </div>
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
    pages: entity.pages != null ? String(entity.pages) : '',
    dateRead: entity.dateRead ?? '',
    description: entity.description ?? '',
    title: entity.title,
    rating: entity.rating,
  }
}
