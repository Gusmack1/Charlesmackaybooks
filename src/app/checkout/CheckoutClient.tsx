'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { SHIPPING_ZONES, getZoneForCountry } from '@/data/shipping-zones';
import type { Session } from '@supabase/supabase-js';

interface DefaultAddress {
  full_name: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const COUNTRY_OPTIONS: { code: string; name: string }[] = [
  // UK first
  { code: 'GB', name: 'United Kingdom' },
  // Europe
  { code: 'IE', name: 'Ireland' }, { code: 'FR', name: 'France' }, { code: 'DE', name: 'Germany' },
  { code: 'NL', name: 'Netherlands' }, { code: 'BE', name: 'Belgium' }, { code: 'LU', name: 'Luxembourg' },
  { code: 'AT', name: 'Austria' }, { code: 'CH', name: 'Switzerland' }, { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' }, { code: 'PT', name: 'Portugal' }, { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' }, { code: 'DK', name: 'Denmark' }, { code: 'FI', name: 'Finland' },
  { code: 'IS', name: 'Iceland' }, { code: 'PL', name: 'Poland' }, { code: 'CZ', name: 'Czech Republic' },
  { code: 'GR', name: 'Greece' }, { code: 'HU', name: 'Hungary' }, { code: 'RO', name: 'Romania' },
  { code: 'BG', name: 'Bulgaria' }, { code: 'HR', name: 'Croatia' }, { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' }, { code: 'EE', name: 'Estonia' }, { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' }, { code: 'MT', name: 'Malta' }, { code: 'CY', name: 'Cyprus' },
  // North America
  { code: 'US', name: 'United States' }, { code: 'CA', name: 'Canada' },
  // Far East / Oceania
  { code: 'AU', name: 'Australia' }, { code: 'NZ', name: 'New Zealand' }, { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' }, { code: 'CN', name: 'China' }, { code: 'HK', name: 'Hong Kong' },
  { code: 'TW', name: 'Taiwan' }, { code: 'SG', name: 'Singapore' }, { code: 'MY', name: 'Malaysia' },
  { code: 'TH', name: 'Thailand' }, { code: 'VN', name: 'Vietnam' }, { code: 'ID', name: 'Indonesia' },
  { code: 'PH', name: 'Philippines' },
  // Rest of World
  { code: 'IN', name: 'India' }, { code: 'PK', name: 'Pakistan' }, { code: 'BD', name: 'Bangladesh' },
  { code: 'AE', name: 'United Arab Emirates' }, { code: 'SA', name: 'Saudi Arabia' }, { code: 'IL', name: 'Israel' },
  { code: 'ZA', name: 'South Africa' }, { code: 'KE', name: 'Kenya' }, { code: 'NG', name: 'Nigeria' },
  { code: 'EG', name: 'Egypt' }, { code: 'MX', name: 'Mexico' }, { code: 'BR', name: 'Brazil' },
  { code: 'AR', name: 'Argentina' }, { code: 'CL', name: 'Chile' }, { code: 'CO', name: 'Colombia' },
];

export default function CheckoutClient({ session, defaultAddress }: { session: Session | null; defaultAddress: DefaultAddress | null }) {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, getBulkDiscount, getBulkDiscountPercentage, getShippingCost, getFinalTotal, shippingCountry, setShippingCountry } = useCart();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (!shippingCountry) {
      const seed = defaultAddress?.country?.toUpperCase() || 'GB';
      if (getZoneForCountry(seed)) setShippingCountry(seed);
      else setShippingCountry('GB');
    }
  }, [defaultAddress?.country, shippingCountry, setShippingCountry]);

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ bookId: i.book.id, quantity: i.quantity })),
          discountPct: getBulkDiscountPercentage(),
          country: shippingCountry || 'GB',
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout error: ' + (data.error || 'Unknown error'));
        setLoading(false);
      }
    } catch {
      alert('Network error — please try again.');
      setLoading(false);
    }
  };

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const discount = getBulkDiscount();
  const discountPct = getBulkDiscountPercentage();
  const shipping = getShippingCost();
  const finalTotal = getFinalTotal();
  const activeZone = shippingCountry ? getZoneForCountry(shippingCountry) : null;

  if (items.length === 0) {
    return (
      <section style={{ padding: '80px 24px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 64, height: 64, margin: '0 auto 24px', color: 'var(--text-muted)', opacity: 0.4 }}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 12 }}>Your basket is empty</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 24 }}>Browse our collection of aviation history books.</p>
        <Link href="/books" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--gold)', color: 'var(--navy)', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>Browse books</Link>
      </section>
    );
  }

  return (
    <>
      <div style={{ background: 'var(--navy)', padding: '32px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: 28, marginBottom: 4 }}>Checkout</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{totalItems} item{totalItems !== 1 ? 's' : ''} in your basket</p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }} className="contact-layout">
        {/* Cart items */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 24 }}>Order Summary</h2>
          {items.map(item => (
            <div key={item.book.id} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 80, height: 107, borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative', flexShrink: 0, background: 'var(--cream-dark)', border: '1px solid var(--border)' }}>
                <Image src={item.book.imageUrl || `/book-covers/${item.book.id}.jpg`} alt={item.book.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.3, marginBottom: 4 }}>{item.book.title}</h3>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{item.book.category}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => updateQuantity(item.book.id, item.quantity - 1)} style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--cream)', cursor: 'pointer', fontSize: 16 }}>-</button>
                    <span style={{ fontSize: 15, fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.book.id, item.quantity + 1)} style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--cream)', cursor: 'pointer', fontSize: 16 }}>+</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-dark)' }}>£{(item.book.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.book.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', fontSize: 12, fontWeight: 500 }}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 24 }}>
            <Link href="/books" style={{ color: 'var(--gold-dark)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>← Continue shopping</Link>
          </div>
        </div>

        {/* Payment summary */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, position: 'sticky', top: 100 }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--text-dark)', marginBottom: 20 }}>Payment Summary</h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14, color: 'var(--text-body)' }}>
            <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>

          {discountPct > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>Multi-buy discount ({discountPct}%)</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>-£{discount.toFixed(2)}</span>
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <label htmlFor="ship-country" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
              Ship to country
            </label>
            <select
              id="ship-country"
              value={shippingCountry || 'GB'}
              onChange={e => setShippingCountry(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--white)', fontSize: 14, color: 'var(--text-dark)', cursor: 'pointer' }}
            >
              {COUNTRY_OPTIONS.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14, color: 'var(--text-body)' }}>
            <span>Shipping</span>
            <span style={{ fontWeight: 600 }}>£{shipping.toFixed(2)}</span>
          </div>
          {activeZone && (
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, lineHeight: 1.4 }}>
              {activeZone.displayName} — {activeZone.minDays}–{activeZone.maxDays} business days
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, marginTop: 4, borderTop: '2px solid var(--border)', fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--text-dark)' }}>
            <span>Total</span>
            <span>£{finalTotal.toFixed(2)}</span>
          </div>

          {totalItems < 2 && (
            <div style={{ background: 'rgba(200,169,81,0.1)', border: '1px solid rgba(200,169,81,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginTop: 16, fontSize: 13, color: 'var(--gold-dark)', textAlign: 'center' }}>
              Add {2 - totalItems} more book{2 - totalItems > 1 ? 's' : ''} to save 5%!
            </div>
          )}
          {totalItems === 2 && (
            <div style={{ background: 'rgba(200,169,81,0.1)', border: '1px solid rgba(200,169,81,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginTop: 16, fontSize: 13, color: 'var(--gold-dark)', textAlign: 'center' }}>
              Add 1 more book to save 10% instead of 5%!
            </div>
          )}

          {/* Prefilled info hint for logged-in users */}
          {session?.user && (
            <div style={{ background: 'rgba(200,169,81,0.1)', border: '1px solid rgba(200,169,81,0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginTop: 16, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
              ✓ Your address will be pre-filled during checkout
            </div>
          )}

          {/* Stripe Checkout */}
          <button
            onClick={handleStripeCheckout}
            disabled={loading}
            style={{ display: 'block', width: '100%', padding: '16px 0', marginTop: 20, background: loading ? '#999' : 'var(--navy)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 16, fontWeight: 700, cursor: loading ? 'default' : 'pointer', textAlign: 'center' }}
          >
            {loading ? 'Redirecting…' : '💳 Pay with Card'}
          </button>

          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center', lineHeight: 1.5 }}>
            Secure checkout powered by Stripe.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            {['Worldwide shipping', '30-day returns', 'Secure payment'].map(t => (
              <span key={t} style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
