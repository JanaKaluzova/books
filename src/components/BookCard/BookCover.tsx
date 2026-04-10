import { type FC, useState } from 'react'

interface BookCoverProps {
  src: string
  alt: string
  className?: string
}

export const BookCover: FC<BookCoverProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  //TODO: remove the state, handle it with Query state and show skeletons in the BookCard instead of the shimmer effect on the image
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-surface-200">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}
