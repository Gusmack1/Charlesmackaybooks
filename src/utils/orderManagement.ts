import { Book } from '@/types/book';
import { books } from '@/data/books';

export interface OrderItem {
  bookId: string;
  quantity: number;
  price: number;
  book: Book;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'dispatched' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer';
  paymentIntentId?: string;
  paypalOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  notes?: string;
    emailNotifications: {
    orderConfirmation: boolean;
    paymentConfirmation: boolean;
    dispatchConfirmation: boolean;
    shippingConfirmation: boolean;
    deliveryConfirmation: boolean;
  };
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

// Order ID Generation
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `CMB-${timestamp}-${random}`.toUpperCase();
}

// Order Validation
export function validateOrder(items: OrderItem[], customer: CustomerInfo): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate items
  if (!items || items.length === 0) {
    errors.push('Order must contain at least one item');
  }

  items.forEach((item, index) => {
    if (!item.bookId || !item.quantity || item.quantity <= 0) {
      errors.push(`Invalid item at position ${index + 1}`);
    }
    
    const book = books.find(b => b.id === item.bookId);
    if (!book) {
      errors.push(`Book not found: ${item.bookId}`);
    } else if (!book.inStock) {
      errors.push(`Book out of stock: ${book.title}`);
    }
  });

  // Validate customer info
  if (!customer.firstName?.trim()) errors.push('First name is required');
  if (!customer.lastName?.trim()) errors.push('Last name is required');
  if (!customer.email?.trim()) errors.push('Email is required');
  if (!customer.address?.line1?.trim()) errors.push('Address is required');
  if (!customer.address?.city?.trim()) errors.push('City is required');
  if (!customer.address?.postalCode?.trim()) errors.push('Postal code is required');
  if (!customer.address?.country?.trim()) errors.push('Country is required');

  return { valid: errors.length === 0, errors };
}

// Calculate Order Totals
export function calculateOrderTotals(items: OrderItem[]): { subtotal: number; shipping: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free worldwide shipping
  const total = subtotal + shipping;
  
  return { subtotal, shipping, total };
}

// Inventory Management
export function updateInventory(items: OrderItem[]): { success: boolean; errors: string[] } {
  const errors: string[] = [];
  
  items.forEach(item => {
    const book = books.find(b => b.id === item.bookId);
    if (book) {
      // In a real system, you'd update the database
      // For now, we'll just validate stock availability
      if (!book.inStock) {
        errors.push(`Book out of stock: ${book.title}`);
      }
    }
  });
  
  return { success: errors.length === 0, errors };
}

