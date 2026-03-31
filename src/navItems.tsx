import { BarChart3, BookOpen, Heart } from 'lucide-react'
import { Path } from './utils/paths'
import type { NavItem } from './utils/types'

export const navItems: NavItem[] = [
  {
    label: 'My Books',
    icon: <BookOpen className="h-4 w-4" strokeWidth={2} />,
    path: Path.MY_BOOKS,
  },
  { label: 'Wishlist', icon: <Heart className="h-4 w-4" strokeWidth={2} />, path: Path.WISHLIST },
  {
    label: 'Statistics',
    icon: <BarChart3 className="h-4 w-4" strokeWidth={2} />,
    path: Path.STATISTICS,
  },
]
