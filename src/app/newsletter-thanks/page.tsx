import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscribed — Thank You',
  robots: { index: false },
};

export default function NewsletterThanks() {
  return (
    <section style={{ padding: '120px 24px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 12 }}>
        You&apos;re subscribed!
      </h1>
      <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
        Thank you for joining. You&apos;ll receive new book announcements, research articles, and exclusive reader discounts straight to your inbox.
      </p>
      <Link href="/books" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--gold)', color: 'var(--navy)', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
        Browse books
      </Link>
    </section>
  );
}
