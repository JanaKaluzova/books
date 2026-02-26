
import { Logo } from './Logo'
import { navItems } from '../../data'
import { Navigation } from './Navigation'
import { AddNewBook } from './AddNewBook'


export const Header = () => {
  return (
    <header className="glass sticky top-0 z-50 border-b border-surface-200">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-4">
        <Logo />
        <Navigation navItems={navItems} />
        <AddNewBook />
      </div>
    </header>
  )
}
