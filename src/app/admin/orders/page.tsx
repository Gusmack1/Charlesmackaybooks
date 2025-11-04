import type { Metadata } from 'next';
import AdminOrdersClient from '@/components/AdminOrdersClient';

export const metadata: Metadata = {
  title: 'Admin - Order Management | Charles E. MacKay Aviation Books',
  description: 'Admin dashboard for managing orders and customer service.',
  robots: 'noindex, nofollow' // Prevent indexing of admin pages
};

export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="hero-section bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Order Management Dashboard
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Manage orders, update status, and provide customer service support.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <AdminOrdersClient />
      </main>
    </div>
  );
}
