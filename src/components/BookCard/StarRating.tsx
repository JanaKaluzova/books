import { FC } from 'react'
import { Star } from 'lucide-react'
import { STAR_COLORS } from '../../styles'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md'
}

export const StarRating: FC<StarRatingProps> = ({ rating, size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} star-anim`}
          style={{ animationDelay: `${star * 60}ms` }}
          fill={star <= rating ? STAR_COLORS.filled : 'none'}
          stroke={star <= rating ? STAR_COLORS.filled : STAR_COLORS.empty}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}
