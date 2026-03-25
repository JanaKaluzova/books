import { Menu, X } from 'lucide-react'
import { type FC, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import type { NavItem } from '../../utils/types'
import { Navigation } from './Navigation'

interface MobileNavigationProps {
  navItems: NavItem[]
}

export const MobileNavigation: FC<MobileNavigationProps> = ({ navItems }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen((o) => !o)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClickOpen}
        className="flex md:hidden items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-surface-200/60 hover:text-text-primary transition-colors duration-200"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {createPortal(
        <button
          type="button"
          aria-label="Close menu"
          onClick={handleClickOpen}
          className={cn(
            'fixed inset-0 z-40 cursor-default bg-black/30 transition-opacity duration-300 md:hidden',
            open ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        />,
        document.body,
      )}

      <Navigation
        navItems={navItems}
        onNavClick={handleClickOpen}
        className={cn(
          'flex-col absolute top-full left-0 right-0 border-t border-surface-200 px-4 py-2 bg-surface-50 shadow-lg z-50 transition-all duration-300',
          open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      />
    </>
  )
}
