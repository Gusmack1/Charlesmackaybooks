'use client'

import { useCallback } from 'react'
import {
  trackViewItem,
  trackSearch,
  trackArticleRead,
  trackEmailClick,
  trackEbayClick,
  trackTimelineView,
  trackResourceDownload,
  trackPurchase
} from '@/components/GoogleAnalytics'

export interface BookAnalyticsData {
  id: string
  title: string
  category: string
  price: number
  author?: string
  isbn?: string
}

export interface PurchaseData {
  transactionId: string
  items: Array<{
    id: string
    title: string
    category: string
    quantity: number
    price: number
  }>
  totalValue: number
  currency?: string
  platform?: 'website' | 'ebay' | 'paypal'
}

export function useAnalytics() {
  // Track book page views
  const trackBookView = useCallback((book: BookAnalyticsData) => {
    trackViewItem({
      item_id: book.id,
      item_name: book.title,
      category: book.category,
      price: book.price
    })
  }, [])

  // Track blog article engagement
  const trackBlogEngagement = useCallback((articleTitle: string, category: string) => {
    trackArticleRead(articleTitle, category)
  }, [])

  // Track search functionality
  const trackSiteSearch = useCallback((searchTerm: string) => {
    trackSearch(searchTerm)
  }, [])

  // Track contact interactions
  const trackContactEmail = useCallback(() => {
    trackEmailClick()
  }, [])

  // Track eBay redirects
  const trackEbayRedirect = useCallback((bookTitle: string) => {
    trackEbayClick(bookTitle)
  }, [])

  // Track timeline interactions
  const trackTimelineInteraction = useCallback((eraClicked: string) => {
    trackTimelineView(eraClicked)
  }, [])

  // Track research resource downloads
  const trackResourceAccess = useCallback((resourceType: string) => {
    trackResourceDownload(resourceType)
  }, [])

  // Track book purchases
  const trackBookPurchase = useCallback((purchaseData: PurchaseData) => {
    trackPurchase({
      transaction_id: purchaseData.transactionId,
      value: purchaseData.totalValue,
      currency: purchaseData.currency || 'GBP',
      items: purchaseData.items.map(item => ({
        item_id: item.id,
        item_name: item.title,
        category: item.category,
        quantity: item.quantity,
        price: item.price
      }))
    })
  }, [])

  // Track custom events for aviation-specific interactions
  const trackAviationEvent = useCallback((eventName: string, parameters: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'aviation_engagement',
        ...parameters
      })
    }
  }, [])

  // Track book category browsing
  const trackCategoryView = useCallback((category: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_name: category,
        event_category: 'navigation'
      })
    }
  }, [])

  // Track newsletter signup (if implemented)
  const trackNewsletterSignup = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'newsletter_signup', {
        event_category: 'engagement',
        event_label: 'aviation_newsletter'
      })
    }
  }, [])

  // Track PDF downloads or book previews
  const trackBookPreview = useCallback((bookId: string, bookTitle: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'book_preview', {
        event_category: 'engagement',
        event_label: bookTitle,
        custom_parameter_1: bookId
      })
    }
  }, [])

  // Track wishlist interactions
  const trackWishlistAdd = useCallback((book: BookAnalyticsData) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_wishlist', {
        currency: 'GBP',
        value: book.price,
        items: [{
          item_id: book.id,
          item_name: book.title,
          category: book.category,
          price: book.price
        }]
      })
    }
  }, [])

  // Track social sharing
  const trackSocialShare = useCallback((platform: string, content: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'aviation_book',
        item_id: content
      })
    }
  }, [])

  return {
    trackBookView,
    trackBlogEngagement,
    trackSiteSearch,
    trackContactEmail,
    trackEbayRedirect,
    trackTimelineInteraction,
    trackResourceAccess,
    trackBookPurchase,
    trackAviationEvent,
    trackCategoryView,
    trackNewsletterSignup,
    trackBookPreview,
    trackWishlistAdd,
    trackSocialShare
  }
}