// Email Templates
export const emailTemplates = {
  orderConfirmation: (order: Order): EmailTemplate => ({
    subject: `Order Confirmation - ${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center;">
          <h1>Charles E. MacKay Aviation Books</h1>
          <h2>Order Confirmation</h2>
        </div>
        
        <div style="padding: 20px; background: #f8fafc;">
          <p>Dear ${order.customer.firstName} ${order.customer.lastName},</p>
          
          <p>Thank you for your order! We're excited to share our aviation history expertise with you.</p>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${order.createdAt.toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${order.status.toUpperCase()}</p>
          </div>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Items Ordered</h3>
            ${order.items.map(item => `
              <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0;">
                <p><strong>${item.book.title}</strong></p>
                <p>Quantity: ${item.quantity} | Price: £${item.price.toFixed(2)}</p>
              </div>
            `).join('')}
          </div>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Order Summary</h3>
            <p><strong>Subtotal:</strong> £${order.subtotal.toFixed(2)}</p>
            <p><strong>Shipping:</strong> FREE (Worldwide)</p>
            <p><strong>Total:</strong> £${order.total.toFixed(2)}</p>
          </div>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Shipping Address</h3>
            <p>${order.customer.address.line1}</p>
            ${order.customer.address.line2 ? `<p>${order.customer.address.line2}</p>` : ''}
            <p>${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.postalCode}</p>
            <p>${order.customer.address.country}</p>
          </div>
          
          <p>We'll send you another email once your order ships with tracking information.</p>
          
          <p>If you have any questions, please contact us at charlese1mackay@hotmail.com</p>
          
          <p>Best regards,<br>Charles E. MacKay<br>Aviation Historian & Author</p>
        </div>
        
        <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center;">
          <p>© 2025 Charles E. MacKay Publishing. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
Order Confirmation - ${order.id}

Dear ${order.customer.firstName} ${order.customer.lastName},

Thank you for your order! We're excited to share our aviation history expertise with you.

Order Details:
- Order ID: ${order.id}
- Date: ${order.createdAt.toLocaleDateString()}
- Status: ${order.status.toUpperCase()}

Items Ordered:
${order.items.map(item => `- ${item.book.title} (Qty: ${item.quantity}, Price: £${item.price.toFixed(2)})`).join('\n')}

Order Summary:
- Subtotal: £${order.subtotal.toFixed(2)}
- Shipping: FREE (Worldwide)
- Total: £${order.total.toFixed(2)}

Shipping Address:
${order.customer.address.line1}
${order.customer.address.line2 ? order.customer.address.line2 + '\n' : ''}${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.postalCode}
${order.customer.address.country}

We'll send you another email once your order ships with tracking information.

If you have any questions, please contact us at charlese1mackay@hotmail.com

Best regards,
Charles E. MacKay
Aviation Historian & Author
    `
  }),

  paymentConfirmation: (order: Order): EmailTemplate => ({
    subject: `Payment Confirmed - ${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #059669; color: white; padding: 20px; text-align: center;">
          <h1>Payment Confirmed</h1>
          <h2>Order ${order.id}</h2>
        </div>
        
        <div style="padding: 20px; background: #f8fafc;">
          <p>Dear ${order.customer.firstName} ${order.customer.lastName},</p>
          
          <p>Great news! Your payment has been successfully processed.</p>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Payment Details</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Amount Paid:</strong> £${order.total.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>Your order is now being processed and will ship within 1-2 business days.</p>
          
          <p>We'll send you tracking information as soon as your order ships.</p>
          
          <p>Thank you for choosing Charles E. MacKay Aviation Books!</p>
          
          <p>Best regards,<br>Charles E. MacKay</p>
        </div>
      </div>
    `,
    text: `
Payment Confirmed - ${order.id}

Dear ${order.customer.firstName} ${order.customer.lastName},

Great news! Your payment has been successfully processed.

Payment Details:
- Order ID: ${order.id}
- Amount Paid: £${order.total.toFixed(2)}
- Payment Method: ${order.paymentMethod.toUpperCase()}
- Date: ${new Date().toLocaleDateString()}

Your order is now being processed and will ship within 1-2 business days.

We'll send you tracking information as soon as your order ships.

Thank you for choosing Charles E. MacKay Aviation Books!

Best regards,
Charles E. MacKay
    `
  }),

  dispatchConfirmation: (order: Order): EmailTemplate => ({
    subject: `Your Order Has Been Dispatched - ${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #7c3aed; color: white; padding: 20px; text-align: center;">
          <h1>Your Order Has Been Dispatched!</h1>
          <h2>Order ${order.id}</h2>
        </div>
        
        <div style="padding: 20px; background: #f8fafc;">
          <p>Dear ${order.customer.firstName} ${order.customer.lastName},</p>
          
          <p>Great news! Your aviation history books have been dispatched and are on their way to you.</p>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Dispatch Information</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Dispatch Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Tracking Number:</strong> ${order.trackingNumber || 'Will be provided once available'}</p>
            <p><strong>Estimated Delivery:</strong> ${order.estimatedDelivery?.toLocaleDateString() || '3-5 business days'}</p>
            <p><strong>Shipping Method:</strong> Royal Mail International</p>
          </div>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Items Dispatched</h3>
            ${order.items.map(item => `
              <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0;">
                <p><strong>${item.book.title}</strong></p>
                <p>Quantity: ${item.quantity}</p>
              </div>
            `).join('')}
          </div>
          
          <p>Your books will be delivered to:</p>
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <p>${order.customer.address.line1}</p>
            ${order.customer.address.line2 ? `<p>${order.customer.address.line2}</p>` : ''}
            <p>${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.postalCode}</p>
            <p>${order.customer.address.country}</p>
          </div>
          
          <p>You can track your order status at any time using your order ID: <strong>${order.id}</strong></p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="https://charlesmackaybooks.com/order-tracking" style="display: inline-block; padding: 12px 24px; background: #7c3aed; color: white; text-decoration: none; border-radius: 8px;">Track Your Order</a>
          </p>
          
          <p>We hope you enjoy diving into the fascinating world of aviation history!</p>
          
          <p>Best regards,<br>Charles E. MacKay</p>
        </div>
      </div>
    `,
    text: `
Your Order Has Been Dispatched - ${order.id}

Dear ${order.customer.firstName} ${order.customer.lastName},

Great news! Your aviation history books have been dispatched and are on their way to you.

Dispatch Information:
- Order ID: ${order.id}
- Dispatch Date: ${new Date().toLocaleDateString()}
- Tracking Number: ${order.trackingNumber || 'Will be provided once available'}
- Estimated Delivery: ${order.estimatedDelivery?.toLocaleDateString() || '3-5 business days'}
- Shipping Method: Royal Mail International

Items Dispatched:
${order.items.map(item => `- ${item.book.title} (Qty: ${item.quantity})`).join('\n')}

Your books will be delivered to:
${order.customer.address.line1}
${order.customer.address.line2 ? order.customer.address.line2 + '\n' : ''}${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.postalCode}
${order.customer.address.country}

You can track your order status at any time using your order ID: ${order.id}
Visit: https://charlesmackaybooks.com/order-tracking

We hope you enjoy diving into the fascinating world of aviation history!

Best regards,
Charles E. MacKay
    `
  }),

  shippingConfirmation: (order: Order): EmailTemplate => ({
    subject: `Your Order Has Shipped - ${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1>Your Order Has Shipped!</h1>
          <h2>Order ${order.id}</h2>
        </div>
        
        <div style="padding: 20px; background: #f8fafc;">
          <p>Dear ${order.customer.firstName} ${order.customer.lastName},</p>
          
          <p>Your aviation history books are on their way to you!</p>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Shipping Information</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Tracking Number:</strong> ${order.trackingNumber || 'Will be provided by courier'}</p>
            <p><strong>Estimated Delivery:</strong> ${order.estimatedDelivery?.toLocaleDateString() || '3-5 business days'}</p>
            <p><strong>Shipping Method:</strong> Royal Mail International</p>
          </div>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Items Shipped</h3>
            ${order.items.map(item => `
              <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0;">
                <p><strong>${item.book.title}</strong></p>
                <p>Quantity: ${item.quantity}</p>
              </div>
            `).join('')}
          </div>
          
          <p>Your books will be delivered to:</p>
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <p>${order.customer.address.line1}</p>
            ${order.customer.address.line2 ? `<p>${order.customer.address.line2}</p>` : ''}
            <p>${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.postalCode}</p>
            <p>${order.customer.address.country}</p>
          </div>
          
          <p>We hope you enjoy diving into the fascinating world of aviation history!</p>
          
          <p>Best regards,<br>Charles E. MacKay</p>
        </div>
      </div>
    `,
    text: `
Your Order Has Shipped - ${order.id}

Dear ${order.customer.firstName} ${order.customer.lastName},

Your aviation history books are on their way to you!

Shipping Information:
- Order ID: ${order.id}
- Tracking Number: ${order.trackingNumber || 'Will be provided by courier'}
- Estimated Delivery: ${order.estimatedDelivery?.toLocaleDateString() || '3-5 business days'}
- Shipping Method: Royal Mail International

Items Shipped:
${order.items.map(item => `- ${item.book.title} (Qty: ${item.quantity})`).join('\n')}

Your books will be delivered to:
${order.customer.address.line1}
${order.customer.address.line2 ? order.customer.address.line2 + '\n' : ''}${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.postalCode}
${order.customer.address.country}

We hope you enjoy diving into the fascinating world of aviation history!

Best regards,
Charles E. MacKay
    `
  }),

  deliveryConfirmation: (order: Order): EmailTemplate => ({
    subject: `Your Order Has Been Delivered - ${order.id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #059669; color: white; padding: 20px; text-align: center;">
          <h1>Your Order Has Been Delivered!</h1>
          <h2>Order ${order.id}</h2>
        </div>
        
        <div style="padding: 20px; background: #f8fafc;">
          <p>Dear ${order.customer.firstName} ${order.customer.lastName},</p>
          
          <p>Your aviation history books have been successfully delivered!</p>
          
          <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <h3>Delivery Confirmation</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Delivery Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Tracking Number:</strong> ${order.trackingNumber || 'N/A'}</p>
          </div>
          
          <p>We hope you enjoy your new aviation history books! If you have any questions or would like to share your thoughts, please don't hesitate to contact us.</p>
          
          <p>Thank you for choosing Charles E. MacKay Aviation Books!</p>
          
          <p>Best regards,<br>Charles E. MacKay</p>
        </div>
      </div>
    `,
    text: `
Your Order Has Been Delivered - ${order.id}

Dear ${order.customer.firstName} ${order.customer.lastName},

Your aviation history books have been successfully delivered!

Delivery Confirmation:
- Order ID: ${order.id}
- Delivery Date: ${new Date().toLocaleDateString()}
- Tracking Number: ${order.trackingNumber || 'N/A'}

We hope you enjoy your new aviation history books! If you have any questions or would like to share your thoughts, please don't hesitate to contact us.

Thank you for choosing Charles E. MacKay Aviation Books!

Best regards,
Charles E. MacKay
    `
  })
};

