import { Close as DialogClose } from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'
import type { FC } from 'react'
import { Button } from '../ui/Button'

interface FormButtonProps {
  isEditing: boolean
  isPending: boolean
}

export const FormButtons: FC<FormButtonProps> = ({ isEditing, isPending }) => {
  return (
    <div className="flex items-center justify-end gap-3 px-6 py-4">
      <DialogClose asChild>
        <Button type="button" variant="ghost">
          Cancel
        </Button>
      </DialogClose>
      <Button
        type="submit"
        form="bookForm"
        disabled={isPending}
        className="flex items-center gap-2"
      >
        {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {isEditing ? 'Update Book' : 'Add Book'}
      </Button>
    </div>
  )
}
