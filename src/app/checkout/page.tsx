'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import {
  CustomerDetails,
  calculateShipping,
  generateOrderId,
  saveOrder,
  generatePayPalUrl,
  validateCustomerDetails,
  Order
} from '@/utils/orderUtils';

export default function CheckoutPage() {
  const { items, getTotalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [step, setStep] = useState<'basket' | 'address' | 'review'>('basket');
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    country: 'GB'
  });
  const [errors, setErrors] = useState<string[]>([]);

  const shippingCost = calculateShipping(customerDetails.country);
  const subtotal = getTotalPrice();
  const total = subtotal + shippingCost;



  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressSubmit = () => {
    const validationErrors = validateCustomerDetails(customerDetails);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setStep('review');
  };

  const handlePayment = () => {
    const orderId = generateOrderId();

    const order: Order = {
      orderId,
      customerDetails,
      items: items.map(item => ({
        id: item.book.id,
        title: item.book.title,
        price: item.book.price,
        quantity: item.quantity,
        isbn: item.book.isbn
      })),
      subtotal,
      shippingCost,
      total,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    // Save order
    saveOrder(order);

    // Generate PayPal URL and open in popup
    const paypalUrl = generatePayPalUrl(order);

    // Open PayPal in a popup window
    const popup = window.open(
      paypalUrl,
      'paypal_checkout',
      'width=900,height=700,scrollbars=yes,resizable=yes,toolbar=no,location=no,status=no'
    );

    if (popup) {
      // Set up message listener for PayPal results
      const messageListener = (event: MessageEvent) => {
        // Verify origin for security
        if (event.origin !== window.location.origin && !event.origin.includes('paypal.com')) {
          return;
        }

        if (event.data.type === 'PAYPAL_PAYMENT_SUCCESS') {
          // Payment was successful
          const updatedOrder = { ...order, status: 'paid' as const };
          saveOrder(updatedOrder);
          clearCart();
          window.removeEventListener('message', messageListener);
          popup.close();
          window.location.href = `/order-complete?order=${orderId}`;
        } else if (event.data.type === 'PAYPAL_PAYMENT_CANCELLED') {
          // Payment was cancelled
          const updatedOrder = { ...order, status: 'cancelled' as const };
          saveOrder(updatedOrder);
          window.removeEventListener('message', messageListener);
          popup.close();
          alert('Payment was cancelled. You can try again or contact us for assistance.');
        } else if (event.data.type === 'PAYPAL_PAYMENT_ERROR') {
          // Payment failed
          const updatedOrder = { ...order, status: 'failed' as const };
          saveOrder(updatedOrder);
          window.removeEventListener('message', messageListener);
          popup.close();
          alert('Payment failed. Please try again or contact us for assistance.');
        }
      };

      // Listen for messages from PayPal popup
      window.addEventListener('message', messageListener);

      // Monitor popup close - but don't assume payment success
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);

          // Check if order status was updated by PayPal callback
          const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
          const currentOrder = savedOrders.find((o: Order) => o.orderId === orderId);

          if (currentOrder && currentOrder.status === 'paid') {
            // Payment was confirmed
            clearCart();
            window.location.href = `/order-complete?order=${orderId}`;
          } else if (currentOrder && currentOrder.status === 'pending') {
            // Popup closed without clear payment status - could be cancelled or failed
            const updatedOrder = { ...order, status: 'cancelled' as const };
            saveOrder(updatedOrder);
            alert('Payment window was closed. If you completed the payment, please contact us with your order ID: ' + orderId);
          }
        }
      }, 1000);

      // Timeout after 15 minutes
      setTimeout(() => {
        if (!popup.closed) {
          popup.close();
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          const updatedOrder = { ...order, status: 'cancelled' as const };
          saveOrder(updatedOrder);
          alert('Payment session timed out. Please try again.');
        }
      }, 15 * 60 * 1000);
    } else {
      // Fallback if popup blocked
      alert('Popup blocked. Redirecting to PayPal...');
      window.location.href = paypalUrl;
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Basket is Empty</h1>
              <p className="text-gray-600 mb-8">
                Add some books to your basket to proceed with checkout.
              </p>
            </div>

            <Link
              href="/books"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Aviation Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${step === 'basket' ? 'text-blue-600' : step === 'address' || step === 'review' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'basket' ? 'bg-blue-600 text-white' : step === 'address' || step === 'review' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Basket</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center ${step === 'address' ? 'text-blue-600' : step === 'review' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'address' ? 'bg-blue-600 text-white' : step === 'review' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Address</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center ${step === 'review' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'review' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
                  3
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
            </div>
          </div>

          {step === 'basket' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-6">Your Books</h2>

                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.book.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-20 flex-shrink-0">
                          <Image
                            src={item.book.imageUrl || '/book-covers/placeholder-book.svg'}
                            alt={item.book.title}
                            width={64}
                            height={80}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.book.title}</h3>
                          <p className="text-sm text-gray-600">£{item.book.price.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{item.book.condition} condition</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold">£{(item.book.price * item.quantity).toFixed(2)}</div>
                          <button
                            onClick={() => removeFromCart(item.book.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} books)</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping</span>
                      <span>Calculated at next step</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('address')}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continue to Address
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'address' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

                {errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-red-800 mb-2">Please correct the following errors:</h3>
                    <ul className="list-disc list-inside text-red-700 text-sm">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); handleAddressSubmit(); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerDetails.address1}
                      onChange={(e) => handleInputChange('address1', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={customerDetails.address2}
                      onChange={(e) => handleInputChange('address2', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postcode/ZIP *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerDetails.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      required
                      value={customerDetails.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="ES">Spain</option>
                      <option value="IT">Italy</option>
                      <option value="worldwide">Other Country</option>
                    </select>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm">
                      <div className="font-semibold text-blue-800 mb-1">Shipping Cost for {customerDetails.country === 'GB' ? 'UK' : customerDetails.country}:</div>
                      <div className="text-blue-700">£{shippingCost.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep('basket')}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Back to Basket
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>

                {/* Customer Details */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Shipping To:</h3>
                  <div className="text-sm text-gray-600">
                    <div>{customerDetails.firstName} {customerDetails.lastName}</div>
                    <div>{customerDetails.email}</div>
                    <div>{customerDetails.address1}</div>
                    {customerDetails.address2 && <div>{customerDetails.address2}</div>}
                    <div>{customerDetails.city}, {customerDetails.postcode}</div>
                    <div>{customerDetails.country}</div>
                  </div>
                  <button
                    onClick={() => setStep('address')}
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Order Items:</h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item.book.id} className="flex justify-between text-sm">
                        <span>{item.book.title} × {item.quantity}</span>
                        <span>£{(item.book.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>£{shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('address')}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Pay with PayPal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
