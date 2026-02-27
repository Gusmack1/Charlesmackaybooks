'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../config/stripe';
import StripePaymentForm from '../../components/StripePaymentForm';
import {
  CustomerDetails,
  generateOrderId,
  saveOrder,
  generatePayPalUrl,
  validateCustomerDetails,
  updateOrderStatus,
  Order
} from '../../utils/orderUtils';
import {
  readSavedCustomerProfile,
  saveCustomerProfile,
  clearSavedCustomerProfile,
} from '../../utils/customerProfile';
import CustomerTestimonials from '../../components/CustomerTestimonials';
import { trackCartAbandonment } from '../../utils/abandonedCartRecovery';
import { useSearchParams } from 'next/navigation';

interface CustomerInfoPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

interface OrderItemPayload {
  bookId: string;
  quantity: number;
  price: number;
}

interface CreateOrderRequest {
  items: OrderItemPayload[];
  customer: CustomerInfoPayload;
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer';
  paymentIntentId?: string;
  paypalOrderId?: string;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const preferredPaymentMethod = searchParams.get('method') === 'paypal' ? 'paypal' : 'stripe';
  const { items, getTotalPrice, getBulkDiscount, getBulkDiscountPercentage, getFinalTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [step, setStep] = useState<'basket' | 'address' | 'payment'>('basket');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>(preferredPaymentMethod);
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
  const [saveDetailsForNextTime, setSaveDetailsForNextTime] = useState(true);
  const [savedProfile, setSavedProfile] = useState<CustomerDetails | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [abandonmentTracked, setAbandonmentTracked] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [stripeReference] = useState(() => generateOrderId());

  useEffect(() => {
    const profile = readSavedCustomerProfile();
    if (profile?.email) {
      setSavedProfile(profile);
      setCustomerDetails((current) => {
        const alreadyStarted = Boolean(
          current.firstName ||
          current.lastName ||
          current.email ||
          current.address1 ||
          current.city ||
          current.postcode
        );
        return alreadyStarted ? current : profile;
      });
    }
  }, []);

  const buildCustomerInfoPayload = (): CustomerInfoPayload => ({
    firstName: customerDetails.firstName,
    lastName: customerDetails.lastName,
    email: customerDetails.email,
    phone: customerDetails.phone,
    address: {
      line1: customerDetails.address1,
      line2: customerDetails.address2,
      city: customerDetails.city,
      state: customerDetails.postcode,
      postalCode: customerDetails.postcode,
      country: customerDetails.country
    }
  });

  const mapOrderItemsPayload = (): OrderItemPayload[] =>
    items.map(item => ({
      bookId: item.book.id,
      quantity: item.quantity,
      price: item.book.price
    }));

  const createServerOrder = async (payload: CreateOrderRequest) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok || !data?.order) {
      throw new Error(data?.error || 'Failed to create order');
    }
    return data.order as { id: string };
  };

  const patchServerOrder = async (orderId: string, body: Record<string, unknown>) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.error || 'Failed to update order');
    }

    return response.json().catch(() => ({}));
  };

  // Calculate total weight of all items
  const totalWeight = items.reduce((total, item) => {
    return total + (((item.book as any).weight || 300) * item.quantity);
  }, 0);
  
  const shippingCost = 0; // Free worldwide shipping
  const subtotal = getTotalPrice();
  const bulkDiscount = getBulkDiscount();
  const total = getFinalTotal(); // This includes bulk discounts and shipping
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!items.length || checkoutCompleted) return;

    const maybeTrackAbandonment = () => {
      if (abandonmentTracked) return;
      if (!customerDetails.email) return;
      const cartPayload = items.map((cartItem) => ({
        bookId: cartItem.book.id,
        quantity: cartItem.quantity,
        book: cartItem.book,
      }));
      const customerName = `${customerDetails.firstName || ''} ${customerDetails.lastName || ''}`.trim() || undefined;
      trackCartAbandonment(customerDetails.email, customerName, cartPayload, subtotal).finally(() => {
        setAbandonmentTracked(true);
      });
    };

    const handleBeforeUnload = () => {
      maybeTrackAbandonment();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (!checkoutCompleted) {
        maybeTrackAbandonment();
      }
    };
  }, [items, customerDetails, subtotal, checkoutCompleted, abandonmentTracked]);

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  const applySavedProfile = () => {
    if (!savedProfile) return;
    setCustomerDetails(savedProfile);
    setErrors([]);
  };

  const handleSavedProfileExpressCheckout = () => {
    if (!savedProfile) return;
    const validationErrors = validateCustomerDetails(savedProfile);
    if (validationErrors.length > 0) {
      setCustomerDetails(savedProfile);
      setErrors(validationErrors);
      setStep('address');
      return;
    }
    setCustomerDetails(savedProfile);
    setErrors([]);
    setPaymentMethod('stripe');
    setStep('payment');
  };

  const persistCheckoutProfile = () => {
    if (!saveDetailsForNextTime) {
      clearSavedCustomerProfile();
      return;
    }
    if (!customerDetails.email || !customerDetails.firstName || !customerDetails.lastName) return;
    saveCustomerProfile(customerDetails);
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

  const createStripePaymentIntent = useCallback(async () => {
    if (!customerDetails.email) {
      setErrors(['Email is required for payment processing']);
      return;
    }

    setIsLoading(true);
    try {
      const orderId = stripeReference;
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
  }, [customerDetails.email, items, stripeReference, total]);

  useEffect(() => {
    if (step === 'payment' && paymentMethod === 'stripe' && !clientSecret) {
      createStripePaymentIntent();
    }
  }, [step, paymentMethod, clientSecret, createStripePaymentIntent]);

  const handleStripeSuccess = async (paymentIntent: any) => {
    try {
      const customerInfo = buildCustomerInfoPayload();
      const orderItems = mapOrderItemsPayload();

      const order = await createServerOrder({
        items: orderItems,
        customer: customerInfo,
        paymentMethod: 'stripe',
        paymentIntentId: paymentIntent.id
      });

      await patchServerOrder(order.id, {
        action: 'confirm_payment',
        paymentIntentId: paymentIntent.id
      });

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

      setCheckoutCompleted(true);
      setAbandonmentTracked(true);
      persistCheckoutProfile();
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
      setIsLoading(true);
      const customerInfo = buildCustomerInfoPayload();
      const orderItems = mapOrderItemsPayload();

      const order = await createServerOrder({
        items: orderItems,
        customer: customerInfo,
        paymentMethod: 'paypal'
      });

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
        status: 'pending',
        paymentMethod: 'paypal' // Explicitly set payment method
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
              await patchServerOrder(order.id, { action: 'confirm_payment' });
              
              // Update legacy order status to paid
              updateOrderStatus(order.id, 'paid', event.data.transactionId);
              
              setCheckoutCompleted(true);
              setAbandonmentTracked(true);
              persistCheckoutProfile();
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
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Your basket is empty</h1>
          <p className="text-white/90 mb-6">Add some books to your basket to proceed with checkout.</p>
          <Link href="/books" className="btn-books">
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Secure Checkout</h1>
          <p className="text-white/90 text-sm sm:text-base">
            Guest checkout is enabled by default. Buy quickly with card, wallet, or PayPal.
          </p>
          <div className="mt-3 rounded-lg border border-blue-700/50 bg-slate-800/70 px-3 py-2 text-xs sm:text-sm text-white/85">
            Secure SSL payment • Free worldwide tracked shipping • 30-day returns
          </div>
        </div>

        {/* Progress Steps - Mobile Friendly */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-max px-2">
            <div className={`flex items-center ${step === 'basket' ? 'text-white' : 'text-white/60'}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step === 'basket' ? 'bg-blue-800 text-white' : 'bg-blue-800/50 text-white/60'}`}>
                1
              </div>
              <span className="ml-1 sm:ml-2 font-medium text-xs sm:text-sm">Basket</span>
            </div>
            <div className="w-4 sm:w-8 h-0.5 sm:h-1 bg-blue-800/50"></div>
            <div className={`flex items-center ${step === 'address' || step === 'payment' ? 'text-white' : 'text-white/60'}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step === 'address' || step === 'payment' ? 'bg-blue-800 text-white' : 'bg-blue-800/50 text-white/60'}`}>
                2
              </div>
              <span className="ml-1 sm:ml-2 font-medium text-xs sm:text-sm">Address</span>
            </div>
            <div className="w-4 sm:w-8 h-0.5 sm:h-1 bg-blue-800/50"></div>
            <div className={`flex items-center ${step === 'payment' ? 'text-white' : 'text-white/60'}`}>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${step === 'payment' ? 'bg-blue-800 text-white' : 'bg-blue-800/50 text-white/60'}`}>
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
              <div className="bg-slate-800 border border-blue-700/50 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-white">Your Basket</h2>
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border border-blue-700/50 rounded-lg bg-slate-800">
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
                        <Link href={`/books/${item.book.id}`} className="hover:text-blue-300 transition-colors">
                          <h3 className="font-semibold cursor-pointer text-white text-sm sm:text-base line-clamp-2">{item.book.title}</h3>
                        </Link>
                        <p className="text-xs sm:text-sm text-white/90">£{item.book.price}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.book.id, Math.max(0, item.quantity - 1))}
                            className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-base sm:text-sm font-bold hover:bg-blue-700"
                          >
                            -
                          </button>
                          <span className="w-6 sm:w-8 text-center text-white text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-base sm:text-sm font-bold hover:bg-blue-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          className="text-red-400 hover:text-red-300 text-xs sm:text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 pt-4 border-t border-blue-700/50">
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span className="text-sm sm:text-base">Subtotal:</span>
                      <span className="text-sm sm:text-base font-medium">£{subtotal.toFixed(2)}</span>
                    </div>
                    {bulkDiscount > 0 && (
                      <div className="flex justify-between text-green-400 font-semibold">
                        <span className="text-xs sm:text-sm">Bulk Discount ({getBulkDiscountPercentage()}% off {totalItemsCount}+ books):</span>
                        <span className="text-xs sm:text-sm">-£{bulkDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-green-400">
                      <span className="text-sm sm:text-base">Shipping:</span>
                      <span className="text-sm sm:text-base font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-base sm:text-lg font-semibold border-t border-blue-700/50 pt-2 text-white">
                      <span>Total:</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                  </div>
                  {bulkDiscount > 0 && (
                    <p className="text-xs sm:text-sm text-green-400 mt-2">
                      🎉 You've saved £{bulkDiscount.toFixed(2)} with {getBulkDiscountPercentage()}% bulk discount!
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-white/80 mt-2">Free worldwide shipping included</p>
                  {totalItemsCount < 2 && (
                    <p className="text-xs sm:text-sm text-blue-200 mt-2">
                      Add 1 more book to unlock <strong>5% off</strong> your whole order.{' '}
                      <Link href="/books" className="underline hover:text-white">
                        Browse books
                      </Link>
                    </p>
                  )}
                  {totalItemsCount === 2 && (
                    <p className="text-xs sm:text-sm text-blue-200 mt-2">
                      Add 1 more book to unlock <strong>10% off</strong> your whole order.{' '}
                      <Link href="/books" className="underline hover:text-white">
                        Add one more title
                      </Link>
                    </p>
                  )}
                </div>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setStep('address')}
                    className="w-full bg-white text-slate-900 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base border border-slate-900"
                  >
                    Continue to Address
                  </button>
                  {savedProfile?.email && (
                    <button
                      onClick={handleSavedProfileExpressCheckout}
                      className="w-full bg-slate-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-700 transition-colors text-sm sm:text-base border border-white/50"
                    >
                      Use saved details and continue to payment
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === 'address' && (
              <div className="bg-slate-800 border border-blue-700/50 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-white">Shipping Address</h2>
                <div className="mb-4 rounded-lg border border-white/15 bg-slate-800/80 p-3 text-sm text-white/85">
                  <p className="font-semibold text-white">Guest checkout (fastest)</p>
                  <p className="text-white/70 text-xs sm:text-sm mt-1">
                    No account required. Enter your details once and check out securely.
                  </p>
                  {savedProfile?.email && (
                    <button
                      type="button"
                      onClick={applySavedProfile}
                      className="mt-2 text-blue-300 hover:text-blue-200 underline text-xs sm:text-sm"
                    >
                      Use saved details for {savedProfile.email}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1 text-white">First Name *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="First name"
                      value={customerDetails.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-blue-600 rounded-lg text-white bg-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1 text-white">Last Name *</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Last name"
                      value={customerDetails.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-blue-600 rounded-lg text-white bg-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={customerDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-blue-600 rounded-lg text-white bg-blue-900/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-white/50"
                    required
                  />
                </div>
                <div className="mt-3 sm:mt-4">
                  <label htmlFor="phone" className="block text-sm font-medium mb-1 text-white">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Optional phone number"
                    value={customerDetails.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-blue-600 rounded-lg text-white bg-blue-900/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-white/50"
                  />
                </div>
                <div className="mt-3 sm:mt-4">
                  <label htmlFor="address1" className="block text-sm font-medium mb-1 text-white">Address Line 1 *</label>
                  <input
                    id="address1"
                    name="address1"
                    type="text"
                    autoComplete="address-line1"
                    placeholder="Street address"
                    value={customerDetails.address1}
                    onChange={(e) => handleInputChange('address1', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-blue-600 rounded-lg text-white bg-blue-900/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-white/50"
                    required
                  />
                </div>
                <div className="mt-3 sm:mt-4">
                  <label htmlFor="address2" className="block text-sm font-medium mb-1 text-white">Address Line 2</label>
                  <input
                    id="address2"
                    name="address2"
                    type="text"
                    autoComplete="address-line2"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={customerDetails.address2}
                    onChange={(e) => handleInputChange('address2', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-blue-600 rounded-lg text-white bg-blue-900/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-white/50"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1 text-white">City *</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="City"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-blue-600 rounded-lg text-white bg-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postcode" className="block text-sm font-medium mb-1 text-white">Postcode *</label>
                    <input
                      id="postcode"
                      name="postcode"
                      type="text"
                      autoComplete="postal-code"
                      placeholder="Postcode"
                      value={customerDetails.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value)}
                      className="w-full p-2 sm:p-3 border border-blue-600 rounded-lg text-white bg-slate-800 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 placeholder:text-white/50"
                      required
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4">
                  <label htmlFor="country" className="block text-sm font-medium mb-1 text-white">Country *</label>
                  <select
                    id="country"
                    name="country"
                    title="Country"
                    aria-label="Country"
                    autoComplete="country-name"
                    value={customerDetails.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full p-2 sm:p-3 border border-white/55 rounded-lg text-white bg-slate-800 focus:border-white focus:ring-1 focus:ring-white/50"
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
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-900/50 border border-red-700 rounded-lg">
                    <ul className="text-red-200 text-xs sm:text-sm">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <label className="mt-4 flex items-start gap-2 text-xs sm:text-sm text-white/80">
                  <input
                    type="checkbox"
                    checked={saveDetailsForNextTime}
                    onChange={(e) => setSaveDetailsForNextTime(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-blue-500 bg-slate-800 text-blue-500"
                  />
                  Save my details on this device for faster guest checkout next time
                </label>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('basket')}
                    className="w-full bg-slate-800 text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-700 transition-colors text-sm sm:text-base border border-white/50"
                  >
                    Back to Basket
                  </button>
                  <button
                    onClick={handleAddressSubmit}
                    className="w-full bg-white text-slate-900 py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base border border-slate-900"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-slate-800 border border-blue-700/50 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-white">Payment Method</h2>
                <p className="text-xs sm:text-sm text-white/80 mb-4">
                  Your payment is encrypted and processed securely by Stripe or PayPal.
                </p>
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="mb-4 inline-flex items-center rounded-lg border border-white/50 bg-slate-800 px-3 py-2 text-xs sm:text-sm font-medium text-white hover:bg-slate-700 transition-colors"
                >
                  ← Back to Address
                </button>
                
                {/* Payment Method Selection */}
                <div className="mb-4 sm:mb-6">
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('stripe')}
                      className={`w-full p-3 sm:p-4 border rounded-lg text-left transition-colors ${
                        paymentMethod === 'stripe'
                          ? 'border-blue-500 bg-slate-800'
                          : 'border-blue-700/50 hover:border-blue-600 bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl sm:text-2xl mr-2 sm:mr-3">💳</span>
                        <div>
                          <div className="font-medium text-white text-sm sm:text-base">Credit or Debit Card</div>
                          <div className="text-xs sm:text-sm text-white/80">Visa, Mastercard, American Express, Apple Pay, Google Pay</div>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePaymentMethodSelect('paypal')}
                      className={`w-full p-3 sm:p-4 border rounded-lg text-left transition-colors ${
                        paymentMethod === 'paypal'
                          ? 'border-blue-500 bg-slate-800'
                          : 'border-blue-700/50 hover:border-blue-600 bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl sm:text-2xl mr-2 sm:mr-3">🔵</span>
                        <div>
                          <div className="font-medium text-white text-sm sm:text-base">PayPal</div>
                          <div className="text-xs sm:text-sm text-white/80">Pay with your PayPal account</div>
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
                      orderId={stripeReference}
                      items={items}
                      clientSecret={clientSecret}
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
                    <p className="text-xs sm:text-sm text-white/80 mt-2">
                      You'll be redirected to PayPal to complete your payment
                    </p>
                  </div>
                )}

                {errors.length > 0 && (
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-900/50 border border-red-700 rounded-lg">
                    <ul className="text-red-200 text-xs sm:text-sm">
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
              <div className="bg-slate-800 border border-blue-700/50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">Order Summary</h3>
              <div className="space-y-2 sm:space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <Link href={`/books/${item.book.id}`} className="text-xs sm:text-sm hover:text-blue-300 transition-colors text-white flex-1 pr-2 line-clamp-2">
                      {item.book.title} (x{item.quantity})
                    </Link>
                    <span className="text-xs sm:text-sm font-medium text-white flex-shrink-0">£{(item.book.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              {bulkDiscount > 0 && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-green-900/30 border border-green-700/50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2 text-sm">🎉</span>
                    <div className="text-xs sm:text-sm">
                      <p className="font-semibold text-green-400">Bulk Discount Applied!</p>
                      <p className="text-green-300">You've saved £{bulkDiscount.toFixed(2)} with {getBulkDiscountPercentage()}% discount</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="border-t border-blue-700/50 mt-3 sm:mt-4 pt-3 sm:pt-4 space-y-2">
                <div className="flex justify-between text-white">
                  <span className="text-xs sm:text-sm">Subtotal:</span>
                  <span className="text-xs sm:text-sm font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                {bulkDiscount > 0 && (
                  <div className="flex justify-between text-green-400 font-semibold">
                    <span className="text-xs">Bulk Discount ({getBulkDiscountPercentage()}% off {totalItemsCount}+ books):</span>
                    <span className="text-xs">-£{bulkDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white">
                  <span className="text-xs sm:text-sm">Shipping:</span>
                  <span className="text-xs sm:text-sm font-medium text-green-400">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-sm sm:text-lg text-white border-t border-blue-700/50 pt-2">
                  <span>Total:</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Security Notice */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-800 border border-blue-700/50 rounded-lg">
                <div className="flex items-start">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-xs sm:text-sm text-white font-medium">Secure Payment</p>
                    <p className="text-xs text-white/80 mt-1">
                      Your payment is protected by SSL encryption and processed securely by Stripe/PayPal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust & Security Badges are rendered globally via layout */}

            {/* Customer Testimonials (desktop only to reduce mobile checkout friction) */}
            <div className="mt-6 hidden lg:block">
              <CustomerTestimonials maxDisplay={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center text-white/80 space-y-2">
        <p className="text-lg font-semibold">Preparing checkout…</p>
        <p className="text-sm text-white/60">Loading your basket and available payment options.</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
