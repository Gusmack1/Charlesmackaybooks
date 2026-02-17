'use client'

import { useRouter } from 'next/navigation'
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
    getBulkDiscountPercentage,
    getShippingCost,
    getFinalTotal
  } = useCart()
  const router = useRouter()

  const startCheckout = (method: 'stripe' | 'paypal' = 'stripe') => {
    const url = method === 'paypal' ? '/checkout?method=paypal' : '/checkout?method=stripe'
    router.push(url)
    setIsCartOpen(false)
  }

  if (!isCartOpen) return null

  const subtotal = getTotalPrice()
  const discount = getBulkDiscount()
  const shipping = getShippingCost()
  const finalTotal = getFinalTotal()

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-slate-900 text-white shadow-xl border-l border-blue-700/50">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-blue-700/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-white" />
              <h2 className="text-lg font-semibold text-white">Your Basket</h2>
              <span className="badge badge-green text-xs">
                {getTotalItems()}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-lg p-2 hover:bg-slate-800"
              aria-label="Close basket"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-white/70">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium text-white">Your basket is empty</p>
                <p className="text-sm">Add some books to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.book.id} className="flex gap-4 border border-white/10 rounded-lg p-3 bg-slate-800/70">
                    <Image
                      src={item.book.imageUrl || '/book-covers/placeholder.jpg'}
                      alt={item.book.title}
                      width={60}
                      height={90}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-white">{item.book.title}</h3>
                      <p className="text-xs text-white/80">by Charles E. MacKay</p>
                      <p className="text-xs text-white/60">{item.book.condition} condition</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center bg-slate-700 rounded-full hover:bg-slate-600 text-base sm:text-sm"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center bg-slate-700 rounded-full hover:bg-slate-600 text-base sm:text-sm"
                        >
                          +
                        </button>
                        <span className="font-semibold text-green-300 ml-auto">£{item.book.price.toFixed(2)}</span>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.book.id)}
                        className="text-red-300 hover:text-red-200 text-xs mt-1"
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
            <div className="border-t border-blue-700/50 px-6 py-4 bg-slate-900">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/85">Subtotal:</span>
                  <span className="text-white">£{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-300">
                    <span>Bulk Discount ({getBulkDiscountPercentage()}% off {getTotalItems()}+ books):</span>
                    <span>-£{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/75">
                  <span>Shipping:</span>
                  <span>£{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span className="text-white">Total:</span>
                  <span className="text-white">£{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => startCheckout('stripe')}
                  className="w-full bg-white text-slate-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors border border-slate-900"
                >
                  Checkout as guest (Card / Wallet)
                </button>
                <button
                  onClick={() => startCheckout('paypal')}
                  className="w-full bg-yellow-500 text-slate-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Guest checkout with PayPal
                </button>
                <div className="rounded-lg border border-dashed border-white/25 p-3 text-xs text-white/75">
                  <p className="font-semibold text-white">No account required</p>
                  <p>
                    Choose card for Apple Pay/Google Pay on supported devices, or use PayPal.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
