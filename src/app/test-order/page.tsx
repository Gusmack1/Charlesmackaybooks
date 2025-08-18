'use client';

import { useState } from 'react';

export default function TestOrderPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  const createTestOrder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const result = await response.json();
      setTestResult(result);
      
      if (result.success) {
        // Refresh orders list
        fetchOrders();
      }
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Failed to create test order',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/test-order');
      const result = await response.json();
      
      if (result.success) {
        setOrders(result.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'paid': return 'text-green-600';
      case 'processing': return 'text-blue-600';
      case 'shipped': return 'text-purple-600';
      case 'delivered': return 'text-green-800';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order Management System Test</h1>
        
        {/* Test Controls */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Test Controls</h2>
          <div className="space-y-4">
            <button
              onClick={createTestOrder}
              disabled={isLoading}
              className="badge badge-blue px-6 py-3"
            >
              {isLoading ? 'Creating Test Order...' : 'Create Test Order'}
            </button>
            
            <button
              onClick={fetchOrders}
              className="badge badge-green px-6 py-3 ml-4"
            >
              Refresh Orders
            </button>
          </div>
        </div>

        {/* Test Result */}
        {testResult && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">Test Result</h2>
            <div className={`p-4 rounded-lg ${
              testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="font-semibold mb-2">
                {testResult.success ? '✅ Success' : '❌ Failed'}
              </div>
              <div className="text-sm">
                <p><strong>Message:</strong> {testResult.message}</p>
                {testResult.error && (
                  <p><strong>Error:</strong> {testResult.error}</p>
                )}
                {testResult.details && (
                  <p><strong>Details:</strong> {testResult.details}</p>
                )}
                {testResult.order && (
                  <div className="mt-3">
                    <p><strong>Order ID:</strong> {testResult.order.id}</p>
                    <p><strong>Status:</strong> {testResult.order.status}</p>
                    <p><strong>Total:</strong> £{testResult.order.total}</p>
                    <p><strong>Customer:</strong> {testResult.order.customerEmail}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Orders ({orders.length})</h2>
          {orders.length === 0 ? (
            <p className="text-secondary">No orders found. Create a test order to see results.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Order #{order.id}</h3>
                      <p className="text-sm text-secondary">{order.customerEmail}</p>
                    </div>
                    <div className="text-right">
                      <span className={`font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <p className="text-sm">£{order.total}</p>
                    </div>
                  </div>
                  <div className="text-sm text-secondary">
                    <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>Items: {order.items.map((item: any) => 
                      `${item.bookTitle} (x${item.quantity})`
                    ).join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
