import type { Metadata } from 'next';
import AdminOrdersClient from '@/components/AdminOrdersClient';

export const metadata: Metadata = {
  title: 'Admin - Order Management | Charles E. MacKay Aviation Books',
  description: 'Admin dashboard for managing orders and customer service.',
  robots: 'noindex, nofollow' // Prevent indexing of admin pages
};

export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Order Management Dashboard
          </h1>
          <p className="text-lg text-secondary">
            Manage orders, update status, and provide customer service support.
          </p>
        </div>

        <AdminOrdersClient />
      </div>
    </div>
  );
}
