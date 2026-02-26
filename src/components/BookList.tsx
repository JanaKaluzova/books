import { FC, useState } from "react"
import { Book } from "../types"
import { NoResults } from "./NoResults"
import { BookModal } from "./BookModal"
import { BookCard2 } from "./BookCard/BookCard2"

interface BookListProps {
	filteredBooks: Book[]

}

export const BookList: FC<BookListProps> = ({ filteredBooks }) => {
	const [selectedBook, setSelectedBook] = useState<Book | null>(null)

	const handleSelectBook = (book: Book) => {
		setSelectedBook(book)
	}

	const handleClose = () => {
		setSelectedBook(null)
	}

	return (
		<>
			{filteredBooks.length === 0 && <NoResults />}

			{filteredBooks.length > 0 && (
				<div className="mt-8 grid grid-cols-2 gap-2 lg:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
					{filteredBooks.map((book) => (
						<button
							type="button"
							key={book.id}
							onClick={() => handleSelectBook(book)}
							className="text-left"
						>
							<BookCard2 book={book} />
						</button>
					))}
				</div>
			)}
			{selectedBook && <BookModal book={selectedBook} onClose={handleClose} />}
		</>
	)
}