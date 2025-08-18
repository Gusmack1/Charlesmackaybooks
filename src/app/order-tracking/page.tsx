import type { Metadata } from 'next';
import OrderTrackingClient from '@/components/OrderTrackingClient';

export const metadata: Metadata = {
  title: 'Order Tracking | Charles E. MacKay Aviation Books',
  description: 'Track your aviation history book orders with real-time updates and delivery information.',
  keywords: 'order tracking, book delivery, aviation history books, Charles MacKay',
  openGraph: {
    title: 'Order Tracking | Charles E. MacKay Aviation Books',
    description: 'Track your aviation history book orders with real-time updates and delivery information.',
    url: 'https://charlesmackaybooks.com/order-tracking',
    siteName: 'Charles E. MacKay Aviation Books',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Order Tracking | Charles E. MacKay Aviation Books',
    description: 'Track your aviation history book orders with real-time updates and delivery information.',
  },
  alternates: {
    canonical: 'https://charlesmackaybooks.com/order-tracking'
  }
};

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Enter your email address or order ID to track your aviation history book order. 
            Get real-time updates on your delivery status.
          </p>
        </div>

        <OrderTrackingClient />
      </div>
    </div>
  );
}
