import type { ReactNode } from 'react'
import type { Path } from './paths'

export interface Book {
  id: string
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

export interface NavItem {
  label: string
  icon: ReactNode
  path: Path
}

export interface BookSearchResult
  extends Pick<Book, 'title' | 'author' | 'genre' | 'coverUrl' | 'description'> {
  year: string
  pages: string
}

export interface BookFormValues
  extends Pick<Book, 'title' | 'author' | 'genre' | 'rating'>,
    Partial<Pick<Book, 'coverUrl' | 'dateRead' | 'description'>> {
  year: string
  pages: string
}

export interface BookUpdates extends Partial<Omit<Book, 'id'>> {
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
