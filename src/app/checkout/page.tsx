'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/config/stripe';
import StripePaymentForm from '@/components/StripePaymentForm';
import {
  CustomerDetails,
  calculateShipping,
  calculateShippingByWeight,
  generateOrderId,
  saveOrder,
  generatePayPalUrl,
  validateCustomerDetails,
  Order
} from '@/utils/orderUtils';
import { OrderManagementService, CustomerInfo } from '@/utils/orderManagement';

export default function CheckoutPage() {
  const { items, getTotalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [step, setStep] = useState<'basket' | 'address' | 'payment' | 'review'>('basket');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
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
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total weight of all items
  const totalWeight = items.reduce((total, item) => {
    return total + (((item.book as any).weight || 300) * item.quantity);
  }, 0);
  
  const shippingCost = 0; // Free worldwide shipping
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
    setStep('payment');
  };

  const handlePaymentMethodSelect = (method: 'stripe' | 'paypal') => {
    setPaymentMethod(method);
    if (method === 'stripe') {
      createStripePaymentIntent();
    }
  };

  const createStripePaymentIntent = async () => {
    if (!customerDetails.email) {
      setErrors(['Email is required for payment processing']);
      return;
    }

    setIsLoading(true);
    try {
      const orderId = generateOrderId();
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'gbp',
          customerEmail: customerDetails.email,
          orderId: orderId,
          items: items.map(item => ({
            id: item.book.id,
            title: item.book.title,
            price: item.book.price,
            quantity: item.quantity,
            isbn: item.book.isbn
          }))
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setErrors([data.error]);
      } else {
        setClientSecret(data.clientSecret);
      }
    } catch (error) {
      setErrors(['Failed to initialize payment. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStripeSuccess = async (paymentIntent: any) => {
    try {
      // Convert customer details to new format
      const customerInfo: CustomerInfo = {
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        email: customerDetails.email,
        phone: customerDetails.phone,
        address: {
          line1: customerDetails.address1,
          line2: customerDetails.address2,
          city: customerDetails.city,
          state: customerDetails.postcode, // Using postcode as state for UK
          postalCode: customerDetails.postcode,
          country: customerDetails.country
        }
      };

      // Convert cart items to order items
      const orderItems = items.map(item => ({
        bookId: item.book.id,
        quantity: item.quantity,
        price: item.book.price,
        book: item.book
      }));

      // Create order in new system
      const order = await OrderManagementService.createOrder(
        orderItems,
        customerInfo,
        'stripe',
        paymentIntent.id
      );

      // Confirm payment
      await OrderManagementService.confirmPayment(order.id, paymentIntent.id);

      // Save to legacy system for backward compatibility
      const legacyOrder: Order = {
        orderId: order.id,
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
        status: 'paid',
        paypalTransactionId: paymentIntent.id
      };
      saveOrder(legacyOrder);

      clearCart();
      window.location.href = `/order-complete?orderId=${order.id}`;
    } catch (error) {
      console.error('Error creating order:', error);
      setErrors(['Failed to create order. Please contact support.']);
    }
  };

  const handleStripeError = (error: string) => {
    setErrors([error]);
  };

  const handlePayPalPayment = async () => {
    try {
      // Convert customer details to new format
      const customerInfo: CustomerInfo = {
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        email: customerDetails.email,
        phone: customerDetails.phone,
        address: {
          line1: customerDetails.address1,
          line2: customerDetails.address2,
          city: customerDetails.city,
          state: customerDetails.postcode, // Using postcode as state for UK
          postalCode: customerDetails.postcode,
          country: customerDetails.country
        }
      };

      // Convert cart items to order items
      const orderItems = items.map(item => ({
        bookId: item.book.id,
        quantity: item.quantity,
        price: item.book.price,
        book: item.book
      }));

      // Create order in new system
      const order = await OrderManagementService.createOrder(
        orderItems,
        customerInfo,
        'paypal'
      );

      // Create legacy order for PayPal URL generation
      const legacyOrder: Order = {
        orderId: order.id,
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

      saveOrder(legacyOrder);
      const paypalUrl = generatePayPalUrl(legacyOrder);

      const popup = window.open(
        paypalUrl,
        'paypal_checkout',
        'width=900,height=700,scrollbars=yes,resizable=yes,toolbar=no,location=no,status=no'
      );

      if (popup) {
        const messageListener = async (event: MessageEvent) => {
          if (event.origin !== window.location.origin && !event.origin.includes('paypal.com')) {
            return;
          }

          if (event.data.type === 'PAYPAL_PAYMENT_SUCCESS') {
            try {
              // Confirm payment in new system
              await OrderManagementService.confirmPayment(order.id);
              clearCart();
              window.location.href = `/order-complete?orderId=${order.id}`;
            } catch (error) {
              console.error('Error confirming PayPal payment:', error);
              alert('Payment received but order confirmation failed. Please contact support.');
            }
          } else if (event.data.type === 'PAYPAL_PAYMENT_CANCELLED') {
            alert('Payment was cancelled. You can try again or contact us for assistance.');
          } else if (event.data.type === 'PAYPAL_PAYMENT_ERROR') {
            alert('Payment failed. Please try again or contact us for assistance.');
          }
        };

        window.addEventListener('message', messageListener);
        
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
          }
        }, 1000);
      } else {
        alert('Popup blocked. Redirecting to PayPal...');
        window.location.href = paypalUrl;
      }
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      setErrors(['Failed to create order. Please try again.']);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your basket is empty</h1>
          <p className="text-secondary mb-6">Add some books to your basket to proceed with checkout.</p>
          <Link href="/books" className="badge badge-blue">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Secure Checkout</h1>
          <p className="text-secondary">Complete your order for Charles E. MacKay's aviation history books</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step === 'basket' ? 'text-primary' : 'text-secondary'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'basket' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Basket</span>
            </div>
            <div className="w-8 h-1 bg-secondary"></div>
            <div className={`flex items-center ${step === 'address' || step === 'payment' || step === 'review' ? 'text-primary' : 'text-secondary'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'address' || step === 'payment' || step === 'review' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Address</span>
            </div>
            <div className="w-8 h-1 bg-secondary"></div>
            <div className={`flex items-center ${step === 'payment' || step === 'review' ? 'text-primary' : 'text-secondary'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' || step === 'review' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            {step === 'basket' && (
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Your Basket</h2>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Image
                        src={item.book.imageUrl || `/book-covers/${item.book.id}.jpg`}
                        alt={item.book.title}
                        width={60}
                        height={80}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.book.title}</h3>
                        <p className="text-sm text-secondary">£{item.book.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.book.id, Math.max(0, item.quantity - 1))}
                          className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-secondary mt-2">Free worldwide shipping included</p>
                </div>
                <button
                  onClick={() => setStep('address')}
                  className="w-full mt-4 badge badge-green"
                >
                  Continue to Address
                </button>
              </div>
            )}

            {step === 'address' && (
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name *</label>
                    <input
                      type="text"
                      value={customerDetails.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={customerDetails.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Address Line 1 *</label>
                  <input
                    type="text"
                    value={customerDetails.address1}
                    onChange={(e) => handleInputChange('address1', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Address Line 2</label>
                  <input
                    type="text"
                    value={customerDetails.address2}
                    onChange={(e) => handleInputChange('address2', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City *</label>
                    <input
                      type="text"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Postcode *</label>
                    <input
                      type="text"
                      value={customerDetails.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Country *</label>
                  <select
                    value={customerDetails.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  >
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IT">Italy</option>
                    <option value="ES">Spain</option>
                    <option value="NL">Netherlands</option>
                    <option value="BE">Belgium</option>
                  </select>
                </div>
                {errors.length > 0 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <ul className="text-red-800 text-sm">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={handleAddressSubmit}
                  className="w-full mt-4 badge badge-green"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('stripe')}
                      className={`w-full p-4 border rounded-lg text-left transition-colors ${
                        paymentMethod === 'stripe'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">💳</span>
                        <div>
                          <div className="font-medium">Credit or Debit Card</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard, American Express, Apple Pay, Google Pay</div>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('paypal')}
                      className={`w-full p-4 border rounded-lg text-left transition-colors ${
                        paymentMethod === 'paypal'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">🔵</span>
                        <div>
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-gray-600">Pay with your PayPal account</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Payment Forms */}
                {paymentMethod === 'stripe' && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripePaymentForm
                      amount={total}
                      currency="GBP"
                      onSuccess={handleStripeSuccess}
                      onError={handleStripeError}
                      onCancel={() => setStep('address')}
                      customerEmail={customerDetails.email}
                      orderId={generateOrderId()}
                      items={items}
                    />
                  </Elements>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center">
                    <button
                      onClick={handlePayPalPayment}
                      disabled={isLoading}
                      className="w-full badge badge-blue px-8 py-4 text-lg font-semibold"
                    >
                      {isLoading ? 'Processing...' : 'Pay with PayPal'}
                    </button>
                    <p className="text-sm text-secondary mt-2">
                      You'll be redirected to PayPal to complete your payment
                    </p>
                  </div>
                )}

                {errors.length > 0 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <ul className="text-red-800 text-sm">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8">
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">{item.book.title} (x{item.quantity})</span>
                    <span className="text-sm">£{(item.book.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Security Notice */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Secure Payment</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Your payment is protected by SSL encryption and processed securely by Stripe/PayPal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
