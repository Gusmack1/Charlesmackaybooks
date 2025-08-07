'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';

interface StickyAddToCartProps {
  book: Book;
  className?: string;
}

export default function StickyAddToCart({ book, className = '' }: StickyAddToCartProps) {
  const { addToCart, openBasket } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button when user scrolls past the hero section
      const heroHeight = window.innerHeight * 0.8; // Approximate hero height
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(book);
    setTimeout(() => {
      setIsAddingToCart(false);
      openBasket();
    }, 500);
  };

  if (!isVisible || !book.inStock) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 md:left-1/2 md:transform md:-translate-x-1/2 md:max-w-md z-40 ${className}`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img
              src={book.imageUrl || `/book-covers/${book.id}.jpg`}
              alt={book.title}
              className="w-12 h-16 object-cover rounded"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 truncate">{book.title}</h3>
            <p className="text-sm text-gray-600">£{book.price} • {(book as any).weight || 300}g</p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 text-sm"
            >
              {isAddingToCart ? '🔄' : '🛒 Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}