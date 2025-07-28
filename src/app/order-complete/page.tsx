'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { getOrder, updateOrderStatus, generateEmailReceipt, Order } from '@/utils/orderUtils';
import { useCart } from '@/context/CartContext';

function OrderCompleteContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCart();

  useEffect(() => {
    if (orderId) {
      const orderData = getOrder(orderId);
      if (orderData) {
        setOrder(orderData);
        // Update order status to paid if coming from PayPal
        updateOrderStatus(orderId, 'paid');
        // Clear the cart since order is complete
        clearCart();
      }
    }
    setLoading(false);
  }, [orderId, clearCart]);

  const handlePrintReceipt = () => {
    if (order) {
      const receipt = generateEmailReceipt(order);
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Order Receipt - ${order.orderId}</title>
              <style>
                body { font-family: monospace; padding: 20px; }
                pre { white-space: pre-wrap; }
              </style>
            </head>
            <body>
              <pre>${receipt}</pre>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleEmailReceipt = () => {
    if (order) {
      const subject = encodeURIComponent(`Order Receipt - ${order.orderId}`);
      const body = encodeURIComponent(generateEmailReceipt(order));
      window.location.href = `mailto:${order.customerDetails.email}?subject=${subject}&body=${body}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't find the order you're looking for. Please check your order ID and try again.
            </p>
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Success Header */}
      <div className="bg-green-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-2">Order Complete!</h1>
          <p className="text-green-100">
            Thank you for your purchase. Your order has been received and will be processed shortly.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Order Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold text-lg">{order.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">{new Date(order.timestamp).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-semibold text-lg">£{order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Shipping Address</h3>
            <div className="text-gray-700">
              <p className="font-semibold">{order.customerDetails.firstName} {order.customerDetails.lastName}</p>
              <p>{order.customerDetails.address1}</p>
              {order.customerDetails.address2 && <p>{order.customerDetails.address2}</p>}
              <p>{order.customerDetails.city}</p>
              <p>{order.customerDetails.postcode}</p>
              <p>{order.customerDetails.country}</p>
              <p className="mt-2">Email: {order.customerDetails.email}</p>
              {order.customerDetails.phone && <p>Phone: {order.customerDetails.phone}</p>}
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b">
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    {item.isbn && <span className="ml-2 text-xs">ISBN: {item.isbn}</span>}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">£{(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">£{item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t pt-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>£{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>£{order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>£{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">What's Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Order Processing</h4>
                <p className="text-gray-600">Your order is being prepared for shipment.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Dispatch</h4>
                <p className="text-gray-600">Your books will be dispatched within 1-2 business days via Royal Mail.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Delivery</h4>
                <p className="text-gray-600">You'll receive your aviation history books within 3-7 business days.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={handlePrintReceipt}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🖨️ Print Receipt
            </button>
            <button
              onClick={handleEmailReceipt}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              📧 Email Receipt
            </button>
            <Link
              href="/"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-600">
          <p className="mb-2">Questions about your order?</p>
          <p>
            Contact us at{' '}
            <a href="mailto:charlese1mackay@hotmail.com" className="text-blue-600 hover:underline">
              charlese1mackay@hotmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderCompletePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <OrderCompleteContent />
    </Suspense>
  );
}
