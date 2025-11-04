'use client';

import React, { useState, useEffect } from 'react';
import { Order } from '@/utils/orderManagement';
import { getAllOrdersFromLocalStorage } from '@/utils/orderSync';

interface AdminOrdersClientProps {}

export default function AdminOrdersClient({}: AdminOrdersClientProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'active' | 'cancelled'>('active');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch from API (OrderManagementService)
      let apiOrders: Order[] = [];
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        
        if (response.ok) {
          apiOrders = data.orders || [];
        }
      } catch (apiError) {
        console.error('Error fetching from API:', apiError);
        // Continue without API orders
      }

      // Also fetch from localStorage (legacy orders) - only on client side
      let localStorageOrders: Order[] = [];
      if (typeof window !== 'undefined') {
        try {
          localStorageOrders = getAllOrdersFromLocalStorage();
        } catch (localStorageError) {
          console.error('Error fetching from localStorage:', localStorageError);
          // Continue without localStorage orders
        }

        // Sync localStorage orders to OrderManagementService (so they can be updated)
        // Only sync if we have localStorage orders
        if (localStorageOrders.length > 0) {
          for (const localOrder of localStorageOrders) {
            // Check if order exists in API orders
            if (!apiOrders.find(o => o.id === localOrder.id)) {
              try {
                // Sync order to OrderManagementService
                await fetch('/api/orders/sync', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ order: localOrder }),
                });
              } catch (syncError) {
                console.error('Could not sync order:', localOrder.id, syncError);
                // Continue - don't block loading
              }
            }
          }
          
          // Fetch again after syncing to get updated list (if we synced any)
          try {
            const syncResponse = await fetch('/api/orders');
            const syncData = await syncResponse.json();
            if (syncResponse.ok) {
              apiOrders = syncData.orders || [];
            }
          } catch (refetchError) {
            console.error('Error refetching after sync:', refetchError);
            // Continue with existing orders
          }
        }
      }

      // Merge orders, removing duplicates by ID
      const allOrders = [...apiOrders];
      localStorageOrders.forEach(localOrder => {
        if (!allOrders.find(o => o.id === localOrder.id)) {
          allOrders.push(localOrder);
        }
      });

      // Sort by creation date (newest first) - ensure dates are valid
      allOrders.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setOrders(allOrders);
    } catch (err) {
      console.error('Error in fetchOrders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, action: string, data?: any) => {
    try {
      // CRITICAL: Always ensure order is synced to OrderManagementService BEFORE updating
      // First, check if order exists in OrderManagementService
      let orderExists = false;
      try {
        const getOrderResponse = await fetch(`/api/orders/${orderId}`);
        if (getOrderResponse.ok) {
          orderExists = true;
        }
      } catch (e) {
        console.log('Check order existence failed:', e);
      }
      
      // If order not found in OrderManagementService, sync it from localStorage FIRST
      if (!orderExists && typeof window !== 'undefined') {
        try {
          const { getOrder } = require('@/utils/orderUtils');
          const { convertLegacyOrderToNew } = require('@/utils/orderSync');
          const legacyOrder = getOrder(orderId);
          
          if (legacyOrder) {
            // Convert and sync to OrderManagementService
            const convertedOrder = convertLegacyOrderToNew(legacyOrder);
            
            // Sync order - wait for this to complete
            const syncResponse = await fetch('/api/orders/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ order: convertedOrder }),
            });
            
            if (!syncResponse.ok) {
              const syncError = await syncResponse.json();
              throw new Error(`Sync failed: ${syncError.error || 'Unknown error'}`);
            }
            
            // Verify sync was successful
            const verifyResponse = await fetch(`/api/orders/${orderId}`);
            if (!verifyResponse.ok) {
              throw new Error('Order sync verification failed');
            }
            
            console.log('Order synced successfully:', orderId);
          } else {
            throw new Error('Order not found in localStorage');
          }
        } catch (syncError) {
          console.error('Could not sync order from localStorage:', syncError);
          
          // If sync fails, try to update localStorage directly for cancel/confirm_payment
          if (action === 'cancel' || action === 'confirm_payment') {
            try {
              const { getOrder, saveOrder } = require('@/utils/orderUtils');
              const legacyOrder = getOrder(orderId);
              if (legacyOrder) {
                if (action === 'cancel') {
                  legacyOrder.status = 'cancelled';
                  if (data?.reason) {
                    legacyOrder.notes = data.reason;
                  }
                } else if (action === 'confirm_payment') {
                  legacyOrder.status = 'paid';
                }
                legacyOrder.timestamp = new Date().toISOString();
                saveOrder(legacyOrder);
                
                // Refresh and show success
                await fetchOrders();
                alert(`Order ${action.replace('_', ' ')} successful (updated in localStorage)`);
                return;
              }
            } catch (localStorageError) {
              console.error('Could not update localStorage:', localStorageError);
            }
          }
          
          throw new Error(`Failed to sync order: ${syncError instanceof Error ? syncError.message : 'Unknown error'}`);
        }
      }

      // Now perform the update - order should definitely exist now
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
      
      // Update localStorage for all status changes (for legacy compatibility)
      if (typeof window !== 'undefined') {
        try {
          const { getOrder, saveOrder } = require('@/utils/orderUtils');
          const legacyOrder = getOrder(orderId);
          if (legacyOrder) {
            // Update status based on action
            if (action === 'cancel') {
              legacyOrder.status = 'cancelled';
              if (data?.reason) {
                legacyOrder.notes = data.reason;
              }
            } else if (action === 'confirm_payment') {
              legacyOrder.status = 'paid';
            } else if (result.legacyOrder) {
              legacyOrder.status = result.legacyOrder.status;
              if (result.legacyOrder.trackingNumber) {
                legacyOrder.trackingNumber = result.legacyOrder.trackingNumber;
              }
            }
            
            // Update timestamp
            if (result.order && result.order.updatedAt) {
              legacyOrder.timestamp = result.order.updatedAt instanceof Date 
                ? result.order.updatedAt.toISOString() 
                : result.order.updatedAt;
            } else if (result.legacyOrder && result.legacyOrder.updatedAt) {
              legacyOrder.timestamp = result.legacyOrder.updatedAt;
            }
            
            saveOrder(legacyOrder);
          }
        } catch (e) {
          console.error('Could not update localStorage:', e);
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
      console.error('Error updating order:', err);
      alert(err instanceof Error ? err.message : 'Failed to update order');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600/50 text-yellow-200 border border-yellow-500';
      case 'confirmed': return 'bg-blue-600/50 text-blue-200 border border-blue-500';
      case 'processing': return 'bg-purple-600/50 text-purple-200 border border-purple-500';
      case 'dispatched': return 'bg-indigo-600/50 text-indigo-200 border border-indigo-500';
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

  // Separate orders into active and cancelled
  const activeOrders = orders.filter(order => 
    order.status !== 'cancelled' && 
    order.paymentStatus !== 'failed' &&
    order.paymentStatus !== 'refunded'
  );

  const cancelledOrders = orders.filter(order => 
    order.status === 'cancelled' || 
    order.paymentStatus === 'failed' ||
    order.paymentStatus === 'refunded'
  );

  // Filter orders based on active tab and status filter
  const filteredOrders = (activeTab === 'active' ? activeOrders : cancelledOrders).filter(order => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'paid') return order.paymentStatus === 'paid';
    return order.status === statusFilter || order.paymentStatus === statusFilter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-white">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
        <div className="text-red-300 mb-4">Error: {error}</div>
        <button 
          onClick={fetchOrders}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
        <div className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6 border-b border-white/15">
            <button
              onClick={() => {
                setActiveTab('active');
                setStatusFilter('all');
                setSelectedOrder(null);
              }}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'active'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Active Orders ({activeOrders.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('cancelled');
                setStatusFilter('all');
                setSelectedOrder(null);
              }}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'cancelled'
                  ? 'text-red-400 border-b-2 border-red-400'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Cancelled/Inactive ({cancelledOrders.length})
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {activeTab === 'cancelled' ? 'Cancelled Orders' : 'Active Orders'} ({filteredOrders.length})
            </h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-600 bg-slate-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {activeTab === 'active' ? (
                <>
                  <option value="pending">Pending Payment</option>
                  <option value="paid">Paid/Confirmed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="shipped">Shipped</option>
                </>
              ) : (
                <>
                  <option value="cancelled">Cancelled</option>
                  <option value="failed">Payment Failed</option>
                  <option value="refunded">Refunded</option>
                </>
              )}
            </select>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOrder?.id === order.id
                    ? 'border-blue-500 bg-blue-900/50 text-white'
                    : 'border-white/15 bg-slate-900/50 hover:border-blue-500 text-white'
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white">{order.id}</h3>
                    <p className="text-sm text-white/80">
                      {order.customer.firstName} {order.customer.lastName}
                    </p>
                    <p className="text-sm text-white/80">{order.customer.email}</p>
                    <p className="text-sm text-white/80">
                      {order.createdAt instanceof Date 
                        ? order.createdAt.toLocaleDateString() 
                        : new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">£{order.total.toFixed(2)}</p>
                    <div className="flex flex-col gap-1 mt-1 items-end">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus === 'paid' ? '✓ Paid' : order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                      {order.paymentMethod && (
                        <span className="text-xs text-white/60">
                          {order.paymentMethod === 'paypal' ? 'PayPal' : 'Stripe'}
                        </span>
                      )}
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
          <div className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold text-white mb-4">
              Order Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white">Order ID</h4>
                <p className="text-white/90">{selectedOrder.id}</p>
              </div>

              <div className="bg-slate-900/50 border border-white/15 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Order Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Payment Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus === 'paid' ? '✓ Paid' : selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                  </span>
                </div>
                {selectedOrder.paymentMethod && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-white/80">Payment Method:</span>
                    <span className="text-white/90 font-semibold">
                      {selectedOrder.paymentMethod === 'paypal' ? 'PayPal' : selectedOrder.paymentMethod === 'stripe' ? 'Stripe' : selectedOrder.paymentMethod}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-white">Customer</h4>
                <p className="text-white/90">
                  {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                </p>
                <p className="text-white/90">{selectedOrder.customer.email}</p>
                {selectedOrder.customer.phone && (
                  <p className="text-white/90">{selectedOrder.customer.phone}</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-white">Shipping Address</h4>
                <div className="text-white/90">
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
                <h4 className="font-semibold text-white">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium text-white">{item.book.title}</p>
                        <p className="text-sm text-white/80">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-white">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 border border-white/15 p-4 rounded-lg">
                <div className="flex justify-between text-white/90">
                  <span>Subtotal:</span>
                  <span>£{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/90">
                  <span>Shipping:</span>
                  <span className="text-green-300 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between font-bold border-t border-white/15 pt-2 mt-2 text-white">
                  <span>Total:</span>
                  <span>£{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {selectedOrder.trackingNumber && (
                <div>
                  <h4 className="font-semibold text-white">Tracking</h4>
                  <p className="text-white/90">Number: {selectedOrder.trackingNumber}</p>
                  {selectedOrder.estimatedDelivery && (
                    <p className="text-white/90">
                      Estimated: {selectedOrder.estimatedDelivery.toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}

              {selectedOrder.notes && (
                <div>
                  <h4 className="font-semibold text-white">Notes</h4>
                  <p className="text-white/90">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Update Status</h4>
                
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
                      className="w-full px-3 py-2 border border-slate-600 bg-slate-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-slate-600 bg-slate-900 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <p className="text-sm text-white/80">Order dispatched. Customer has been notified via email.</p>
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
                      if (reason !== null) { // Allow empty string but not null (cancelled)
                        updateOrderStatus(selectedOrder.id, 'cancel', { reason: reason || 'No reason provided' });
                      }
                    }}
                    className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                )}

                {selectedOrder.status === 'cancelled' && (
                  <div className="p-3 bg-red-900/50 border border-red-700 rounded-lg">
                    <p className="text-sm text-red-200 font-semibold mb-2">⚠️ Order Cancelled</p>
                    {selectedOrder.notes && (
                      <p className="text-sm text-red-300 mt-1">Reason: {selectedOrder.notes}</p>
                    )}
                    <p className="text-xs text-red-300/70 mt-2">
                      Cancelled orders remain in the system for record-keeping but cannot be reactivated.
                    </p>
                  </div>
                )}

                {selectedOrder.paymentStatus === 'paid' && selectedOrder.status !== 'cancelled' && (
                  <div className="p-3 bg-green-900/50 border border-green-700 rounded-lg">
                    <p className="text-sm text-green-200 font-semibold">✓ Payment Confirmed</p>
                    <p className="text-xs text-green-300/70 mt-1">
                      This order has been paid and is ready for processing.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
            <p className="text-white/90 text-center">
              Select an order to view details and manage status
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
