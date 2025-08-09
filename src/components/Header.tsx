'use client';

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { primaryNavLinks } from '@/config/navigation'
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getTotalItems, openBasket } = useCart();
  const [open, setOpen] = useState(false);
  const [menuPinned, setMenuPinned] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]" role="banner">
      {/* Top Header Bar */}
      <div className="bg-slate-900">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-slate-900 focus:px-3 focus:py-2 focus:rounded">Skip to content</a>
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

                {/* Global navigation (More dropdown for compact screens) */}
                <div
                  className="relative md:hidden"
                  onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
                  onBlur={(e) => {
                    const current = e.currentTarget;
                    const related = e.relatedTarget as Node | null;
                    if (!related || (current && !current.contains(related))) {
                      setOpen(false);
                      setMenuPinned(false);
                    }
                  }}
                >
                  <button
                    onClick={() => {
                      setOpen((o) => {
                        const next = !o;
                        setMenuPinned(next);
                        return next;
                      });
                    }}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-controls="global-more-menu"
                    className="bg-slate-800 text-white px-3 py-2 rounded min-h-[44px] min-w-[44px] text-sm"
                  >
                    ☰ More
                  </button>
                  {open && (
                  <div
                    id="global-more-menu"
                    role="menu"
                    className="absolute right-0 mt-2 w-64 bg-slate-900 text-white border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50"
                    ref={menuRef}
                  >
                      <nav className="flex flex-col p-1" aria-label="More navigation">
                        {primaryNavLinks.map(link => (
                          <Link
                            key={link.href}
                            href={link.href}
                            role="menuitem"
                            onClick={() => { setOpen(false); setMenuPinned(false); }}
                            className="px-3 py-2 rounded text-white hover:bg-slate-800 focus:bg-slate-800 focus:outline-none"
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

      {/* Primary navigation row (desktop) */}
      <nav className="bg-slate-900 border-t border-slate-700 header-primary-nav hidden md:block" role="navigation" aria-label="Primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-start gap-1 md:gap-2 py-2 text-sm">
            {primaryNavLinks.map(link => (
              <Link key={link.href} href={link.href} className="px-3 py-2 rounded text-white hover:bg-slate-800 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Legacy hidden nav removed – unified header/nav above handles all navigation */}

      {/* Trusted Seller Banner */}
      <div className="bg-accent-green text-center py-2">
        <div className="font-bold text-white text-sm md:text-base">
          🏆 TRUSTED SELLER - 100% Positive Feedback
        </div>
      </div>
      {/* Close pinned menu on outside click */}
      <script dangerouslySetInnerHTML={{ __html: '' }} />
      <style jsx>{`
        .header-primary-nav a,
        .header-primary-nav a:link,
        .header-primary-nav a:visited,
        .header-primary-nav a:hover,
        .header-primary-nav a:active { color: #ffffff !important; text-decoration: none; }
        #global-more-menu a,
        #global-more-menu a:link,
        #global-more-menu a:visited,
        #global-more-menu a:hover,
        #global-more-menu a:active { color: #ffffff !important; text-decoration: none; }
      `}</style>
    </header>
  );
}
