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
        <p className="text-sm text-gray-500 mt-2">
          {books.length} book{books.length !== 1 ? 's' : ''} available in this category
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            sourceContext={`category-${categoryName.toLowerCase().replace(/ /g, '-')}`}
          />
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No books available in this category at the moment.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Please check back later or explore other categories.
          </p>
        </div>
      )}
    </>
  );
}
