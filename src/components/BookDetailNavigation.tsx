import Link from 'next/link';
import { Book } from '@/types/book';

interface BookDetailNavigationProps {
  book: Book;
}

export default function BookDetailNavigation({ book }: BookDetailNavigationProps) {
  return (
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <Link
            href="/books"
            className="hover:text-blue-600 transition-colors"
          >
            Books
          </Link>
        </li>
        <li className="text-gray-400">/</li>
        <li>
          <span className="text-blue-600">{book.category}</span>
        </li>
        <li className="text-gray-400">/</li>
        <li className="text-gray-900 font-medium truncate max-w-xs" title={book.title}>
          {book.title}
        </li>
      </ol>
    </nav>
  );
}
