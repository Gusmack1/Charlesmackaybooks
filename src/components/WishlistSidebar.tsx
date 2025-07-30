'use client'

import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { X, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

export default function WishlistSidebar() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (item: any) => {
    addToCart(item)
    removeFromWishlist(item.id)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-semibold">Wishlist</h2>
            </div>
            <button className="rounded-lg p-2 hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {wishlistItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-gray-500">
                <Heart className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems
                  .sort((a: any, b: any) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
                  .map((item: any) => (
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
                        <span className="font-semibold text-green-600">£{item.price}</span>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="flex items-center gap-1 text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            <ShoppingCart className="h-3 w-3" />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-xs text-red-500 hover:text-red-700"
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
        </div>
      </div>
    </div>
  )
}
