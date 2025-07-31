import { getISBNFormats, formatISBN } from '@/utils/isbn';

interface ISBNDisplayProps {
  isbn?: string;
  className?: string;
}

export default function ISBNDisplay({ isbn, className = '' }: ISBNDisplayProps) {
  if (!isbn) {
    return (
      <div className={className}>
        <span className="font-medium">ISBN:</span>
        <div className="ml-4 text-sm text-gray-600">
          Not available
        </div>
      </div>
    );
  }

  const { isbn10, isbn13 } = getISBNFormats(isbn);

  return (
    <div className={className}>
      <span className="font-medium">ISBN:</span>
      <div className="ml-4 space-y-1">
        {isbn13 && (
          <div className="text-sm">
            <span className="text-gray-600">ISBN-13:</span> {formatISBN(isbn13)}
          </div>
        )}
        {isbn10 && (
          <div className="text-sm">
            <span className="text-gray-600">ISBN-10:</span> {formatISBN(isbn10)}
          </div>
        )}
        {!isbn10 && !isbn13 && (
          <div className="text-sm text-gray-600">
            {isbn}
          </div>
        )}
      </div>
    </div>
  );
}
