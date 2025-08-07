'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

interface BasketSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BasketSidebar({ isOpen, onClose }: BasketSidebarProps) {
  const { items, getTotalPrice, getTotalItems, removeFromCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={handleBackdropClick}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b card-compact">
            <h2 className="text-xl font-bold text-primary">Shopping Basket</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close basket"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-lg font-semibold text-primary mb-2">Your basket is empty</h3>
                <p className="text-secondary mb-6">Add some books to get started!</p>
                <button
                  onClick={onClose}
                  className="badge badge-blue px-6 py-2"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.book.id} className="card-compact flex gap-3">
                    <div className="w-16 h-20 flex-shrink-0">
                      <Image
                        src={item.book.imageUrl || '/book-covers/placeholder-book.svg'}
                        alt={item.book.title}
                        width={64}
                        height={80}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs text-primary line-clamp-2 mb-1">
                        {item.book.title}
                      </h4>
                      <p className="text-xs text-accent-green font-semibold">£{item.book.price.toFixed(2)}</p>
                      <p className="text-xs text-muted">{item.book.condition} condition</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-sm"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          className="ml-auto text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t bg-gray-50 p-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total ({getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}):</span>
                <span className="text-accent-green">£{getTotalPrice().toFixed(2)}</span>
              </div>

              <div className="text-xs text-secondary text-center">
                <div className="font-semibold mb-1">📦 Shipping:</div>
                <div>FREE shipping worldwide</div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full badge badge-green text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  Proceed to Checkout
                </Link>

                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-200 text-secondary py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => {
                      clearCart();
                      onClose();
                    }}
                    className="flex-1 badge badge-red py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Clear Basket
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
