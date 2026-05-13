import { BookOpen } from 'lucide-react'

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg shadow-accent-500/20">
        <BookOpen className="h-5 w-5 text-white" strokeWidth={2} />
      </div>
      <span className="font-serif text-xl font-semibold tracking-tight text-text-primary">
        Bookshelf
      </span>
    </div>
  )
}
