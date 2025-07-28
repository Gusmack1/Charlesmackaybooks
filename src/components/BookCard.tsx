'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/book';
import { trackEbayClick, trackPayPalClick } from '@/components/TrackingUtils';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart, openBasket } = useCart();
  const [imgSrc, setImgSrc] = useState(book.imageUrl || '/book-covers/placeholder-book.svg');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(book);
    setTimeout(() => {
      setIsAddingToCart(false);
      openBasket(); // Open basket sidebar after adding item
    }, 500);
  };

  const handleEbayClick = () => {
    trackEbayClick(book);
    window.open(book.ebayUrl || `https://www.ebay.co.uk/usr/chaza87`, '_blank');
  };

  const generatePayPalUrl = (book: Book) => {
    const baseUrl = 'https://www.paypal.com/cgi-bin/webscr';
    const params = new URLSearchParams({
      cmd: '_xclick',
      business: 'charlese1mackay@hotmail.com',
      item_name: `${book.title} - Aviation History Book by Charles E. MacKay`,
      item_number: book.isbn || book.id,
      amount: book.price.toString(),
      currency_code: 'GBP',
      no_shipping: '0',
      no_note: '0',
      tax: '0',
      lc: 'GB',
      bn: 'PP-BuyNowBF',
      return: 'https://charlesmackaybooks.com/thank-you',
      cancel_return: 'https://charlesmackaybooks.com/books',
      custom: `ISBN:${book.isbn || 'N/A'}|TITLE:${book.title}`,
      invoice: `CM-${book.id}-${Date.now()}`,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const handlePayPalClick = () => {
    trackPayPalClick(book);
    window.open(generatePayPalUrl(book), '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-3 sm:p-4 pb-2">
        <Link href={`/category/${book.category.toLowerCase().replace(/ /g, '-')}`}>
          <span className="bg-[#c4901b] text-white px-2 sm:px-3 py-1 text-xs font-semibold rounded hover:bg-opacity-80 transition-colors">
            ⬢ {book.category}
          </span>
        </Link>
      </div>

      <div className="relative">
        <Link href={`/books/${book.id}`} className="block">
          <div className="relative h-40 sm:h-48 bg-gray-100 flex items-center justify-center mx-3 sm:mx-4 mb-3 sm:mb-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <Image
              src={imgSrc}
              alt={`${book.title} by Charles E. MacKay`}
              width={150}
              height={200}
              className="object-cover max-h-full w-auto rounded border shadow-sm"
              onError={() => setImgSrc('/book-covers/placeholder-book.svg')}
              unoptimized={imgSrc.startsWith('http')}
              loading="lazy"
            />
          </div>
        </Link>
      </div>

      <div className="p-3 sm:p-4 pt-0">
        <Link href={`/books/${book.id}`}>
          <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">{book.title}</h3>
        </Link>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-3">{book.description}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-1 sm:gap-0">
          <span className="text-xl sm:text-2xl font-bold text-green-600">£{book.price.toFixed(2)}</span>
          <span className={`text-xs sm:text-sm flex items-center gap-1 ${book.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {book.inStock ? '✓ In Stock' : 'Out of Stock'}
          </span>
        </div>

        <div className="space-y-1 text-xs text-gray-500 mb-3 sm:mb-4">
          <div><strong>Category:</strong> {book.category}</div>
          <div><strong>Condition:</strong> {book.condition}</div>
          {book.isbn && <div className="hidden sm:block"><strong>ISBN:</strong> {book.isbn}</div>}
        </div>

        <div className="space-y-2">


          {book.inStock && (
            <>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-green-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold disabled:opacity-50"
              >
                {isAddingToCart ? '🔄 Adding...' : '🛒 Add to Basket'}
              </button>

              <button
                onClick={handleEbayClick}
                className="w-full bg-yellow-500 text-black py-2 px-3 sm:px-4 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold"
              >
                🛒 Buy on eBay
              </button>
            </>
          )}

          {!book.inStock && (
            <a
              href={`mailto:charlese1mackay@hotmail.com?subject=Notify When Available - ${book.title}&body=Hello Charles,%0D%0A%0D%0APlease notify me when "${book.title}" becomes available.%0D%0A%0D%0AThank you!`}
              className="w-full bg-gray-400 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-500 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold"
            >
              📧 Notify When Available
            </a>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center mt-3">
          Secure payment with PayPal or eBay<br className="hidden sm:inline" />
          <span className="sm:hidden"> • </span>UK £3.45 • EU £4.95 • USA £8.95 • Worldwide £12.95
        </p>
      </div>
    </div>
  );
}
