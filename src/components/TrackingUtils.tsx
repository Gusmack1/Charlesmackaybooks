'use client';

import { useEffect } from 'react';

// Book type for tracking
interface BookTrackingData {
  id: string;
  title: string;
  category: string;
  price: number;
}

// Tracking utility functions for book interactions
export const useBookViewTracking = (book: BookTrackingData) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && book) {
      // Track book view with Google Analytics
      if (window.gtag) {
        window.gtag('event', 'view_item', {
          currency: 'GBP',
          value: book.price,
          items: [{
            item_id: book.id,
            item_name: book.title,
            item_category: book.category,
            item_brand: 'Charles E. MacKay',
            price: book.price,
            quantity: 1
          }]
        });
      }

      // Track with Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'ViewContent', {
          value: book.price,
          currency: 'GBP',
          content_name: book.title,
          content_category: book.category,
          content_ids: [book.id],
          content_type: 'product'
        });
      }
    }
  }, [book]);
};

// Track eBay clicks
export const trackEbayClick = (book: BookTrackingData) => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'External Link',
        event_label: 'eBay Store',
        book_id: book.id,
        book_title: book.title,
        platform: 'eBay',
        value: book.price,
        currency: 'GBP'
      });
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value: book.price,
        currency: 'GBP',
        content_name: book.title,
        content_category: book.category,
        content_ids: [book.id],
        content_type: 'product'
      });
    }
  }
};

// Track PayPal clicks
export const trackPayPalClick = (book: BookTrackingData) => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'GBP',
        value: book.price,
        payment_method: 'PayPal',
        items: [{
          item_id: book.id,
          item_name: book.title,
          item_category: book.category,
          price: book.price,
          quantity: 1
        }]
      });
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'AddPaymentInfo', {
        value: book.price,
        currency: 'GBP',
        content_name: book.title,
        content_category: book.category,
        content_ids: [book.id],
        content_type: 'product'
      });
    }
  }
};

// Track add to cart interactions
export const trackAddToCart = (book: BookTrackingData, platform: string) => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'GBP',
        value: book.price,
        platform: platform,
        items: [{
          item_id: book.id,
          item_name: book.title,
          item_category: book.category,
          item_brand: 'Charles E. MacKay',
          price: book.price,
          quantity: 1
        }]
      });
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        value: book.price,
        currency: 'GBP',
        content_name: book.title,
        content_category: book.category,
        content_ids: [book.id],
        content_type: 'product'
      });
    }
  }
};

// Track email contacts
export const trackEmailContact = () => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'contact', {
        method: 'email',
        event_category: 'Contact',
        event_label: 'Header Email'
      });
    }

    if (window.fbq) {
      window.fbq('track', 'Contact');
    }
  }
};

// Track search events
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        results_count: resultsCount,
        event_category: 'Site Search'
      });
    }

    if (window.fbq) {
      window.fbq('track', 'Search', {
        search_string: searchTerm
      });
    }
  }
};

// Track category page views
export const trackCategoryView = (category: string, booksCount: number) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'view_item_list', {
        item_list_name: category,
        item_list_id: category.toLowerCase().replace(/ /g, '-'),
        items_count: booksCount
      });
    }

    if (window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_type: 'product_group',
        content_category: category
      });
    }
  }
};

// Enhanced tracking for conversions
export const trackConversion = (book: BookTrackingData, conversionType: 'purchase' | 'lead' | 'signup') => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXX/XXXXXXX', // Google Ads conversion tracking
        value: book.price,
        currency: 'GBP',
        transaction_id: `${conversionType}_${book.id}_${Date.now()}`
      });
    }
  }
};
