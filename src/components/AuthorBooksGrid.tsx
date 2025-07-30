'use client';

import BookCard from './BookCard';
import type { Book } from '@/types/book';

interface AuthorBooksGridProps {
  books: Book[];
}

export default function AuthorBooksGrid({ books }: AuthorBooksGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
