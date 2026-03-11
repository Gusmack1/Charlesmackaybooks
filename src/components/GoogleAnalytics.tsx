'use client'

import Script from 'next/script'
import { useEffect } from 'react'

// Your actual GA4 Measurement ID for Charles Mackay Books
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-RJS2CCBSJP'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    fbq?: (...args: any[]) => void
  }
}

// Initialize Google Analytics
export function initializeGA() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Track page views
export function trackPageView(url: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: url,
    })
  }
}

// Track book purchases (ecommerce)
export function trackPurchase(transactionData: {
  transaction_id: string
  value: number
  currency: string
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionData.transaction_id,
      value: transactionData.value,
      currency: transactionData.currency,
      items: transactionData.items,
    })
  }
}

// Track adding items to basket
export function trackAddToCart(item: {
  item_id: string
  item_name: string
  category: string
  quantity: number
  price: number
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'GBP',
      value: item.price * item.quantity,
      items: [item],
    })
  }
}

export function trackBuyNowClick(item: {
  item_id: string
  item_name: string
  category: string
  price: number
  source_context?: string
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'buy_now_click', {
      currency: 'GBP',
      value: item.price,
      item_id: item.item_id,
      item_name: item.item_name,
      item_category: item.category,
      source_context: item.source_context || 'unknown',
    })
  }
}

export function trackViewCart(cart: {
  value: number
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_cart', {
      currency: 'GBP',
      value: cart.value,
      items: cart.items,
    })
  }
}

export function trackBeginCheckout(checkout: {
  value: number
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
  source_context?: string
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'GBP',
      value: checkout.value,
      items: checkout.items,
      source_context: checkout.source_context || 'checkout_page',
    })
  }
}

export function trackCheckoutProgress(step: string, value: number, itemCount: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'checkout_progress', {
      checkout_step: step,
      value,
      item_count: itemCount,
    })
  }
}

export function trackAddPaymentInfo(payload: {
  payment_type: 'stripe' | 'paypal'
  value: number
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_payment_info', {
      currency: 'GBP',
      value: payload.value,
      payment_type: payload.payment_type,
      items: payload.items,
    })
  }
}

export function trackBundleAdd(bundle: {
  bundle_id: string
  bundle_name: string
  value: number
  items: Array<{
    item_id: string
    item_name: string
    category: string
    quantity: number
    price: number
  }>
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'bundle_add_to_cart', {
      currency: 'GBP',
      value: bundle.value,
      bundle_id: bundle.bundle_id,
      bundle_name: bundle.bundle_name,
      items: bundle.items,
    })
  }
}

// Track book view events
export function trackViewItem(item: {
  item_id: string
  item_name: string
  category: string
  price: number
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'GBP',
      value: item.price,
      items: [item],
    })
  }
}

// Track search events
export function trackSearch(searchTerm: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    })
  }
}

// Track blog article engagement
export function trackArticleRead(articleTitle: string, category: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'article_read', {
      custom_parameter_1: articleTitle,
      custom_parameter_2: category,
    })
  }
}

// Track email clicks
export function trackEmailClick() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'email_click', {
      event_category: 'engagement',
      event_label: 'contact_email',
    })
  }
}

// Track eBay redirects
export function trackEbayClick(bookTitle: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ebay_redirect', {
      event_category: 'ecommerce',
      event_label: bookTitle,
    })
  }
}

// Track timeline page interactions
export function trackTimelineView(eraClicked: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timeline_interaction', {
      event_category: 'engagement',
      event_label: eraClicked,
    })
  }
}

// Track research resource downloads
export function trackResourceDownload(resourceType: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'resource_download', {
      event_category: 'research',
      event_label: resourceType,
    })
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    // Initialize GA when component mounts
    initializeGA()
  }, [])

  return (
    <>
      {/* Google Analytics 4 Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            // Enhanced ecommerce settings
            send_page_view: true,
            enhanced_ecommerce: true,
            // Cookie settings for GDPR compliance
            anonymize_ip: true,
            cookie_flags: 'SameSite=Strict',
            // Custom parameters for aviation books
            custom_map: {
              'custom_parameter_1': 'book_title',
              'custom_parameter_2': 'aviation_category',
              'custom_parameter_3': 'research_topic'
            }
          });

          // Enhanced measurement for engagement
          gtag('config', '${GA_MEASUREMENT_ID}', {
            enhanced_measurement: {
              scrolls: true,
              outbound_clicks: true,
              site_search: true,
              video_engagement: true,
              file_downloads: true
            }
          });
        `}
      </Script>
    </>
  )
}
