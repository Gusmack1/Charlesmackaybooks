export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  isbn?: string;
}

export interface Order {
  orderId: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  timestamp: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'failed';
  paypalTransactionId?: string;
  trackingNumber?: string;
}

export interface ShippingRates {
  [key: string]: number;
}

// Royal Mail weight-based shipping calculation
export function calculateShippingByWeight(totalWeight: number, country: string): number {
  // Site-wide policy: FREE worldwide shipping
  return 0;
}

// Legacy shipping rates for backwards compatibility (using average book weight of 350g)
export const shippingRates: ShippingRates = {
  GB: 0,
  FR: 0, DE: 0, NL: 0, BE: 0, ES: 0, IT: 0,
  AT: 0, PT: 0, IE: 0, DK: 0, SE: 0, FI: 0,
  PL: 0, CZ: 0, HU: 0, SK: 0, SI: 0, HR: 0,
  EE: 0, LV: 0, LT: 0, LU: 0, MT: 0, CY: 0,
  BG: 0, RO: 0, NO: 0, CH: 0, GR: 0,
  US: 0, CA: 0,
  AU: 0, NZ: 0,
  worldwide: 0
};

export const euCountries = [
  'FR', 'DE', 'NL', 'BE', 'ES', 'IT', 'AT', 'PT', 'IE', 'DK', 'SE', 'FI',
  'PL', 'CZ', 'HU', 'SK', 'SI', 'HR', 'EE', 'LV', 'LT', 'LU', 'MT', 'CY',
  'BG', 'RO', 'NO', 'CH', 'GR'
];

export function calculateShipping(country: string): number {
  return 0;
}

export function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CM-${timestamp}-${random}`;
}

export function saveOrder(order: Order): void {
  try {
    localStorage.setItem(`order_${order.orderId}`, JSON.stringify(order));

    // Also save to order history
    const orderHistory = getOrderHistory();
    orderHistory.unshift(order); // Add to beginning
    localStorage.setItem('charles_mackay_order_history', JSON.stringify(orderHistory.slice(0, 50))); // Keep last 50 orders
  } catch (error) {
    console.error('Error saving order:', error);
  }
}

export function getOrder(orderId: string): Order | null {
  try {
    const orderData = localStorage.getItem(`order_${orderId}`);
    return orderData ? JSON.parse(orderData) : null;
  } catch (error) {
    console.error('Error retrieving order:', error);
    return null;
  }
}

export function getOrderHistory(): Order[] {
  try {
    const historyData = localStorage.getItem('charles_mackay_order_history');
    return historyData ? JSON.parse(historyData) : [];
  } catch (error) {
    console.error('Error retrieving order history:', error);
    return [];
  }
}

export function updateOrderStatus(orderId: string, status: Order['status'], paypalTransactionId?: string, trackingNumber?: string): void {
  const order = getOrder(orderId);
  if (order) {
    order.status = status;
    if (paypalTransactionId) order.paypalTransactionId = paypalTransactionId;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    saveOrder(order);
  }
}

export function generatePayPalUrl(order: Order): string {
  const baseUrl = 'https://www.paypal.com/cgi-bin/webscr';

  // Create item details for PayPal
  const itemParams = order.items.map((item, index) => {
    const num = index + 1;
    return [
      `item_name_${num}=${encodeURIComponent(item.title)}`,
      `item_number_${num}=${encodeURIComponent(item.isbn || item.id)}`,
      `amount_${num}=${item.price.toFixed(2)}`,
      `quantity_${num}=${item.quantity}`
    ].join('&');
  }).join('&');

  const params = [
    'cmd=_cart',
    'upload=1',
    'business=charlese1mackay@hotmail.com',
    `invoice=${order.orderId}`,
    `custom=${order.orderId}`,
    'currency_code=GBP',
    'no_shipping=2',
    `handling_cart=0.00`,
    `return=${encodeURIComponent(window.location.origin + '/payment-success')}`,
    `cancel_return=${encodeURIComponent(window.location.origin + '/payment-cancelled')}`,
    `notify_url=${encodeURIComponent(window.location.origin + '/api/paypal-ipn')}`,
    'rm=2',
    itemParams
  ].filter(Boolean).join('&');

  return `${baseUrl}?${params}`;
}

// Function to send email notification to admin about new order
export function notifyAdminOfNewOrder(order: Order): void {
  const subject = encodeURIComponent(`New Order - ${order.orderId} - £${order.total.toFixed(2)}`);
  const body = encodeURIComponent(`
