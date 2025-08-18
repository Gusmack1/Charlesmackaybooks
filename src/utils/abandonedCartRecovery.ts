import { Book } from '@/types/book';

export interface CartItem {
  bookId: string;
  quantity: number;
  book: Book;
}

export interface AbandonedCart {
  id: string;
  customerEmail: string;
  customerName?: string;
  items: CartItem[];
  subtotal: number;
  abandonedAt: Date;
  lastEmailSent?: Date;
  emailSequence: number;
  recovered: boolean;
  recoveredAt?: Date;
  recoveryCode?: string;
  incentives: {
    discountApplied: boolean;
    discountAmount?: number;
    discountCode?: string;
    freeShippingApplied: boolean;
  };
}

export interface RecoveryEmail {
  subject: string;
  html: string;
  text: string;
  delayHours: number;
}

// Abandoned Cart Management
export class AbandonedCartRecovery {
  private static abandonedCarts: AbandonedCart[] = [];

  static async trackAbandonedCart(
    customerEmail: string,
    customerName: string | undefined,
    items: CartItem[],
    subtotal: number
  ): Promise<AbandonedCart> {
    const cart: AbandonedCart = {
      id: this.generateCartId(),
      customerEmail,
      customerName,
      items,
      subtotal,
      abandonedAt: new Date(),
      emailSequence: 0,
      recovered: false,
      recoveryCode: this.generateRecoveryCode(),
      incentives: {
        discountApplied: false,
        freeShippingApplied: false
      }
    };

    this.abandonedCarts.push(cart);
    
    // Schedule first recovery email
    setTimeout(() => {
      this.sendRecoveryEmail(cart.id, 1);
    }, 60 * 60 * 1000); // 1 hour delay

    return cart;
  }

  static async sendRecoveryEmail(cartId: string, sequenceNumber: number): Promise<boolean> {
    const cart = this.abandonedCarts.find(c => c.id === cartId);
    if (!cart || cart.recovered || cart.emailSequence >= 3) {
      return false;
    }

    const emailTemplate = this.getRecoveryEmailTemplate(cart, sequenceNumber);
    
    try {
      // In a real implementation, you would use an email service
      console.log(`Sending recovery email ${sequenceNumber} to ${cart.customerEmail}`);
      console.log('Subject:', emailTemplate.subject);
      
      cart.lastEmailSent = new Date();
      cart.emailSequence = sequenceNumber;

      // Schedule next email if not the last one
      if (sequenceNumber < 3) {
        const delayHours = sequenceNumber === 1 ? 24 : 48; // 24h, then 48h (72h total)
        setTimeout(() => {
          this.sendRecoveryEmail(cartId, sequenceNumber + 1);
        }, delayHours * 60 * 60 * 1000);
      }

      return true;
    } catch (error) {
      console.error('Failed to send recovery email:', error);
      return false;
    }
  }

  static async applyRecoveryIncentive(cartId: string): Promise<AbandonedCart | null> {
    const cart = this.abandonedCarts.find(c => c.id === cartId);
    if (!cart || cart.recovered) {
      return null;
    }

    // Apply progressive incentives based on email sequence
    if (cart.emailSequence >= 1 && !cart.incentives.discountApplied) {
      cart.incentives.discountApplied = true;
      cart.incentives.discountAmount = 5; // 5% discount for first email
      cart.incentives.discountCode = `RECOVER${cart.recoveryCode}`;
    }

    if (cart.emailSequence >= 2 && cart.incentives.discountAmount === 5) {
      cart.incentives.discountAmount = 7; // 7% discount for second email
    }

    if (cart.emailSequence >= 3 && cart.incentives.discountAmount === 7) {
      cart.incentives.discountAmount = 10; // 10% discount for final email
    }

    if (cart.emailSequence >= 3 && !cart.incentives.freeShippingApplied) {
      cart.incentives.freeShippingApplied = true;
    }

    return cart;
  }

  static async recoverCart(cartId: string): Promise<AbandonedCart | null> {
    const cart = this.abandonedCarts.find(c => c.id === cartId);
    if (!cart || cart.recovered) {
      return null;
    }

    cart.recovered = true;
    cart.recoveredAt = new Date();

    // Send recovery confirmation email
    await this.sendRecoveryConfirmation(cart);

    return cart;
  }

  static async getAbandonedCarts(): Promise<AbandonedCart[]> {
    return [...this.abandonedCarts];
  }

  static async getAbandonedCart(cartId: string): Promise<AbandonedCart | null> {
    return this.abandonedCarts.find(c => c.id === cartId) || null;
  }

