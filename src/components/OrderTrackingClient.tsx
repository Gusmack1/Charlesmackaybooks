'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Order } from '@/utils/orderManagement';
import { getOrder, getOrderHistory, Order as LegacyOrder } from '@/utils/orderUtils';

interface OrderTrackingClientProps {}

export default function OrderTrackingClient({}: OrderTrackingClientProps) {
  const [searchType, setSearchType] = useState<'email' | 'orderId'>('email');
  const [searchValue, setSearchValue] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Convert legacy order format to new format
  const convertLegacyOrder = (legacyOrder: LegacyOrder): Order => {
    return {
      id: legacyOrder.orderId,
      customer: {
        firstName: legacyOrder.customerDetails.firstName,
        lastName: legacyOrder.customerDetails.lastName,
        email: legacyOrder.customerDetails.email,
        phone: legacyOrder.customerDetails.phone,
        address: {
          line1: legacyOrder.customerDetails.address1,
          line2: legacyOrder.customerDetails.address2,
          city: legacyOrder.customerDetails.city,
          state: legacyOrder.customerDetails.postcode,
          postalCode: legacyOrder.customerDetails.postcode,
          country: legacyOrder.customerDetails.country,
        },
      },
      items: legacyOrder.items.map(item => ({
        bookId: item.id,
        quantity: item.quantity,
        price: item.price,
        book: {
          id: item.id,
          title: item.title,
          price: item.price,
          // Add minimal book data - in real app you'd fetch full book details
          author: 'Charles E. MacKay',
          category: 'Aviation History',
          inStock: true,
        } as any,
      })),
      subtotal: legacyOrder.subtotal,
      shipping: legacyOrder.shippingCost,
      total: legacyOrder.total,
      status: legacyOrder.status === 'paid' ? 'confirmed' : legacyOrder.status === 'shipped' ? 'shipped' : legacyOrder.status === 'delivered' ? 'delivered' : legacyOrder.status === 'cancelled' ? 'cancelled' : 'pending',
      paymentStatus: legacyOrder.status === 'paid' ? 'paid' : 'pending',
      paymentMethod: legacyOrder.paypalTransactionId ? 'paypal' : 'stripe',
      paypalOrderId: legacyOrder.paypalTransactionId,
      createdAt: new Date(legacyOrder.timestamp),
      updatedAt: new Date(legacyOrder.timestamp),
      trackingNumber: legacyOrder.trackingNumber,
      emailNotifications: {
        orderConfirmation: false,
        paymentConfirmation: false,
        shippingConfirmation: false,
        deliveryConfirmation: false,
      },
    };
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedSearch = searchValue.trim();
    if (!trimmedSearch) {
      setError('Please enter a search value');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let foundOrders: Order[] = [];

      // First, check localStorage (where orders are actually stored)
      if (searchType === 'orderId') {
        // Search by order ID - try exact match first
        let legacyOrder = getOrder(trimmedSearch);
        
        // If not found, try searching all localStorage keys for orders
        if (!legacyOrder && typeof window !== 'undefined') {
          const orderKeys: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('order_')) {
              orderKeys.push(key);
            }
          }
          
          // Try to find order by partial match (in case format differs)
          for (const key of orderKeys) {
            try {
              const orderData = localStorage.getItem(key);
              if (orderData) {
                const order: LegacyOrder = JSON.parse(orderData);
                // Check if orderId matches (case-insensitive, partial match)
                if (order.orderId && 
                    (order.orderId.toLowerCase().includes(trimmedSearch.toLowerCase()) ||
                     trimmedSearch.toLowerCase().includes(order.orderId.toLowerCase()))) {
                  legacyOrder = order;
                  break;
                }
              }
            } catch (e) {
              // Skip invalid JSON
              continue;
            }
          }
        }
        
        if (legacyOrder) {
          const convertedOrder = convertLegacyOrder(legacyOrder);
          // Only include if it's a paid/confirmed order
          if ((convertedOrder.paymentStatus === 'paid' || 
               convertedOrder.status === 'paid' || 
               convertedOrder.status === 'confirmed' || 
               convertedOrder.status === 'shipped' || 
               convertedOrder.status === 'delivered') &&
              convertedOrder.status !== 'cancelled' && 
              convertedOrder.status !== 'failed' &&
              convertedOrder.paymentStatus !== 'failed' &&
              convertedOrder.paymentStatus !== 'refunded') {
            foundOrders = [convertedOrder];
          }
        }
      } else {
        // Search by email - normalize email for comparison
        const normalizedSearchEmail = trimmedSearch.toLowerCase().trim();
        
        // Check order history first
        const orderHistory = getOrderHistory();
        let matchingOrders = orderHistory.filter(
          (order: LegacyOrder) => {
            const orderEmail = order.customerDetails?.email?.toLowerCase().trim() || '';
            return orderEmail === normalizedSearchEmail || 
                   orderEmail.includes(normalizedSearchEmail) ||
                   normalizedSearchEmail.includes(orderEmail);
          }
        );
        
        // Also check all individual order keys in localStorage
        if (typeof window !== 'undefined') {
          const orderKeys: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('order_')) {
              orderKeys.push(key);
            }
          }
          
          for (const key of orderKeys) {
            try {
              const orderData = localStorage.getItem(key);
              if (orderData) {
                const order: LegacyOrder = JSON.parse(orderData);
                const orderEmail = order.customerDetails?.email?.toLowerCase().trim() || '';
                if ((orderEmail === normalizedSearchEmail || 
                     orderEmail.includes(normalizedSearchEmail) ||
                     normalizedSearchEmail.includes(orderEmail)) &&
                    !matchingOrders.find(o => o.orderId === order.orderId)) {
                  matchingOrders.push(order);
                }
              }
            } catch (e) {
              // Skip invalid JSON
              continue;
            }
          }
        }
        
        foundOrders = matchingOrders.map(convertLegacyOrder);
      }

      // Filter to only show successfully purchased orders
      // Exclude pending, cancelled, and failed orders
      foundOrders = foundOrders.filter(order => {
        // Only show orders that have been paid/confirmed
        const isPaid = order.paymentStatus === 'paid' || 
                       order.status === 'paid' || 
                       order.status === 'confirmed' || 
                       order.status === 'shipped' || 
                       order.status === 'delivered';
        const isNotCancelled = order.status !== 'cancelled' && 
                               order.status !== 'failed' &&
                               order.paymentStatus !== 'failed' &&
                               order.paymentStatus !== 'refunded';
        return isPaid && isNotCancelled;
      });

      // If no orders found in localStorage, try API as fallback
      if (foundOrders.length === 0) {
        const url = searchType === 'email' 
          ? `/api/orders?email=${encodeURIComponent(trimmedSearch)}`
          : `/api/orders/${trimmedSearch}`;

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          let apiOrders: Order[] = [];
          if (searchType === 'email') {
            apiOrders = data.orders || [];
          } else {
            apiOrders = data.order ? [data.order] : [];
          }
          
          // Filter API results to only show paid orders
          apiOrders = apiOrders.filter(order => {
            const isPaid = order.paymentStatus === 'paid' || 
                           order.status === 'paid' || 
                           order.status === 'confirmed' || 
                           order.status === 'shipped' || 
                           order.status === 'delivered';
            const isNotCancelled = order.status !== 'cancelled' && 
                                   order.status !== 'failed' &&
                                   order.paymentStatus !== 'failed' &&
                                   order.paymentStatus !== 'refunded';
            return isPaid && isNotCancelled;
          });
          
          foundOrders = [...foundOrders, ...apiOrders];
        }
      }

      // Remove duplicates based on order ID
      const uniqueOrders = foundOrders.filter((order, index, self) =>
        index === self.findIndex(o => o.id === order.id)
      );

      setOrders(uniqueOrders);

      if (uniqueOrders.length === 0) {
        setError('No orders found. Please check your email address or order ID and try again.');
      }
    } catch (err) {
      console.error('Order search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching for orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600/50 text-yellow-200 border border-yellow-500';
      case 'confirmed': return 'bg-blue-600/50 text-blue-200 border border-blue-500';
      case 'processing': return 'bg-purple-600/50 text-purple-200 border border-purple-500';
      case 'shipped': return 'bg-indigo-600/50 text-indigo-200 border border-indigo-500';
      case 'delivered': return 'bg-green-600/50 text-green-200 border border-green-500';
      case 'cancelled': return 'bg-red-600/50 text-red-200 border border-red-500';
      default: return 'bg-slate-600/50 text-slate-200 border border-slate-500';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-600/50 text-green-200 border border-green-500';
      case 'pending': return 'bg-yellow-600/50 text-yellow-200 border border-yellow-500';
      case 'failed': return 'bg-red-600/50 text-red-200 border border-red-500';
      case 'refunded': return 'bg-slate-600/50 text-slate-200 border border-slate-500';
      default: return 'bg-slate-600/50 text-slate-200 border border-slate-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2">
                Search by:
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'email' | 'orderId')}
                className="w-full px-3 py-2 border border-slate-600 bg-slate-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="email">Email Address</option>
                <option value="orderId">Order ID</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2">
                {searchType === 'email' ? 'Email Address' : 'Order ID'}:
              </label>
              <input
                type={searchType === 'email' ? 'email' : 'text'}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchType === 'email' ? 'Enter your email' : 'Enter order ID (e.g., CMB-...)'}
                className="w-full px-3 py-2 border border-slate-600 bg-slate-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Track Order'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-white">
            <p className="text-red-200">{error}</p>
          </div>
        )}
      </div>

      {/* Orders Display */}
      {orders.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Your Orders ({orders.length})
          </h2>
          
          {orders.map((order) => (
            <div key={order.id} className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Order {order.id}
                  </h3>
                  <p className="text-white/90">
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
                <h4 className="font-semibold text-white mb-2">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-white/15 last:border-b-0">
                      <div>
                        <p className="font-medium">{item.book.title}</p>
                        <p className="text-sm text-white/80">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-slate-900/50 border border-white/15 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span>£{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping:</span>
                  <span className="text-green-300 font-semibold">FREE</span>
                </div>
                  <div className="flex justify-between items-center font-bold text-lg border-t border-white/15 pt-2 mt-2">
                  <span>Total:</span>
                  <span>£{order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Information */}
              {order.trackingNumber && (
                <div className="mb-4 p-4 bg-blue-900/50 border border-blue-700 rounded-lg text-white">
                  <h4 className="font-semibold text-white mb-2">Shipping Information:</h4>
                  <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                  {order.estimatedDelivery && (
                    <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery.toLocaleDateString()}</p>
                  )}
                </div>
              )}

              {/* Shipping Address */}
              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Shipping Address:</h4>
                <div className="text-white/90">
                  <p>{order.customer.firstName} {order.customer.lastName}</p>
                  <p>{order.customer.address.line1}</p>
                  {order.customer.address.line2 && <p>{order.customer.address.line2}</p>}
                  <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.postalCode}</p>
                  <p>{order.customer.address.country}</p>
                </div>
              </div>

              {/* Notes */}
              {order.notes && (
                <div className="p-4 bg-yellow-900/50 border border-yellow-700 rounded-lg text-white">
                  <h4 className="font-semibold text-white mb-2">Notes:</h4>
                  <p className="text-white/90">{order.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Help Section */}
      <div className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
        <div className="space-y-2 text-white/90">
          <p>• Can't find your order? Check your email for the order confirmation.</p>
          <p>• Order ID format: CMB-XXXXXXXX-XXXXXX</p>
          <p>• For questions about your order, contact us at charlese1mackay@hotmail.com</p>
          <p>• Shipping typically takes 3-5 business days for UK orders, 5-10 days internationally.</p>
        </div>
        <div className="mt-4">
          <Link 
            href="/contact" 
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
