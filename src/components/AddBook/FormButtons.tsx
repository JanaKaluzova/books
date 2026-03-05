import { Close as DialogClose } from '@radix-ui/react-dialog'
import type { FC } from 'react'
import { Button } from '../ui/Button'

interface FormButtonProps {
  isEditing: boolean
}

export const FormButtons: FC<FormButtonProps> = ({ isEditing }) => {
  return (
    <div className="flex items-center justify-end gap-3 px-6 py-4">
      <DialogClose asChild>
        <Button type="button" variant="ghost">
          Cancel
        </Button>
      </DialogClose>
      <Button type="submit" form="bookForm">
        {isEditing ? 'Update Book' : 'Add Book'}
      </Button>
    </div>
  )
}