  private static generateCartId(): string {
    return `AC-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
  }

  private static generateRecoveryCode(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  private static getRecoveryEmailTemplate(cart: AbandonedCart, sequenceNumber: number): RecoveryEmail {
    const itemsList = cart.items.map(item => 
      `• ${item.book.title} (Qty: ${item.quantity}) - £${(item.book.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const recoveryUrl = `https://charlesmackaybooks.com/checkout?recover=${cart.recoveryCode}`;
    
    let subject: string;
    let incentiveText = '';
    let urgencyText = '';

    switch (sequenceNumber) {
      case 1:
        subject = `Complete Your Order - ${cart.customerName || 'Aviation Enthusiast'}`;
        incentiveText = `
          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px; text-align: center;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">🎉 SPECIAL OFFER: 5% DISCOUNT</h3>
            <p style="color: #92400e; margin: 0;">Use code: <strong>RECOVER${cart.recoveryCode}</strong></p>
          </div>
        `;
        urgencyText = 'Your aviation history books are waiting for you!';
        break;
      case 2:
        subject = `Don't Miss Out: 7% Off Your Aviation Books`;
        incentiveText = `
          <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 8px; text-align: center;">
            <h3 style="color: #92400e; margin: 0 0 10px 0;">🎉 SPECIAL OFFER: 7% DISCOUNT</h3>
            <p style="color: #92400e; margin: 0;">Use code: <strong>RECOVER${cart.recoveryCode}</strong></p>
          </div>
        `;
        urgencyText = 'Limited time offer - don\'t miss out on these savings!';
        break;
      case 3:
        subject = `Final Chance: 10% Off + FREE Shipping`;
        incentiveText = `
          <div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 8px; text-align: center;">
            <h3 style="color: #1e40af; margin: 0 0 10px 0;">🚚 FREE WORLDWIDE SHIPPING + 10% OFF</h3>
            <p style="color: #1e40af; margin: 0;">Use code: <strong>RECOVER${cart.recoveryCode}</strong></p>
          </div>
        `;
        urgencyText = 'Last chance to complete your order with these exclusive benefits!';
        break;
      default:
        subject = `Complete Your Aviation Books Order`;
    }

    return {
      subject,
      delayHours: sequenceNumber === 1 ? 1 : sequenceNumber === 2 ? 24 : 72,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center;">
            <h1>Charles E. MacKay Aviation Books</h1>
            <h2>Complete Your Order</h2>
          </div>
          
          <div style="padding: 20px; background: #f8fafc;">
            <p>Dear ${cart.customerName || 'Aviation Enthusiast'},</p>
            
            <p>We noticed you left some amazing aviation history books in your cart!</p>
            
            <p style="font-weight: bold; color: #1e3a8a;">${urgencyText}</p>
            
            ${incentiveText}
            
            <div style="background: white; padding: 15px; margin: 20px 0; border-radius: 8px;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Your Cart Items:</h3>
              ${cart.items.map(item => `
                <div style="border-bottom: 1px solid #e5e7eb; padding: 10px 0;">
                  <p style="font-weight: bold; margin: 0;">${item.book.title}</p>
                  <p style="margin: 5px 0; color: #6b7280;">Quantity: ${item.quantity} | Price: £${item.book.price.toFixed(2)}</p>
                </div>
              `).join('')}
              <div style="border-top: 2px solid #1e3a8a; padding-top: 10px; margin-top: 10px;">
                <p style="font-weight: bold; font-size: 18px; margin: 0;">
                  Total: £${cart.subtotal.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${recoveryUrl}" style="background: #1e3a8a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Complete Your Order Now
              </a>
            </div>
            
            <p>Why choose Charles E. MacKay's books?</p>
            <ul style="color: #374151;">
              <li>✅ Expert aviation historian with decades of research</li>
              <li>✅ 100% accurate historical information</li>
              <li>✅ Beautiful, high-quality publications</li>
              <li>✅ Free worldwide shipping</li>
              <li>✅ 30-day money-back guarantee</li>
            </ul>
            
            <p>If you have any questions, please contact us at charlese1mackay@hotmail.com</p>
            
            <p>Best regards,<br>Charles E. MacKay<br>Aviation Historian & Author</p>
          </div>
          
          <div style="background: #1e3a8a; color: white; padding: 20px; text-align: center;">
            <p>© 2025 Charles E. MacKay Publishing. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `
Complete Your Order - Charles E. MacKay Aviation Books

Dear ${cart.customerName || 'Aviation Enthusiast'},

We noticed you left some amazing aviation history books in your cart!

${urgencyText}

Your Cart Items:
${itemsList}

Total: £${cart.subtotal.toFixed(2)}

Complete your order here: ${recoveryUrl}

Why choose Charles E. MacKay's books?
✅ Expert aviation historian with decades of research
✅ 100% accurate historical information
✅ Beautiful, high-quality publications
✅ Free worldwide shipping
✅ 30-day money-back guarantee

If you have any questions, please contact us at charlese1mackay@hotmail.com

Best regards,
Charles E. MacKay
Aviation Historian & Author
      `
    };
  }

  private static async sendRecoveryConfirmation(cart: AbandonedCart): Promise<boolean> {
    try {
      console.log(`Sending recovery confirmation to ${cart.customerEmail}`);
      return true;
    } catch (error) {
      console.error('Failed to send recovery confirmation:', error);
      return false;
    }
  }
}

// Cart abandonment tracking
export function trackCartAbandonment(
  customerEmail: string,
  customerName: string | undefined,
  items: CartItem[],
  subtotal: number
): void {
  // In a real implementation, you might want to delay this to avoid false positives
  setTimeout(() => {
    AbandonedCartRecovery.trackAbandonedCart(customerEmail, customerName, items, subtotal);
  }, 30 * 60 * 1000); // 30 minutes delay
}

// Recovery URL validation
export async function validateRecoveryCode(code: string): Promise<AbandonedCart | null> {
  const carts = await AbandonedCartRecovery.getAbandonedCarts();
  return carts.find(cart => cart.recoveryCode === code && !cart.recovered) || null;
}