// Email Service (Mock implementation - replace with actual email service)
export class EmailService {
  static async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        console.log('Email would be sent to:', to);
        console.log('Subject:', template.subject);
        return true; // Server-side: just log
      }
      
      // Create mailto link with pre-filled email
      const subject = encodeURIComponent(template.subject);
      const body = encodeURIComponent(template.text || template.html.replace(/<[^>]*>/g, ''));
      
      // Open email client with pre-filled email
      const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');
      
      console.log('Email opened for:', to);
      console.log('Subject:', template.subject);
      
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  static async sendOrderConfirmation(order: Order): Promise<boolean> {
    const template = emailTemplates.orderConfirmation(order);
    return this.sendEmail(order.customer.email, template);
  }

  static async sendPaymentConfirmation(order: Order): Promise<boolean> {
    const template = emailTemplates.paymentConfirmation(order);
    return this.sendEmail(order.customer.email, template);
  }

  static async sendDispatchConfirmation(order: Order): Promise<boolean> {
    const template = emailTemplates.dispatchConfirmation(order);
    return this.sendEmail(order.customer.email, template);
  }

  static async sendShippingConfirmation(order: Order): Promise<boolean> {
    const template = emailTemplates.shippingConfirmation(order);
    return this.sendEmail(order.customer.email, template);
  }

  static async sendDeliveryConfirmation(order: Order): Promise<boolean> {
    const template = emailTemplates.deliveryConfirmation(order);
    return this.sendEmail(order.customer.email, template);
  }

  static async sendAdminNotification(order: Order, notificationType: 'new_order' | 'payment_received'): Promise<boolean> {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        console.log('Admin notification would be sent:', notificationType);
        return true; // Server-side: just log
      }
      
      const adminEmail = 'charlese1mackay@hotmail.com';
      let subject: string;
      let body: string;

      if (notificationType === 'new_order') {
        subject = `NEW ORDER RECEIVED - ${order.id} - £${order.total.toFixed(2)}`;
        body = `
NEW ORDER RECEIVED

Order ID: ${order.id}
Customer: ${order.customer.firstName} ${order.customer.lastName}
Email: ${order.customer.email}
Phone: ${order.customer.phone || 'N/A'}
Payment Method: ${order.paymentMethod?.toUpperCase() || 'Unknown'}
Total: £${order.total.toFixed(2)}
Status: ${order.status.toUpperCase()}
Payment Status: ${order.paymentStatus.toUpperCase()}

ITEMS:
${order.items.map(item => `- ${item.book.title} (Qty: ${item.quantity}) - £${(item.price * item.quantity).toFixed(2)}`).join('\n')}

SHIPPING ADDRESS:
${order.customer.address.line1}
${order.customer.address.line2 || ''}
${order.customer.address.city}, ${order.customer.address.postalCode}
${order.customer.address.country}

View order: https://charlesmackaybooks.com/admin/orders/
        `.trim();
      } else {
        subject = `PAYMENT RECEIVED - ${order.id} - £${order.total.toFixed(2)}`;
        body = `
PAYMENT RECEIVED - PayPal Purchase

Order ID: ${order.id}
Customer: ${order.customer.firstName} ${order.customer.lastName}
Email: ${order.customer.email}
Payment Method: PayPal
Amount: £${order.total.toFixed(2)}
Payment Status: PAID

ITEMS:
${order.items.map(item => `- ${item.book.title} (Qty: ${item.quantity}) - £${(item.price * item.quantity).toFixed(2)}`).join('\n')}

This order is now ready for processing.

View order: https://charlesmackaybooks.com/admin/orders/
        `.trim();
      }

      const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');
      
      console.log('Admin notification sent:', notificationType);
      return true;
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      return false;
    }
  }
}

