import { FC, useState } from "react"
import { Book } from "../types"
import { NoResults } from "./NoResults"
import { BookCard } from "./BookCard/BookCard"
import { BookModal } from "./BookModal"

interface BookListProps {
	filteredBooks: Book[]

}

export const BookList: FC<BookListProps> = ({ filteredBooks }) => {
	const [selectedBook, setSelectedBook] = useState<Book | null>(null)

	return (
		<>
			{filteredBooks.length === 0 && <NoResults />}

			{filteredBooks.length > 0 && (
				<div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
					{filteredBooks.map((book) => (
						<button
							type="button"
							key={book.id}
							onClick={() => setSelectedBook(book)}
							className="text-left"
						>
							<BookCard book={book} />
						</button>
					))}
				</div>
			)}
			{selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
		</>
	)
}