import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns & Refunds Policy',
  description: 'Returns and refunds policy for charlesmackaybooks.com. 30-day money-back guarantee on all books. Return for any reason: change of mind, damaged, or unwanted. Full refund guaranteed.',
  alternates: { canonical: '/returns' },
  openGraph: {
    title: 'Returns & Refunds, Charles E. MacKay Books',
    description: '30-day returns policy. Return books for any reason: change of mind, unwanted, or damaged. Full refund guaranteed.',
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
      acceptedAnswer: { '@type': 'Answer', text: 'We accept returns for any reason within 30 days of delivery. Whether you changed your mind, the book was not what you expected, or it arrived damaged, simply return it in its original condition for a full refund.' },
    },
    {
      '@type': 'Question',
      name: 'What if my book arrives damaged?',
      acceptedAnswer: { '@type': 'Answer', text: 'Contact us within 14 days with a photo of the damage. We will reply with the return address. Once the book is back with us, you can choose a replacement copy or a full refund. Return postage on damaged or faulty items is at our expense.' },
    },
    {
      '@type': 'Question',
      name: 'How long do refunds take?',
      acceptedAnswer: { '@type': 'Answer', text: 'Refunds are processed within 5 working days of receiving the returned book, to your original payment method (card via Stripe).' },
    },
    {
      '@type': 'Question',
      name: 'Can I cancel my order?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Email us before dispatch and we will cancel and refund in full. Once posted, the standard returns process applies.' },
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
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>30-Day Money-Back Guarantee, Any Reason</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            We accept returns for any reason within 30 days of delivery. Whether you changed your mind, the book was not what you expected, or you simply no longer need it, return it in its original condition for a full refund. No questions asked. This applies to both new and non-defective products as well as damaged or faulty items.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 12 }}>Damaged or Faulty Items</h2>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.8 }}>
            If your book arrives damaged or faulty, email us within 14 days of delivery with a photo of the damage. We will reply with the return address. Once the book is back with us, you can choose a replacement copy or a full refund. Return postage on damaged or faulty items is at our expense.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)', marginBottom: 16 }}>How to Return</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { step: '1', title: 'Contact us', desc: 'Email info@charlesmackaybooks.com with your order number and reason for return.' },
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
            Refunds are issued to the original payment method (credit/debit card via Stripe). Please allow up to 5 working days for the refund to appear in your account after we confirm receipt of the returned book.
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
