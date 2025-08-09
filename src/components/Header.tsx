'use client';

import Link from 'next/link'
import { useState } from 'react'
import { primaryNavLinks } from '@/config/navigation'
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getTotalItems, openBasket } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]" role="banner">
      {/* Top Header Bar */}
      <div className="bg-slate-900">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-slate-900 focus:px-3 focus:py-2 focus:rounded">Skip to content</a>
        <div className="container max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center gap-4">
            {/* Logo and Author Info - Clickable */}
            <Link href="/" className="hover:opacity-90 transition-opacity cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 rounded">
              <h1 className="font-bold text-white tracking-tight text-base md:text-lg leading-none m-0">Charles E. MacKay</h1>
              <p className="text-white text-base md:text-lg leading-none m-0">Aviation Historian & Author</p>
              <p className="text-white/90 text-base md:text-lg leading-none m-0">Specializing in Scottish Aviation History • WWI & WWII Aircraft</p>
            </Link>

            {/* Actions */}
            <div className="text-right">
              <div className="flex items-center gap-3 md:gap-5 mb-1">
                {/* Simple Search (placeholder) */}
                <div className="hidden md:block">
                  <label htmlFor="site-search" className="sr-only">Search</label>
                  <input
                    id="site-search"
                    type="search"
                    placeholder="Search"
                    className="rounded bg-slate-800 text-white placeholder-white/70 px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Search site"
                  />
                </div>

                {/* Basket Button - Always visible */}
                <button
                  onClick={openBasket}
                  aria-label={`Open basket${getTotalItems() > 0 ? `, ${getTotalItems()} items` : ''}`}
                  className="relative badge badge-green px-5 md:px-6 py-3 rounded text-base md:text-base font-semibold transition-colors text-white min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
                  title="Shopping Basket"
                >
                  <span className="hidden sm:inline text-white">🛒 Basket</span>
                  <span className="sm:hidden text-white">🛒</span>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" aria-hidden>
                      {getTotalItems()}
                    </span>
                  )}
                </button>

                {/* Global navigation */}
                <div
                  className="relative"
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
                  onFocus={() => setOpen(true)}
                  onBlur={(e) => {
                    const current = e.currentTarget;
                    const related = e.relatedTarget as Node | null;
                    if (!related || (current && !current.contains(related))) {
                      setOpen(false);
                    }
                  }}
                >
                  <button
                    onClick={() => setOpen(o => !o)}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-controls="global-more-menu"
                    className="badge badge-blue px-3 py-2 rounded min-h-[44px] min-w-[44px] text-sm md:text-base"
                  >
                    ☰ More
                  </button>
                  {open && (
                  <div
                    id="global-more-menu"
                    role="menu"
                    className="absolute right-0 mt-2 w-64 bg-slate-900 text-white border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50"
                    onMouseEnter={() => setOpen(true)}
                  >
                      <nav className="flex flex-col p-1" aria-label="More navigation">
                        {primaryNavLinks.map(link => (
                          <Link
                            key={link.href}
                            href={link.href}
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="px-3 py-2 rounded hover:bg-slate-800 focus:bg-slate-800 focus:outline-none"
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

      {/* Primary navigation row */}
      <nav className="bg-slate-800 border-t border-slate-700" role="navigation" aria-label="Primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-start gap-1 md:gap-2 py-2 text-sm text-white">
            {primaryNavLinks.map(link => (
              <Link key={link.href} href={link.href} className="px-3 py-2 rounded text-white hover:bg-slate-700">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Navigation (hidden — replaced by compact dropdown) */}
      <nav className="bg-slate-700 hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-6 py-3">
            <Link href="/" className="text-white hover:text-white/90 text-sm md:text-base font-medium flex items-center px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-700 min-h-[44px]">
              <span className="md:hidden">🏠</span>
              <span className="hidden md:inline">🏠 Home</span>
            </Link>
            <Link href="/books" className="text-white hover:text-white/90 text-sm md:text-base font-medium flex items-center px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-700 min-h-[44px]">
              <span className="md:hidden">📚</span>
              <span className="hidden md:inline">📚 Shop Books</span>
            </Link>
            <Link href="/about" className="text-white hover:text-white/90 text-sm md:text-base font-medium flex items-center px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-700 min-h-[44px]">
              <span className="md:hidden">👨‍💼</span>
              <span className="hidden md:inline">👨‍💼 About Charles</span>
            </Link>
            <Link href="/how-to-order" className="text-white hover:text-white/90 text-sm md:text-base font-medium flex items-center px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-700 min-h-[44px]">
              <span className="md:hidden">🛒</span>
              <span className="hidden md:inline">🛒 How to Order</span>
            </Link>
            <Link href="/for-researchers" className="text-white hover:text-white/90 text-sm md:text-base font-medium flex items-center px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-700 min-h-[44px]">
              <span className="md:hidden">🔬</span>
              <span className="hidden md:inline">🔬 For Researchers</span>
            </Link>
            <Link href="/contact" className="text-white hover:text-white/90 text-sm md:text-base font-medium flex items-center px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-700 min-h-[44px]">
              <span className="md:hidden">📧</span>
              <span className="hidden md:inline">📧 Contact</span>
            </Link>
            <Link href="/blog" className="text-white hover:text-white/90 text-sm md:text-base font-medium flex items-center px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-700 min-h-[44px]">
              <span className="md:hidden">📝</span>
              <span className="hidden md:inline">📝 Blog</span>
            </Link>
            <Link href="/scottish-aviation-timeline" className="text-white hover:text-white/90 text-sm md:text-base font-medium flex items-center px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-700 min-h-[44px]">
              <span className="md:hidden">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
              <span className="hidden md:inline">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Timeline</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Trusted Seller Banner */}
      <div className="bg-accent-green text-center py-2">
        <div className="font-bold text-white text-sm md:text-base">
          🏆 TRUSTED SELLER - 100% Positive Feedback
        </div>
      </div>
    </header>
  );
}
