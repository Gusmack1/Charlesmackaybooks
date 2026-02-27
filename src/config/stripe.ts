import { loadStripe } from '@stripe/stripe-js';
import { SITE_CONSTANTS } from './constants';

// Stripe configuration for Charles Mackay Books
export const stripeConfig = {
  // Use environment variable for Stripe publishable key with fallback
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  
  // Currency and locale settings
  currency: 'gbp',
  locale: 'en-GB',
  
  // Business information
  businessName: 'Charles E. MacKay Aviation Books',
  businessEmail: SITE_CONSTANTS.AUTHOR_EMAIL,
  
  // Payment method settings
  paymentMethods: {
    card: true,
    applePay: true,
    googlePay: true,
    sepaDebit: false, // EU bank transfers
    ideal: false, // Netherlands
    sofort: false, // Germany
    bancontact: false, // Belgium
  },
  
  // Shipping settings
  shipping: {
    freeShipping: true,
    shippingCountries: ['GB', 'US', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE'],
    defaultCountry: 'GB'
  },
  
  // Tax settings
  tax: {
    vatRate: 0.20, // 20% UK VAT
    includeVAT: true,
    taxIncluded: true
  }
};

// Initialize Stripe only if we have a publishable key
export const stripePromise = stripeConfig.publishableKey 
  ? loadStripe(stripeConfig.publishableKey)
  : Promise.resolve(null);

// Stripe Elements options
export const stripeElementsOptions = {
  mode: 'payment',
  currency: stripeConfig.currency,
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#1f2937',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#dc2626',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Tab': {
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      '.Tab:hover': {
        color: '#1f2937',
        border: '1px solid #1f2937',
      },
      '.Tab--selected': {
        border: '1px solid #1f2937',
        color: '#1f2937',
      },
      '.Input': {
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px 16px',
      },
      '.Input:focus': {
        border: '1px solid #1f2937',
        boxShadow: '0 0 0 1px #1f2937',
      },
    },
  },
};

// Payment method configuration
export const paymentMethodConfig = {
  card: {
    name: 'Credit or Debit Card',
    icon: '💳',
    description: 'Visa, Mastercard, American Express',
    enabled: true,
  },
  paypal: {
    name: 'PayPal',
    icon: '🔵',
    description: 'Pay with your PayPal account',
    enabled: true,
  },
  applePay: {
    name: 'Apple Pay',
    icon: '🍎',
    description: 'Quick and secure payment',
    enabled: true,
  },
  googlePay: {
    name: 'Google Pay',
    icon: '🤖',
    description: 'Fast and secure payment',
    enabled: true,
  },
  bankTransfer: {
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'Direct bank transfer',
    enabled: false, // Enable if you want to offer bank transfers
  },
};

// Error messages for Stripe
export const stripeErrorMessages = {
  'card_declined': 'Your card was declined. Please try a different card.',
  'expired_card': 'Your card has expired. Please use a different card.',
  'incorrect_cvc': 'Your card\'s security code is incorrect.',
  'processing_error': 'An error occurred while processing your card. Please try again.',
  'insufficient_funds': 'Your card has insufficient funds.',
  'invalid_expiry_month': 'Your card\'s expiration month is invalid.',
  'invalid_expiry_year': 'Your card\'s expiration year is invalid.',
  'invalid_number': 'Your card number is invalid.',
  'invalid_cvc': 'Your card\'s security code is invalid.',
  'card_error': 'Your card was declined. Please try a different card.',
  'validation_error': 'Please check your card details and try again.',
  'rate_limit': 'Too many requests made to the API too quickly.',
  'invalid_request': 'Invalid parameters were supplied to Stripe\'s API.',
  'authentication_error': 'Authentication with Stripe\'s API failed.',
  'api_connection_error': 'Network communication with Stripe failed.',
  'api_error': 'An error occurred internally with Stripe\'s API.',
  'unknown': 'An unknown error occurred. Please try again.',
};

// Helper function to get error message
export const getStripeErrorMessage = (error: any): string => {
  if (error?.type === 'card_error' || error?.type === 'validation_error') {
    return stripeErrorMessages[error.code as keyof typeof stripeErrorMessages] || stripeErrorMessages.unknown;
  }
  return stripeErrorMessages.unknown;
};

// Helper function to format currency
export const formatCurrency = (amount: number, currency: string = 'GBP'): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100); // Stripe amounts are in pence/cents
};

// Helper function to convert price to Stripe amount (pence)
export const convertToStripeAmount = (price: number): number => {
  return Math.round(price * 100);
};

// Helper function to convert Stripe amount to price (pounds)
export const convertFromStripeAmount = (amount: number): number => {
  return amount / 100;
};
