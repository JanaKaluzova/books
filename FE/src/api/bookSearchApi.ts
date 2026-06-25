import type { BookSearchResult, GoogleBooksVolume } from '../utils/types'

export const searchBookByIsbn = async (isbn: string): Promise<BookSearchResult | null> => {
  const results = await searchBooks(`isbn:${isbn}`, null)
  return results[0] ?? null
}

export const searchBooks = async (
  query: string,
  printType: string | null = 'books',
): Promise<BookSearchResult[]> => {
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

  const params = new URLSearchParams({
    q: query,
    maxResults: '8',
    key: apiKey,
    fields:
      'items(volumeInfo(title,authors,publishedDate,pageCount,categories,description,imageLinks,industryIdentifiers))',
    ...(printType ? { printType } : {}),
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
    const isbn =
      info.industryIdentifiers?.find((i) => i.type === 'ISBN_13')?.identifier ??
      info.industryIdentifiers?.find((i) => i.type === 'ISBN_10')?.identifier

    return {
      title: info.title ?? '',
      author: info.authors?.[0] ?? '',
      year: info.publishedDate?.substring(0, 4) ?? '',
      pages: info.pageCount ? String(info.pageCount) : '',
      genre: info.categories?.[0] ?? '',
      coverUrl: coverUrl.replace('http://', 'https://'),
      description: info.description ?? '',
      isbn,
    }
  })
}
