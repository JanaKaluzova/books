import { Search } from 'lucide-react'

export const NoResults = () => {
    return (
        <div className="mt-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-200">
                <Search className="h-7 w-7 text-text-muted" strokeWidth={1.5} />
            </div>
            <h3 className="mt-4 font-serif text-lg font-semibold text-text-primary">
                No books found
            </h3>
            <p className="mt-1 text-sm text-text-muted">
                Try adjusting your search to find what you're looking for.
            </p>
        </div>
    )
}