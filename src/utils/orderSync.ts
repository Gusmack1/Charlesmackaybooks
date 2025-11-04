/**
 * Order Sync Utility
 * Syncs orders between localStorage (legacy) and OrderManagementService
 */

import { Order as LegacyOrder, getOrderHistory } from './orderUtils';
import { Order } from './orderManagement';
import { books } from '@/data/books';

/**
 * Convert legacy order format to new Order format
 */
export function convertLegacyOrderToNew(legacyOrder: LegacyOrder): Order {
  return {
    id: legacyOrder.orderId,
    customer: {
      firstName: legacyOrder.customerDetails.firstName,
      lastName: legacyOrder.customerDetails.lastName,
      email: legacyOrder.customerDetails.email,
      phone: legacyOrder.customerDetails.phone,
      address: {
        line1: legacyOrder.customerDetails.address1,
        line2: legacyOrder.customerDetails.address2,
        city: legacyOrder.customerDetails.city,
        state: legacyOrder.customerDetails.postcode,
        postalCode: legacyOrder.customerDetails.postcode,
        country: legacyOrder.customerDetails.country,
      },
    },
    items: legacyOrder.items.map(item => {
      const book = books.find(b => b.id === item.id) || {
        id: item.id,
        title: item.title,
        price: item.price,
        author: 'Charles E. MacKay',
        category: 'Aviation History',
        inStock: true,
      } as any;
      
      return {
        bookId: item.id,
        quantity: item.quantity,
        price: item.price,
        book,
      };
    }),
    subtotal: legacyOrder.subtotal,
    shipping: legacyOrder.shippingCost,
    total: legacyOrder.total,
    status: legacyOrder.status === 'paid' ? 'confirmed' : 
            legacyOrder.status === 'shipped' || legacyOrder.status === 'dispatched' ? 
            (legacyOrder.status === 'dispatched' ? 'dispatched' : 'shipped') : 
            legacyOrder.status === 'delivered' ? 'delivered' : 
            legacyOrder.status === 'cancelled' ? 'cancelled' : 'pending',
    paymentStatus: legacyOrder.status === 'paid' ? 'paid' : 'pending',
    paymentMethod: legacyOrder.paypalTransactionId ? 'paypal' : 'stripe',
    paypalOrderId: legacyOrder.paypalTransactionId,
    createdAt: new Date(legacyOrder.timestamp),
    updatedAt: new Date(legacyOrder.timestamp),
    trackingNumber: legacyOrder.trackingNumber,
    emailNotifications: {
      orderConfirmation: false,
      paymentConfirmation: false,
      dispatchConfirmation: false,
      shippingConfirmation: false,
      deliveryConfirmation: false,
    },
  };
}

/**
 * Get all orders from localStorage (for client-side use)
 */
export function getAllOrdersFromLocalStorage(): Order[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const orderHistory = getOrderHistory();
    if (!orderHistory || !Array.isArray(orderHistory)) {
      return [];
    }
    
    return orderHistory
      .filter(order => order && order.orderId) // Filter out invalid orders
      .map(convertLegacyOrderToNew)
      .filter(order => order && order.id); // Filter out invalid conversions
  } catch (error) {
    console.error('Error getting orders from localStorage:', error);
    return [];
  }
}

