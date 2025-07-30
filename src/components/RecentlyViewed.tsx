'use client';

import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { useCart } from '@/context/CartContext';
// Removed wishlist functionality
import Image from 'next/image';
import Link from 'next/link';

export default function RecentlyViewed() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { addToCart } = useCart();
  // Removed wishlist functionality

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">⬢ Recently Viewed</h2>
          <button
            onClick={clearRecentlyViewed}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear History
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewed.slice(0, 4).map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Book Image */}
              <Link href={`/book/${book.id}`} className="block">
                <div className="relative h-48 bg-gray-100 flex items-center justify-center p-4">
                  {book.imageUrl ? (
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      width={150}
                      height={200}
                      className="object-contain max-h-full"
                    />
                  ) : (
                    <div className="w-24 h-32 bg-gray-200 flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>

              {/* Book Details */}
              <div className="p-4">
                <Link href={`/book/${book.id}`}>
                  <h3 className="font-bold text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-green-600">£{book.price.toFixed(2)}</span>
                  <span className={`text-xs ${book.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {book.inStock ? '✓ In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Action Buttons */}
                {book.inStock && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(book)}
                      className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>

                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {recentlyViewed.length > 4 && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Showing 4 of {recentlyViewed.length} recently viewed books
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
