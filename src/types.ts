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