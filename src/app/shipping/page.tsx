import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping Information — Free Worldwide Delivery',
  description: 'Free worldwide shipping on all aviation history books by Charles E. MacKay. Ships from Glasgow, Scotland. Delivery times: UK 2-4 days, Europe 5-10 days, worldwide 7-21 days.',
  alternates: { canonical: '/shipping' },
  openGraph: {
    title: 'Free Worldwide Shipping — Charles E. MacKay Books',
    description: 'Every order ships free worldwide from Glasgow, Scotland. No minimum order required.',
    url: 'https://charlesmackaybooks.com/shipping',
  },
};

export default function ShippingPage() {
  return (
    <>
      <div style={{ background: 'var(--navy)', padding: '32px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 28, marginBottom: 4 }}>Shipping Information</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Free worldwide delivery on every order</p>
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Free Worldwide Shipping</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            Every book ordered from charlesmackaybooks.com ships completely free — no minimum order, no hidden charges, no matter where you are in the world. All orders are dispatched from Glasgow, Scotland by Charles E. MacKay personally.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 16 }}>Estimated Delivery Times</h2>
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {[
              { region: 'United Kingdom', time: '2–4 working days', method: 'Royal Mail First Class' },
              { region: 'Europe', time: '5–10 working days', method: 'Royal Mail International Standard' },
              { region: 'USA & Canada', time: '7–14 working days', method: 'Royal Mail International Standard' },
              { region: 'Australia & New Zealand', time: '10–21 working days', method: 'Royal Mail International Standard' },
              { region: 'Rest of World', time: '7–21 working days', method: 'Royal Mail International Standard' },
            ].map((r, i) => (
              <div key={r.region} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, padding: '14px 20px', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', background: i % 2 === 0 ? 'var(--cream)' : 'var(--white)' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)' }}>{r.region}</span>
                <span style={{ fontSize: 14, color: 'var(--text-body)' }}>{r.time}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{r.method}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Packaging</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            All books are carefully packaged in sturdy cardboard mailers to ensure they arrive in perfect condition. Multi-book orders are bundled securely together to prevent damage during transit.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Order Tracking</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            You will receive an email confirmation when your order is placed. UK orders sent via Royal Mail First Class include tracking where available. International orders are sent via Royal Mail International Standard, which may include tracking depending on the destination country.
          </p>
        </section>

        <section style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-dark)', marginBottom: 8 }}>Questions about your order?</h3>
          <p style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.7, marginBottom: 16 }}>
            If your order hasn&apos;t arrived within the expected timeframe, or you have any questions about shipping, please get in touch.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', padding: '10px 20px', background: 'var(--navy)', color: 'var(--white)', fontWeight: 600, fontSize: 13, borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
            Contact us
          </Link>
        </section>
      </div>
    </>
  );
}
