import { Close as DialogClose } from '@radix-ui/react-dialog'
import { Button } from '../ui/Button'

export const FormButtons = () => {
  return (
    <div className="flex items-center justify-end gap-3 px-6 py-4">
      <DialogClose asChild>
        <Button type="button" variant="ghost">
          Cancel
        </Button>
      </DialogClose>
      <Button type="submit" form='bookForm'>
        Add Book
      </Button>
    </div>
  )
}