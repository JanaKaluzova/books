import type { FC } from 'react'

interface BookCoverProps {
  src?: string
  alt: string
  title: string
  author: string
  isLoading?: boolean
  className?: string
}

export const BookCover: FC<BookCoverProps> = ({
  src,
  alt,
  title,
  author,
  isLoading = false,
  className = '',
}) => {
  if (!src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="flex h-full w-full flex-col justify-between bg-gradient-to-b from-accent-600 to-[#2C2420] p-4">
          <div className="flex flex-col gap-1.5">
            <div className="h-px w-6 rounded-full bg-white/50" />
            <div className="h-px w-10 rounded-full bg-white/25" />
          </div>
          <div>
            <p className="font-serif text-sm font-bold leading-snug text-white line-clamp-5">
              {title}
            </p>

            <p className="mt-2 line-clamp-2 text-[11px] uppercase tracking-widest text-white/50">
              {author}
            </p>
          </div>
          <div className="h-px w-full rounded-full bg-white/20" />
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-surface-200">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      )}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  )
}
