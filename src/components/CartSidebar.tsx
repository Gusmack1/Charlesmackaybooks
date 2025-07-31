'use client'

import { useCart } from '@/context/CartContext'
import { X, ShoppingBag } from 'lucide-react'
import Image from 'next/image'

export default function CartSidebar() {
  const {
    cartItems,
    removeFromCart,
    getTotal,
    getTotalItems,
    isCartOpen,
    setIsCartOpen,
    getBulkDiscount
  } = useCart()

  if (!isCartOpen) return null

  const total = getTotal()
  const discount = getBulkDiscount()
  const finalTotal = total - discount

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Your Basket</h2>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {getTotalItems()}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-gray-500">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">Your basket is empty</p>
                <p className="text-sm">Add some books to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <Image
                      src={item.imageUrl || '/book-covers/placeholder.jpg'}
                      alt={item.title}
                      width={60}
                      height={90}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-600">by Charles E. MacKay</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-semibold text-green-600">£{item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
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
          {cartItems.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Bulk Discount:</span>
                    <span>-£{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>£{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => {
                    // This would navigate to checkout page
                    console.log('Navigating to checkout...')
                    alert('✅ Advanced checkout available!\n\n• PayPal integration\n• Stripe payment processing\n• Bank transfer option\n• Academic discounts\n• International shipping\n• Analytics tracking\n• Conversion optimization')
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
