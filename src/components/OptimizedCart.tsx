'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Book } from '@/types/book';

interface OptimizedCartProps {
  className?: string;
  showProgressIndicator?: boolean;
  showUpsells?: boolean;
  showAbandonmentPrevention?: boolean;
}

export default function OptimizedCart({
  className = '',
  showProgressIndicator = true,
  showUpsells = true,
  showAbandonmentPrevention = true
}: OptimizedCartProps) {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getShippingCost,
    getFinalTotal,
    getBulkDiscount
  } = useCart();

  const [isVisible, setIsVisible] = useState(false);
  const [abandonmentTimer, setAbandonmentTimer] = useState<number | null>(null);
  const [showAbandonmentModal, setShowAbandonmentModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Cart abandonment prevention
  useEffect(() => {
    if (showAbandonmentPrevention && cart.length > 0) {
      // Start abandonment timer when items are in cart
      const timer = setTimeout(() => {
        setShowAbandonmentModal(true);
      }, 5 * 60 * 1000); // 5 minutes

      setAbandonmentTimer(timer);

      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [cart.length, showAbandonmentPrevention]);

  // Progress calculation
  const progress = {
    step1: cart.length > 0,
    step2: getTotalPrice() > 50, // Free shipping threshold
    step3: getTotalPrice() > 100, // Bulk discount threshold
    step4: false // Completed purchase
  };

  const progressPercentage = Object.values(progress).filter(Boolean).length * 25;

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className={`optimized-cart ${className}`}>
      {/* Progress Indicator */}
      {showProgressIndicator && (
        <CartProgressIndicator 
          progress={progressPercentage}
          currentStep={currentStep}
          goals={[
            { threshold: 0, message: "Start your collection", achieved: progress.step1 },
            { threshold: 50, message: "Free UK shipping", achieved: progress.step2 },
            { threshold: 100, message: "10% bulk discount", achieved: progress.step3 },
            { threshold: 200, message: "Free worldwide shipping", achieved: false }
          ]}
        />
      )}

      {/* Cart Items */}
      <div className="cart-items">
        <h3 className="cart-title">Your Aviation Library ({cart.length} {cart.length === 1 ? 'book' : 'books'})</h3>
        
        {cart.map((item, index) => (
          <CartItem
            key={`${item.book.id}-${index}`}
            item={item}
            onUpdateQuantity={(quantity) => updateQuantity(item.book.id, quantity)}
            onRemove={() => removeFromCart(item.book.id)}
          />
        ))}
      </div>

      {/* Cart Summary */}
      <CartSummary />

      {/* Upsells and Cross-sells */}
      {showUpsells && cart.length > 0 && (
        <CartUpsells currentItems={cart.map(item => item.book)} />
      )}

      {/* Urgency and Scarcity */}
      <UrgencyIndicators />

      {/* Trust Signals */}
      <CartTrustSignals />

      {/* Abandonment Prevention Modal */}
      {showAbandonmentModal && (
        <AbandonmentModal 
          onClose={() => setShowAbandonmentModal(false)}
          cartValue={getTotalPrice()}
        />
      )}

      <style jsx>{`
        .optimized-cart {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 0 auto;
        }
        
        .cart-title {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .cart-items {
          margin-bottom: 24px;
        }
        
        @media (max-width: 768px) {
          .optimized-cart {
            padding: 16px;
            margin: 0 8px;
          }
        }
      `}</style>
    </div>
  );
}

function CartProgressIndicator({ 
  progress, 
  currentStep, 
  goals 
}: { 
  progress: number; 
  currentStep: number;
  goals: Array<{ threshold: number; message: string; achieved: boolean }>;
}) {
  return (
    <div className="progress-indicator">
      <h4 className="progress-title">Your Progress</h4>
      
      <div className="progress-bar">
        {(() => {
          const rounded = Math.max(0, Math.min(100, Math.round(progress / 10) * 10));
          return (
            <div 
              className="progress-fill"
              data-progress={`${rounded}`}
            />
          );
        })()}
      </div>
      
      <div className="progress-goals">
        {goals.map((goal, index) => (
          <div 
            key={index} 
            className={`progress-goal ${goal.achieved ? 'achieved' : ''}`}
          >
            <div className="goal-icon">
              {goal.achieved ? '✅' : '🎯'}
            </div>
            <span className="goal-message">{goal.message}</span>
            {goal.threshold > 0 && (
              <span className="goal-threshold">£{goal.threshold}+</span>
            )}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .progress-indicator {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid #7dd3fc;
        }
        
        .progress-title {
          font-size: 16px;
          font-weight: 600;
          color: #0c4a6e;
          margin-bottom: 12px;
          text-align: center;
        }
        
        .progress-bar {
          height: 8px;
          background: #e0f2fe;
          border-radius: 4px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #0ea5e9 0%, #0284c7 100%);
          border-radius: 4px;
          transition: width 0.5s ease;
          width: 0%;
        }
        .progress-fill[data-progress="0"] { width: 0%; }
        .progress-fill[data-progress="10"] { width: 10%; }
        .progress-fill[data-progress="20"] { width: 20%; }
        .progress-fill[data-progress="30"] { width: 30%; }
        .progress-fill[data-progress="40"] { width: 40%; }
        .progress-fill[data-progress="50"] { width: 50%; }
        .progress-fill[data-progress="60"] { width: 60%; }
        .progress-fill[data-progress="70"] { width: 70%; }
        .progress-fill[data-progress="80"] { width: 80%; }
        .progress-fill[data-progress="90"] { width: 90%; }
        .progress-fill[data-progress="100"] { width: 100%; }
        
        .progress-goals {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .progress-goal {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }
        
        .progress-goal.achieved {
          background: #dcfce7;
          border: 1px solid #bbf7d0;
        }
        
        .goal-icon {
          font-size: 16px;
        }
        
        .goal-message {
          flex: 1;
          color: #374151;
          font-size: 14px;
          font-weight: 500;
        }
        
        .goal-threshold {
          color: #6b7280;
          font-size: 12px;
          font-weight: 600;
        }
        
        .progress-goal.achieved .goal-message {
          color: #16a34a;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function CartItem({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: { 
  item: { book: Book; quantity: number }; 
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 300);
  };

  return (
    <div className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      <div className="item-image">
        <img 
          src={item.book.imageUrl || `/book-covers/${item.book.id}.jpg`}
          alt={item.book.title}
          loading="lazy"
        />
      </div>
      
      <div className="item-details">
        <h4 className="item-title">{item.book.title}</h4>
        <p className="item-author">by {item.book.author}</p>
        <div className="item-meta">
          <span className="item-weight">{item.book.weight || 300}g</span>
          <span className="item-category">{item.book.category}</span>
        </div>
        
        <div className="item-controls">
          <div className="quantity-controls">
            <button 
              className="quantity-btn"
              onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button 
              className="quantity-btn"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button 
            className="remove-btn"
            onClick={handleRemove}
            title="Remove from cart"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="item-price">
        <span className="item-total">£{(item.book.price * item.quantity).toFixed(2)}</span>
        {item.quantity > 1 && (
          <span className="item-unit-price">£{item.book.price.toFixed(2)} each</span>
        )}
      </div>
      
      <style jsx>{`
        .cart-item {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .cart-item.removing {
          opacity: 0;
          transform: translateX(-100%);
        }
        
        .cart-item:last-child {
          border-bottom: none;
        }
        
        .item-image {
          width: 60px;
          height: 90px;
          border-radius: 6px;
          overflow: hidden;
        }
        
        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .item-details {
          min-width: 0;
        }
        
        .item-title {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }
        
        .item-author {
          font-size: 12px;
          color: #6b7280;
          margin: 0 0 8px 0;
        }
        
        .item-meta {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }
        
        .item-weight,
        .item-category {
          font-size: 11px;
          color: #6b7280;
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 4px;
        }
        
        .item-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          border-radius: 6px;
          padding: 4px;
        }
        
        .quantity-btn {
          width: 24px;
          height: 24px;
          border: none;
          background: #e5e7eb;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #374151;
          transition: all 0.2s ease;
        }
        
        .quantity-btn:hover:not(:disabled) {
          background: #d1d5db;
        }
        
        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .quantity-display {
          min-width: 20px;
          text-align: center;
          font-weight: 600;
          color: #1f2937;
        }
        
        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .remove-btn:hover {
          background: #fef2f2;
        }
        
        .item-price {
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .item-total {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
        }
        
        .item-unit-price {
          font-size: 11px;
          color: #6b7280;
          margin-top: 2px;
        }
        
        @media (max-width: 640px) {
          .cart-item {
            grid-template-columns: 50px 1fr auto;
            gap: 8px;
          }
          
          .item-image {
            width: 50px;
            height: 75px;
          }
          
          .item-title {
            font-size: 13px;
          }
          
          .item-controls {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}

function CartSummary() {
  const {
    getTotalPrice,
    getShippingCost,
    getFinalTotal,
    getBulkDiscount
  } = useCart();

  const subtotal = getTotalPrice();
  const discount = getBulkDiscount();
  const shipping = getShippingCost();
  const finalTotal = getFinalTotal();

  return (
    <div className="cart-summary">
      <div className="summary-row">
        <span className="summary-label">Subtotal</span>
        <span className="summary-value">£{subtotal.toFixed(2)}</span>
      </div>
      
      {discount > 0 && (
        <div className="summary-row discount">
          <span className="summary-label">
            Bulk Discount ({Math.round((discount / subtotal) * 100)}%)
          </span>
          <span className="summary-value">-£{discount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="summary-row">
        <span className="summary-label">Shipping</span>
        <span className="summary-value">
          {shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}
        </span>
      </div>
      
      <div className="summary-row total">
        <span className="summary-label">Total</span>
        <span className="summary-value">£{finalTotal.toFixed(2)}</span>
      </div>
      
      <style jsx>{`
        .cart-summary {
          border-top: 2px solid #e5e7eb;
          padding-top: 16px;
          margin-bottom: 24px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }
        
        .summary-row.discount {
          color: #059669;
        }
        
        .summary-row.total {
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
          margin-top: 8px;
          font-weight: 700;
          font-size: 18px;
        }
        
        .summary-label {
          color: #374151;
        }
        
        .summary-value {
          color: #1f2937;
          font-weight: 600;
        }
        
        .summary-row.discount .summary-value {
          color: #059669;
        }
        
        .summary-row.total .summary-label,
        .summary-row.total .summary-value {
          color: #1f2937;
        }
      `}</style>
    </div>
  );
}

function CartUpsells({ currentItems }: { currentItems: Book[] }) {
  // Mock related books based on current cart items
  const relatedBooks = [
    {
      id: 'related-1',
      title: 'Scottish Aviation Heritage',
      price: 24.99,
      imageUrl: '/book-covers/scottish-heritage.jpg'
    },
    {
      id: 'related-2', 
      title: 'RAF Test Pilots Memoir',
      price: 19.99,
      imageUrl: '/book-covers/test-pilots.jpg'
    }
  ];

  return (
    <div className="cart-upsells">
      <h4 className="upsells-title">📚 Complete Your Collection</h4>
      <p className="upsells-subtitle">Readers who bought these books also purchased:</p>
      
      <div className="upsells-grid">
        {relatedBooks.map(book => (
          <div key={book.id} className="upsell-item">
            <img 
              src={book.imageUrl}
              alt={book.title}
              className="upsell-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/book-covers/placeholder.jpg';
              }}
            />
            <div className="upsell-details">
              <h5 className="upsell-title">{book.title}</h5>
              <p className="upsell-price">£{book.price.toFixed(2)}</p>
              <button className="upsell-btn">+ Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .cart-upsells {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        
        .upsells-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }
        
        .upsells-subtitle {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 16px;
        }
        
        .upsells-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }
        
        .upsell-item {
          background: white;
          border-radius: 6px;
          padding: 12px;
          text-align: center;
          border: 1px solid #e5e7eb;
        }
        
        .upsell-image {
          width: 60px;
          height: 90px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 8px;
        }
        
        .upsell-title {
          font-size: 12px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        
        .upsell-price {
          font-size: 14px;
          font-weight: 600;
          color: #059669;
          margin-bottom: 8px;
        }
        
        .upsell-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
          width: 100%;
        }
        
        .upsell-btn:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}

function UrgencyIndicators() {
  const urgencyMessages = [
    "🔥 Limited stock on aviation titles",
    "⏰ Special pricing ends soon",
    "📦 Order by 3PM for same-day dispatch",
    "🎯 Only 3 copies left of this edition"
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % urgencyMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="urgency-indicators">
      <div className="urgency-message">
        {urgencyMessages[currentMessage]}
      </div>
      
      <style jsx>{`
        .urgency-indicators {
          background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%);
          border: 1px solid #f59e0b;
          border-radius: 6px;
          padding: 12px;
          text-align: center;
          margin-bottom: 16px;
        }
        
        .urgency-message {
          color: #92400e;
          font-size: 13px;
          font-weight: 600;
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function CartTrustSignals() {
  return (
    <div className="trust-signals">
      <div className="trust-signal">
        <span className="trust-icon">🔒</span>
        <span className="trust-text">Secure Checkout</span>
      </div>
      <div className="trust-signal">
        <span className="trust-icon">🚚</span>
        <span className="trust-text">Free Returns</span>
      </div>
      <div className="trust-signal">
        <span className="trust-icon">⭐</span>
        <span className="trust-text">4.8/5 Rating</span>
      </div>
      
      <style jsx>{`
        .trust-signals {
          display: flex;
          justify-content: space-around;
          padding: 16px 0;
          border-top: 1px solid #e5e7eb;
        }
        
        .trust-signal {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        
        .trust-icon {
          font-size: 20px;
        }
        
        .trust-text {
          font-size: 11px;
          color: #6b7280;
          font-weight: 600;
        }
        
        @media (max-width: 640px) {
          .trust-signals {
            flex-direction: column;
            gap: 8px;
          }
          
          .trust-signal {
            flex-direction: row;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

function AbandonmentModal({ 
  onClose, 
  cartValue 
}: { 
  onClose: () => void; 
  cartValue: number; 
}) {
  return (
    <div className="abandonment-modal-overlay">
      <div className="abandonment-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="modal-content">
          <h3 className="modal-title">Wait! Don't Leave Your Books Behind 📚</h3>
          <p className="modal-message">
            Your £{cartValue.toFixed(2)} collection of aviation history is waiting for you!
          </p>
          
          <div className="modal-offer">
            <div className="offer-badge">Special Offer</div>
            <p className="offer-text">
              Complete your purchase in the next 10 minutes and get 
              <strong> FREE shipping</strong> on your entire order!
            </p>
          </div>
          
          <div className="modal-actions">
            <button className="complete-purchase-btn">
              Complete Purchase
            </button>
            <button className="save-for-later-btn" onClick={onClose}>
              Save for Later
            </button>
          </div>
        </div>
        
        <style jsx>{`
          .abandonment-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .abandonment-modal {
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 400px;
            margin: 20px;
            position: relative;
            animation: slideIn 0.3s ease-out;
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .close-btn {
            position: absolute;
            top: 12px;
            right: 16px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #6b7280;
            line-height: 1;
          }
          
          .modal-title {
            font-size: 20px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 12px;
            text-align: center;
          }
          
          .modal-message {
            color: #374151;
            text-align: center;
            margin-bottom: 20px;
            line-height: 1.5;
          }
          
          .modal-offer {
            background: linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%);
            border: 1px solid #a3e635;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
            text-align: center;
          }
          
          .offer-badge {
            background: #16a34a;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 8px;
          }
          
          .offer-text {
            color: #365314;
            font-size: 14px;
            margin: 0;
          }
          
          .modal-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          
          .complete-purchase-btn {
            background: #16a34a;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }
          
          .complete-purchase-btn:hover {
            background: #15803d;
          }
          
          .save-for-later-btn {
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #d1d5db;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .save-for-later-btn:hover {
            background: #e5e7eb;
          }
        `}</style>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="empty-cart">
      <div className="empty-icon">📚</div>
      <h3 className="empty-title">Your cart is empty</h3>
      <p className="empty-message">
        Start building your aviation history collection
      </p>
      <button className="btn-books">
        Browse Books
      </button>
      
      <style jsx>{`
        .empty-cart {
          text-align: center;
          padding: 40px 20px;
        }
        
        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .empty-title {
          font-size: 20px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }
        
        .empty-message {
          color: #6b7280;
          margin-bottom: 24px;
        }
        
        /* using global .btn-books utility from Tailwind layer */
      `}</style>
    </div>
  );
}