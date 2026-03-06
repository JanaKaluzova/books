import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { type FC, useEffect, useRef, useState } from 'react'
import { INPUT } from '../../styles'
import { cn } from '../../utils/cn'
import { MONTHS } from '../../utils/const'

interface MonthYearPickerProps {
  label: string
  value?: string
  name: string
  placeholder: string
  onChange: (value: string) => void
}

export const MonthYearPicker: FC<MonthYearPickerProps> = ({
  label,
  value,
  name,
  placeholder,
  onChange,
}) => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const [open, setOpen] = useState(false)
  const [displayYear, setDisplayYear] = useState(currentYear)
  const containerRef = useRef<HTMLDivElement>(null)

  const parts = value?.split(' ')
  const selectedMonth = parts ? MONTHS.indexOf(parts[0]) : -1
  const selectedYear = parts ? parseInt(parts[1], 10) : -1

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    if (!open && selectedYear > 0) setDisplayYear(selectedYear)
    setOpen((prev) => !prev)
  }

  const handlePrevYear = () => setDisplayYear((y) => y - 1)
  const handleNextYear = () => setDisplayYear((y) => Math.min(y + 1, currentYear))

  const isFutureMonth = (monthIndex: number) =>
    displayYear === currentYear && monthIndex > currentMonth

  const getMonthClass = (isSelected: boolean, isFuture: boolean) => {
    if (isSelected) return 'bg-accent-500 font-medium text-white'
    if (isFuture) return 'cursor-not-allowed text-text-muted opacity-40'
    return 'text-text-primary hover:bg-surface-100'
  }

  const handleSelect = (monthIndex: number) => {
    onChange?.(`${MONTHS[monthIndex]} ${displayYear}`)
    setOpen(false)
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
        className={cn(INPUT, 'flex w-full items-center justify-between pr-3 text-left')}
        onClick={handleToggle}
      >
        <span className={!value ? 'text-text-muted' : ''}>{value || placeholder}</span>
        <CalendarDays className="h-4 w-4 text-text-secondary" />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-[200] mb-1 w-56 rounded-xl border border-surface-200 bg-white p-3 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevYear}
              className="rounded-lg p-1 hover:bg-surface-100"
            >
              <ChevronLeft className="h-4 w-4 text-text-secondary" />
            </button>
            <span className="text-sm font-semibold text-text-primary">{displayYear}</span>
            <button
              type="button"
              onClick={handleNextYear}
              disabled={displayYear >= currentYear}
              className="rounded-lg p-1 hover:bg-surface-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4 text-text-secondary" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {MONTHS.map((month, i) => {
              const isSelected = i === selectedMonth && displayYear === selectedYear
              const isFuture = isFutureMonth(i)
              return (
                <button
                  key={month}
                  type="button"
                  disabled={isFuture}
                  onClick={() => handleSelect(i)}
                  className={cn('rounded-lg px-2 py-1.5 text-sm transition-colors', getMonthClass(isSelected, isFuture))}
                >
                  {month}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
