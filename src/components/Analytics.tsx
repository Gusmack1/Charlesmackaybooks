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

      {/* Hotjar Tracking Code */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3000000,hjsv:6}; // Replace with actual Hotjar ID
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `
        }}
      />

      {/* Facebook Pixel */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '000000000000000'); // Replace with actual Facebook Pixel ID
            fbq('track', 'PageView');
          `
        }}
      />
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
