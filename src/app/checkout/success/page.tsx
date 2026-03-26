'use client';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const orderId = searchParams.get('order_id') || '';
  const deliveryCountry = searchParams.get('country') || 'GB';

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Estimated delivery date (7 days from now for domestic, 21 for international)
  const estimatedDays = deliveryCountry === 'GB' ? 5 : 21;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
  const formattedDate = deliveryDate.toISOString().split('T')[0];

  return (
    <>
      {/* Google Customer Reviews survey opt-in */}
      <Script id="gcr-survey" strategy="afterInteractive">{`
        window.renderOptIn = function() {
          if (window.gapi) {
            window.gapi.load('surveyoptin', function() {
              window.gapi.surveyoptin.render({
                "merchant_id": 5631213189,
                "order_id": "${orderId}",
                "email": "${email}",
                "delivery_country": "${deliveryCountry}",
                "estimated_delivery_date": "${formattedDate}",
                "opt_in_style": "CENTER_DIALOG"
              });
            });
          }
        };
        if (window.gapi) { window.renderOptIn(); }
      `}</Script>

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
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <section style={{ padding: '80px 24px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <p>Loading...</p>
      </section>
    }>
      <SuccessContent />
    </Suspense>
  );
}
