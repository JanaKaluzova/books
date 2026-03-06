import { z } from 'zod'

export const bookFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().min(1, 'Genre is required'),
  year: z.string().min(1, 'Year is required'),
  pages: z.string().min(1, 'Pages is required'),
  coverUrl: z.string().optional().or(z.literal('')),
  dateRead: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  rating: z.number().min(0).max(5),
})
