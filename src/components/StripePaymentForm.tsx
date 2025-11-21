'use client';

import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import type { PaymentRequest } from '@stripe/stripe-js';
import { stripeConfig, getStripeErrorMessage, formatCurrency, convertToStripeAmount } from '../config/stripe';
import { Book } from '../types/book';

interface StripePaymentFormProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  onCancel: () => void;
  customerEmail?: string;
  orderId?: string;
  items?: Array<{ book: Book; quantity: number }>;
  clientSecret: string;
}

export default function StripePaymentForm({
  amount,
  currency = 'GBP',
  onSuccess,
  onError,
  onCancel,
  customerEmail,
  orderId,
  items = [],
  clientSecret
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  const isWalletSelected = paymentMethod === 'applePay' || paymentMethod === 'googlePay';

  // Format amount for display
  const formattedAmount = formatCurrency(convertToStripeAmount(amount), currency);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Confirm the payment
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-complete?orderId=${orderId}`,
          payment_method_data: {
            billing_details: {
              email: customerEmail,
            },
          },
        },
        redirect: 'if_required',
      });

      if (submitError) {
        setError(getStripeErrorMessage(submitError));
        onError(getStripeErrorMessage(submitError));
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        onSuccess(paymentIntent);
      } else if (paymentIntent && paymentIntent.status === 'requires_action') {
        // Payment requires additional authentication
        const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.client_secret!);
        if (confirmError) {
          setError(getStripeErrorMessage(confirmError));
          onError(getStripeErrorMessage(confirmError));
        } else {
          onSuccess(paymentIntent);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setError(null);
  };

  useEffect(() => {
    if (!stripe || !clientSecret) {
      setPaymentRequest(null);
      return;
    }

    const paymentRequestInstance = stripe.paymentRequest({
      country: 'GB',
      currency: currency.toLowerCase(),
      total: {
        label: 'Charles E. MacKay Aviation Books',
        amount: convertToStripeAmount(amount)
      },
      requestPayerName: true,
      requestPayerEmail: true
    });

    let isMounted = true;

    paymentRequestInstance.canMakePayment().then(result => {
      if (!isMounted) return;
      if (result) {
        setPaymentRequest(paymentRequestInstance);
      } else {
        setPaymentRequest(null);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [stripe, currency, amount, clientSecret]);

  useEffect(() => {
    if (!paymentRequest || !stripe || !clientSecret) {
      return;
    }

    const handlePaymentMethodEvent = async (event: any) => {
      setIsProcessing(true);
      setError(null);
      try {
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: event.paymentMethod.id
          },
          { handleActions: false }
        );

        if (confirmError) {
          const message = getStripeErrorMessage(confirmError);
          event.complete('fail');
          setError(message);
          onError(message);
          return;
        }

        event.complete('success');

        if (paymentIntent?.status === 'requires_action') {
          const { error: actionError, paymentIntent: resolvedIntent } = await stripe.confirmCardPayment(clientSecret);
          if (actionError) {
            const message = getStripeErrorMessage(actionError);
            setError(message);
            onError(message);
          } else {
            onSuccess(resolvedIntent ?? paymentIntent);
          }
        } else if (paymentIntent) {
          onSuccess(paymentIntent);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Apple/Google Pay failed.';
        event.complete('fail');
        setError(message);
        onError(message);
      } finally {
        setIsProcessing(false);
      }
    };

    paymentRequest.on('paymentmethod', handlePaymentMethodEvent);
    return () => {
      paymentRequest.off('paymentmethod', handlePaymentMethodEvent);
    };
  }, [paymentRequest, stripe, clientSecret, onSuccess, onError]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Payment Method Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Choose Payment Method</h3>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handlePaymentMethodChange('card')}
            className={`w-full p-4 border rounded-lg text-left transition-colors ${
              paymentMethod === 'card'
                ? 'border-blue-500 bg-slate-800'
                : 'border-blue-700/50 hover:border-blue-600 bg-slate-800'
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">💳</span>
              <div>
                <div className="font-medium text-white">Credit or Debit Card</div>
                <div className="text-sm text-white/80">Visa, Mastercard, American Express</div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handlePaymentMethodChange('applePay')}
            className={`w-full p-4 border rounded-lg text-left transition-colors ${
              paymentMethod === 'applePay'
                ? 'border-blue-500 bg-slate-800'
                : 'border-blue-700/50 hover:border-blue-600 bg-slate-800'
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">🍎</span>
              <div>
                <div className="font-medium text-white">Apple Pay</div>
                <div className="text-sm text-white/80">Quick and secure payment</div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handlePaymentMethodChange('googlePay')}
            className={`w-full p-4 border rounded-lg text-left transition-colors ${
              paymentMethod === 'googlePay'
                ? 'border-blue-500 bg-slate-800'
                : 'border-blue-700/50 hover:border-blue-600 bg-slate-800'
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">🤖</span>
              <div>
                <div className="font-medium text-white">Google Pay</div>
                <div className="text-sm text-white/80">Fast and secure payment</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Summary */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h4 className="font-semibold text-white mb-3">Order Summary</h4>
          <div className="space-y-2 text-sm text-white">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.book.title} (x{item.quantity})</span>
                <span>£{(item.book.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-blue-700/50 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formattedAmount}</span>
            </div>
          </div>
        </div>

        {/* Payment Element or Wallet */}
        {paymentMethod === 'card' && (
          <div className="border border-blue-700/50 rounded-lg p-4 bg-slate-800">
            <PaymentElement
              options={{
                layout: 'tabs',
                defaultValues: {
                  billingDetails: {
                    email: customerEmail
                  }
                }
              }}
            />
          </div>
        )}

        {(paymentMethod === 'applePay' || paymentMethod === 'googlePay') && (
          <div className="border border-blue-700/50 rounded-lg p-4 bg-slate-800">
            {paymentRequest ? (
              <PaymentRequestButtonElement
                options={{
                  paymentRequest,
                  style: {
                    paymentRequestButton: {
                      theme: 'dark',
                      height: '48px',
                      type: paymentMethod === 'applePay' ? 'buy' : 'default'
                    }
                  }
                }}
              />
            ) : (
              <div className="text-white text-sm">
                <p className="font-medium">Apple Pay / Google Pay unavailable</p>
                <p className="text-white/70">
                  Wallet checkout requires a compatible browser and a saved card. Please try again on a supported
                  device or choose the secure card option above.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-slate-800 border border-blue-700/50 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-white">
                Your payment is secured by Stripe. We never store your card details.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border border-blue-600 rounded-lg text-white font-medium hover:bg-blue-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || isProcessing || isWalletSelected}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isWalletSelected ? (
              'Use wallet button above'
            ) : isProcessing ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              `Pay ${formattedAmount}`
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
