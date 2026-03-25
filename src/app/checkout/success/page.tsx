'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section style={{ padding: '80px 24px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,139,34,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#228B22" strokeWidth={2.5} style={{ width: 32, height: 32 }}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 12 }}>
        Order confirmed!
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 8, lineHeight: 1.6 }}>
        Thank you for your purchase. A confirmation email has been sent to you.
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
        Your books will be posted with free worldwide shipping.
      </p>
      <Link href="/books" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--gold)', color: 'var(--navy)', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
        Continue browsing
      </Link>
    </section>
  );
}
