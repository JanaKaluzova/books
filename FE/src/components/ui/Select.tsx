import { ChevronDown } from 'lucide-react'
import { type FC, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { INPUT } from '../../styles'
import { cn } from '../../utils/cn'

export type SelectOption = {
  value: string
  label: string
}

interface SelectProps {
  label: string
  error?: boolean
  errorMessage?: string
  options: SelectOption[]
  placeholder: string
  value?: string
  name: string
  onChange: (value: string) => void
}

export const Select: FC<SelectProps> = ({
  label,
  error,
  errorMessage,
  options,
  placeholder,
  value,
  name,
  onChange,
}) => {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find((o) => o.value === value)?.label

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  const handleToggle = () => {
    setOpen((prev) => !prev)
    if (!open) setActiveIndex(options.findIndex((o) => o.value === value))
  }

  const handleSelect = (opt: SelectOption) => {
    onChange?.(opt.value)
    setOpen(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
        setActiveIndex(options.findIndex((o) => o.value === value))
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (activeIndex >= 0) handleSelect(options[activeIndex])
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        break
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-text-secondary">
          {label}
        </label>
      )}
      <button
        id={name}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          INPUT,
          'flex w-full items-center justify-between pr-3 text-left',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className={!value ? 'text-text-muted' : ''}>{selectedLabel ?? placeholder}</span>
        <ChevronDown className="h-4 w-4 text-text-secondary" />
      </button>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute left-0 z-[200] mt-1 w-full max-h-[200px] overflow-y-auto rounded-xl border border-surface-200 bg-white p-1 shadow-xl"
        >
          {options.map((opt, i) => (
            <div
              key={opt.value}
              role="option"
              tabIndex={-1}
              aria-selected={opt.value === value}
              className={`cursor-pointer rounded-lg px-3 py-2 text-sm text-text-primary ${i === activeIndex ? 'bg-surface-100' : ''} ${opt.value === value ? 'font-medium text-accent-600' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseDown={(e) => {
                e.preventDefault()
                handleSelect(opt)
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
    </div>
  )
}
