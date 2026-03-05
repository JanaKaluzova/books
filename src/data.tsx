import { BarChart3, BookOpen, Heart } from 'lucide-react'
import { Path } from './utils/paths'
import type { Book, NavItem } from './utils/types'

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0593135202-L.jpg',
    rating: 5,
    genre: 'Science Fiction',
    year: 2021,
    pages: 496,
    dateRead: 'Jan 2024',
    description:
      'Ryland Grace is the sole survivor on a desperate, last-chance mission — and if he fails, humanity and the Earth itself are finished.',
  },
  {
    id: '2',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/059331817X-L.jpg',
    rating: 4,
    genre: 'Literary Fiction',
    year: 2021,
    pages: 307,
    dateRead: 'Mar 2024',
    description:
      'From the Nobel Prize-winning author, a look at our changing world through the eyes of an unforgettable narrator — an Artificial Friend.',
  },
  {
    id: '3',
    title: 'Educated',
    author: 'Tara Westover',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0399590501-L.jpg',
    rating: 5,
    genre: 'Memoir',
    year: 2018,
    pages: 334,
    dateRead: 'Jun 2024',
    description:
      'A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
  },
  {
    id: '4',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0525559477-L.jpg',
    rating: 4,
    genre: 'Fantasy / Contemporary',
    year: 2020,
    pages: 288,
    dateRead: 'Aug 2024',
    description:
      'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
  },
  {
    id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0735211299-L.jpg',
    rating: 5,
    genre: 'Self-Help',
    year: 2018,
    pages: 320,
    dateRead: 'Sep 2024',
    description:
      'An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.',
  },
  {
    id: '6',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0441172717-L.jpg',
    rating: 5,
    genre: 'Science Fiction',
    year: 1965,
    pages: 688,
    dateRead: 'Oct 2024',
    description:
      "Set on the desert planet Arrakis, Dune is the story of Paul Atreides, who would become known as Muad'Dib, the prophesied leader of the Fremen.",
  },
  {
    id: '7',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0062060627-L.jpg',
    rating: 4,
    genre: 'Historical Fiction',
    year: 2012,
    pages: 378,
    dateRead: 'Nov 2024',
    description:
      'A tale of gods, kings, immortal fame, and the human heart — a profoundly moving retelling of the Iliad.',
  },
  {
    id: '8',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0062316117-L.jpg',
    rating: 4,
    genre: 'Non-Fiction / History',
    year: 2015,
    pages: 443,
    dateRead: 'Dec 2024',
    description:
      'A brief history of humankind — from the evolution of archaic human species in the Stone Age up to the political and technological revolutions of the 21st century.',
  },
  {
    id: '9',
    title: 'Normal People',
    author: 'Sally Rooney',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/1984822187-L.jpg',
    rating: 3,
    genre: 'Contemporary Fiction',
    year: 2018,
    pages: 273,
    dateRead: 'Feb 2024',
    description:
      'Connell and Marianne grow up in the same small town in rural Ireland. A story of mutual fascination, friendship and love.',
  },
  {
    id: '10',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0374533555-L.jpg',
    rating: 4,
    genre: 'Psychology / Non-Fiction',
    year: 2011,
    pages: 499,
    dateRead: 'Apr 2024',
    description:
      'A groundbreaking tour of the mind that explains the two systems driving the way we think and make choices.',
  },
  {
    id: '11',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    rating: 4,
    genre: 'Classic Literature',
    year: 1925,
    pages: 180,
    dateRead: 'May 2024',
    description:
      'A portrait of the Jazz Age in all its decadence and excess, exploring themes of wealth, love, idealism, and the American Dream.',
  },
  {
    id: '12',
    title: 'Circe',
    author: 'Madeline Miller',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0316556343-L.jpg',
    rating: 5,
    genre: 'Fantasy / Mythology',
    year: 2018,
    pages: 393,
    dateRead: 'Jul 2024',
    description:
      'In the house of Helios, god of the sun, a daughter is born — but Circe is a strange child, not powerful like her father, nor viciously alluring like her mother.',
  },
]

export const navItems: NavItem[] = [
  {
    label: 'My Books',
    icon: <BookOpen className="h-4 w-4" strokeWidth={2} />,
    path: Path.MY_BOOKS,
  },
  { label: 'Wishlist', icon: <Heart className="h-4 w-4" strokeWidth={2} />, path: Path.WISHLIST },
  {
    label: 'Statistics',
    icon: <BarChart3 className="h-4 w-4" strokeWidth={2} />,
    path: Path.STATISTICS,
  },
]

export const mockWishlist: Book[] = [
  {
    id: 'w1',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0756404746-L.jpg',
    rating: 0,
    genre: 'Fantasy',
    year: 2007,
    pages: 662,
    dateRead: '',
    description:
      'A legendary figure from fantasy literature, Kvothe tells the story of his life from his humble beginnings as a young student to his years as a legendary musician and magician.',
  },
  {
    id: 'w2',
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/0374528373-L.jpg',
    rating: 0,
    genre: 'Classic Literature',
    year: 1880,
    pages: 796,
    dateRead: '',
    description:
      "The culmination of Dostoyevsky's genius, and one of the supreme achievements in all of literature.",
  },
  {
    id: 'w3',
    title: 'Pachinko',
    author: 'Min Jin Lee',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/1455563927-L.jpg',
    rating: 0,
    genre: 'Historical Fiction',
    year: 2017,
    pages: 485,
    dateRead: '',
    description:
      'An epic saga of a Korean family that begins in occupied Korea with a forbidden love and the consequences that ripple down through the generations.',
  },
]
