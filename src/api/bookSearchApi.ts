import type { BookSearchResult } from '../utils/types'

interface GoogleBooksVolume {
  volumeInfo?: {
    title?: string
    authors?: string[]
    publishedDate?: string
    pageCount?: number
    categories?: string[]
    description?: string
    imageLinks?: {
      thumbnail?: string
      smallThumbnail?: string
    }
  }
}

export const searchBooks = async (query: string): Promise<BookSearchResult[]> => {
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

  const params = new URLSearchParams({
    q: query,
    maxResults: '8',
    printType: 'books',
    key: apiKey,
    fields: 'items(volumeInfo(title,authors,publishedDate,pageCount,categories,description,imageLinks))',
  })

  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?${params}`)

  if (!res.ok) {
    throw new Error(`Google Books API error: ${res.status}`)
  }

  const data = (await res.json()) as { items?: GoogleBooksVolume[] }

  if (!data.items) return []

  return data.items.map((item) => {
    const info = item.volumeInfo ?? {}
    const coverUrl = info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail ?? ''

    return {
      title: info.title ?? '',
      author: info.authors?.[0] ?? '',
      year: info.publishedDate?.substring(0, 4) ?? '',
      pages: info.pageCount ? String(info.pageCount) : '',
      genre: info.categories?.[0] ?? '',
      coverUrl: coverUrl.replace('http://', 'https://'),
      description: info.description ?? '',
    }
  })
}
