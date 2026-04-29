import type { Metadata } from 'next';
import Link from 'next/link';
import { SHIPPING_ZONES } from '@/data/shipping-zones';

export const metadata: Metadata = {
  title: 'Shipping Information, Royal Mail Tracked Worldwide',
  description: 'Royal Mail Tracked shipping on all aviation history books by Charles E. MacKay. Ships from Glasgow, Scotland. Postage calculated at checkout. UK 2-4 days, Europe 5-14 days, worldwide 7-21 days.',
  alternates: { canonical: '/shipping' },
  openGraph: {
    title: 'Shipping, Charles E. MacKay Books',
    description: 'Royal Mail Tracked shipping worldwide. Postage calculated at checkout. Ships from Glasgow, Scotland.',
    url: 'https://charlesmackaybooks.com/shipping',
  },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is shipping calculated?',
      acceptedAnswer: { '@type': 'Answer', text: 'Shipping is calculated at checkout based on your delivery destination. UK orders ship via Royal Mail Tracked 48; international orders via Royal Mail International Tracked. Exact postage is shown before payment.' },
    },
    {
      '@type': 'Question',
      name: 'How long does delivery take?',
      acceptedAnswer: { '@type': 'Answer', text: 'UK: 2-4 working days via Royal Mail Tracked 48. Europe: 5-14 working days. USA & Canada: 7-14 working days. Australia, NZ & Far East: 10-21 working days. Rest of World: 10-21 working days.' },
    },
    {
      '@type': 'Question',
      name: 'Do you offer order tracking?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every order ships via a Royal Mail tracked service with online delivery confirmation. UK Tracked 48 and International Tracked both include end-to-end tracking.' },
    },
    {
      '@type': 'Question',
      name: 'Will I have to pay import duty or VAT?',
      acceptedAnswer: { '@type': 'Answer', text: 'A Mackay (Publisher) Ltd is not VAT registered and does not collect VAT at checkout. Customers outside the United Kingdom may be liable for import duty, sales tax, or VAT collected by their local courier or postal service. These charges (where applicable) are the responsibility of the recipient.' },
    },
    {
      '@type': 'Question',
      name: 'How are the books packaged?',
      acceptedAnswer: { '@type': 'Answer', text: 'All books are packaged in sturdy cardboard mailers. Multi-book orders are bundled securely together to prevent damage in transit.' },
    },
  ],
};

export default function ShippingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div style={{ background: 'var(--navy)', padding: '32px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 28, marginBottom: 4 }}>Shipping Information</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Royal Mail Tracked, calculated at checkout</p>
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Royal Mail Tracked Shipping</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            Every book ordered from charlesmackaybooks.com ships from Glasgow, Scotland by Royal Mail Tracked services. Postage is calculated at checkout based on your delivery destination. The exact amount is shown before you pay. All orders are packed and dispatched personally by Charles E. MacKay.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 16 }}>Postage by Destination</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
            Indicative rates for a single hardcover book (~600g). Multi-book orders use the same zone rate up to 750g; heavier orders are quoted at checkout.
          </p>
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {SHIPPING_ZONES.map((z, i) => (
              <div
                key={z.key}
                className="shipping-rate-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: 16,
                  padding: '14px 20px',
                  borderBottom: i < SHIPPING_ZONES.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 === 0 ? 'var(--cream)' : 'var(--white)',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)' }}>{z.displayName.replace('Royal Mail Tracked - ', '').replace('Royal Mail International Tracked - ', '')}</span>
                <span style={{ fontSize: 14, color: 'var(--text-body)' }}>£{(z.amountPence / 100).toFixed(2)}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{z.minDays} to {z.maxDays} working days</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Import Duty &amp; VAT (international orders)</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            A Mackay (Publisher) Ltd is <strong>not VAT registered</strong> and does not collect VAT at checkout. Customers outside the United Kingdom may be liable for import duty, sales tax, or local VAT collected by their courier or national postal service on delivery. Where applicable, these charges are the responsibility of the recipient.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Packaging &amp; Tracking</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            All books are packaged in sturdy cardboard mailers; multi-book orders are bundled securely together. Every order ships with a Royal Mail tracking number. UK Tracked 48 and International Tracked both include end-to-end delivery confirmation. Tracking details are sent by email once your order is dispatched (usually within 1 to 2 working days of payment).
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