NEW ORDER RECEIVED

Order ID: ${order.orderId}
Customer: ${order.customerDetails.firstName} ${order.customerDetails.lastName}
Email: ${order.customerDetails.email}
Total: £${order.total.toFixed(2)}
Items: ${order.items.length}

Full Details:
${generateEmailReceipt(order)}
  `);
  
  // Open email client with pre-filled notification
  window.open(`mailto:charlese1mackay@hotmail.com?subject=${subject}&body=${body}`);
}

// Function to automatically send receipt to customer
export function sendReceiptToCustomer(order: Order): void {
  const subject = encodeURIComponent(`Order Confirmation - ${order.orderId} - Charles E. MacKay Aviation Books`);
  const body = encodeURIComponent(generateEmailReceipt(order));
  
  // Open email client with pre-filled receipt
  window.open(`mailto:${order.customerDetails.email}?subject=${subject}&body=${body}`);
}

export function generateEmailReceipt(order: Order): string {
  const itemsText = order.items.map(item =>
    `- ${item.title} (£${item.price.toFixed(2)} x ${item.quantity} = £${(item.price * item.quantity).toFixed(2)})`
  ).join('\n');

  return `
ORDER CONFIRMATION - Charles E. MacKay Aviation Books

Order ID: ${order.orderId}
Order Date: ${new Date(order.timestamp).toLocaleDateString('en-GB')}
Status: ${order.status.toUpperCase()}

CUSTOMER DETAILS:
${order.customerDetails.firstName} ${order.customerDetails.lastName}
${order.customerDetails.email}
${order.customerDetails.phone}

SHIPPING ADDRESS:
${order.customerDetails.address1}
${order.customerDetails.address2 ? order.customerDetails.address2 + '\n' : ''}${order.customerDetails.city}, ${order.customerDetails.postcode}
${order.customerDetails.country}

ORDER ITEMS:
${itemsText}

PRICING:
Subtotal: £${order.subtotal.toFixed(2)}
Shipping: £${order.shippingCost.toFixed(2)}
Total: £${order.total.toFixed(2)}

${order.paypalTransactionId ? `PayPal Transaction ID: ${order.paypalTransactionId}\n` : ''}
${order.trackingNumber ? `Tracking Number: ${order.trackingNumber}\n` : ''}

Thank you for your order!

Charles E. MacKay
Aviation Historian & Author
charlese1mackay@hotmail.com
Glasgow, Scotland
`;
}

export function validateCustomerDetails(details: CustomerDetails): string[] {
  const errors: string[] = [];

  if (!details.firstName.trim()) errors.push('First name is required');
  if (!details.lastName.trim()) errors.push('Last name is required');
  if (!details.email.trim()) errors.push('Email is required');
  if (!details.email.includes('@')) errors.push('Valid email is required');
  if (!details.address1.trim()) errors.push('Address is required');
  if (!details.city.trim()) errors.push('City is required');
  if (!details.postcode.trim()) errors.push('Postcode/ZIP is required');
  if (!details.country.trim()) errors.push('Country is required');

  return errors;
}

export function generateReceipt(order: Order): string {
  const currentDate = new Date().toLocaleDateString('en-GB');
  const vatRate = 0.20; // 20% VAT
  const subtotalBeforeVAT = order.subtotal / (1 + vatRate);
  const vatAmount = order.subtotal - subtotalBeforeVAT;
  const shippingVAT = order.shippingCost / (1 + vatRate);
  const shippingVATAmount = order.shippingCost - shippingVAT;
  const totalVAT = vatAmount + shippingVATAmount;

  return `
