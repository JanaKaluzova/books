import { useForm, FormProvider } from 'react-hook-form'
import type { Book } from '../../types'
import { FC } from 'react'
import { RHFTextField } from '../RHF/RHFTextField'
import { RHFRating } from '../RHF/RHFRating'
import { RHFTextArea } from '../RHF/RHFTextArea'

type BookFormValues = Omit<Book, 'id'>

interface AddBookFormProps {
  onSubmit: (values: BookFormValues) => void
}

export const AddBookForm: FC<AddBookFormProps> = ({ onSubmit }) => {
  const initialValues: BookFormValues = {
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

  const formMethods = useForm<BookFormValues>({
    mode: 'onChange',
    defaultValues: initialValues,
  })

  return (
    <FormProvider {...formMethods}>
      <form id='bookForm' onSubmit={formMethods.handleSubmit(onSubmit)} className="flex flex-col overflow-y-auto px-6 py-5">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <RHFTextField name="title" label="Title *" placeholder="Book title" />
            <RHFTextField name="author" label="Author *" placeholder="Author name" />
          </div>

          <RHFTextField name="coverUrl" label="Cover URL" placeholder="https://example.com/cover.jpg" />

          <div className="grid grid-cols-3 gap-4">
            <RHFTextField name="genre" label="Genre *" placeholder="e.g. Sci-Fi" />
            <RHFTextField name="year" label="Year *" placeholder="2024" type="number" />
            <RHFTextField name="pages" label="Pages *" placeholder="300" type="number" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <RHFRating name="rating" label="Rating *" />
            <RHFTextField name="dateRead" label="Date Read" placeholder="e.g. Jan 2024" />
          </div>

          <RHFTextArea name="description" label="Description" rows={3} placeholder="What is this book about?" />
        </div>
      </form>
    </FormProvider>
  )
}