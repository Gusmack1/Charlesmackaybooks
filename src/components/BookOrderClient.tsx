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

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    addToCart(book)
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
          <span className="text-sm text-muted">+ shipping</span>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={className || `w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isAddingToCart
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-accent-green hover:bg-green-700'
            } text-white`}
          >
            {isAddingToCart ? 'Adding...' : (children || 'Add to Basket')}
          </button>

          <button
            onClick={handleEbayClick}
            className="w-full py-3 px-4 border border-accent-blue text-accent-blue rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Buy on eBay
          </button>
        </div>

        <div className="text-xs text-muted space-y-1">
          <p>✅ Secure PayPal checkout</p>
          <p>📦 Fast worldwide shipping</p>
          <p>⭐ 100% positive feedback</p>
        </div>
      </div>
    </div>
  )
}
