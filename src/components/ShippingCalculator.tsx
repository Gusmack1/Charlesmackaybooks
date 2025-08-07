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
    return { cost: 0, service: 'FREE Worldwide Shipping' };
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
    <div className={`card-compact bg-accent-blue text-white rounded-lg p-4 ${className}`}>
      <h4 className="font-semibold text-white mb-3">📦 Shipping Information</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-white/90 mb-1">
            Destination Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full border border-white/30 bg-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white/10 rounded-md p-3 border border-white/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/90">Book Weight:</span>
            <span className="font-medium text-white">{bookWeight}g</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/90">Service:</span>
            <span className="text-sm font-medium text-white">{shipping.service}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-white/90">Shipping Cost:</span>
            <span className="font-bold text-lg text-white">FREE</span>
          </div>
        </div>

        <div className="text-xs text-white/90 text-center">
          📮 FREE Worldwide Shipping • Royal Mail Tracked
        </div>
      </div>
    </div>
  );
} 