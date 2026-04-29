'use client';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/lib/supabase/client';

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || '';
  const emailParam = searchParams.get('email') || '';
  const orderId = searchParams.get('order_id') || sessionId;
  const countryParam = searchParams.get('country') || 'GB';

  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string>(emailParam);
  const [sessionCountry, setSessionCountry] = useState<string>(countryParam);
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [magicSent, setMagicSent] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string>('');

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  // Check auth state + fetch session details to pre-fill signup email
  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (cancelled) return;
      setIsLoggedIn(!!user);

      if (!user && sessionId) {
        try {
          const r = await fetch(
            `/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`,
            { cache: 'no-store' }
          );
          if (r.ok) {
            const data = await r.json();
            if (cancelled) return;
            if (data.email) {
              setSessionEmail(data.email);
              setSignupEmail(data.email);
            }
            if (data.country) setSessionCountry(data.country);
          }
        } catch {
          // non-fatal
        }
      }
      setAuthChecked(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    setSignupLoading(true);
    try {
      const supabase = createClient();
      const origin =
        typeof window !== 'undefined'
          ? window.location.origin
          : 'https://charlesmackaybooks.com';
      const { error } = await supabase.auth.signInWithOtp({
        email: signupEmail,
        options: {
          emailRedirectTo: `${origin}/auth/callback?redirect_to=/account/orders`,
        },
      });
      if (error) throw error;
      setMagicSent(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to send sign-in link';
      setSignupError(message);
    } finally {
      setSignupLoading(false);
    }
  };

  // Estimated delivery date (5 days domestic, 21 international)
  const estimatedDays = sessionCountry === 'GB' ? 5 : 21;
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
                "email": "${sessionEmail}",
                "delivery_country": "${sessionCountry}",
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
          Your books will be posted by Royal Mail tracked service.
        </p>

        {/* Post-purchase signup prompt — only render when we know the user
            isn't already logged in, to avoid a flash of the wrong UI. */}
        {authChecked && !isLoggedIn && (
          <div
            style={{
              background: 'var(--cream, #FFFBF0)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 'var(--radius-md, 8px)',
              padding: '24px 24px 28px',
              margin: '0 auto 32px',
              textAlign: 'left',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 19,
                fontWeight: 700,
                color: 'var(--text-dark)',
                marginBottom: 8,
              }}
            >
              Save your details for next time?
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: 14,
                lineHeight: 1.6,
                marginBottom: 16,
              }}
            >
              We'll email you a 1-click sign-in link so you can track this
              order, save your address, and skip checkout next time. No
              password needed.
            </p>

            {magicSent ? (
              <div
                style={{
                  background: 'rgba(34,139,34,0.08)',
                  borderRadius: 6,
                  padding: '14px 16px',
                  fontSize: 14,
                  color: '#1f6f1f',
                  lineHeight: 1.5,
                }}
              >
                Check your email. We have sent a sign-in link to{' '}
                <strong>{signupEmail}</strong>. Click it to access your
                account and view this order.
              </div>
            ) : (
              <form
                onSubmit={sendMagicLink}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                <label
                  htmlFor="signup-email"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                  }}
                >
                  Email address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  style={{
                    padding: '12px 14px',
                    fontSize: 15,
                    border: '1px solid rgba(0,0,0,0.15)',
                    borderRadius: 6,
                    background: 'white',
                  }}
                />
                {signupError && (
                  <div style={{ color: '#b00020', fontSize: 13 }}>
                    {signupError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={signupLoading || !signupEmail}
                  style={{
                    padding: '12px 20px',
                    background: 'var(--gold)',
                    color: 'var(--navy)',
                    border: 'none',
                    borderRadius: 'var(--radius-md, 6px)',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: signupLoading ? 'wait' : 'pointer',
                    opacity: signupLoading ? 0.7 : 1,
                  }}
                >
                  {signupLoading ? 'Sending…' : 'Send sign-in link'}
                </button>
              </form>
            )}
          </div>
        )}

        {authChecked && isLoggedIn && (
          <div style={{ marginBottom: 32 }}>
            <Link
              href="/account/orders"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'transparent',
                color: 'var(--navy)',
                border: '1px solid var(--navy)',
                borderRadius: 'var(--radius-md, 6px)',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                marginRight: 12,
              }}
            >
              View this order in your account
            </Link>
          </div>
        )}

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
