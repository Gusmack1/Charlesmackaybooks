'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Lock, CreditCard, ShoppingBag, Truck, Gift } from 'lucide-react'

interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
  processingFee?: number
}

interface CustomerDetails {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  country: string
  postalCode: string
  phone?: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '💳',
    description: 'Pay securely with PayPal',
    processingFee: 0
  },
  {
    id: 'stripe',
    name: 'Credit/Debit Card',
    icon: '💳',
    description: 'Visa, Mastercard, American Express',
    processingFee: 0.029 // 2.9% + 30p
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'Direct bank transfer (UK only)',
    processingFee: 0
  },
  {
    id: 'ebay',
    name: 'eBay Purchase',
    icon: '🛒',
    description: 'Complete purchase through eBay',
    processingFee: 0
  }
]

export default function CheckoutComponent() {
  const { cartItems, getTotal, getTotalItems, clearCart } = useCart()
  const { trackBookPurchase } = useAnalytics()

  const [selectedPayment, setSelectedPayment] = useState<string>('paypal')
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'United Kingdom',
    postalCode: '',
    phone: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showAcademicDiscount, setShowAcademicDiscount] = useState(false)

  // Calculate pricing
  const subtotal = getTotal()
  const bulkDiscount = getTotalItems() >= 3 ? subtotal * 0.05 : 0
  const academicDiscount = showAcademicDiscount ? subtotal * 0.1 : 0
  const shippingCost = calculateShipping(customerDetails.country, getTotalItems())
  const processingFee = calculateProcessingFee(selectedPayment, subtotal)
  const totalAmount = subtotal - bulkDiscount - academicDiscount + shippingCost + processingFee

  function calculateShipping(country: string, itemCount: number): number {
    if (country === 'United Kingdom') {
      return itemCount <= 2 ? 3.45 : 4.95
    }
    if (['France', 'Germany', 'Spain', 'Italy', 'Netherlands'].includes(country)) {
      return itemCount <= 2 ? 4.95 : 8.95
    }
    return itemCount <= 2 ? 8.95 : 12.95
  }

  function calculateProcessingFee(method: string, amount: number): number {
    const paymentMethod = paymentMethods.find(pm => pm.id === method)
    if (!paymentMethod?.processingFee) return 0
    return amount * paymentMethod.processingFee + 0.30 // 2.9% + 30p for Stripe
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!customerDetails.email) newErrors.email = 'Email is required'
    if (!customerDetails.firstName) newErrors.firstName = 'First name is required'
    if (!customerDetails.lastName) newErrors.lastName = 'Last name is required'
    if (!customerDetails.address) newErrors.address = 'Address is required'
    if (!customerDetails.city) newErrors.city = 'City is required'
    if (!customerDetails.postalCode) newErrors.postalCode = 'Postal code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsProcessing(true)
    // Track checkout intent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'GBP',
        value: getTotal(),
        checkout_method: selectedPayment
      })
    }

    try {
      switch (selectedPayment) {
        case 'paypal':
          await processPayPalPayment()
          break
        case 'stripe':
          await processStripePayment()
          break
        case 'bank_transfer':
          await processBankTransfer()
          break
        case 'ebay':
          window.open('https://www.ebay.co.uk/usr/chaza87', '_blank')
          break
        default:
          throw new Error('Invalid payment method')
      }
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment processing failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const processPayPalPayment = async () => {
    // PayPal SDK integration
    const paypalOrderData = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'GBP',
          value: totalAmount.toFixed(2)
        },
        description: `Charles MacKay Aviation Books - ${getTotalItems()} items`,
        items: cartItems.map(item => ({
          name: item.title,
          unit_amount: {
            currency_code: 'GBP',
            value: item.price.toFixed(2)
          },
          quantity: '1'
        }))
      }],
      payer: {
        name: {
          given_name: customerDetails.firstName,
          surname: customerDetails.lastName
        },
        email_address: customerDetails.email,
        address: {
          address_line_1: customerDetails.address,
          admin_area_2: customerDetails.city,
          postal_code: customerDetails.postalCode,
          country_code: getCountryCode(customerDetails.country)
        }
      }
    }

    // This would normally integrate with PayPal SDK
    console.log('PayPal order data:', paypalOrderData)
    alert('PayPal integration would be implemented here')
  }

  const processStripePayment = async () => {
    // Stripe integration
    const stripeData = {
      amount: Math.round(totalAmount * 100), // Convert to pence
      currency: 'gbp',
      metadata: {
        customer_email: customerDetails.email,
        order_items: cartItems.map(item => item.title).join(', '),
        total_items: getTotalItems().toString()
      }
    }

    console.log('Stripe payment data:', stripeData)
    alert('Stripe integration would be implemented here')
  }

  const processBankTransfer = async () => {
    // Generate bank transfer instructions
    const transferDetails = {
      accountName: 'Charles E. MacKay',
      accountNumber: '12345678',
      sortCode: '12-34-56',
      reference: `ORDER-${Date.now()}`,
      amount: totalAmount.toFixed(2),
      customerEmail: customerDetails.email
    }

    console.log('Bank transfer details:', transferDetails)

    // Send email with bank transfer instructions
    alert(`Bank transfer instructions will be sent to ${customerDetails.email}`)
  }

  const getCountryCode = (country: string): string => {
    const countryCodes: Record<string, string> = {
      'United Kingdom': 'GB',
      'France': 'FR',
      'Germany': 'DE',
      'Spain': 'ES',
      'Italy': 'IT',
      'Netherlands': 'NL',
      'United States': 'US'
    }
    return countryCodes[country] || 'GB'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-600">by Charles E. MacKay</p>
                </div>
                <span className="font-semibold">£{item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({getTotalItems()} items):</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>

            {bulkDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Bulk Discount (5%):</span>
                <span>-£{bulkDiscount.toFixed(2)}</span>
              </div>
            )}

            {academicDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Academic Discount (10%):</span>
                <span>-£{academicDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                Shipping:
              </span>
              <span>£{shippingCost.toFixed(2)}</span>
            </div>

            {processingFee > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Processing Fee:</span>
                <span>£{processingFee.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>£{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {!showAcademicDiscount && (
            <button
              onClick={() => setShowAcademicDiscount(true)}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Gift className="h-4 w-4" />
              Apply Academic Discount (10%)
            </button>
          )}
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Checkout Details</h2>

          {/* Customer Information */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={customerDetails.firstName}
                  onChange={(e) => setCustomerDetails({...customerDetails, firstName: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={customerDetails.lastName}
                  onChange={(e) => setCustomerDetails({...customerDetails, lastName: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={customerDetails.email}
                onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={customerDetails.address}
                onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  value={customerDetails.city}
                  onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
                {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  value={customerDetails.postalCode}
                  onChange={(e) => setCustomerDetails({...customerDetails, postalCode: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
                {errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                value={customerDetails.country}
                onChange={(e) => setCustomerDetails({...customerDetails, country: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>United Kingdom</option>
                <option>France</option>
                <option>Germany</option>
                <option>Spain</option>
                <option>Italy</option>
                <option>Netherlands</option>
                <option>United States</option>
              </select>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Payment Method</h3>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <label key={method.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-3"
                  />
                  <span className="text-lg mr-2">{method.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                  {method.processingFee && (
                    <div className="text-xs text-gray-500">
                      +{(method.processingFee * 100).toFixed(1)}%
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Complete Order Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || cartItems.length === 0}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Lock className="h-5 w-5" />
            {isProcessing ? 'Processing...' : `Complete Order - £${totalAmount.toFixed(2)}`}
          </button>

          <div className="mt-4 text-xs text-gray-600 text-center">
            <Lock className="h-4 w-4 inline mr-1" />
            Your payment information is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  )
}
