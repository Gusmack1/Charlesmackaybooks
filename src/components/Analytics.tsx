'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
    fbq?: (...args: any[]) => void
  }
}

export default function Analytics() {
  const { cartItems, getTotalItems, getTotal } = useCart()

  useEffect(() => {
    // Initialize Google Analytics 4
    if (typeof window !== 'undefined') {
      // Create dataLayer if it doesn't exist
      window.dataLayer = window.dataLayer || []

      // Define gtag function
      window.gtag = function gtag() {
        window.dataLayer?.push(arguments)
      }

      // Initialize GA4
      window.gtag('js', new Date())
      window.gtag('config', 'G-XXXXXXXXXX') // Replace with actual GA4 ID

      // Track page view
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      })
    }
  }, [])

  // Track cart events
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Track add to cart events
      cartItems.forEach((item) => {
        window.gtag?.('event', 'add_to_cart', {
          currency: 'GBP',
          value: item.price,
          items: [{
            item_id: item.id,
            item_name: item.title,
            item_category: item.category || 'Aviation Books',
            item_brand: 'Charles E. MacKay',
            price: item.price,
            quantity: 1
          }]
        })
      })

      // Track cart value
      if (getTotalItems() > 0) {
        window.gtag?.('event', 'view_cart', {
          currency: 'GBP',
          value: getTotal(),
          items: cartItems.map(item => ({
            item_id: item.id,
            item_name: item.title,
            item_category: item.category || 'Aviation Books',
            item_brand: 'Charles E. MacKay',
            price: item.price,
            quantity: 1
          }))
        })
      }
    }
  }, [cartItems, getTotalItems, getTotal])

  // Track conversion events
  const trackPurchaseIntent = (method: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'GBP',
        value: getTotal(),
        checkout_method: method,
        items: cartItems.map(item => ({
          item_id: item.id,
          item_name: item.title,
          item_category: item.category || 'Aviation Books',
          item_brand: 'Charles E. MacKay',
          price: item.price,
          quantity: 1
        }))
      })
    }
  }

  const trackEbayRedirect = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'External Link',
        event_label: 'eBay Store',
        value: getTotal()
      })
    }
  }

  const trackBookView = (bookId: string, bookTitle: string, bookPrice: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'GBP',
        value: bookPrice,
        items: [{
          item_id: bookId,
          item_name: bookTitle,
          item_category: 'Aviation Books',
          item_brand: 'Charles E. MacKay',
          price: bookPrice,
          quantity: 1
        }]
      })
    }
  }

  return (
    <>
      {/* Google Analytics 4 Script */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
      />

      {/* Analytics disabled temporarily to prevent console warnings */}
      {/*
      Hotjar Tracking Code - disabled (invalid ID: 3000000)
      Facebook Pixel - disabled (invalid ID: 000000000000000)
      */}
    </>
  )
}

// Export tracking functions for use in components
export { Analytics }
export const useAnalytics = () => ({
  trackPurchaseIntent: (method: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        checkout_method: method
      })
    }
  },
  trackEbayRedirect: () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'External Link',
        event_label: 'eBay Store'
      })
    }
  },
  trackBookView: (bookId: string, bookTitle: string, bookPrice: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'GBP',
        value: bookPrice,
        items: [{
          item_id: bookId,
          item_name: bookTitle,
          item_category: 'Aviation Books',
          item_brand: 'Charles E. MacKay',
          price: bookPrice,
          quantity: 1
        }]
      })
    }
  }
})
