import type { ReactNode } from 'react'
import type { Path } from './paths'

type ImageLinks = {
  thumbnail?: string
  smallThumbnail?: string
}

type ISBN = {
  type: string
  identifier: string
}

export interface GoogleBooksVolume {
  volumeInfo?: {
    title?: string
    authors?: string[]
    publishedDate?: string
    pageCount?: number
    categories?: string[]
    description?: string
    imageLinks?: ImageLinks
    industryIdentifiers?: ISBN[]
  }
}

export interface BookListItem {
  id: string
  title: string
  author: string
  coverUrl: string
  genre: string
  dateRead?: string
}

export interface Book extends BookListItem {
  rating: number
  year: number
  pages?: number
  dateRead: string
  description: string
  isbn?: string
}

export interface NavItem {
  label: string
  icon: ReactNode
  path: Path
}

export interface BookSearchResult
  extends Pick<Book, 'title' | 'author' | 'genre' | 'coverUrl' | 'description'> {
  year: string
  pages: string
  isbn?: string
}

export interface BookFormValues
  extends Pick<Book, 'title' | 'author' | 'genre' | 'rating'>,
    Partial<Pick<Book, 'coverUrl' | 'dateRead' | 'description' | 'isbn'>> {
  year: string
  pages?: string
}

export type BookPayload = Omit<Book, 'id'>

export interface BookUpdates extends Partial<BookPayload> {
  isWishlist?: boolean
}

export enum Mode {
  MY_BOOKS = 'MY_BOOKS',
  WISHLIST = 'WISHLIST',
}

export interface ModalState {
  mode: Mode
  book?: Book
}

export enum Status {
  SCANNING = 'SCANNING',
  LOADING = 'LOADING',
  NOT_FOUND = 'NOT_FOUND',
  API_ERROR = 'API_ERROR',
  CAMERA_ERROR = 'CAMERA_ERROR',
}
