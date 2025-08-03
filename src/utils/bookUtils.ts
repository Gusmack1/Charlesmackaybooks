import { books } from '@/data/books';

export interface BookData {
  id: string;
  title: string;
  author: string;
  cover: string;
  price: number;
}

export function getBookData(bookId: string): BookData | null {
  const book = books.find(b => b.id === bookId);
  if (!book) return null;
  
  return {
    id: book.id,
    title: book.title,
    author: 'Charles E. MacKay',
    cover: book.imageUrl,
    price: book.price
  };
}

export function getBooksData(bookIds: string[]): BookData[] {
  return bookIds
    .map(id => getBookData(id))
    .filter((book): book is BookData => book !== null);
} 