'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function trackAddToCart(book: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'GBP',
      value: book.price,
      items: [{ item_id: book.id, item_name: book.title, price: book.price }],
    });
  }
}

export default function GoogleAnalytics() {
  return null;
}
