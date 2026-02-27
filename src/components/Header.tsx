'use client';

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { mainNavLinks, moreNavLinks } from '@/config/navigation'
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getTotalItems, getBulkDiscountPercentage, openBasket } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const totalItems = getTotalItems();
  const activeBulkDiscount = getBulkDiscountPercentage();

  // Click outside handler for mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target as Node)) {
        setDesktopMenuOpen(false);
      }
    };

    if (mobileMenuOpen || desktopMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, desktopMenuOpen]);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]" role="banner">
      {/* Top Header Bar */}
      <div className="bg-slate-900">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-slate-900 focus:px-3 focus:py-2 focus:rounded">Skip to content</a>
        <div className="container max-w-7xl mx-auto px-4 py-2 md:py-4">
          <div className="flex justify-between items-center gap-4">
            {/* Logo and Author Info - Clickable */}
            <Link href="/" className="hover:opacity-90 transition-opacity cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 rounded">
              <h1 className="font-bold text-white tracking-tight text-base sm:text-lg md:text-xl leading-tight m-0">Charles E. MacKay</h1>
              <p className="text-white text-xs sm:text-sm md:text-base leading-tight m-0">Aviation Historian & Author</p>
              <p className="hidden md:block text-white/90 text-xs sm:text-sm md:text-base leading-tight m-0">Specializing in Scottish Aviation History • WWI & WWII Aircraft</p>
            </Link>

            {/* Actions */}
            <div className="text-right">
              <div className="flex items-center gap-2 md:gap-4 mb-1">
                {/* Basket Button - Always visible, before search */}
                <button
                  onClick={openBasket}
                  aria-label={`Open basket${totalItems > 0 ? `, ${totalItems} items` : ''}`}
                  className="relative bg-white text-slate-900 px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-gray-100 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
                  title="Shopping Basket"
                >
                  <span className="hidden sm:inline">🛒 Basket</span>
                  <span className="sm:hidden">🛒</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold" aria-hidden>
                      {totalItems}
                    </span>
                  )}
                  {activeBulkDiscount > 0 && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] rounded px-1.5 py-0.5 font-bold leading-none" aria-hidden>
                      {activeBulkDiscount}% off
                    </span>
                  )}
                </button>

                {/* Mobile Search Toggle */}
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="md:hidden bg-slate-800 text-white px-3 py-2 rounded-lg min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  aria-label="Toggle search"
                >
                  🔍
                </button>

                {/* Desktop Search */}
                <div className="hidden md:block">
                  <label htmlFor="site-search" className="sr-only">Search</label>
                  <input
                    id="site-search"
                    type="search"
                    placeholder="Search"
                    className="rounded bg-slate-800 text-white placeholder-white/70 px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Search site"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const q = search.trim();
                        if (q.length > 0) router.push(`/search?query=${encodeURIComponent(q)}`);
                      }
                    }}
                  />
                </div>

                {/* Global navigation (More dropdown for mobile/compact screens) */}
                <div
                  className="relative"
                  ref={mobileMenuRef}
                  onKeyDown={(e) => { if (e.key === 'Escape') setMobileMenuOpen(false); }}
                >
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-haspopup="menu"
                    aria-controls="global-more-menu"
                    className="bg-slate-900 text-white px-3 py-2 rounded min-h-[44px] min-w-[44px] text-sm hover:bg-slate-800 border border-white/60 transition-colors"
                  >
                    ☰ More
                  </button>
                  {mobileMenuOpen && (
                  <div
                    id="global-more-menu"
                    className="absolute right-0 mt-2 w-64 bg-slate-900 border border-white/50 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    <nav className="flex flex-col p-1" aria-label="More navigation">
                        {/* Main navigation links in mobile menu */}
                        {mainNavLinks.map(link => (
                          <Link
                            key={link.href}
                            href={link.href}
                            role="menuitem"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded bg-slate-900 text-white hover:bg-slate-800 hover:underline focus:bg-slate-800 focus:outline-none border border-transparent hover:border-white/40 transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}

                        {/* Separator */}
                        <div className="border-t border-white/20 my-1"></div>

                        {/* More navigation links */}
                        {moreNavLinks.map(link => (
                          <Link
                            key={link.href}
                            href={link.href}
                            role="menuitem"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-3 py-2 rounded bg-slate-900 text-white hover:bg-slate-800 hover:underline focus:bg-slate-800 focus:outline-none border border-transparent hover:border-white/40 transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 p-3">
          <div className="flex gap-2">
            <input
              type="search"
              placeholder="Search books..."
              className="flex-1 rounded bg-slate-700 text-white placeholder-white/70 px-3 py-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const q = search.trim();
                  if (q.length > 0) {
                    router.push(`/search?query=${encodeURIComponent(q)}`);
                    setShowMobileSearch(false);
                  }
                }
              }}
            />
            <button
              onClick={() => setShowMobileSearch(false)}
              className="bg-slate-600 text-white px-3 py-2 rounded hover:bg-slate-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Primary navigation row (desktop) */}
      <nav className="bg-slate-900 border-t border-slate-700 header-primary-nav hidden md:block" role="navigation" aria-label="Primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-start gap-1 md:gap-2 py-2 text-sm">
            {/* Main navigation links */}
            {mainNavLinks.map(link => (
              <Link key={link.href} href={link.href} className="px-3 py-2 rounded bg-white text-slate-900 hover:bg-gray-100 hover:underline border border-slate-900 transition-colors">
                {link.label}
              </Link>
            ))}

            {/* More dropdown */}
            <div
              className="relative ml-2"
              ref={desktopMenuRef}
              onKeyDown={(e) => { if (e.key === 'Escape') setDesktopMenuOpen(false); }}
            >
              <button
                onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                aria-haspopup="menu"
                className="px-3 py-2 rounded bg-slate-900 text-white hover:bg-slate-800 hover:underline border border-white/60 flex items-center gap-1 transition-colors"
              >
                More ▼
              </button>
              {desktopMenuOpen && (
                <div className="absolute left-0 mt-1 w-56 bg-slate-900 border border-white/50 rounded-lg shadow-xl overflow-hidden z-50">
                  <nav className="flex flex-col py-1" aria-label="More navigation">
                    {moreNavLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setDesktopMenuOpen(false)}
                        className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 hover:underline focus:bg-slate-800 focus:outline-none border border-transparent hover:border-white/40 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Legacy hidden nav removed – unified header/nav above handles all navigation */}
      {/* Close pinned menu on outside click */}
      <script dangerouslySetInnerHTML={{ __html: '' }} />
      <style jsx>{`
        /* Navigation links styling - dark background, thin white borders */
        .header-primary-nav a {
          background-color: #0f172a !important;
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.55) !important;
          text-decoration: none !important;
        }
        .header-primary-nav a:hover {
          background-color: #1e293b !important;
          text-decoration: underline !important;
        }
        /* Dropdown menu styling */
        #global-more-menu {
          background-color: #0f172a !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
        }
        #global-more-menu a {
          background-color: #0f172a !important;
          color: #ffffff !important;
          text-decoration: none !important;
        }
        #global-more-menu a:hover {
          background-color: #1e293b !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          text-decoration: underline !important;
        }
      `}</style>
    </header>
  );
}
