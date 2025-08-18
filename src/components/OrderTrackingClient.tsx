'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Order } from '@/utils/orderManagement';

interface OrderTrackingClientProps {}

export default function OrderTrackingClient({}: OrderTrackingClientProps) {
  const [searchType, setSearchType] = useState<'email' | 'orderId'>('email');
  const [searchValue, setSearchValue] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      setError('Please enter a search value');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const url = searchType === 'email' 
        ? `/api/orders?email=${encodeURIComponent(searchValue)}`
        : `/api/orders/${searchValue}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch orders');
      }

      if (searchType === 'email') {
        setOrders(data.orders || []);
      } else {
        setOrders(data.order ? [data.order] : []);
      }

      if ((data.orders && data.orders.length === 0) || (data.order === null)) {
        setError('No orders found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="card p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary mb-2">
                Search by:
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'email' | 'orderId')}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="email">Email Address</option>
                <option value="orderId">Order ID</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary mb-2">
                {searchType === 'email' ? 'Email Address' : 'Order ID'}:
              </label>
              <input
                type={searchType === 'email' ? 'email' : 'text'}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchType === 'email' ? 'Enter your email' : 'Enter order ID (e.g., CMB-...)'}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>

      {/* Orders Display */}
      {orders.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">
            Your Orders ({orders.length})
          </h2>
          
          {orders.map((order) => (
            <div key={order.id} className="card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary">
                    Order {order.id}
                  </h3>
                  <p className="text-secondary">
                    Placed on {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
                      <div>
                        <p className="font-medium">{item.book.title}</p>
                        <p className="text-sm text-secondary">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span>£{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping:</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t border-slate-200 pt-2 mt-2">
                  <span>Total:</span>
                  <span>£{order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Information */}
              {order.trackingNumber && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Shipping Information:</h4>
                  <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                  {order.estimatedDelivery && (
                    <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery.toLocaleDateString()}</p>
                  )}
                </div>
              )}

              {/* Shipping Address */}
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-2">Shipping Address:</h4>
                <div className="text-secondary">
                  <p>{order.customer.firstName} {order.customer.lastName}</p>
                  <p>{order.customer.address.line1}</p>
                  {order.customer.address.line2 && <p>{order.customer.address.line2}</p>}
                  <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.postalCode}</p>
                  <p>{order.customer.address.country}</p>
                </div>
              </div>

              {/* Notes */}
              {order.notes && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Notes:</h4>
                  <p className="text-secondary">{order.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Help Section */}
      <div className="card p-6 bg-blue-50 border border-blue-200">
        <h3 className="text-lg font-semibold text-primary mb-4">Need Help?</h3>
        <div className="space-y-2 text-secondary">
          <p>• Can't find your order? Check your email for the order confirmation.</p>
          <p>• Order ID format: CMB-XXXXXXXX-XXXXXX</p>
          <p>• For questions about your order, contact us at charlese1mackay@hotmail.com</p>
          <p>• Shipping typically takes 3-5 business days for UK orders, 5-10 days internationally.</p>
        </div>
        <div className="mt-4">
          <Link 
            href="/contact" 
            className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
