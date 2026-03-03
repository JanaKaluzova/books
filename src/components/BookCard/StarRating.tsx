import { FC, useState } from 'react'
import { Star } from 'lucide-react'
import { STAR_COLORS } from '../../styles'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md'
  onChange?: (rating: number) => void
}

export const StarRating: FC<StarRatingProps> = ({ rating, size = 'md', onChange }) => {
  const [hoverRating, setHoverRating] = useState(0)
  const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  const displayRating = hoverRating || rating
  const interactive = !!onChange

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const starEl = (
          <Star
            key={star}
            className={`${sizeClass} ${interactive ? '' : 'star-anim'}`}
            style={interactive ? undefined : { animationDelay: `${star * 60}ms` }}
            fill={star <= displayRating ? STAR_COLORS.filled : 'none'}
            stroke={star <= displayRating ? STAR_COLORS.filled : STAR_COLORS.empty}
            strokeWidth={1.5}
          />
        )

        if (interactive) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform duration-150 hover:scale-110"
            >
              {starEl}
            </button>
          )
        }

        return starEl
      })}
    </div>
  )
}
