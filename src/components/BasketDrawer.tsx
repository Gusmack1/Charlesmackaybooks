'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function BasketDrawer() {
  const { items, isBasketOpen, closeBasket, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, getBulkDiscount, getBulkDiscountPercentage, getShippingCost, getFinalTotal, shippingCountry } = useCart();

  if (!isBasketOpen) return null;

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();
  const discount = getBulkDiscount();
  const discountPct = getBulkDiscountPercentage();
  const shipping = getShippingCost();
  const finalTotal = getFinalTotal();

  return (
    <>
      {/* Overlay */}
      <div onClick={closeBasket} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} />
      {/* Drawer */}
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 420, maxWidth: '90vw', background: 'var(--white)', zIndex: 201, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 30px rgba(0,0,0,0.15)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
            Your Basket ({totalItems})
          </h2>
          <button onClick={closeBasket} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text-muted)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 24, height: 24 }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflow: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 48, height: 48, margin: '0 auto 16px', opacity: 0.4 }}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              <p style={{ fontSize: 15, marginBottom: 16 }}>Your basket is empty</p>
              <Link href="/books" onClick={closeBasket} style={{ color: 'var(--gold-dark)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Browse books</Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.book.id} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 64, height: 85, borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative', flexShrink: 0, background: 'var(--cream-dark)' }}>
                  <Image src={item.book.imageUrl || `/book-covers/${item.book.id}.jpg`} alt={item.book.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 13, fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.3, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.book.title}</h4>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>{item.book.category}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={() => updateQuantity(item.book.id, item.quantity - 1)} style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--cream)', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                      <span style={{ fontSize: 14, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.book.id, item.quantity + 1)} style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--cream)', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)' }}>£{(item.book.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeFromCart(item.book.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)', background: 'var(--cream)' }}>
            {discountPct > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>Multi-buy discount ({discountPct}%)</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>-£{discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13, color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13, color: 'var(--text-muted)' }}>
              <span>Shipping</span>
              <span style={{ fontWeight: 600 }}>
                {shippingCountry ? `£${shipping.toFixed(2)}` : 'Calculated at checkout'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, paddingTop: 12, borderTop: '1px solid var(--border)', fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--text-dark)' }}>
              <span>Total</span>
              <span>£{finalTotal.toFixed(2)}</span>
            </div>
            {totalItems < 2 && (
              <div style={{ background: 'rgba(200,169,81,0.1)', border: '1px solid rgba(200,169,81,0.3)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', marginBottom: 12, fontSize: 12, color: 'var(--gold-dark)', textAlign: 'center' }}>
                Add {2 - totalItems} more book{2 - totalItems > 1 ? 's' : ''} to save 5%
              </div>
            )}
            <Link href="/checkout" onClick={closeBasket} style={{ display: 'block', width: '100%', padding: '14px 0', background: 'var(--gold)', color: 'var(--navy)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 15, fontWeight: 700, cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
              Proceed to checkout
            </Link>
            <button onClick={closeBasket} style={{ display: 'block', width: '100%', padding: '10px 0', marginTop: 8, background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer' }}>
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
