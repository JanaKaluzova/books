import type { Book as GqlBook } from '../api/generated/graphql'
import type { Book, BookListItem } from './types'

export const mapGqlBookListItem = (b: GqlBook): BookListItem => ({
  id: b.documentId,
  title: b.title ?? '',
  author: b.author ?? '',
  coverUrl: b.coverUrl ?? '',
  genre: b.genre ?? '',
  dateRead: b.dateRead ?? undefined,
})

export const mapGqlBook = (b: GqlBook): Book => ({
  ...mapGqlBookListItem(b),
  rating: b.rating ?? 0,
  year: b.year ?? 0,
  pages: b.pages ?? undefined,
  dateRead: b.dateRead ?? '',
  description: b.description ?? '',
})
