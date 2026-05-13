import { Plus } from 'lucide-react'
import type { FC } from 'react'
import { Button } from '../ui/Button'

interface AddNewBookProps {
  onClick: () => void
}

export const AddNewBook: FC<AddNewBookProps> = ({ onClick }) => {
  return (
    <>
      {/* Mobile */}
      <Button onClick={onClick} variant="mobile" className="group md:hidden" aria-label="Add book">
        <Plus
          className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90"
          strokeWidth={2.5}
        />
      </Button>

      {/* Desktop */}
      <Button
        onClick={onClick}
        className="group hidden md:flex items-center gap-2 hover:scale-[1.03]"
      >
        <Plus
          className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90"
          strokeWidth={2.5}
        />
        Add Book
      </Button>
    </>
  )
}