// Order Management Service
export class OrderManagementService {
  private static orders: Order[] = [];

  static async createOrder(
    items: OrderItem[],
    customer: CustomerInfo,
    paymentMethod: 'stripe' | 'paypal' | 'bank_transfer',
    paymentIntentId?: string,
    paypalOrderId?: string
  ): Promise<Order> {
    // Validate order
    const validation = validateOrder(items, customer);
    if (!validation.valid) {
      throw new Error(`Order validation failed: ${validation.errors.join(', ')}`);
    }

    // Calculate totals
    const totals = calculateOrderTotals(items);

    // Create order
    const order: Order = {
      id: generateOrderId(),
      customer,
      items,
      ...totals,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod,
      paymentIntentId,
      paypalOrderId,
      createdAt: new Date(),
      updatedAt: new Date(),
      emailNotifications: {
        orderConfirmation: false,
        paymentConfirmation: false,
        dispatchConfirmation: false,
        shippingConfirmation: false,
        deliveryConfirmation: false
      }
    };

    // Store order
    this.orders.push(order);

    // Send order confirmation email
    await EmailService.sendOrderConfirmation(order);
    order.emailNotifications.orderConfirmation = true;

    // Send admin notification for new order
    await EmailService.sendAdminNotification(order, 'new_order');

    return order;
  }

