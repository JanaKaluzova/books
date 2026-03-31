import type { Book } from '../../utils/types'
import type { BookFieldsFragment } from './generated/graphql'

export function toBook(gqlBook: BookFieldsFragment): Book {
  return {
    id: gqlBook.documentId,
    title: gqlBook.title ?? '',
    author: gqlBook.author ?? '',
    coverUrl: gqlBook.coverUrl ?? '',
    rating: gqlBook.rating ?? 0,
    genre: gqlBook.genre ?? '',
    year: gqlBook.year ?? 0,
    pages: gqlBook.pages ?? 0,
    dateRead: gqlBook.dateRead ?? '',
    description: gqlBook.description ?? '',
  }
}
