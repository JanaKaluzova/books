import type { BookSearchResult } from '../utils/types'

interface OpenLibraryDoc {
  title?: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
  number_of_pages_median?: number
  subject?: string[]
}

export async function searchBooks(query: string): Promise<BookSearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    fields: 'title,author_name,first_publish_year,cover_i,number_of_pages_median,subject',
    limit: '8',
  })

  const res = await fetch(`https://openlibrary.org/search.json?${params}`)

  if (res.status === 422) {
    throw new Error('Try a more specific search term')
  }

  if (!res.ok) {
    throw new Error(`Open Library API error: ${res.status}`)
  }

  const data = await res.json()

  return (data.docs as OpenLibraryDoc[]).map(
    (doc): BookSearchResult => ({
      title: doc.title ?? '',
      author: doc.author_name?.[0] ?? '',
      year: doc.first_publish_year ? String(doc.first_publish_year) : '',
      pages: doc.number_of_pages_median ? String(doc.number_of_pages_median) : '',
      genre: doc.subject?.[0] ?? '',
      coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : '',
      description: '',
    }),
  )
}
