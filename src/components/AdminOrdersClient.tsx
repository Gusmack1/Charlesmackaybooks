'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '@/utils/orderManagement';

interface AdminOrdersClientProps {}

export default function AdminOrdersClient({}: AdminOrdersClientProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch orders');
      }
      
      setOrders(data.orders || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, action: string, data?: any) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, ...data }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update order');
      }
      
      // Update localStorage if order was dispatched/shipped (for legacy compatibility)
      if ((action === 'dispatch' || action === 'ship') && result.legacyOrder && typeof window !== 'undefined') {
        try {
          const { getOrder, saveOrder } = require('@/utils/orderUtils');
          const legacyOrder = getOrder(orderId);
          if (legacyOrder) {
            legacyOrder.status = result.legacyOrder.status;
            legacyOrder.trackingNumber = result.legacyOrder.trackingNumber;
            legacyOrder.timestamp = result.legacyOrder.updatedAt;
            saveOrder(legacyOrder);
          }
        } catch (e) {
          console.log('Could not update localStorage:', e);
        }
      }
      
      // Refresh orders
      await fetchOrders();
      
      // Update selected order if it's the one being updated
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(result.order);
      }
      
      alert(`Order ${action.replace('_', ' ')} successful${action === 'dispatch' ? ' - Customer has been notified via email' : ''}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update order');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'dispatched': return 'bg-indigo-100 text-indigo-800';
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

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button 
          onClick={fetchOrders}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Orders List */}
      <div className="lg:col-span-2">
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">
              Orders ({filteredOrders.length})
            </h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOrder?.id === order.id
                    ? 'border-primary bg-blue-50'
                    : 'border-slate-200 hover:border-primary'
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-primary">{order.id}</h3>
                    <p className="text-sm text-secondary">
                      {order.customer.firstName} {order.customer.lastName}
                    </p>
                    <p className="text-sm text-secondary">{order.customer.email}</p>
                    <p className="text-sm text-secondary">
                      {order.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">£{order.total.toFixed(2)}</p>
                    <div className="flex gap-1 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="lg:col-span-1">
        {selectedOrder ? (
          <div className="card p-6">
            <h3 className="text-xl font-bold text-primary mb-4">
              Order Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary">Order ID</h4>
                <p className="text-secondary">{selectedOrder.id}</p>
              </div>

              <div>
                <h4 className="font-semibold text-primary">Customer</h4>
                <p className="text-secondary">
                  {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                </p>
                <p className="text-secondary">{selectedOrder.customer.email}</p>
                {selectedOrder.customer.phone && (
                  <p className="text-secondary">{selectedOrder.customer.phone}</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-primary">Shipping Address</h4>
                <div className="text-secondary">
                  <p>{selectedOrder.customer.address.line1}</p>
                  {selectedOrder.customer.address.line2 && (
                    <p>{selectedOrder.customer.address.line2}</p>
                  )}
                  <p>
                    {selectedOrder.customer.address.city}, {selectedOrder.customer.address.state} {selectedOrder.customer.address.postalCode}
                  </p>
                  <p>{selectedOrder.customer.address.country}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-primary">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.book.title}</p>
                        <p className="text-sm text-secondary">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>£{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>£{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {selectedOrder.trackingNumber && (
                <div>
                  <h4 className="font-semibold text-primary">Tracking</h4>
                  <p className="text-secondary">Number: {selectedOrder.trackingNumber}</p>
                  {selectedOrder.estimatedDelivery && (
                    <p className="text-secondary">
                      Estimated: {selectedOrder.estimatedDelivery.toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}

              {selectedOrder.notes && (
                <div>
                  <h4 className="font-semibold text-primary">Notes</h4>
                  <p className="text-secondary">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Update Status</h4>
                
                {selectedOrder.paymentStatus === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'confirm_payment')}
                    className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Confirm Payment
                  </button>
                )}

                {selectedOrder.status === 'confirmed' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'process')}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Process Order
                  </button>
                )}

                {selectedOrder.status === 'processing' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Tracking number (optional)"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      id="tracking-number-dispatch"
                    />
                    <button
                      onClick={() => {
                        const trackingNumber = (document.getElementById('tracking-number-dispatch') as HTMLInputElement).value;
                        updateOrderStatus(selectedOrder.id, 'dispatch', { trackingNumber: trackingNumber || undefined });
                      }}
                      className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Dispatch Order (Sends Email)
                    </button>
                  </div>
                )}

                {selectedOrder.status === 'processing' && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Tracking number (optional)"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      id="tracking-number-ship"
                    />
                    <button
                      onClick={() => {
                        const trackingNumber = (document.getElementById('tracking-number-ship') as HTMLInputElement).value;
                        updateOrderStatus(selectedOrder.id, 'ship', { trackingNumber: trackingNumber || undefined });
                      }}
                      className="w-full px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Ship Order (Alternative)
                    </button>
                  </div>
                )}

                {selectedOrder.status === 'dispatched' && (
                  <div className="space-y-2">
                    <p className="text-sm text-secondary">Order dispatched. Customer has been notified via email.</p>
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'deliver')}
                      className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Mark as Delivered
                    </button>
                  </div>
                )}

                {selectedOrder.status === 'shipped' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'deliver')}
                    className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Mark as Delivered
                  </button>
                )}

                {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                  <button
                    onClick={() => {
                      const reason = prompt('Reason for cancellation:');
                      if (reason) {
                        updateOrderStatus(selectedOrder.id, 'cancel', { reason });
                      }
                    }}
                    className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="card p-6">
            <p className="text-secondary text-center">
              Select an order to view details and manage status
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
