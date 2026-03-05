import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../utils/types'

interface NavigationProps {
  navItems: NavItem[]
}

export const Navigation: FC<NavigationProps> = ({ navItems }) => {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          end
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-accent-500/10 text-accent-600'
                : 'text-text-secondary hover:bg-surface-200/60 hover:text-text-primary'
            }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
