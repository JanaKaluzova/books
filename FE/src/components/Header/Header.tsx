import { useLocation } from 'react-router-dom'
import { useBookModal } from '../../context/BookModalContext'
import { navItems } from '../../navItems'
import { Path } from '../../utils/paths'
import { Mode } from '../../utils/types'
import { AddNewBook } from './AddNewBook'
import { Logo } from './Logo'
import { MobileNavigation } from './MobileNavigation'
import { Navigation } from './Navigation'

export const Header = () => {
  const location = useLocation()
  const { openAddModal } = useBookModal()

  const handleAddBookClick = () => {
    const mode = location.pathname === Path.WISHLIST ? Mode.WISHLIST : Mode.MY_BOOKS
    openAddModal(mode)
  }

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-surface-200 relative">
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <MobileNavigation navItems={navItems} />
          <div className="hidden md:block">
            <Logo />
          </div>
        </div>

        {/* Centered on mobile */}
        <div className="absolute left-1/2 -translate-x-1/2 md:hidden">
          <Logo />
        </div>

        <Navigation navItems={navItems} className="hidden md:flex" />
        <AddNewBook onClick={handleAddBookClick} />
      </div>
    </header>
  )
}
