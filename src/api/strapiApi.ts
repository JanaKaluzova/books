import type { Book, BookUpdates } from '../utils/types'

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL

interface StrapiBook {
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
  isWishlist: boolean
}

function toBook(strapi: StrapiBook): Book {
  return {
    id: strapi.documentId,
    title: strapi.title,
    author: strapi.author,
    coverUrl: strapi.coverUrl ?? '',
    rating: strapi.rating ?? 0,
    genre: strapi.genre,
    year: strapi.year,
    pages: strapi.pages,
    dateRead: strapi.dateRead ?? '',
    description: strapi.description ?? '',
  }
}

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/books?filters[isWishlist][$eq]=false&sort=createdAt:desc`,
  )
  const { data } = await res.json()
  return data.map(toBook)
}

export async function fetchWishlist(): Promise<Book[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/books?filters[isWishlist][$eq]=true&sort=createdAt:desc`,
  )
  const { data } = await res.json()
  return data.map(toBook)
}

export async function createBook(book: Omit<Book, 'id'>, isWishlist: boolean): Promise<Book> {
  const res = await fetch(`${STRAPI_URL}/api/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { ...book, isWishlist } }),
  })
  const { data } = await res.json()
  return toBook(data)
}

export async function updateBook(id: string, updates: BookUpdates): Promise<Book> {
  const res = await fetch(`${STRAPI_URL}/api/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: updates }),
  })
  const { data } = await res.json()
  return toBook(data)
}

export async function deleteBook(id: string): Promise<void> {
  await fetch(`${STRAPI_URL}/api/books/${id}`, { method: 'DELETE' })
}
