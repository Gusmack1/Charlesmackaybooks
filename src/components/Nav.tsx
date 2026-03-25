'use client';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--navy)', borderBottom: '1px solid rgba(200,169,81,0.2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Brand */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--white)', textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 16, color: 'var(--navy)' }}>CM</div>
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 700, letterSpacing: 0.3, display: 'block', color: 'var(--white)' }}>Charles E. MacKay</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, color: 'var(--gold)', textTransform: 'uppercase' as const, letterSpacing: 1.5, display: 'block', marginTop: -2 }}>Aviation History Books</span>
          </div>
        </Link>

        {/* Links — desktop */}
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none' }} className="nav-links-desktop">
          {links.map(l => (
            <li key={l.href}><Link href={l.href} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500, letterSpacing: 0.3, transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}>{l.label}</Link></li>
          ))}
        </ul>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input type="text" placeholder="Search books..." className="nav-search-input" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px', color: 'white', fontSize: 13, width: 180, outline: 'none' }} />
          <Link href="/checkout" style={{ position: 'relative', background: 'none', border: 'none', color: 'white', padding: 4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 22, height: 22 }}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </Link>
          {/* Mobile menu btn */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ display: 'none', background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 24, height: 24 }}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '8px 24px' }} className="mobile-menu">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '10px 0', color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>{l.label}</Link>
          ))}
        </div>
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-search-input { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
