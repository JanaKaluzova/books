import { Plus } from 'lucide-react'

export const AddNewBook = () => {
	return (
		<button
			type="button"
			className="group flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-500/20 transition-all duration-200 hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/30 hover:scale-[1.03] active:scale-[0.98]"
		>
			<Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" strokeWidth={2.5} />
			Add Book
		</button>
	)
}
