'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types/book';

interface EnhancedShippingSectionProps {
  book?: Book;
  totalWeight?: number;
  destination?: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  timeframe: string;
  cost: {
    uk: string;
    europe: string;
    international: string;
  };
  features: string[];
}

const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Royal Mail 2nd Class',
    icon: '📦',
    description: 'Standard delivery for books',
    timeframe: '2-4 working days',
    cost: {
      uk: '£1.95-£4.79',
      europe: '£3.85-£15.85',
      international: '£4.20-£18.85'
    },
    features: ['Tracking included', 'Compensation up to £100', 'Environmentally friendly']
  },
  {
    id: 'express',
    name: 'Royal Mail 1st Class',
    icon: '🚚',
    description: 'Faster delivery option',
    timeframe: '1-2 working days',
    cost: {
      uk: '£2.95-£6.79',
      europe: '£4.85-£18.85',
      international: '£5.20-£22.85'
    },
    features: ['Priority handling', 'Tracking included', 'Compensation up to £100']
  },
  {
    id: 'international',
    name: 'International Signed',
    icon: '✈️',
    description: 'Secure international delivery',
    timeframe: '5-10 working days',
    cost: {
      uk: 'N/A',
      europe: '£6.85-£22.85',
      international: '£7.20-£25.85'
    },
    features: ['Signature required', 'Full tracking', 'Compensation up to £500']
  }
];

