# Google Analytics 4 Setup for Charles MacKay Aviation Books

This document provides comprehensive instructions for setting up Google Analytics 4 (GA4) tracking on the Charles MacKay Aviation Books website, including ecommerce tracking, conversion goals, and aviation-specific analytics.

## 🚀 Quick Start

### Step 1: Create Google Analytics 4 Property

1. Visit [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for charlesmackaybooks.com
3. Copy your Measurement ID (format: G-XXXXXXXXXX)
4. Update `.env.local` with your Measurement ID:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 2: Deploy and Verify Tracking

1. Deploy the website with the analytics code
2. Use Google Analytics DebugView to verify events are firing
3. Check Real-time reports to confirm data collection

## 📊 Analytics Implementation Overview

### Components Implemented

- **GoogleAnalytics.tsx** - Main GA4 tracking component
- **useAnalytics.ts** - Custom hook for tracking events
- **BookAnalytics.tsx** - Book page view tracking
- **BlogAnalytics.tsx** - Article engagement tracking
- **CartContext.tsx** - Add to cart tracking

### Key Tracking Features

✅ **Ecommerce Tracking** - Book purchases and cart interactions
✅ **Content Engagement** - Blog reading progress and time on page
✅ **User Behavior** - Navigation patterns and search activity
✅ **Conversion Tracking** - Contact forms, eBay redirects, downloads
✅ **Custom Events** - Aviation-specific interactions

## 🛒 Ecommerce Tracking Setup

### Automatic Events Tracked

- `purchase` - Book purchases (with transaction details)
- `add_to_cart` - Items added to shopping basket
- `view_item` - Individual book page views
- `begin_checkout` - Checkout process initiation

### Enhanced Ecommerce Data

```javascript
// Example purchase event data structure
{
  transaction_id: "CM-book-id-timestamp",
  value: 15.99,
  currency: "GBP",
  items: [{
    item_id: "sycamore-seeds",
    item_name: "The Sycamore Seeds: Early History of the Helicopter",
    category: "Helicopter History",
    quantity: 1,
    price: 15.99
  }]
}
```

## 📈 Conversion Goals Configuration

### Primary Conversions (Revenue)

1. **Book Purchases** - Set up in GA4 as conversion event
   - Event: `purchase`
   - Value: Dynamic (actual book price)
   - Currency: GBP

### Secondary Conversions (Lead Generation)

2. **Email Contact** - Custom conversion event
   - Event: `email_click`
   - Value: £5.00 (estimated lead value)

3. **eBay Redirects** - External sales tracking
   - Event: `ebay_redirect`
   - Value: £2.00 (estimated referral value)

### Micro Conversions (Engagement)

4. **Article Reading** - Content engagement
   - Event: `article_read`
   - Value: £0.50 (content engagement value)

5. **Resource Downloads** - Research engagement
   - Event: `resource_download`
   - Value: £1.00 (research value)

## 🎯 Custom Dimensions Setup

Configure these custom dimensions in GA4 Admin → Data Display → Custom Definitions:

| Dimension Name | Parameter | Scope | Description |
|---|---|---|---|
| Book Category | custom_parameter_1 | Event | Aviation book categories |
| Aviation Era | custom_parameter_2 | Event | Historical time periods |
| Research Topic | custom_parameter_3 | Event | Academic research areas |
| User Type | custom_parameter_4 | User | Researcher/Enthusiast/Student |
| Content Type | custom_parameter_5 | Event | Book/Article/Timeline/Resource |

## 📊 Key Reports to Monitor

### Revenue Reports

1. **Ecommerce Overview** - Total revenue and transactions
2. **Product Performance** - Top-selling books by category
3. **Purchase Behavior** - Cart abandonment and checkout funnel

### Content Reports

4. **Content Engagement** - Most read articles and time on page
5. **Site Search** - Internal search terms and results
6. **Page Value** - Content pages leading to conversions

### Audience Reports

7. **User Acquisition** - Traffic sources and channel performance
8. **User Retention** - Return visitor patterns
9. **Demographics** - Geographic and device insights

## 🔧 Advanced Configuration

### Attribution Settings

- **Attribution Model**: Data-driven (recommended)
- **Conversion Window**: 30 days click, 1 day view
- **Cross-domain Tracking**: Enabled for external payment flows

### Enhanced Measurement

Enable these features in GA4 Data Streams settings:

- ✅ Scrolls (90% depth)
- ✅ Outbound clicks
- ✅ Site search
- ✅ File downloads
- ✅ Page changes (SPA)

### Privacy and Compliance

- **IP Anonymization**: Enabled by default in GA4
- **Cookie Consent**: Implement if required by region
- **Data Retention**: Set to 14 months for business use

## 🎭 Audience Segments for Remarketing

Create these audiences for targeted marketing:

### Behavioral Segments

1. **Book Purchasers** - Users who completed purchases
2. **Cart Abandoners** - Added items but didn't purchase
3. **Research Users** - Engaged with academic resources
4. **Blog Readers** - Frequent article engagement

### Content Interest Segments

5. **Scottish Aviation Interest** - Viewed Scottish aviation content
6. **WWI/WWII Enthusiasts** - War aviation content engagement
7. **Helicopter History** - Rotorcraft content focus
8. **Academic Researchers** - Research resource users

## 📱 Event Tracking Reference

### Book-Related Events

```javascript
// Book page view
trackBookView({
  id: "sycamore-seeds",
  title: "The Sycamore Seeds",
  category: "Helicopter History",
  price: 15.99
});

// Add to cart
trackAddToCart({
  item_id: "sycamore-seeds",
  item_name: "The Sycamore Seeds",
  category: "Helicopter History",
  quantity: 1,
  price: 15.99
});
```

### Content Engagement Events

```javascript
// Article reading
trackBlogEngagement("Sopwith Camel Development", "WWI Aviation");

// Timeline interaction
trackTimelineInteraction("Great War Era 1914-1918");

// Resource access
trackResourceAccess("Aviation Bibliography");
```

### User Action Events

```javascript
// External redirects
trackEbayRedirect("The Sycamore Seeds");

// Contact interactions
trackContactEmail();

// Social sharing
trackSocialShare("twitter", "aviation-timeline");
```

## 🔍 Troubleshooting

### Common Issues

**Events not appearing in GA4:**
- Check Measurement ID is correct
- Verify website is deployed with latest code
- Use GA4 DebugView to test events

**Ecommerce data missing:**
- Confirm Enhanced Ecommerce is enabled
- Check transaction_id format and uniqueness
- Verify currency and value formatting

**Custom dimensions not populating:**
- Ensure custom dimensions are created in GA4 Admin
- Check parameter names match exactly
- Allow 24-48 hours for data processing

### Testing and Validation

1. **GA4 DebugView** - Real-time event testing
2. **Google Tag Assistant** - Tag validation
3. **Analytics Intelligence** - Automated insights
4. **Real-time Reports** - Live data verification

## 📈 Performance Optimization

### Site Speed Considerations

- Analytics scripts load `afterInteractive` to avoid blocking
- Event tracking is debounced to prevent spam
- Local storage used for user preferences

### Data Quality

- Transaction IDs include timestamp for uniqueness
- User interactions are validated before tracking
- Bot traffic filtering enabled in GA4 settings

## 🎯 Success Metrics

### Primary KPIs

- **Revenue**: Monthly book sales revenue
- **Conversion Rate**: Visitors to purchasers percentage
- **Average Order Value**: Revenue per transaction
- **Customer Lifetime Value**: Repeat purchase tracking

### Secondary KPIs

- **Content Engagement**: Time on page, scroll depth
- **Lead Generation**: Email contacts per month
- **Traffic Quality**: Bounce rate, session duration
- **Customer Acquisition**: Cost per acquisition by channel

---

## 📞 Support

For technical implementation questions:
- Review `/src/components/GoogleAnalytics.tsx` for code implementation
- Check `/src/hooks/useAnalytics.ts` for event tracking methods
- Consult `/src/config/analytics.ts` for configuration options

For Google Analytics 4 questions:
- [GA4 Help Center](https://support.google.com/analytics/)
- [GA4 Community](https://www.en.advertisercommunity.com/t5/Google-Analytics/ct-p/google-analytics)

---

**Last Updated**: January 30, 2025
**Version**: 1.0
**Website**: https://charlesmackaybooks.com
