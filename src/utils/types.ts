import { ReactNode } from "react"

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
  active: boolean
}

export interface BookSearchResult {
  title: string
  author: string
  year: string
  pages: string
  genre: string
  coverUrl: string
  description: string
}

export type BookFormValues = {
  title: string
  author: string
  genre: string
  year: string
  pages: string
  coverUrl?: string
  dateRead?: string
  description?: string
  rating: number
}
