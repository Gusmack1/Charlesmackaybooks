'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Order } from '@/utils/orderManagement';
import { getOrder, getOrderHistory, Order as LegacyOrder } from '@/utils/orderUtils';
import { readSavedCustomerProfile } from '@/utils/customerProfile';
import { SITE_CONSTANTS } from '@/config/constants';

type SearchMode = 'orderId' | 'email';

function normalizeOrderDates(order: Order): Order {
  const createdAt = new Date((order as any).createdAt);
  const updatedAt = new Date((order as any).updatedAt);
  const estimatedRaw = (order as any).estimatedDelivery;

  return {
    ...order,
    createdAt: Number.isNaN(createdAt.getTime()) ? new Date() : createdAt,
    updatedAt: Number.isNaN(updatedAt.getTime()) ? new Date() : updatedAt,
    estimatedDelivery: estimatedRaw ? new Date(estimatedRaw) : undefined,
  };
}

function uniqueOrdersById(orders: Order[]): Order[] {
  return orders.filter((order, index, self) => index === self.findIndex((entry) => entry.id === order.id));
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export default function OrderTrackingClient() {
  const searchParams = useSearchParams();
  const [searchMode, setSearchMode] = useState<SearchMode>('orderId');
  const [orderIdValue, setOrderIdValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [savedEmail, setSavedEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [queryHandled, setQueryHandled] = useState(false);

  const convertLegacyOrder = (legacyOrder: LegacyOrder): Order => {
    const paidLikeStatus = ['paid', 'shipped', 'dispatched', 'delivered'];
    const paymentStatus = paidLikeStatus.includes(legacyOrder.status) ? 'paid' : legacyOrder.status === 'failed' ? 'failed' : 'pending';

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
      items: legacyOrder.items.map((item) => ({
        bookId: item.id,
        quantity: item.quantity,
        price: item.price,
        book: {
          id: item.id,
          title: item.title,
          price: item.price,
          author: 'Charles E. MacKay',
          category: 'Aviation History',
          inStock: true,
        } as any,
      })),
      subtotal: legacyOrder.subtotal,
      shipping: legacyOrder.shippingCost,
      total: legacyOrder.total,
      status:
        legacyOrder.status === 'paid'
          ? 'confirmed'
          : legacyOrder.status === 'shipped' || legacyOrder.status === 'dispatched'
          ? legacyOrder.status
          : legacyOrder.status === 'delivered'
          ? 'delivered'
          : legacyOrder.status === 'cancelled'
          ? 'cancelled'
          : 'pending',
      paymentStatus,
      paymentMethod: legacyOrder.paymentMethod || (legacyOrder.paypalTransactionId ? 'paypal' : 'stripe'),
      paypalOrderId: legacyOrder.paypalTransactionId,
      createdAt: new Date(legacyOrder.timestamp),
      updatedAt: new Date(legacyOrder.timestamp),
      trackingNumber: legacyOrder.trackingNumber,
      notes: legacyOrder.notes,
      emailNotifications: {
        orderConfirmation: false,
        paymentConfirmation: false,
        dispatchConfirmation: false,
        shippingConfirmation: false,
        deliveryConfirmation: false,
      },
    };
  };

  const isTrackableOrder = (order: Order): boolean => {
    const isPaid =
      order.paymentStatus === 'paid' ||
      order.status === 'confirmed' ||
      order.status === 'shipped' ||
      order.status === 'dispatched' ||
      order.status === 'delivered';
    const isPending = order.paymentStatus === 'pending' && order.status === 'pending';
    const isNotCancelled = order.status !== 'cancelled' && order.paymentStatus !== 'failed' && order.paymentStatus !== 'refunded';
    return (isPaid || isPending) && isNotCancelled;
  };

  const getLegacyOrdersByEmail = (rawEmail: string): LegacyOrder[] => {
    const email = normalizeEmail(rawEmail);
    const map = new Map<string, LegacyOrder>();

    getOrderHistory().forEach((order) => {
      if (normalizeEmail(order.customerDetails.email) === email) {
        map.set(order.orderId, order);
      }
    });

    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('order_')) continue;

        try {
          const raw = localStorage.getItem(key);
          if (!raw) continue;
          const order = JSON.parse(raw) as LegacyOrder;
          if (order.orderId && normalizeEmail(order.customerDetails?.email || '') === email) {
            map.set(order.orderId, order);
          }
        } catch {
          // Ignore invalid local order entries
        }
      }
    }

    return Array.from(map.values());
  };

  const searchByOrderId = async (rawOrderId: string) => {
    const orderId = rawOrderId.trim();
    if (!orderId) {
      setError('Please enter an order ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const foundOrders: Order[] = [];
      let legacyOrder = getOrder(orderId);

      if (!legacyOrder && typeof window !== 'undefined') {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (!key || !key.startsWith('order_')) continue;

          try {
            const raw = localStorage.getItem(key);
            if (!raw) continue;
            const candidate = JSON.parse(raw) as LegacyOrder;
            if (
              candidate.orderId &&
              (candidate.orderId.toLowerCase().includes(orderId.toLowerCase()) || orderId.toLowerCase().includes(candidate.orderId.toLowerCase()))
            ) {
              legacyOrder = candidate;
              break;
            }
          } catch {
            // Ignore invalid JSON
          }
        }
      }

      if (legacyOrder) {
        const converted = normalizeOrderDates(convertLegacyOrder(legacyOrder));
        if (isTrackableOrder(converted)) foundOrders.push(converted);
      }

      const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
      if (response.ok) {
        const data = await response.json();
        if (data?.order) {
          const apiOrder = normalizeOrderDates(data.order as Order);
          if (isTrackableOrder(apiOrder)) foundOrders.push(apiOrder);
        }
      }

      const unique = uniqueOrdersById(foundOrders).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setOrders(unique);
      if (unique.length === 0) {
        setError('No order found with that ID. Please check your order confirmation email (format: CM-...).');
      }
    } catch (err) {
      console.error('Order search error:', err);
      setOrders([]);
      setError('An error occurred while searching for that order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchByEmail = async (rawEmail: string) => {
    const email = rawEmail.trim();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const localOrders = getLegacyOrdersByEmail(email)
        .map((legacyOrder) => normalizeOrderDates(convertLegacyOrder(legacyOrder)))
        .filter(isTrackableOrder);

      let apiOrders: Order[] = [];
      const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const data = await response.json();
        apiOrders = (data?.orders || []).map((order: Order) => normalizeOrderDates(order)).filter(isTrackableOrder);
      }

      const combined = uniqueOrdersById([...localOrders, ...apiOrders]).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setOrders(combined);

      if (combined.length === 0) {
        setError('No orders found for that email. Try tracking by order ID from your confirmation email.');
      }
    } catch (err) {
      console.error('Email order search error:', err);
      setOrders([]);
      setError('An error occurred while searching by email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchMode === 'email') {
      await searchByEmail(emailValue);
      return;
    }
    await searchByOrderId(orderIdValue);
  };

  useEffect(() => {
    const savedProfile = readSavedCustomerProfile();
    if (savedProfile?.email) {
      setSavedEmail(savedProfile.email);
    }
  }, []);

  useEffect(() => {
    if (queryHandled) return;

    const orderFromQuery = searchParams.get('orderId') || searchParams.get('order');
    const emailFromQuery = searchParams.get('email');

    if (orderFromQuery) {
      setSearchMode('orderId');
      setOrderIdValue(orderFromQuery);
      void searchByOrderId(orderFromQuery);
      setQueryHandled(true);
      return;
    }

    if (emailFromQuery) {
      setSearchMode('email');
      setEmailValue(emailFromQuery);
      void searchByEmail(emailFromQuery);
      setQueryHandled(true);
      return;
    }

    setQueryHandled(true);
  }, [queryHandled, searchParams]);

  const getCombinedStatus = (order: Order): { status: string; color: string } => {
    if (order.status === 'cancelled') {
      return { status: 'Cancelled', color: 'bg-red-600/50 text-red-200 border border-red-500' };
    }
    if (order.status === 'delivered') {
      return { status: 'Delivered', color: 'bg-green-600/50 text-green-200 border border-green-500' };
    }
    if (order.status === 'dispatched' || order.status === 'shipped') {
      return {
        status: order.status === 'dispatched' ? 'Dispatched' : 'Shipped',
        color: 'bg-indigo-600/50 text-indigo-200 border border-indigo-500',
      };
    }
    if (order.status === 'processing') {
      return { status: 'Processing', color: 'bg-purple-600/50 text-purple-200 border border-purple-500' };
    }
    if (order.status === 'confirmed') {
      return { status: 'Confirmed', color: 'bg-blue-600/50 text-blue-200 border border-blue-500' };
    }
    if (order.paymentStatus === 'paid') {
      return { status: 'Payment Confirmed', color: 'bg-green-600/50 text-green-200 border border-green-500' };
    }
    if (order.paymentStatus === 'failed') {
      return { status: 'Payment Failed', color: 'bg-red-600/50 text-red-200 border border-red-500' };
    }
    if (order.paymentStatus === 'refunded') {
      return { status: 'Refunded', color: 'bg-slate-600/50 text-slate-200 border border-slate-500' };
    }
    return { status: 'Pending Payment', color: 'bg-yellow-600/50 text-yellow-200 border border-yellow-500' };
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
        <div className="mb-4">
          <div className="inline-flex rounded-lg border border-white/20 overflow-hidden">
            <button
              type="button"
              onClick={() => {
                setSearchMode('orderId');
                setError('');
              }}
              className={`px-4 py-2 text-sm font-medium ${
                searchMode === 'orderId' ? 'bg-white text-slate-900' : 'bg-transparent text-white hover:bg-white/10'
              }`}
            >
              Track by order ID
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchMode('email');
                setError('');
              }}
              className={`px-4 py-2 text-sm font-medium ${
                searchMode === 'email' ? 'bg-white text-slate-900' : 'bg-transparent text-white hover:bg-white/10'
              }`}
            >
              Find my orders by email
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          {searchMode === 'orderId' ? (
            <div>
              <label className="block text-sm font-medium text-white mb-2">Order ID:</label>
              <input
                type="text"
                value={orderIdValue}
                onChange={(e) => setOrderIdValue(e.target.value)}
                placeholder="Enter order ID (e.g., CM-XXXXXXXX-XXXXXX)"
                className="w-full px-3 py-2 border border-slate-600 bg-slate-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="mt-2 text-sm text-white/70">Your order ID was sent to your email when you placed your order.</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Address:</label>
              <input
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="Enter the email used at checkout"
                className="w-full px-3 py-2 border border-slate-600 bg-slate-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="mt-2 text-sm text-white/70">Shows orders saved on this device, plus server records tied to this email.</p>
              {savedEmail && (
                <button
                  type="button"
                  onClick={() => setEmailValue(savedEmail)}
                  className="mt-2 text-sm text-blue-300 hover:text-blue-200 underline"
                >
                  Use saved checkout email: {savedEmail}
                </button>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : searchMode === 'email' ? 'Find Orders' : 'Track Order'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-white">
            <p className="text-red-200">{error}</p>
          </div>
        )}
      </div>

      {orders.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Your Orders ({orders.length})</h2>

          {orders.map((order) => (
            <div key={order.id} className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Order {order.id}</h3>
                  <p className="text-white/90">Placed on {order.createdAt.toLocaleDateString()}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(() => {
                    const combinedStatus = getCombinedStatus(order);
                    return (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${combinedStatus.color}`}>
                        {combinedStatus.status}
                      </span>
                    );
                  })()}
                </div>
              </div>

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

              {order.trackingNumber && (
                <div className="mb-4 p-4 bg-blue-900/50 border border-blue-700 rounded-lg text-white">
                  <h4 className="font-semibold text-white mb-2">Shipping Information:</h4>
                  <p>
                    <strong>Tracking Number:</strong> {order.trackingNumber}
                  </p>
                  {order.estimatedDelivery && (
                    <p>
                      <strong>Estimated Delivery:</strong> {order.estimatedDelivery.toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Shipping Address:</h4>
                <div className="text-white/90">
                  <p>
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <p>{order.customer.address.line1}</p>
                  {order.customer.address.line2 && <p>{order.customer.address.line2}</p>}
                  <p>
                    {order.customer.address.city}, {order.customer.address.state} {order.customer.address.postalCode}
                  </p>
                  <p>{order.customer.address.country}</p>
                </div>
              </div>

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

      <div className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
        <div className="space-y-2 text-white/90">
          <p>• Order ID format: CM-XXXXXXXX-XXXXXX</p>
          <p>• You can track by order ID or by the checkout email address.</p>
          <p>• For questions about your order, contact us at {SITE_CONSTANTS.AUTHOR_EMAIL}</p>
          <p>• Shipping typically takes 3-5 business days for UK orders, 5-10 days internationally.</p>
        </div>
        <div className="mt-4">
          <Link href="/contact" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
