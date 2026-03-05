import type { FC } from 'react'
import { navItems } from '../../data'
import { AddNewBook } from './AddNewBook'
import { Logo } from './Logo'
import { Navigation } from './Navigation'

interface HeaderProps {
  onAddBookClick: () => void
}

export const Header: FC<HeaderProps> = ({ onAddBookClick }) => {
  return (
    <header className="glass sticky top-0 z-50 border-b border-surface-200">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-4">
        <Logo />
        <Navigation navItems={navItems} />
        <AddNewBook onClick={onAddBookClick} />
      </div>
    </header>
  )
}
