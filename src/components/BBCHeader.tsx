'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { primaryNavLinks } from '@/config/navigation';

export default function BBCHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  return (
    <header className="relative bg-slate-900 text-white sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="font-bold text-xl tracking-tight">Charles Mackay Books</Link>
          <div className="hidden md:flex items-center gap-2">
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const q = search.trim();
                  if (q) router.push(`/search?query=${encodeURIComponent(q)}`);
                }
              }}
              className="rounded bg-slate-800 text-white placeholder-white/70 px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search site"
            />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-controls="bbc-menu"
              className="px-3 py-2 rounded bg-slate-800"
            >
              ☰ Menu
            </button>
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            className="md:hidden px-3 py-2 rounded bg-slate-800"
          >
            ☰
          </button>
        </div>
      </div>
      <nav className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex gap-2 py-2">
            {primaryNavLinks.map((l) => (
              <Link key={l.href} href={l.href} className="px-3 py-2 rounded text-white hover:bg-slate-800">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div id="bbc-menu" role="menu" ref={menuRef} className="absolute left-0 right-0 top-full z-[60] border-t border-slate-800 bg-slate-900 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {primaryNavLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  role="menuitem"
                  className="px-3 py-2 rounded text-white hover:bg-slate-800 focus:bg-slate-800 focus:outline-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        header, header * { color: #fff !important; }
        header a, header a:link, header a:visited, header a:hover, header a:active { color: #fff !important; text-decoration: none; }
      `}</style>
    </header>
  );
}


