'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface ShippingRates {
  [key: string]: number;
}

const shippingRates: ShippingRates = {
  GB: 0,
  FR: 0,
  DE: 0,
  NL: 0,
  BE: 0,
  ES: 0,
  IT: 0,
  US: 0,
  CA: 0,
  AU: 0,
  worldwide: 0
};

const euCountries = ['FR', 'DE', 'NL', 'BE', 'ES', 'IT', 'AT', 'PT', 'IE', 'DK', 'SE', 'FI', 'PL', 'CZ', 'HU', 'SK', 'SI', 'HR', 'EE', 'LV', 'LT', 'LU', 'MT', 'CY', 'BG', 'RO'];

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
}

interface OrderFormProps {
  onSubmit: (customerDetails: CustomerDetails, shippingCost: number, orderId: string) => void;
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const { items, getTotalPrice } = useCart();
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

  const calculateShipping = (country: string): number => 0;

  const generateOrderId = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CM-${timestamp}-${random}`;
  };

  const shippingCost = calculateShipping(customerDetails.country);
  const subtotal = getTotalPrice();
  const total = subtotal + 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = generateOrderId();
    onSubmit(customerDetails, shippingCost, orderId);
  };

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-secondary">Your basket is empty. Add some books to continue.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Shipping Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              First Name *
            </label>
            <input
              type="text"
              required
              value={customerDetails.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={customerDetails.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={customerDetails.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={customerDetails.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary mb-1">
              Address Line 1 *
            </label>
            <input
              type="text"
              required
              value={customerDetails.address1}
              onChange={(e) => handleInputChange('address1', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              value={customerDetails.address2}
              onChange={(e) => handleInputChange('address2', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              City *
            </label>
            <input
              type="text"
              required
              value={customerDetails.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              Postcode/ZIP *
            </label>
            <input
              type="text"
              required
              value={customerDetails.postcode}
              onChange={(e) => handleInputChange('postcode', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary mb-1">
              Country *
            </label>
            <select
              required
              value={customerDetails.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-blue"
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
        </div>
      </div>

      {/* Order Summary */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-4 text-primary">Order Summary</h2>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} books)</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-accent-green">
            <span>Shipping to {customerDetails.country === 'GB' ? 'UK' : customerDetails.country}</span>
            <span>FREE</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full badge badge-blue py-3 px-4 rounded-lg font-semibold"
        >
          Proceed to PayPal Payment
        </button>
      </div>
    </form>
  );
}
