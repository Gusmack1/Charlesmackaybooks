import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns & Refunds Policy',
  description: 'Returns and refunds policy for charlesmackaybooks.com. 30-day returns on all aviation history books. Full refund or replacement if your book arrives damaged.',
  alternates: { canonical: '/returns' },
  openGraph: {
    title: 'Returns & Refunds — Charles E. MacKay Books',
    description: '30-day returns policy. Full refund or replacement for damaged items.',
    url: 'https://charlesmackaybooks.com/returns',
  },
};

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is your returns policy?',
      acceptedAnswer: { '@type': 'Answer', text: 'You may return any book within 30 days of delivery for a full refund. Books must be returned in the same condition they were received — unused and undamaged.' },
    },
    {
      '@type': 'Question',
      name: 'What if my book arrives damaged?',
      acceptedAnswer: { '@type': 'Answer', text: 'Contact us within 14 days with a photo of the damage. We will send a replacement free of charge or issue a full refund — whichever you prefer.' },
    },
    {
      '@type': 'Question',
      name: 'How long do refunds take?',
      acceptedAnswer: { '@type': 'Answer', text: 'Refunds are processed within 5 working days of receiving the returned book, to your original payment method (Stripe or PayPal).' },
    },
    {
      '@type': 'Question',
      name: 'Can I cancel my order?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — email us before dispatch and we will cancel and refund in full. Once posted, the standard returns process applies.' },
    },
  ],
};

export default function ReturnsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div style={{ background: 'var(--navy)', padding: '32px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 28, marginBottom: 4 }}>Returns &amp; Refunds</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Your satisfaction is guaranteed</p>
      </div>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>30-Day Returns</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            If you are not completely satisfied with your purchase, you may return any book within 30 days of delivery for a full refund. Books must be returned in the same condition they were received — unused and undamaged.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Damaged or Faulty Items</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            If your book arrives damaged or faulty, please contact us within 14 days of delivery with a photo of the damage. We will send a replacement copy free of charge, or issue a full refund — whichever you prefer.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 16 }}>How to Return</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { step: '1', title: 'Contact us', desc: 'Email charlese1mackay@hotmail.com with your order number and reason for return.' },
              { step: '2', title: 'Post the book back', desc: 'Send the book to the return address provided. We recommend using a tracked service. Return postage is at the buyer\'s expense unless the item arrived damaged.' },
              { step: '3', title: 'Receive your refund', desc: 'Once we receive the book, your refund will be processed within 5 working days to your original payment method.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 16, color: 'var(--navy)', flexShrink: 0 }}>{s.step}</div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 4 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Refund Processing</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            Refunds are issued to the original payment method (credit/debit card via Stripe, or PayPal). Please allow up to 5 working days for the refund to appear in your account after we confirm receipt of the returned book.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Cancellations</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            If you wish to cancel an order before it has been dispatched, please email us as soon as possible. Once an order has been posted, it must be returned under the standard returns process above.
          </p>
        </section>

        <section style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--text-dark)', marginBottom: 8 }}>Need help with a return?</h3>
          <p style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.7, marginBottom: 16 }}>
            Charles handles all orders and returns personally. Get in touch and he&apos;ll sort it out promptly.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', padding: '10px 20px', background: 'var(--navy)', color: 'var(--white)', fontWeight: 600, fontSize: 13, borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>
            Contact us
          </Link>
        </section>
      </div>
    </>
  );
}
