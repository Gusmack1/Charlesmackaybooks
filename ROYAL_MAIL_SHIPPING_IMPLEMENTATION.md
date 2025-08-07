# Royal Mail Shipping Implementation

## Overview
This document outlines the implementation of Royal Mail's current pricing structure (2024) for weight-based shipping calculations on the Charles Mackay Books website.

## Royal Mail Pricing Structure

### UK Domestic (1st Class)
| Weight Range | Service | Cost |
|--------------|---------|------|
| Up to 100g | Large Letter | £1.95 |
| 101-250g | Large Letter | £2.95 |
| 251-500g | Large Letter | £4.45 |
| Up to 1kg | Small Parcel | £4.79 |
| Up to 2kg | Small Parcel | £4.79 |
| Over 2kg | Standard Parcel | £6.50 |

### Europe (International)
| Weight Range | Service | Cost |
|--------------|---------|------|
| Up to 100g | Large Letter | £3.85 |
| 101-250g | Large Letter | £5.95 |
| 251-500g | Large Letter | £8.95 |
| Up to 1kg | Small Parcel | £15.85 |
| Up to 2kg | Small Parcel | £15.85 |
| Over 2kg | Standard Parcel | £25.00 |

### Rest of World (International)
| Weight Range | Service | Cost |
|--------------|---------|------|
| Up to 100g | Large Letter | £4.20 |
| 101-250g | Large Letter | £6.95 |
| 251-500g | Large Letter | £10.95 |
| Up to 1kg | Small Parcel | £18.85 |
| Up to 2kg | Small Parcel | £18.85 |
| Over 2kg | Standard Parcel | £30.00 |

## European Countries Covered
- France (FR), Germany (DE), Netherlands (NL), Belgium (BE)
- Spain (ES), Italy (IT), Ireland (IE), Austria (AT)
- Denmark (DK), Finland (FI), Norway (NO), Sweden (SE)
- Switzerland (CH), Portugal (PT), Greece (GR), Poland (PL)
- Czech Republic (CZ), Hungary (HU), Romania (RO), Bulgaria (BG)
- Croatia (HR), Slovenia (SI), Slovakia (SK), Estonia (EE)
- Latvia (LV), Lithuania (LT), Malta (MT), Cyprus (CY)
- Luxembourg (LU)

## Implementation Details

### 1. Cart Context (`CartContext.tsx`)
- `getShippingCost(country?: string)` - Calculates shipping based on total weight and destination
- Supports UK, Europe, and Rest of World pricing tiers
- Default weight of 300g for books without weight data

### 2. Shipping Calculator Component (`ShippingCalculator.tsx`)
- Interactive component for book pages
- Shows real-time shipping costs based on destination selection
- Displays Royal Mail service type and delivery times
- Supports 30+ countries with accurate pricing

### 3. Cart Sidebar (`CartSidebar.tsx`)
- Shows total weight of all items
- Displays shipping cost with weight information
- Indicates Royal Mail service type (Large Letter/Small Parcel)

### 4. Book Pages (`BookSalesTemplate.tsx`)
- Displays individual book weight
- Includes shipping calculator in sidebar
- Shows shipping information in product details

## Weight-Based Features

### Book Weight Display
- All books show weight in grams on product pages
- Weight information in cart items
- Total weight calculation for multiple items

### Shipping Cost Calculation
- Automatic calculation based on total order weight
- Country-specific pricing
- Service type indication (Large Letter/Small Parcel)

### Bulk Discounts
- 2+ books: 5% discount
- 3+ books: 10% discount
- 5+ books: 15% discount
- Applied before shipping costs

## Delivery Times
- **UK**: 3-5 working days (1st Class)
- **Europe**: 5-7 working days (International)
- **Rest of World**: 5-7 working days (International)

## Benefits
1. **Accurate Pricing**: Real Royal Mail rates ensure no profit loss
2. **Transparency**: Customers see exact shipping costs upfront
3. **International Support**: Covers major markets with proper pricing
4. **Weight Optimization**: Encourages efficient packaging
5. **Professional Service**: Clear service type and delivery expectations

## Future Enhancements
- Tracked shipping options
- Express delivery services
- Bulk shipping discounts for large orders
- Integration with Royal Mail API for real-time rates
- Shipping zone optimization

## Notes
- All prices are current as of 2024
- Prices may be updated annually by Royal Mail
- Default weight of 300g used for books without weight data
- Shipping costs are calculated per order, not per book
- Free shipping threshold can be implemented for orders over certain values 