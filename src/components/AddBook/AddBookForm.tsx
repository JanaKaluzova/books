import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useFormInitialValues } from '../../hooks/useFormInitialValues'
import { useFormValidation } from '../../hooks/useFormValidation'
import { yearOptions } from '../../utils/options'
import type { Book, BookFormValues, BookSearchResult } from '../../utils/types'
import { RHFAutocomplete } from '../RHF/RHFAutocomplete'
import { RHFRating } from '../RHF/RHFRating'
import { RHFSelect } from '../RHF/RHFSelect'
import { RHFTextArea } from '../RHF/RHFTextArea'
import { RHFTextField } from '../RHF/RHFTextField'

const initialValues: BookFormValues = {
  title: '',
  author: '',
  coverUrl: '',
  rating: 0,
  genre: '',
  year: '',
  pages: '',
  dateRead: '',
  description: '',
}

interface AddBookFormProps {
  onSubmit: (values: BookFormValues) => void
  book?: Book
}

export const AddBookForm: FC<AddBookFormProps> = ({ onSubmit, book }) => {
  const zodSchema = useFormValidation()

  const formMethods = useForm<BookFormValues>({
    mode: 'onSubmit',
    defaultValues: initialValues,
    resolver: zodResolver(zodSchema),
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

          <div className="grid grid-cols-2 gap-4">
            <RHFRating name="rating" label="Rating" />
            <RHFTextField name="dateRead" label="Date Read" placeholder="e.g. Jan 2024" />
          </div>

          <RHFTextArea
            name="description"
            label="Description"
            rows={3}
            placeholder="What is this book about?"
          />
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
