import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px', maxWidth: 600, margin: '0 auto' }}>
      <div style={{ fontSize: 72, fontFamily: 'var(--font-serif)', color: 'var(--gold)', marginBottom: 16 }}>404</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--text-dark)', marginBottom: 12 }}>Page not found</h1>
      <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Browse our collection of 20 aviation history books below.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Link href="/books" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--gold)', color: 'var(--navy)', fontWeight: 600, fontSize: 14, borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
          Browse all books
        </Link>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: 'var(--text-dark)', fontWeight: 500, fontSize: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
          Go home
        </Link>
      </div>
    </div>
  );
}
