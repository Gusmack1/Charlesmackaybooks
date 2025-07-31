'use client';

import Link from 'next/link'
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getTotalItems, openBasket } = useCart();

  return (
    <header className="bg-slate-800 text-white">
      {/* Top Header Bar */}
      <div className="bg-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Author Info - Clickable */}
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
              <h1 className="text-xl font-bold">Charles E. MacKay</h1>
              <p className="text-sm text-gray-300">Aviation Historian & Author</p>
              <p className="text-xs text-gray-400">Specializing in Scottish Aviation History • WWI & WWII Aircraft</p>
            </Link>

            {/* Contact Info and Basket */}
            <div className="text-right hidden md:block">
              <div className="flex items-center gap-4 mb-1">
                <div>
                  <div className="text-sm">📧 charlese1mackay@hotmail.com</div>
                  <div className="text-xs text-gray-300">Glasgow, Scotland</div>
                  <div className="text-xs text-gray-300">Published Aviation Books</div>
                </div>

                {/* Basket Button */}
                <button
                  onClick={openBasket}
                  className="relative bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-medium transition-colors"
                  title="Shopping Basket"
                >
                  🛒 Basket
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center space-x-6 py-3">
            <Link href="/" className="text-white hover:text-gray-300 text-sm font-medium flex items-center">
              🏠 Home
            </Link>
            <Link href="/books" className="text-white hover:text-gray-300 text-sm font-medium flex items-center">
              📚 Shop Books
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300 text-sm font-medium flex items-center">
              👨‍💼 About Charles
            </Link>
            <Link href="/how-to-order" className="text-white hover:text-gray-300 text-sm font-medium flex items-center">
              🛒 How to Order
            </Link>
            <Link href="/for-researchers" className="text-white hover:text-gray-300 text-sm font-medium flex items-center">
              🔬 For Researchers
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 text-sm font-medium flex items-center">
              📧 Contact
            </Link>
            <Link href="/blog" className="text-white hover:text-gray-300 text-sm font-medium flex items-center">
              📝 Blog
            </Link>
            <Link href="/scottish-aviation-timeline" className="text-white hover:text-gray-300 text-sm font-medium flex items-center">
              🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Timeline
            </Link>
          </div>
        </div>
      </nav>

      {/* Trusted Seller Banner */}
      <div className="bg-green-500 text-center py-2">
        <div className="font-bold text-white">
          🏆 TRUSTED SELLER - 100% Positive Feedback
        </div>
      </div>
    </header>
  );
}
