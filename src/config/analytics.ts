// Google Analytics 4 Configuration for Charles MacKay Aviation Books Website
// This file contains the analytics setup and conversion goals

export const GA4_CONFIG = {
  // Your Google Analytics 4 Measurement ID
  MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-RJS2CCBSJP',

  // Enhanced Ecommerce Settings
  ENHANCED_ECOMMERCE: true,
  ANONYMIZE_IP: true,
  COOKIE_FLAGS: 'SameSite=Strict',

  // Custom Dimensions for Aviation Books Website
  CUSTOM_DIMENSIONS: {
    book_category: 'custom_parameter_1',
    aviation_era: 'custom_parameter_2',
    research_topic: 'custom_parameter_3',
    user_type: 'custom_parameter_4', // researcher, enthusiast, student
    content_type: 'custom_parameter_5' // book, article, timeline
  }
}

// Conversion Events for Google Analytics 4
// These should be set up in your GA4 interface as conversion events
export const CONVERSION_EVENTS = {
  // Ecommerce conversions
  PURCHASE: 'purchase', // Primary conversion - book purchases
  ADD_TO_CART: 'add_to_cart', // Micro conversion
  BEGIN_CHECKOUT: 'begin_checkout',

  // Lead generation conversions
  EMAIL_CLICK: 'email_click', // Contact form engagement
  NEWSLETTER_SIGNUP: 'newsletter_signup',

  // Content engagement conversions
  ARTICLE_READ: 'article_read', // Blog engagement
  RESOURCE_DOWNLOAD: 'resource_download', // Research resources
  TIMELINE_INTERACTION: 'timeline_interaction',

  // External traffic conversions
  EBAY_REDIRECT: 'ebay_redirect', // External sales channel
  SOCIAL_SHARE: 'share'
}

// Enhanced Measurement Settings
export const ENHANCED_MEASUREMENT = {
  scrolls: true, // Track 90% scroll depth
  outbound_clicks: true, // Track clicks to external sites
  site_search: true, // Track internal search
  video_engagement: true, // Track video interactions if any
  file_downloads: true, // Track PDF downloads
  page_changes: true // Track SPA navigation
}

// Custom Events for Aviation-Specific Tracking
export const AVIATION_EVENTS = {
  // Book-specific events
  BOOK_VIEW: 'view_item',
  BOOK_PREVIEW: 'book_preview',
  CATEGORY_BROWSE: 'view_item_list',
  WISHLIST_ADD: 'add_to_wishlist',

  // Research engagement
  GLOSSARY_USE: 'glossary_interaction',
  BIBLIOGRAPHY_ACCESS: 'bibliography_access',
  ACADEMIC_RESOURCE_VIEW: 'academic_resource_view',

  // Historical timeline events
  ERA_EXPLORATION: 'era_exploration',
  AIRCRAFT_DETAIL_VIEW: 'aircraft_detail_view',

  // User engagement patterns
  READING_PROGRESS: 'reading_progress', // 25%, 50%, 75%, 100%
  TIME_ON_SITE: 'engagement_time',
  RETURN_VISITOR: 'return_visitor'
}

// Audience Segments for Remarketing
export const AUDIENCE_SEGMENTS = {
  // Purchase behavior
  BOOK_PURCHASERS: 'book_purchasers',
  HIGH_VALUE_CUSTOMERS: 'high_value_customers', // £50+ total
  REPEAT_CUSTOMERS: 'repeat_customers',

  // Content engagement
  RESEARCH_FOCUSED: 'research_focused', // Academic resources users
  HISTORY_ENTHUSIASTS: 'history_enthusiasts', // Blog readers
  SCOTTISH_AVIATION_INTEREST: 'scottish_aviation_interest',

  // Behavioral patterns
  MOBILE_USERS: 'mobile_users',
  INTERNATIONAL_VISITORS: 'international_visitors',
  RETURNING_VISITORS: 'returning_visitors'
}

// Conversion Goals and Values
export const CONVERSION_GOALS = {
  // Primary goals (revenue)
  BOOK_PURCHASE: {
    value: 'dynamic', // Use actual book price
    currency: 'GBP'
  },

  // Secondary goals (lead generation)
  EMAIL_CONTACT: {
    value: 5.00, // Estimated value of email lead
    currency: 'GBP'
  },

  // Micro conversions (engagement)
  ARTICLE_COMPLETION: {
    value: 0.50, // Estimated value of content engagement
    currency: 'GBP'
  },

  RESOURCE_ACCESS: {
    value: 1.00, // Value of research resource engagement
    currency: 'GBP'
  }
}

// Attribution Settings for Multi-Channel Analysis
export const ATTRIBUTION_CONFIG = {
  // Attribution model for ecommerce
  MODEL: 'data-driven', // or 'last-click', 'first-click', 'linear'

  // Conversion window
  CLICK_LOOKBACK: 30, // days
  VIEW_LOOKBACK: 1, // days

  // Channel groupings
  CHANNELS: {
    ORGANIC_SEARCH: ['google / organic', 'bing / organic'],
    DIRECT: ['(direct) / (none)'],
    REFERRAL: ['external referrals'],
    SOCIAL: ['facebook', 'twitter', 'linkedin'],
    EMAIL: ['email campaigns']
  }
}

// Data Layer Structure for Enhanced Tracking
export const DATA_LAYER_EVENTS = {
  // Page view with aviation context
  PAGE_VIEW: {
    event: 'page_view',
    page_title: 'string',
    page_location: 'string',
    content_type: 'book|article|timeline|resource',
    aviation_category: 'string',
    historical_era: 'string'
  },

  // Enhanced ecommerce purchase
  PURCHASE: {
    event: 'purchase',
    transaction_id: 'string',
    value: 'number',
    currency: 'GBP',
    items: [
      {
        item_id: 'string',
        item_name: 'string',
        category: 'string',
        quantity: 'number',
        price: 'number'
      }
    ]
  },

  // Content engagement
  ARTICLE_ENGAGEMENT: {
    event: 'article_read',
    article_title: 'string',
    category: 'string',
    reading_progress: 'number', // percentage
    time_spent: 'number' // seconds
  }
}

// Google Analytics 4 Setup Instructions
export const GA4_SETUP_INSTRUCTIONS = {
  STEP_1: 'Create GA4 property in Google Analytics',
  STEP_2: 'Copy Measurement ID to NEXT_PUBLIC_GA_MEASUREMENT_ID',
  STEP_3: 'Configure Enhanced Ecommerce in GA4 interface',
  STEP_4: 'Set up conversion events in GA4 Events section',
  STEP_5: 'Create custom dimensions for aviation-specific tracking',
  STEP_6: 'Link Google Ads account for remarketing',
  STEP_7: 'Set up Google Tag Manager (optional but recommended)',

  CONVERSION_EVENTS_TO_CREATE: [
    'purchase (automatic)',
    'add_to_cart (automatic)',
    'email_click',
    'article_read',
    'ebay_redirect',
    'resource_download',
    'timeline_interaction'
  ],

  CUSTOM_DIMENSIONS_TO_CREATE: [
    { name: 'Book Category', parameter: 'custom_parameter_1' },
    { name: 'Aviation Era', parameter: 'custom_parameter_2' },
    { name: 'Research Topic', parameter: 'custom_parameter_3' },
    { name: 'User Type', parameter: 'custom_parameter_4' },
    { name: 'Content Type', parameter: 'custom_parameter_5' }
  ]
}