<!DOCTYPE html>
<html>
<head>
    <title>VAT Receipt - Order ${order.orderId}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .company-details { margin-bottom: 30px; }
        .order-details { margin-bottom: 30px; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .items-table th { background-color: #f2f2f2; }
        .totals { margin-left: auto; width: 300px; }
        .totals table { width: 100%; }
        .totals td { padding: 5px; }
        .total-row { font-weight: bold; border-top: 2px solid #333; }
        .vat-section { background-color: #f9f9f9; padding: 15px; margin: 20px 0; border: 1px solid #ddd; }
        .footer { margin-top: 40px; font-size: 12px; color: #666; text-align: center; }
        @media print { .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>VAT RECEIPT</h1>
        <h2>Charles E. MacKay - Aviation Historian & Author</h2>
        <p>Specialist in Scottish Aviation History • WWI & WWII Aircraft</p>
    </div>

    <div class="company-details">
        <h3>Seller Details:</h3>
        <p><strong>Charles E. MacKay</strong><br>
        Aviation Historian & Author<br>
        Glasgow, Scotland<br>
        Email: charlese1mackay@hotmail.com<br>
        VAT Registration Number: GB123456789</p>
    </div>

    <div class="order-details">
        <h3>Invoice Details:</h3>
        <p><strong>Order ID:</strong> ${order.orderId}<br>
        <strong>Date:</strong> ${currentDate}<br>
        <strong>Status:</strong> ${order.status.toUpperCase()}</p>

        <h3>Customer Details:</h3>
        <p><strong>${order.customerDetails.firstName} ${order.customerDetails.lastName}</strong><br>
        ${order.customerDetails.address1}<br>
        ${order.customerDetails.address2 ? order.customerDetails.address2 + '<br>' : ''}
        ${order.customerDetails.city}<br>
        ${order.customerDetails.postcode}<br>
        ${order.customerDetails.country}<br>
        Email: ${order.customerDetails.email}</p>
    </div>

    <table class="items-table">
        <thead>
            <tr>
                <th>Item Description</th>
                <th>ISBN</th>
                <th>Qty</th>
                <th>Unit Price (inc. VAT)</th>
                <th>Total (inc. VAT)</th>
            </tr>
        </thead>
        <tbody>
            ${order.items.map(item => `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.isbn || 'N/A'}</td>
                    <td>${item.quantity}</td>
                    <td>£${item.price.toFixed(2)}</td>
                    <td>£${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="vat-section">
        <h3>VAT Breakdown:</h3>
        <table style="width: 100%;">
            <tr>
                <td>Books Subtotal (exc. VAT):</td>
                <td style="text-align: right;">£${subtotalBeforeVAT.toFixed(2)}</td>
            </tr>
            <tr>
                <td>VAT on Books (20%):</td>
                <td style="text-align: right;">£${vatAmount.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Shipping (exc. VAT):</td>
                <td style="text-align: right;">£${shippingVAT.toFixed(2)}</td>
            </tr>
            <tr>
                <td>VAT on Shipping (20%):</td>
                <td style="text-align: right;">£${shippingVATAmount.toFixed(2)}</td>
            </tr>
            <tr style="border-top: 1px solid #333; font-weight: bold;">
                <td>Total VAT:</td>
                <td style="text-align: right;">£${totalVAT.toFixed(2)}</td>
            </tr>
        </table>
    </div>

    <div class="totals">
        <table>
            <tr>
                <td>Subtotal:</td>
                <td style="text-align: right;">£${order.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Shipping:</td>
                <td style="text-align: right;">£${order.shippingCost.toFixed(2)}</td>
            </tr>
            <tr class="total-row">
                <td>Total:</td>
                <td style="text-align: right;">£${order.total.toFixed(2)}</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        <p>Thank you for your purchase of authentic aviation history books.</p>
        <p>All books are dispatched within 1-2 business days via Royal Mail.</p>
        <p class="no-print">
            <button onclick="window.print()">Print Receipt</button>
            <button onclick="emailReceipt()">Email Receipt</button>
        </p>
    </div>

    <script>
        function emailReceipt() {
            const subject = encodeURIComponent('VAT Receipt - Order ${order.orderId}');
            const body = encodeURIComponent('Please find attached your VAT receipt for order ${order.orderId}. If you need any assistance, please contact us at charlese1mackay@hotmail.com');
            window.location.href = 'mailto:${order.customerDetails.email}?subject=' + subject + '&body=' + body;
        }
    </script>
</body>
</html>
  `.trim();
}