  static async confirmPayment(orderId: string, paymentIntentId?: string): Promise<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.paymentStatus = 'paid';
    order.status = 'confirmed';
    order.updatedAt = new Date();
    if (paymentIntentId) {
      order.paymentIntentId = paymentIntentId;
    }

    // Send payment confirmation email
    await EmailService.sendPaymentConfirmation(order);
    order.emailNotifications.paymentConfirmation = true;

    // Send admin notification for PayPal payment received
    if (order.paymentMethod === 'paypal') {
      await EmailService.sendAdminNotification(order, 'payment_received');
    }

    return order;
  }

  static async processOrder(orderId: string): Promise<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.paymentStatus !== 'paid') {
      throw new Error('Cannot process unpaid order');
    }

    order.status = 'processing';
    order.updatedAt = new Date();

    return order;
  }

  static async dispatchOrder(orderId: string, trackingNumber?: string): Promise<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.paymentStatus !== 'paid') {
      throw new Error('Cannot dispatch unpaid order');
    }

    order.status = 'dispatched';
    order.trackingNumber = trackingNumber;
    order.estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    order.updatedAt = new Date();

    // Send dispatch confirmation email automatically
    await EmailService.sendDispatchConfirmation(order);
    order.emailNotifications.dispatchConfirmation = true;

    return order;
  }

  static async shipOrder(orderId: string, trackingNumber?: string): Promise<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = 'shipped';
    order.trackingNumber = trackingNumber;
    order.estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    order.updatedAt = new Date();

    // Send shipping confirmation email
    await EmailService.sendShippingConfirmation(order);
    order.emailNotifications.shippingConfirmation = true;

    return order;
  }

  static async deliverOrder(orderId: string): Promise<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = 'delivered';
    order.updatedAt = new Date();

    // Send delivery confirmation email
    await EmailService.sendDeliveryConfirmation(order);
    order.emailNotifications.deliveryConfirmation = true;

    return order;
  }

  static async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Mark order as cancelled - this should persist
    order.status = 'cancelled';
    order.paymentStatus = order.paymentStatus === 'paid' ? 'refunded' : order.paymentStatus; // If paid, mark as refunded
    order.notes = reason;
    order.updatedAt = new Date();

    return order;
  }

  static async syncOrder(order: Order): Promise<Order> {
    // Check if order already exists
    const existingOrder = this.orders.find(o => o.id === order.id);
    if (existingOrder) {
      // Preserve critical fields before updating
      const preservePaymentStatus = existingOrder.paymentStatus === 'paid' && order.paymentStatus === 'pending';
      const preserveAdvancedStatus = existingOrder.status === 'confirmed' || existingOrder.status === 'processing' || 
                                    existingOrder.status === 'dispatched' || existingOrder.status === 'shipped' || 
                                    existingOrder.status === 'delivered';
      const originalStatus = existingOrder.status;
      const originalPaymentStatus = existingOrder.paymentStatus;
      
      // Update existing order with new data
      Object.assign(existingOrder, order);
      existingOrder.updatedAt = new Date();
      
      // Restore preserved payment status if needed (don't overwrite paid with pending)
      if (preservePaymentStatus) {
        existingOrder.paymentStatus = originalPaymentStatus; // 'paid'
      }
      
      // Restore preserved status if new status is less advanced
      if (preserveAdvancedStatus) {
        const statusHierarchy: Record<string, number> = {
          'pending': 0,
          'confirmed': 1,
          'processing': 2,
          'dispatched': 3,
          'shipped': 3,
          'delivered': 4,
          'cancelled': -1
        };
        const existingLevel = statusHierarchy[originalStatus] || 0;
        const newLevel = statusHierarchy[order.status] || 0;
        if (newLevel < existingLevel && order.status !== 'cancelled') {
          // Don't downgrade status - keep the more advanced status
          existingOrder.status = originalStatus;
        }
      }
      
      return existingOrder;
    }

    // Ensure dates are Date objects
    const syncedOrder: Order = {
      ...order,
      createdAt: order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt),
      updatedAt: order.updatedAt instanceof Date ? order.updatedAt : new Date(order.updatedAt),
      estimatedDelivery: order.estimatedDelivery ? (order.estimatedDelivery instanceof Date ? order.estimatedDelivery : new Date(order.estimatedDelivery)) : undefined,
    };

    // Add new order
    this.orders.push(syncedOrder);
    return syncedOrder;
  }

  static async getOrder(orderId: string): Promise<Order | null> {
    return this.orders.find(o => o.id === orderId) || null;
  }

  static async getOrdersByEmail(email: string): Promise<Order[]> {
    return this.orders.filter(o => o.customer.email === email);
  }

  static async getAllOrders(): Promise<Order[]> {
    return [...this.orders];
  }
}
