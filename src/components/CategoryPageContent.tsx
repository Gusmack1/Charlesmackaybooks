'use client';

import { Book } from '@/types/book';
import BookCard from '@/components/BookCard';

interface CategoryPageContentProps {
  books: Book[];
  categoryName: string;
  description?: string;
}

export default function CategoryPageContent({ books, categoryName, description }: CategoryPageContentProps) {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{categoryName}</h1>
        {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}
