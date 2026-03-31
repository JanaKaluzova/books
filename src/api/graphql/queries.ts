import { gql } from '@apollo/client'
import type { Book } from '../../utils/types'

export interface GqlBook {
  documentId: string
  title: string
  author: string
  coverUrl: string
  rating: number
  genre: string
  year: number
  pages: number
  dateRead: string
  description: string
}

export const BOOK_FIELDS = gql`
  fragment BookFields on Book {
    documentId
    title
    author
    coverUrl
    rating
    genre
    year
    pages
    dateRead
    description
  }
`

export const GET_BOOKS = gql`
  ${BOOK_FIELDS}
  query GetBooks {
    books(filters: { isWishlist: { eq: false } }, sort: "createdAt:desc") {
      ...BookFields
    }
  }
`

export const GET_WISHLIST = gql`
  ${BOOK_FIELDS}
  query GetWishlist {
    books(filters: { isWishlist: { eq: true } }, sort: "createdAt:desc") {
      ...BookFields
    }
  }
`

export function toBook(gqlBook: GqlBook): Book {
  return {
    id: gqlBook.documentId,
    title: gqlBook.title,
    author: gqlBook.author,
    coverUrl: gqlBook.coverUrl ?? '',
    rating: gqlBook.rating ?? 0,
    genre: gqlBook.genre,
    year: gqlBook.year,
    pages: gqlBook.pages,
    dateRead: gqlBook.dateRead ?? '',
    description: gqlBook.description ?? '',
  }
}
