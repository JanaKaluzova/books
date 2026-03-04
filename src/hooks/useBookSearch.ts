import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchBooks } from '../api/bookSearchApi'

interface QueryParams {
  query: string
  enabled: boolean
}

const fetchBooks = async (params: QueryParams) => {
  return searchBooks(params.query)
}

export const useBookSearchQuery = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(id)
  }, [query])

  const trimmed = debouncedQuery.trim()

  const params: QueryParams = {
    query: trimmed,
    enabled: trimmed.length >= 3,
  }

  const queryResult = useQuery({
    queryKey: getBookSearchQuery(params),
    queryFn: (context) => fetchBooks(context.queryKey[1]),
    enabled: params.enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })

  return {
    ...queryResult,
    isDebouncing: query !== debouncedQuery,
  }
}

export const bookSearchQueryPrefix = 'bookSearch'

export const getBookSearchQuery = (params: QueryParams): [string, QueryParams] => [
  bookSearchQueryPrefix,
  params,
]


