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
import CustomerTestimonials from '@/components/CustomerTestimonials';
import { trackCartAbandonment } from '@/utils/abandonedCartRecovery';

export default function CheckoutPage() {
  const { items, getTotalPrice, getBulkDiscount, getBulkDiscountPercentage, getFinalTotal, removeFromCart, updateQuantity, clearCart } = useCart();
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
  const bulkDiscount = getBulkDiscount();
  const total = getFinalTotal(); // This includes bulk discounts and shipping

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
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Secure Checkout</h1>
          <p className="text-slate-600 text-sm sm:text-base">Complete your order for Charles E. MacKay's aviation history books</p>
        </div>

        {/* Progress Steps - Mobile Friendly */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-max px-2">
            <div className={`flex items-center ${step === 'basket' ? 'text-slate-900' : 'text-slate-500'}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step === 'basket' ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-600'}`}>
                1
              </div>
              <span className="ml-1 sm:ml-2 font-medium text-xs sm:text-sm">Basket</span>
            </div>
            <div className="w-4 sm:w-8 h-0.5 sm:h-1 bg-slate-300"></div>
            <div className={`flex items-center ${step === 'address' || step === 'payment' || step === 'review' ? 'text-slate-900' : 'text-slate-500'}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step === 'address' || step === 'payment' || step === 'review' ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-600'}`}>
                2
              </div>
              <span className="ml-1 sm:ml-2 font-medium text-xs sm:text-sm">Address</span>
            </div>
            <div className="w-4 sm:w-8 h-0.5 sm:h-1 bg-slate-300"></div>
            <div className={`flex items-center ${step === 'payment' || step === 'review' ? 'text-slate-900' : 'text-slate-500'}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step === 'payment' || step === 'review' ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-600'}`}>
                3
              </div>
              <span className="ml-1 sm:ml-2 font-medium text-xs sm:text-sm">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Left Column - Form */}
          <div>
            {step === 'basket' && (
              <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-900">Your Basket</h2>
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border border-slate-200 rounded-lg bg-slate-50">
                      <Link href={`/books/${item.book.id}`} className="hover:opacity-80 transition-opacity flex-shrink-0">
                        <Image
                          src={item.book.imageUrl || `/book-covers/${item.book.id}.jpg`}
                          alt={item.book.title}
                          width={50}
                          height={65}
                          className="rounded cursor-pointer sm:w-[60px] sm:h-[80px]"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/books/${item.book.id}`} className="hover:text-blue-600 transition-colors">
                          <h3 className="font-semibold cursor-pointer text-slate-900 text-sm sm:text-base line-clamp-2">{item.book.title}</h3>
                        </Link>
                        <p className="text-xs sm:text-sm text-slate-600">£{item.book.price}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.book.id, Math.max(0, item.quantity - 1))}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-600 text-white flex items-center justify-center text-sm font-bold hover:bg-slate-700"
                          >
                            -
                          </button>
                          <span className="w-6 sm:w-8 text-center text-slate-900 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-600 text-white flex items-center justify-center text-sm font-bold hover:bg-slate-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 pt-4 border-t border-slate-200">
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-900">
                      <span className="text-sm sm:text-base">Subtotal:</span>
                      <span className="text-sm sm:text-base font-medium">£{subtotal.toFixed(2)}</span>
                    </div>
                    {bulkDiscount > 0 && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span className="text-xs sm:text-sm">Bulk Discount ({getBulkDiscountPercentage()}% off {items.reduce((total, item) => total + item.quantity, 0)}+ books):</span>
                        <span className="text-xs sm:text-sm">-£{bulkDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-green-600">
                      <span className="text-sm sm:text-base">Shipping:</span>
                      <span className="text-sm sm:text-base font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg font-semibold border-t border-slate-200 pt-2 text-slate-900">
                      <span>Total:</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                  </div>
                  {bulkDiscount > 0 && (
                    <p className="text-xs sm:text-sm text-green-600 mt-2">
                      🎉 You've saved £{bulkDiscount.toFixed(2)} with {getBulkDiscountPercentage()}% bulk discount!
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">Free worldwide shipping included</p>
                </div>
                <button
                  onClick={() => setStep('address')}
                  className="w-full mt-4 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  Continue to Address
                </button>
              </div>
            )}

            {step === 'address' && (
              <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-900">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-900">First Name *</label>
                    <input
                      type="text"
                      value={customerDetails.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-slate-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-900">Last Name *</label>
                    <input
                      type="text"
                      value={customerDetails.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-slate-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <label className="block text-sm font-medium mb-1 text-slate-900">Email *</label>
                  <input
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-slate-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mt-3 sm:mt-4">
                  <label className="block text-sm font-medium mb-1 text-slate-900">Phone</label>
                  <input
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-slate-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-3 sm:mt-4">
                  <label className="block text-sm font-medium mb-1 text-slate-900">Address Line 1 *</label>
                  <input
                    type="text"
                    value={customerDetails.address1}
                    onChange={(e) => handleInputChange('address1', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-slate-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mt-3 sm:mt-4">
                  <label className="block text-sm font-medium mb-1 text-slate-900">Address Line 2</label>
                  <input
                    type="text"
                    value={customerDetails.address2}
                    onChange={(e) => handleInputChange('address2', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-slate-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-900">City *</label>
                    <input
                      type="text"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-slate-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-900">Postcode *</label>
                    <input
                      type="text"
                      value={customerDetails.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-slate-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <label className="block text-sm font-medium mb-1 text-slate-900">Country *</label>
                  <select
                    value={customerDetails.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-slate-300 rounded-lg text-slate-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <ul className="text-red-800 text-xs sm:text-sm">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  onClick={handleAddressSubmit}
                  className="w-full mt-4 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-900">Payment Method</h2>
                
                {/* Payment Method Selection */}
                <div className="mb-4 sm:mb-6">
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('stripe')}
                      className={`w-full p-3 sm:p-4 border rounded-lg text-left transition-colors ${
                        paymentMethod === 'stripe'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl sm:text-2xl mr-2 sm:mr-3">💳</span>
                        <div>
                          <div className="font-medium text-slate-900 text-sm sm:text-base">Credit or Debit Card</div>
                          <div className="text-xs sm:text-sm text-slate-600">Visa, Mastercard, American Express, Apple Pay, Google Pay</div>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('paypal')}
                      className={`w-full p-3 sm:p-4 border rounded-lg text-left transition-colors ${
                        paymentMethod === 'paypal'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl sm:text-2xl mr-2 sm:mr-3">🔵</span>
                        <div>
                          <div className="font-medium text-slate-900 text-sm sm:text-base">PayPal</div>
                          <div className="text-xs sm:text-sm text-slate-600">Pay with your PayPal account</div>
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
                      className="w-full bg-blue-600 text-white py-3 px-4 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Processing...' : 'Pay with PayPal'}
                    </button>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">
                      You'll be redirected to PayPal to complete your payment
                    </p>
                  </div>
                )}

                {errors.length > 0 && (
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <ul className="text-red-800 text-xs sm:text-sm">
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
          <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-slate-900">Order Summary</h3>
              <div className="space-y-2 sm:space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <Link href={`/books/${item.book.id}`} className="text-xs sm:text-sm hover:text-blue-600 transition-colors text-slate-900 flex-1 pr-2 line-clamp-2">
                      {item.book.title} (x{item.quantity})
                    </Link>
                    <span className="text-xs sm:text-sm font-medium text-slate-900 flex-shrink-0">£{(item.book.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              {bulkDiscount > 0 && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2 text-sm">🎉</span>
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold text-green-800">Bulk Discount Applied!</p>
                      <p className="text-green-700">You've saved £{bulkDiscount.toFixed(2)} with {getBulkDiscountPercentage()}% discount</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="border-t border-slate-200 mt-3 sm:mt-4 pt-3 sm:pt-4 space-y-2">
                <div className="flex justify-between text-slate-900">
                  <span className="text-xs sm:text-sm">Subtotal:</span>
                  <span className="text-xs sm:text-sm font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                {bulkDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span className="text-xs">Bulk Discount ({getBulkDiscountPercentage()}% off {items.reduce((total, item) => total + item.quantity, 0)}+ books):</span>
                    <span className="text-xs">-£{bulkDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900">
                  <span className="text-xs sm:text-sm">Shipping:</span>
                  <span className="text-xs sm:text-sm font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-sm sm:text-lg text-slate-900 border-t border-slate-200 pt-2">
                  <span>Total:</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Security Notice */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm text-blue-800 font-medium">Secure Payment</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Your payment is protected by SSL encryption and processed securely by Stripe/PayPal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust & Security Badges are rendered globally via layout */}

            {/* Customer Testimonials */}
            <div className="mt-6">
              <CustomerTestimonials maxDisplay={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
