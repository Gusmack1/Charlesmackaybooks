'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { Book } from '@/types/book'

interface BookOrderClientProps {
  book: Book
  children?: React.ReactNode
  className?: string
}

export default function BookOrderClient({ book, children, className }: BookOrderClientProps) {
  const { addToCart, openBasket } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  // Check if this is a pre-order book
  const isPreOrder = book.condition === 'Pre-Order' || book.isbn === 'Coming Soon' || !book.inStock

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    addToCart(book)
    setTimeout(() => {
      setIsAddingToCart(false)
      openBasket()
    }, 500)
  }

  const handlePreOrder = () => {
    // For pre-orders, we'll still add to cart but with different messaging
    setIsAddingToCart(true)
    addToCart({
      ...book,
      condition: 'Pre-Order'
    })
    setTimeout(() => {
      setIsAddingToCart(false)
      openBasket()
    }, 500)
  }

  const handleEbayClick = () => {
    window.open('https://www.ebay.co.uk/usr/chaza87', '_blank')
  }

  return (
    <div className="card p-6 sticky top-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-accent-green">£{book.price}</span>
          {isPreOrder ? (
            <span className="text-sm text-yellow-600 font-medium">Pre-Order</span>
          ) : (
            <span className="text-sm text-muted">+ shipping</span>
          )}
        </div>

        {isPreOrder && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800 font-medium">📅 Coming Soon</p>
            <p className="text-xs text-yellow-700">Pre-order now and be first to receive your copy when published</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={isPreOrder ? handlePreOrder : handleAddToCart}
            disabled={isAddingToCart}
            className={className || `w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isAddingToCart
                ? 'bg-gray-400 cursor-not-allowed'
                : isPreOrder
                ? 'bg-yellow-600 hover:bg-yellow-700'
                : 'bg-accent-green hover:bg-green-700'
            } text-white`}
          >
            {isAddingToCart 
              ? 'Adding...' 
              : isPreOrder 
              ? '🔔 Pre-Order Now' 
              : (children || 'Add to Basket')
            }
          </button>

          {!isPreOrder && (
            <button
              onClick={handleEbayClick}
              className="w-full py-3 px-4 border border-accent-blue text-accent-blue rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Buy on eBay
            </button>
          )}
        </div>

        <div className="text-xs text-muted space-y-1">
          {isPreOrder ? (
            <>
              <p>🔔 You'll be notified when available</p>
              <p>💳 No charge until book ships</p>
              <p>📧 Email updates on publication progress</p>
            </>
          ) : (
            <>
              <p>✅ Secure PayPal checkout</p>
              <p>📦 Fast worldwide shipping</p>
              <p>⭐ 100% positive feedback</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
