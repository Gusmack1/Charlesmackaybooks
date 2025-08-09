'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface MobileFirstLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function MobileFirstLayout({
  children,
  title = 'Charles E. MacKay - Aviation Historian & Author',
  description = 'Specializing in Scottish Aviation History • WWI & WWII Aircraft',
  showHeader = true,
  showFooter = true
}: MobileFirstLayoutProps) {
  const { getTotalItems, openBasket } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Mobile-First Header */}
      {showHeader && (
        <header className={`bg-slate-800 text-white sticky top-0 z-50 transition-shadow duration-200 ${
          isScrolled ? 'shadow-lg' : ''
        }`}>
          {/* Top Header Bar */}
          <div className="bg-slate-800">
            <div className="container">
              <div className="flex justify-between items-center py-4">
                {/* Logo and Author Info */}
                <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
                  <h1 className="text-xl font-bold">Charles E. MacKay</h1>
                  <p className="text-sm text-gray-300 hidden sm:block">{description}</p>
                  <p className="text-xs text-gray-400 hidden md:block">
                    Specializing in Scottish Aviation History • WWI & WWII Aircraft
                  </p>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  className="mobile-menu-toggle nav-toggle md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>

                {/* Desktop Contact Info and Basket */}
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

          {/* Legacy desktop navigation removed – global header handles navigation */}
          
          {/* Trusted Seller Banner */}
          <div className="bg-green-500 text-center py-2">
            <div className="font-bold text-white text-sm sm:text-base">
              🏆 TRUSTED SELLER - 100% Positive Feedback
            </div>
          </div>
        </header>
      )}

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu nav-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-white font-bold">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="flex-1 p-4">
            <div className="space-y-4">
              <Link
                href="/"
                className="block text-white hover:text-gray-300 text-lg font-medium py-3 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              <Link
                href="/books"
                className="block text-white hover:text-gray-300 text-lg font-medium py-3 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📚 Shop Books
              </Link>
              <Link
                href="/about"
                className="block text-white hover:text-gray-300 text-lg font-medium py-3 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                👨‍💼 About Charles
              </Link>
              <Link
                href="/how-to-order"
                className="block text-white hover:text-gray-300 text-lg font-medium py-3 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🛒 How to Order
              </Link>
              <Link
                href="/for-researchers"
                className="block text-white hover:text-gray-300 text-lg font-medium py-3 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🔬 For Researchers
              </Link>
              <Link
                href="/contact"
                className="block text-white hover:text-gray-300 text-lg font-medium py-3 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📧 Contact
              </Link>
              <Link
                href="/blog"
                className="block text-white hover:text-gray-300 text-lg font-medium py-3 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📝 Blog
              </Link>
              <Link
                href="/scottish-aviation-timeline"
                className="block text-white hover:text-gray-300 text-lg font-medium py-3 border-b border-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Timeline
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="text-white text-sm mb-4">
              <div>📧 charlese1mackay@hotmail.com</div>
              <div className="text-gray-300">Glasgow, Scotland</div>
            </div>
            <button
              onClick={() => {
                openBasket();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded text-white font-medium transition-colors"
            >
              🛒 Basket ({getTotalItems()})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Mobile-First Footer */}
      {showFooter && (
        <footer className="bg-slate-800 text-white">
          <div className="container">
            <div className="py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>📧 charlese1mackay@hotmail.com</p>
                    <p>📍 Glasgow, Scotland</p>
                    <p>📚 Published Aviation Books</p>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <div className="space-y-2 text-sm">
                    <Link href="/books" className="block hover:text-gray-300 transition-colors">
                      📚 Shop Books
                    </Link>
                    <Link href="/about" className="block hover:text-gray-300 transition-colors">
                      👨‍💼 About Charles
                    </Link>
                    <Link href="/blog" className="block hover:text-gray-300 transition-colors">
                      📝 Blog
                    </Link>
                    <Link href="/contact" className="block hover:text-gray-300 transition-colors">
                      📧 Contact
                    </Link>
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Specializations</h3>
                  <div className="space-y-2 text-sm">
                    <p>🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Aviation History</p>
                    <p>✈️ WWI Aircraft</p>
                    <p>🛩️ WWII Aircraft</p>
                    <p>📖 Historical Research</p>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-gray-700 pt-6 mt-8 text-center text-sm text-gray-300">
                <p>&copy; {new Date().getFullYear()} Charles E. MacKay. All rights reserved.</p>
                <p className="mt-2">Specializing in Scottish Aviation History • WWI & WWII Aircraft</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
} 