'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useSession } from '@/components/SessionProvider';
import SearchBar from '@/components/SearchBar';

const links = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getTotalItems, openBasket } = useCart();
  const { user, loading } = useSession();
  const count = getTotalItems();

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--navy)', borderBottom: '1px solid rgba(200,169,81,0.2)' }} role="navigation" aria-label="Main navigation">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Brand */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--white)', textDecoration: 'none' }} aria-label="Charles E. MacKay Books — Home">
          <div style={{ width: 36, height: 36, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 16, color: 'var(--navy)' }}>CM</div>
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 700, letterSpacing: 0.3, display: 'block', color: 'var(--white)' }}>Charles E. MacKay</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 500, color: 'var(--gold)', textTransform: 'uppercase' as const, letterSpacing: 1.5, display: 'block', marginTop: -2 }}>Aviation History Books</span>
          </div>
        </Link>

        {/* Links — desktop */}
        <ul className="nav-links-desktop" style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
          {links.map(l => (
            <li key={l.href}><Link href={l.href} style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500, letterSpacing: 0.3, transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}>{l.label}</Link></li>
          ))}
        </ul>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="nav-search-wrapper">
            <SearchBar />
          </div>
          <button onClick={openBasket} aria-label={`Shopping basket${count > 0 ? `, ${count} items` : ''}`} style={{ position: 'relative', background: 'none', border: 'none', color: 'white', padding: 4, cursor: 'pointer' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 22, height: 22 }}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {count > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -6, background: 'var(--gold)', color: 'var(--navy)', fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>
            )}
          </button>
          {!loading && (
            user ? (
              <Link href="/account" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}>
                <div style={{ width: 28, height: 28, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 12, color: 'var(--navy)' }}>
                  {user.email?.[0].toUpperCase() || 'A'}
                </div>
                <span>Account</span>
              </Link>
            ) : (
              <Link href="/login" style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500, letterSpacing: 0.3, transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}>Sign in</Link>
            )
          )}
          {/* Mobile menu btn */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}>
            {menuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 24, height: 24 }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 24, height: 24 }}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div style={{ background: 'var(--navy-light)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 24px 16px' }} className="mobile-menu">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{l.label}</Link>
          ))}
          <Link href="/checkout" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', color: 'var(--gold)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            View Basket {count > 0 && `(${count})`}
          </Link>
          {!loading && (
            user ? (
              <>
                <Link href="/account" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Account</Link>
                <form action="/auth/signout" method="POST" onClick={() => setMenuOpen(false)}>
                  <button type="submit" style={{ width: '100%', textAlign: 'left', padding: '12px 0', color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: 500, background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', fontFamily: 'inherit' }}>Sign out</button>
                </form>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 0', color: 'var(--gold)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
            )
          )}
        </div>
      )}
      <style>{`
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-search-wrapper { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
