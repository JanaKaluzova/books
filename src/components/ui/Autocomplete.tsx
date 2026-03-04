import { FC, useEffect, useRef, useState, KeyboardEvent } from 'react'
import { INPUT } from '../../styles'
import { BookSearchResult } from '../../utils/types'
import { Loader2 } from 'lucide-react'


interface AutocompleteProps {
  label: string
  placeholder: string
  name: string
  value: string
  results: BookSearchResult[]
  isLoading: boolean
  error?: boolean
  searchError?: string
  errorMessage?: string
  onChange: (value: string) => void
  onSelect: (result: BookSearchResult) => void
}

export const Autocomplete: FC<AutocompleteProps> = ({
  label,
  placeholder,
  name,
  value,
  results,
  isLoading,
  error,
  searchError,
  errorMessage,
  onChange,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const showDropdown = isOpen && (value.trim().length >= 3 || results.length > 0 || isLoading || searchError)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1)
  }, [results])

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  const handleSelect = (result: BookSearchResult) => {
    onSelect(result)
    onChange(result.title)
    setIsOpen(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0 && results[activeIndex]) {
          handleSelect(results[activeIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
    }
  }

  const renderDropdownContent = () => {
    if (searchError) {
      return <li className="px-4 py-3 text-sm text-accent-500">{searchError}</li>
    }

    if (isLoading) {
      return <li className="px-4 py-3 text-sm text-text-muted">Searching…</li>
    }

    if (value.trim().length >= 3 && results.length === 0) {
      return <li className="px-4 py-3 text-sm text-text-muted">No results found</li>
    }

    return results.map((result, i) => (
      <li
        key={`${result.title}-${result.author}-${i}`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => handleSelect(result)}
        onMouseEnter={() => setActiveIndex(i)}
        className={`cursor-pointer px-4 py-2.5 transition-colors ${i === activeIndex
          ? 'bg-accent-500/10 text-accent-600'
          : 'text-text-primary hover:bg-surface-50'
          }`}
      >
        <p className="text-sm font-medium truncate">{result.title}</p>
        <p className="text-xs text-text-secondary truncate">
          {result.author}
          {result.year && ` · ${result.year}`}
        </p>
      </li>
    ))
  }

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-xs font-medium text-text-secondary"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={`${INPUT} ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''} ${isLoading ? 'pr-10' : ''}`}
        />
        {isLoading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        )}
      </div>

      {showDropdown && (
        <ul
          ref={listRef}
          className="absolute z-[200] mt-1 max-h-64 w-full overflow-auto rounded-xl border border-surface-200 bg-white shadow-xl"
        >
          {renderDropdownContent()}
        </ul>
      )}

      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}
