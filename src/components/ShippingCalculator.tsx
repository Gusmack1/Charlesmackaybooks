'use client';

import { useState } from 'react';
import { Book } from '@/types/book';

interface ShippingCalculatorProps {
  book: Book;
  className?: string;
}

export default function ShippingCalculator({ book, className = '' }: ShippingCalculatorProps) {
  const [selectedCountry, setSelectedCountry] = useState('GB');
  
  const calculateShipping = (weight: number, country: string) => {
    // Royal Mail pricing based on weight and destination
    if (country === 'GB') {
      // UK Domestic (1st Class)
      if (weight <= 100) return { cost: 1.95, service: 'Large Letter (1st Class)' };
      if (weight <= 250) return { cost: 2.95, service: 'Large Letter (1st Class)' };
      if (weight <= 500) return { cost: 4.45, service: 'Large Letter (1st Class)' };
      if (weight <= 1000) return { cost: 4.79, service: 'Small Parcel (1st Class)' };
      if (weight <= 2000) return { cost: 4.79, service: 'Small Parcel (1st Class)' };
      return { cost: 6.50, service: 'Standard Parcel (1st Class)' };
    } else if (['FR', 'DE', 'NL', 'BE', 'ES', 'IT', 'IE', 'AT', 'DK', 'FI', 'NO', 'SE', 'CH', 'PT', 'GR', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'EE', 'LV', 'LT', 'MT', 'CY', 'LU'].includes(country)) {
      // Europe
      if (weight <= 100) return { cost: 3.85, service: 'Large Letter (International)' };
      if (weight <= 250) return { cost: 5.95, service: 'Large Letter (International)' };
      if (weight <= 500) return { cost: 8.95, service: 'Large Letter (International)' };
      if (weight <= 1000) return { cost: 15.85, service: 'Small Parcel (International)' };
      if (weight <= 2000) return { cost: 15.85, service: 'Small Parcel (International)' };
      return { cost: 25.00, service: 'Standard Parcel (International)' };
    } else {
      // Rest of World
      if (weight <= 100) return { cost: 4.20, service: 'Large Letter (International)' };
      if (weight <= 250) return { cost: 6.95, service: 'Large Letter (International)' };
      if (weight <= 500) return { cost: 10.95, service: 'Large Letter (International)' };
      if (weight <= 1000) return { cost: 18.85, service: 'Small Parcel (International)' };
      if (weight <= 2000) return { cost: 18.85, service: 'Small Parcel (International)' };
      return { cost: 30.00, service: 'Standard Parcel (International)' };
    }
  };

  const bookWeight = (book as any).weight || 300;
  const shipping = calculateShipping(bookWeight, selectedCountry);

  const countries = [
    { code: 'GB', name: 'United Kingdom' },
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'IE', name: 'Ireland' },
    { code: 'AT', name: 'Austria' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' },
    { code: 'NO', name: 'Norway' },
    { code: 'SE', name: 'Sweden' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'PT', name: 'Portugal' },
    { code: 'GR', name: 'Greece' },
    { code: 'PL', name: 'Poland' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'HU', name: 'Hungary' },
    { code: 'RO', name: 'Romania' },
    { code: 'BG', name: 'Bulgaria' },
    { code: 'HR', name: 'Croatia' },
    { code: 'SI', name: 'Slovenia' },
    { code: 'SK', name: 'Slovakia' },
    { code: 'EE', name: 'Estonia' },
    { code: 'LV', name: 'Latvia' },
    { code: 'LT', name: 'Lithuania' },
    { code: 'MT', name: 'Malta' },
    { code: 'CY', name: 'Cyprus' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'worldwide', name: 'Other Countries' }
  ];

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <h4 className="font-semibold text-blue-800 mb-3">📦 Shipping Calculator</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-1">
            Destination Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full border border-blue-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-md p-3 border border-blue-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Book Weight:</span>
            <span className="font-medium">{bookWeight}g</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Service:</span>
            <span className="text-sm font-medium text-blue-700">{shipping.service}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Shipping Cost:</span>
            <span className="font-bold text-lg text-green-600">£{shipping.cost.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-xs text-blue-600 text-center">
          📮 Royal Mail • 3-5 working days (UK) • 5-7 working days (International)
        </div>
      </div>
    </div>
  );
} 