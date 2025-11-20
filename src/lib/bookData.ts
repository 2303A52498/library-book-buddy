import bookGatsby from "@/assets/book-gatsby.jpg";
import bookMockingbird from "@/assets/book-mockingbird.jpg";
import book1984 from "@/assets/book-1984.jpg";
import bookPride from "@/assets/book-pride.jpg";
import bookCatcher from "@/assets/book-catcher.jpg";
import bookHarry from "@/assets/book-harry.jpg";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  cost: number;
  available: number;
  total: number;
  image: string;
  description: string;
  publishYear: number;
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  fine: number;
  status: "borrowed" | "returned" | "overdue";
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Classic Fiction",
    cost: 12.99,
    available: 3,
    total: 5,
    image: bookGatsby,
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    publishYear: 1925,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Classic Fiction",
    cost: 14.99,
    available: 2,
    total: 4,
    image: bookMockingbird,
    description: "A powerful story of racial injustice and childhood innocence in the American South.",
    publishYear: 1960,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0-452-28423-4",
    category: "Science Fiction",
    cost: 13.99,
    available: 4,
    total: 6,
    image: book1984,
    description: "A dystopian social science fiction novel exploring surveillance, truth, and totalitarianism.",
    publishYear: 1949,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0-14-143951-8",
    category: "Romance",
    cost: 11.99,
    available: 5,
    total: 7,
    image: bookPride,
    description: "A romantic novel of manners about love, marriage, and social class in 19th century England.",
    publishYear: 1813,
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0-316-76948-0",
    category: "Coming of Age",
    cost: 12.49,
    available: 0,
    total: 3,
    image: bookCatcher,
    description: "A story about teenage rebellion and alienation, told through the eyes of Holden Caulfield.",
    publishYear: 1951,
  },
  {
    id: "6",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    isbn: "978-0-439-70818-8",
    category: "Fantasy",
    cost: 15.99,
    available: 6,
    total: 10,
    image: bookHarry,
    description: "The magical beginning of Harry Potter's journey at Hogwarts School of Witchcraft and Wizardry.",
    publishYear: 1997,
  },
];

// Mock borrowed books data
export const borrowedBooks: BorrowedBook[] = [
  {
    id: "b1",
    bookId: "1",
    userId: "s1",
    userName: "John Smith",
    borrowDate: new Date("2025-01-05"),
    dueDate: new Date("2025-01-19"),
    fine: 0,
    status: "borrowed",
  },
  {
    id: "b2",
    bookId: "3",
    userId: "s2",
    userName: "Emily Johnson",
    borrowDate: new Date("2025-01-01"),
    dueDate: new Date("2025-01-15"),
    fine: 5.0,
    status: "overdue",
  },
  {
    id: "b3",
    bookId: "4",
    userId: "s1",
    userName: "John Smith",
    borrowDate: new Date("2024-12-20"),
    dueDate: new Date("2025-01-03"),
    returnDate: new Date("2025-01-02"),
    fine: 0,
    status: "returned",
  },
];

// Calculate fine: $0.50 per day after due date
export const calculateFine = (dueDate: Date): number => {
  const today = new Date();
  const diffTime = today.getTime() - dueDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays * 0.5 : 0;
};
