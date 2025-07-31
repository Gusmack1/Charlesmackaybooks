'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Book } from '@/types/book'

interface WishlistItem extends Book {
  addedAt: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (book: Book) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  getTotalWishlistItems: () => number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  const addToWishlist = (book: Book) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === book.id)) return prev
      return [...prev, { ...book, addedAt: new Date().toISOString() }]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const isInWishlist = (id: string) => {
    return wishlistItems.some(item => item.id === id)
  }

  const getTotalWishlistItems = () => wishlistItems.length

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      getTotalWishlistItems
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
