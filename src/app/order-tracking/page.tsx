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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Track Your Order
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Enter your email address or order ID to track your aviation history book order. 
              Get real-time updates on your delivery status.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <OrderTrackingClient />
      </main>
    </div>
  );
}
