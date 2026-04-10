import type { Book as GqlBook } from '../api/generated/graphql'
import type { Book } from './types'

export const mapGqlBook = (b: GqlBook): Book => ({
  id: b.documentId,
  title: b.title ?? '',
  author: b.author ?? '',
  coverUrl: b.coverUrl ?? '',
  rating: b.rating ?? 0,
  genre: b.genre ?? '',
  year: b.year ?? 0,
  pages: b.pages ?? 0,
  dateRead: b.dateRead ?? '',
  description: b.description ?? '',
})
