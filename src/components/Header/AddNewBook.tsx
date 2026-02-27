import { FC } from 'react'
import { Plus } from 'lucide-react'
import { BUTTON_PRIMARY } from '../../styles'

interface AddNewBookProps {
  onClick: () => void
}

export const AddNewBook: FC<AddNewBookProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-2 ${BUTTON_PRIMARY} hover:scale-[1.03]`}
    >
      <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" strokeWidth={2.5} />
      Add Book
    </button>
  )
}
