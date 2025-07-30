'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';

interface RelatedBooksProps {
  books: Book[];
  currentBook: Book;
}

export default function RelatedBooks({ books, currentBook }: RelatedBooksProps) {
  // Get related books based on category and related book IDs
  const relatedBooks = books.filter(book =>
    book.id !== currentBook.id && (
      book.category === currentBook.category ||
      currentBook.relatedBookIds?.includes(book.id) ||
      book.relatedBookIds?.includes(currentBook.id)
    )
  ).slice(0, 3);

  if (relatedBooks.length === 0) return null;

  return (
    <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Related Aviation Books</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedBooks.map(book => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="block group hover:shadow-lg transition-shadow rounded-lg overflow-hidden border"
          >
            <div className="aspect-[3/4] relative">
              <Image
                src={book.imageUrl || '/default-book-cover.jpg'}
                alt={`${book.title} cover`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{book.category}</p>
              <p className="text-green-600 font-bold">£{book.price}</p>
              {book.citationCount && (
                <p className="text-xs text-gray-500 mt-1">
                  {book.citationCount} citations
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
