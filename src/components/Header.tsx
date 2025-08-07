'use client';

import Link from 'next/link'
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getTotalItems, openBasket } = useCart();

  return (
    <header className="bg-slate-800 text-white sticky top-0 z-50 shadow-lg">
      {/* Top Header Bar */}
      <div className="bg-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Author Info - Clickable */}
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
              <h1 className="text-xl font-bold">Charles E. MacKay</h1>
              <p className="text-sm text-gray-200">Aviation Historian & Author</p>
              <p className="text-xs text-gray-300">Specializing in Scottish Aviation History • WWI & WWII Aircraft</p>
            </Link>

            {/* Contact Info and Basket */}
            <div className="text-right">
              <div className="flex items-center gap-2 md:gap-4 mb-1">
                <div className="hidden md:block">
                  <div className="text-sm">📧 charlese1mackay@hotmail.com</div>
                  <div className="text-xs text-gray-200">Glasgow, Scotland</div>
                  <div className="text-xs text-gray-200">Published Aviation Books</div>
                </div>

                {/* Basket Button - Always visible */}
                <button
                  onClick={openBasket}
                  className="relative badge badge-green px-3 md:px-4 py-2 rounded text-sm font-medium transition-colors"
                  title="Shopping Basket"
                >
                  <span className="hidden sm:inline">🛒 Basket</span>
                  <span className="sm:hidden">🛒</span>
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
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-6 py-3">
            <Link href="/" className="text-white hover:text-gray-300 text-xs md:text-sm font-medium flex items-center px-2 py-1 rounded">
              <span className="md:hidden">🏠</span>
              <span className="hidden md:inline">🏠 Home</span>
            </Link>
            <Link href="/books" className="text-white hover:text-gray-300 text-xs md:text-sm font-medium flex items-center px-2 py-1 rounded">
              <span className="md:hidden">📚</span>
              <span className="hidden md:inline">📚 Shop Books</span>
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300 text-xs md:text-sm font-medium flex items-center px-2 py-1 rounded">
              <span className="md:hidden">👨‍💼</span>
              <span className="hidden md:inline">👨‍💼 About Charles</span>
            </Link>
            <Link href="/how-to-order" className="text-white hover:text-gray-300 text-xs md:text-sm font-medium flex items-center px-2 py-1 rounded">
              <span className="md:hidden">🛒</span>
              <span className="hidden md:inline">🛒 How to Order</span>
            </Link>
            <Link href="/for-researchers" className="text-white hover:text-gray-300 text-xs md:text-sm font-medium flex items-center px-2 py-1 rounded">
              <span className="md:hidden">🔬</span>
              <span className="hidden md:inline">🔬 For Researchers</span>
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 text-xs md:text-sm font-medium flex items-center px-2 py-1 rounded">
              <span className="md:hidden">📧</span>
              <span className="hidden md:inline">📧 Contact</span>
            </Link>
            <Link href="/blog" className="text-white hover:text-gray-300 text-xs md:text-sm font-medium flex items-center px-2 py-1 rounded">
              <span className="md:hidden">📝</span>
              <span className="hidden md:inline">📝 Blog</span>
            </Link>
            <Link href="/scottish-aviation-timeline" className="text-white hover:text-gray-300 text-xs md:text-sm font-medium flex items-center px-2 py-1 rounded">
              <span className="md:hidden">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
              <span className="hidden md:inline">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Timeline</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Trusted Seller Banner */}
              <div className="bg-accent-green text-center py-2">
        <div className="font-bold text-white">
          🏆 TRUSTED SELLER - 100% Positive Feedback
        </div>
      </div>
    </header>
  );
}
