'use client'

import { useCart } from '@/context/CartContext'
import { X, ShoppingBag } from 'lucide-react'
import Image from 'next/image'

export default function CartSidebar() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    isCartOpen,
    setIsCartOpen,
    getBulkDiscount,
    getShippingCost,
    getFinalTotal
  } = useCart()

  if (!isCartOpen) return null

  const subtotal = getTotalPrice()
  const discount = getBulkDiscount()
  const shipping = getShippingCost()
  const finalTotal = getFinalTotal()
  
  // Calculate total weight
  const totalWeight = items.reduce((total, item) => {
    return total + (((item.book as any).weight || 300) * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-primary">Your Basket</h2>
              <span className="badge badge-green text-xs">
                {getTotalItems()}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-50"
            >
              <X className="h-5 w-5 text-primary" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-muted">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium text-primary">Your basket is empty</p>
                <p className="text-sm">Add some books to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.book.id} className="flex gap-4 border-b pb-4">
                    <Image
                      src={item.book.imageUrl || '/book-covers/placeholder.jpg'}
                      alt={item.book.title}
                      width={60}
                      height={90}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-primary">{item.book.title}</h3>
                      <p className="text-xs text-secondary">by Charles E. MacKay</p>
                      <p className="text-xs text-muted">{item.book.condition} condition • {(item.book as any).weight || 300}g</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-sm"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-sm"
                        >
                          +
                        </button>
                        <span className="font-semibold text-green-600 ml-auto">£{item.book.price.toFixed(2)}</span>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.book.id)}
                        className="text-red-500 hover:text-red-700 text-xs mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-900">Subtotal:</span>
                  <span className="text-gray-900">£{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Bulk Discount ({getTotalItems() >= 5 ? '15%' : getTotalItems() >= 3 ? '10%' : '5%'}):</span>
                    <span>-£{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping ({totalWeight}g):</span>
                  <span>£{shipping.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {totalWeight <= 100 ? 'Large Letter' : totalWeight <= 2000 ? 'Small Parcel' : 'Standard Parcel'} • Royal Mail
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">£{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => {
                    // Navigate to checkout page
                    window.location.href = '/checkout'
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => {
                    // Track eBay click for analytics
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'click', {
                        event_category: 'External Link',
                        event_label: 'eBay Store'
                      })
                    }
                    window.open('https://www.ebay.co.uk/usr/chaza87', '_blank')
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Buy All on eBay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