export default function EnhancedShippingSection({ 
  book, 
  totalWeight = 300, 
  destination = 'UK' 
}: EnhancedShippingSectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('standard');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedCost, setCalculatedCost] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Calculate shipping cost based on weight and destination
  const calculateShipping = async (methodId: string) => {
    setIsCalculating(true);
    setErrors([]);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const method = shippingMethods.find(m => m.id === methodId);
      if (!method) {
        throw new Error('Shipping method not found');
      }
      
      let cost = '';
      switch (destination.toLowerCase()) {
        case 'uk':
          cost = method.cost.uk;
          break;
        case 'europe':
          cost = method.cost.europe;
          break;
        default:
          cost = method.cost.international;
      }
      
      setCalculatedCost(cost);
    } catch (error) {
      setErrors(['Unable to calculate shipping. Please try again.']);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    calculateShipping(selectedMethod);
  }, [selectedMethod, destination, totalWeight]);

  const getDestinationRegion = (dest: string) => {
    const destLower = dest.toLowerCase();
    if (destLower === 'uk') return 'uk';
    if (['france', 'germany', 'italy', 'spain', 'netherlands', 'belgium'].includes(destLower)) {
      return 'europe';
    }
    return 'international';
  };

  return (
    <div className="enhanced-shipping-section">
      {/* Header */}
      <div className="shipping-header">
        <h3 className="shipping-title">
          📦 Shipping Information
        </h3>
        <p className="shipping-subtitle">
          Fast, secure worldwide delivery with Royal Mail
        </p>
      </div>

      {/* Book Weight Display */}
      {book && (
        <div className="book-weight-display">
          <div className="weight-info">
            <span className="weight-label">Book Weight:</span>
            <span className="weight-value">{book.weight || totalWeight}g</span>
          </div>
          <div className="service-type">
            <span className="service-label">Service Type:</span>
            <span className="service-value">
              {(book.weight || totalWeight) <= 100 ? 'Large Letter' : 'Small Parcel'}
            </span>
          </div>
        </div>
      )}

      {/* Shipping Methods */}
      <div className="shipping-methods">
        <h4 className="methods-title">Available Shipping Methods</h4>
        
        <div className="methods-grid">
          {shippingMethods.map((method) => (
            <div
              key={method.id}
              className={`method-card ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => setSelectedMethod(method.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedMethod(method.id);
                }
              }}
              aria-label={`Select ${method.name} shipping method`}
            >
              <div className="method-header">
                <span className="method-icon" aria-hidden="true">{method.icon}</span>
                <div className="method-info">
                  <h5 className="method-name">{method.name}</h5>
                  <p className="method-description">{method.description}</p>
                </div>
                <div className="method-selection">
                  <div className={`radio-button ${selectedMethod === method.id ? 'checked' : ''}`}>
                    {selectedMethod === method.id && <div className="radio-dot"></div>}
                  </div>
                </div>
              </div>
              
              <div className="method-details">
                <div className="timeframe">
                  <span className="detail-label">Delivery:</span>
                  <span className="detail-value">{method.timeframe}</span>
                </div>
                
                <div className="cost-display">
                  <span className="detail-label">Cost:</span>
                  <span className="detail-value cost-value">
                    {getDestinationRegion(destination) === 'uk' && method.cost.uk}
                    {getDestinationRegion(destination) === 'europe' && method.cost.europe}
                    {getDestinationRegion(destination) === 'international' && method.cost.international}
                  </span>
                </div>
              </div>
              
              {/* Features */}
              <div className="method-features">
                {method.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    ✓ {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calculated Cost Display */}
      <div className="calculated-cost">
        <div className="cost-header">
          <h4 className="cost-title">Shipping Cost Calculation</h4>
          {isCalculating && (
            <div className="loading-indicator">
              <span className="loading-spinner"></span>
              Calculating...
            </div>
          )}
        </div>
        
        {!isCalculating && calculatedCost && (
          <div className="cost-result success">
            <div className="cost-summary">
              <span className="cost-label">Estimated Cost:</span>
              <span className="cost-amount">{calculatedCost}</span>
            </div>
            <div className="cost-details">
              <span>✓ Includes packaging and handling</span>
              <span>✓ VAT included where applicable</span>
            </div>
          </div>
        )}
        
        {errors.length > 0 && (
          <div className="cost-result error">
            <h5 className="error-title">⚠️ Calculation Error</h5>
            <ul className="error-list">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button 
              className="retry-button"
              onClick={() => calculateShipping(selectedMethod)}
              aria-label="Retry shipping calculation"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="shipping-additional">
        <button
          className="details-toggle"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
          aria-controls="shipping-details"
        >
          {showDetails ? '▼' : '▶'} Additional Shipping Information
        </button>
        
        {showDetails && (
          <div id="shipping-details" className="details-content">
            <div className="detail-section">
              <h5>📍 Delivery Areas</h5>
              <ul>
                <li><strong>UK:</strong> England, Scotland, Wales, Northern Ireland</li>
                <li><strong>Europe:</strong> EU countries, Norway, Switzerland</li>
                <li><strong>International:</strong> USA, Canada, Australia, Rest of World</li>
              </ul>
            </div>
            
            <div className="detail-section">
              <h5>📋 Important Notes</h5>
              <ul>
                <li>Delivery times are estimates and may vary</li>
                <li>Remote areas may require additional delivery time</li>
                <li>Customs duties may apply for international orders</li>
                <li>We dispatch orders within 24 hours (Monday-Friday)</li>
              </ul>
            </div>
            
            <div className="detail-section">
              <h5>🔒 Security & Insurance</h5>
              <ul>
                <li>All packages are tracked and insured</li>
                <li>Signature required for high-value items</li>
                <li>Full refund if package is lost or damaged</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .enhanced-shipping-section {
          background-color: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          margin: 16px 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .shipping-header {
          text-align: center;
          margin-bottom: 24px;
          border-bottom: 2px solid #f1f5f9;
          padding-bottom: 16px;
        }
        
        .shipping-title {
          font-size: 24px;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 8px;
        }
        
        .shipping-subtitle {
          font-size: 16px;
          color: #64748b;
          margin: 0;
        }
        
        .book-weight-display {
          background-color: #dbeafe;
          border: 1px solid #93c5fd;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .weight-info, .service-type {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .weight-label, .service-label {
          font-weight: 600;
          color: #1e40af;
        }
        
        .weight-value, .service-value {
          font-weight: 700;
          color: #1d4ed8;
          background-color: #ffffff;
          padding: 4px 12px;
          border-radius: 6px;
          border: 1px solid #93c5fd;
        }
        
        .shipping-methods {
          margin-bottom: 24px;
        }
        
        .methods-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16px;
        }
        
        .methods-grid {
          display: grid;
          gap: 16px;
        }
        
        .method-card {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          background-color: #ffffff;
        }
        
        .method-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }
        
        .method-card.selected {
          border-color: #2563eb;
          background-color: #eff6ff;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }
        
        .method-card:focus {
          outline: 3px solid #f59e0b;
          outline-offset: 2px;
        }
        
        .method-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .method-icon {
          font-size: 32px;
          line-height: 1;
        }
        
        .method-info {
          flex: 1;
        }
        
        .method-name {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 4px 0;
        }
        
        .method-description {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }
        
        .method-selection {
          margin-left: auto;
        }
        
        .radio-button {
          width: 24px;
          height: 24px;
          border: 2px solid #d1d5db;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .radio-button.checked {
          border-color: #2563eb;
          background-color: #ffffff;
        }
        
        .radio-dot {
          width: 12px;
          height: 12px;
          background-color: #2563eb;
          border-radius: 50%;
        }
        
        .method-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        
        .detail-label {
          font-weight: 600;
          color: #374151;
        }
        
        .detail-value {
          color: #1f2937;
        }
        
        .cost-value {
          font-weight: 700;
          color: #059669;
        }
        
        .method-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .feature-tag {
          background-color: #dcfce7;
          color: #166534;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid #bbf7d0;
        }
        
        .calculated-cost {
          background-color: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
        }
        
        .cost-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .cost-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }
        
        .loading-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 14px;
        }
        
        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #e5e7eb;
          border-top: 2px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .cost-result {
          padding: 16px;
          border-radius: 8px;
          border: 2px solid;
        }
        
        .cost-result.success {
          background-color: #f0fdf4;
          border-color: #22c55e;
          color: #15803d;
        }
        
        .cost-result.error {
          background-color: #fef2f2;
          border-color: #ef4444;
          color: #dc2626;
        }
        
        .cost-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .cost-label {
          font-weight: 600;
        }
        
        .cost-amount {
          font-size: 20px;
          font-weight: 700;
        }
        
        .cost-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 14px;
        }
        
        .error-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }
        
        .error-list {
          margin: 0 0 12px 0;
          padding-left: 20px;
        }
        
        .retry-button {
          background-color: #dc2626;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s ease;
        }
        
        .retry-button:hover {
          background-color: #b91c1c;
        }
        
        .shipping-additional {
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }
        
        .details-toggle {
          background: none;
          border: none;
          color: #2563eb;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 0;
          transition: color 0.2s ease;
          width: 100%;
          text-align: left;
        }
        
        .details-toggle:hover {
          color: #1d4ed8;
        }
        
        .details-content {
          margin-top: 16px;
          padding: 16px;
          background-color: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .detail-section {
          margin-bottom: 20px;
        }
        
        .detail-section:last-child {
          margin-bottom: 0;
        }
        
        .detail-section h5 {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }
        
        .detail-section ul {
          margin: 0;
          padding-left: 20px;
          color: #374151;
        }
        
        .detail-section li {
          margin-bottom: 4px;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .enhanced-shipping-section {
            padding: 16px;
            margin: 8px 0;
          }
          
          .book-weight-display {
            flex-direction: column;
            align-items: stretch;
          }
          
          .weight-info, .service-type {
            justify-content: space-between;
          }
          
          .method-details {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          
          .cost-summary {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .method-card {
            border-width: 3px;
          }
          
          .method-card.selected {
            border-width: 4px;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .method-card,
          .loading-spinner,
          .retry-button {
            transition: none;
            animation: none;
          }
          
          .method-card:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}