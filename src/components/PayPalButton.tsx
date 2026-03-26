'use client';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: Record<string, unknown>) => { render: (el: HTMLElement) => void };
    };
  }
}

export default function PayPalButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState('');
  const { items, getBulkDiscountPercentage, getFinalTotal, clearCart } = useCart();

  // Load PayPal JS SDK
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      setError('PayPal not configured');
      return;
    }
    if (window.paypal) {
      setSdkReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=GBP&enable-funding=paylater`;
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => setError('Failed to load PayPal');
    document.body.appendChild(script);
  }, []);

  // Render PayPal buttons
  useEffect(() => {
    if (!sdkReady || !window.paypal || !containerRef.current) return;
    // Clear any previous buttons
    containerRef.current.innerHTML = '';

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        tagline: false,
      },
      fundingSource: undefined, // Shows both PayPal and Pay Later
      createOrder: async () => {
        const res = await fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(i => ({
              title: i.book.title,
              price: i.book.price,
              quantity: i.quantity,
            })),
            discountPct: getBulkDiscountPercentage(),
            totalAmount: getFinalTotal(),
          }),
        });
        const data = await res.json();
        if (data.id) return data.id;
        console.error('PayPal create order response:', data);
        throw new Error(data.error || 'Failed to create order');
      },
      onApprove: async (data: { orderID: string }) => {
        const res = await fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: data.orderID }),
        });
        const result = await res.json();
        if (result.status === 'COMPLETED') {
          clearCart();
          window.location.href = '/checkout/success';
        } else {
          alert('Payment failed. Please try again.');
        }
      },
      onError: (err: Error) => {
        console.error('PayPal error:', err);
        alert('PayPal error — please try again or use card checkout.');
      },
    }).render(containerRef.current);
  }, [sdkReady, items, getBulkDiscountPercentage, getFinalTotal, clearCart]);

  if (error) return null; // Silently hide if PayPal not configured
  if (!sdkReady) return <div style={{ textAlign: 'center', padding: 12, fontSize: 13, color: 'var(--text-muted)' }}>Loading PayPal...</div>;

  return <div ref={containerRef} />;
}
