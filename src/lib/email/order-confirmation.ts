// Order confirmation email — single source of truth.
// Renders HTML + plain-text from a typed payload. Mirrors the
// docs/email-templates/order-confirmation.{html,txt} reference but is the
// actual code path used by /api/stripe/webhook on checkout.session.completed.

export interface OrderEmailItem {
  id: string;
  title: string;
  qty: number;
  unitPricePence: number;
}

export interface OrderEmailData {
  customerFirstName: string;
  orderNumber: string;
  orderDate: string;
  items: OrderEmailItem[];
  subtotalPence: number;
  discountPence: number;
  shippingPence: number;
  totalPence: number;
  shippingZoneName: string;
  shippingMinDays: number;
  shippingMaxDays: number;
  shippingAddress: {
    name: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  orderStatusUrl: string | null;
}

const gbp = (p: number) => `£${(p / 100).toFixed(2)}`;

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function addressBlock(a: OrderEmailData['shippingAddress']): string[] {
  return [a.name, a.line1, a.line2, a.city, a.state, a.postcode, a.country].filter(Boolean);
}

function deliveryEstimate(d: OrderEmailData): string {
  return `${d.shippingZoneName}, usually ${d.shippingMinDays} to ${d.shippingMaxDays} business days from dispatch.`;
}

function trackingLine(): string {
  return 'You will get a tracking number from Royal Mail by email as soon as Charles posts it.';
}

export function renderOrderConfirmationSubject(d: OrderEmailData): string {
  const name = d.customerFirstName ? ` ${d.customerFirstName}` : '';
  return `Thank you${name}, your books are on the way`;
}

export function renderOrderConfirmationText(d: OrderEmailData): string {
  const lines: string[] = [];
  const sep = '----------------------------------------------------------------------';
  lines.push(`Subject: ${renderOrderConfirmationSubject(d)}`, '');
  lines.push(sep, 'CHARLES MACKAY BOOKS', 'Aviation history, written and posted from Glasgow.', sep, '');
  lines.push(`Thank you, ${d.customerFirstName}.`, '');
  lines.push(
    'Your order is in. My dad Charles wrote the book, and he wraps and',
    'posts every order himself from Glasgow. Glad one of his titles is',
    'on its way to you.',
    ''
  );
  lines.push(`Order #${d.orderNumber}`, `Placed ${d.orderDate}`, '');
  lines.push(sep, 'WHAT YOU ORDERED', sep, '');
  for (const item of d.items) {
    lines.push(`  ${item.title}`);
    lines.push(`  Qty ${item.qty}                                              ${gbp(item.unitPricePence * item.qty)}`);
    lines.push(`  https://charlesmackaybooks.com/books/${item.id}`, '');
  }
  lines.push(`  Subtotal                                       ${gbp(d.subtotalPence)}`);
  if (d.discountPence > 0) {
    lines.push(`  Multibuy discount                             -${gbp(d.discountPence)}`);
  }
  lines.push(`  Shipping (${d.shippingZoneName})              ${gbp(d.shippingPence)}`);
  lines.push('  ----');
  lines.push(`  Total                                          ${gbp(d.totalPence)}`, '');
  lines.push(sep, 'POSTING TO', sep, '');
  for (const l of addressBlock(d.shippingAddress)) lines.push(l);
  lines.push('');
  lines.push(sep, 'WHEN TO EXPECT IT', sep, '', deliveryEstimate(d), '');
  lines.push(sep, 'WHAT HAPPENS NEXT', sep, '');
  lines.push(
    'Charles will wrap and post your parcel within 1 to 2 business days.',
    trackingLine(),
    ''
  );
  if (d.orderStatusUrl) lines.push(`Check your order status: ${d.orderStatusUrl}`, '');
  lines.push(sep, 'IF ANYTHING GOES WRONG', sep, '');
  lines.push(
    'Books can take a knock in the post. If yours arrives damaged or',
    'faulty within 30 days, hit reply with a photo. We will write back',
    'with the return address. Once the book is back with us, we will',
    'send a fresh copy or issue a full refund.',
    ''
  );
  lines.push(sep, '');
  lines.push(
    'Charles has been writing aviation history since 1982. First',
    'article in Airfix Magazine, then Scots Magazine, then Robert',
    'Gibson & Sons in Glasgow from 1985. He still likes hearing',
    'what readers think. If you have a moment when you finish, hit',
    'reply. I will pass it on.',
    ''
  );
  lines.push('Cheers,', 'Charles & Angus', '');
  lines.push(
    sep,
    // V2 #1: registered postal address pending Angus PO Box/accountant/virtual-office choice
    'A Mackay (Publisher) Ltd',
    'Registered in Scotland, Company No. SC858624',
    'Charles wraps and posts from Glasgow.',
    'Questions? Reply to this email or visit charlesmackaybooks.com',
    sep
  );
  return lines.join('\n');
}

export function renderOrderConfirmationHtml(d: OrderEmailData): string {
  const subject = renderOrderConfirmationSubject(d);
  const itemRows = d.items
    .map(
      (item) => `
                    <tr>
                      <td align="left" style="padding:14px 8px 14px 0; font-size:15px; line-height:22px; color:#1a2a44; border-bottom:1px solid #f0ead9;">
                        <a href="https://charlesmackaybooks.com/books/${escapeHtml(item.id)}" style="color:#1a2a44; text-decoration:underline;">${escapeHtml(item.title)}</a>
                      </td>
                      <td align="center" style="padding:14px 8px; font-size:15px; line-height:22px; color:#1a2a44; border-bottom:1px solid #f0ead9;">${item.qty}</td>
                      <td align="right" style="padding:14px 0 14px 8px; font-size:15px; line-height:22px; color:#1a2a44; border-bottom:1px solid #f0ead9;">${gbp(item.unitPricePence * item.qty)}</td>
                    </tr>`
    )
    .join('');
  const discountRow =
    d.discountPence > 0
      ? `<tr><td align="right" style="padding:4px 0; font-size:14px; line-height:20px; color:#5a6172;">Multibuy discount</td><td align="right" style="padding:4px 0 4px 16px; font-size:14px; line-height:20px; color:#1a2a44;">&minus;${gbp(d.discountPence)}</td></tr>`
      : '';
  const addressLines = addressBlock(d.shippingAddress).map(escapeHtml).join('<br>');
  const statusLink = d.orderStatusUrl
    ? `<p style="margin:0; font-size:14px; line-height:21px;"><a href="${escapeHtml(d.orderStatusUrl)}" style="color:#1a2a44; text-decoration:underline;">Check your order status</a></p>`
    : '';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>${escapeHtml(subject)}</title>
    <!--[if mso]>
    <style type="text/css">
      table, td, div, h1, h2, p { font-family: Georgia, 'Times New Roman', serif; }
    </style>
    <![endif]-->
  </head>
  <body style="margin:0; padding:0; background:#f7f3ea; font-family:Arial, Helvetica, sans-serif; color:#1a2a44;">
    <div style="display:none; font-size:1px; color:#f7f3ea; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">Wrapped in Glasgow and on its way to you. Tracking arrives by email when Royal Mail collects.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f3ea;">
      <tr><td align="center" style="padding:24px 12px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:640px; background:#ffffff; border:1px solid #e6dfce;">
          <tr><td style="background:#1a2a44; padding:24px 32px; text-align:left;">
            <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:22px; line-height:28px; color:#C8A951; letter-spacing:0.5px;">Charles MacKay Books</p>
            <p style="margin:4px 0 0 0; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:18px; color:#f7f3ea;">Aviation history, written and posted from Glasgow.</p>
          </td></tr>
          <tr><td style="padding:32px 32px 8px 32px;">
            <h1 style="margin:0 0 16px 0; font-family:Georgia, 'Times New Roman', serif; font-size:24px; line-height:30px; font-weight:normal; color:#1a2a44;">Thank you, ${escapeHtml(d.customerFirstName)}.</h1>
            <p style="margin:0 0 12px 0; font-size:16px; line-height:24px; color:#1a2a44;">Your order is in. My dad Charles wrote the book, and he wraps and posts every order himself from Glasgow. Glad one of his titles is on its way to you.</p>
            <p style="margin:0; font-size:14px; line-height:22px; color:#5a6172;">Order <strong style="color:#1a2a44;">#${escapeHtml(d.orderNumber)}</strong> &middot; placed ${escapeHtml(d.orderDate)}</p>
          </td></tr>
          <tr><td style="padding:24px 32px 0 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #e6dfce; font-size:0; line-height:0;">&nbsp;</td></tr></table></td></tr>
          <tr><td style="padding:24px 32px 0 32px;">
            <h2 style="margin:0 0 16px 0; font-family:Georgia, 'Times New Roman', serif; font-size:18px; line-height:24px; font-weight:normal; color:#1a2a44;">What you ordered</h2>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <thead><tr>
                <th align="left" style="padding:8px 8px 8px 0; font-size:12px; line-height:16px; color:#5a6172; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #e6dfce; font-weight:normal;">Title</th>
                <th align="center" style="padding:8px; font-size:12px; line-height:16px; color:#5a6172; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #e6dfce; font-weight:normal;">Qty</th>
                <th align="right" style="padding:8px 0 8px 8px; font-size:12px; line-height:16px; color:#5a6172; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #e6dfce; font-weight:normal;">Price</th>
              </tr></thead>
              <tbody>${itemRows}</tbody>
            </table>
          </td></tr>
          <tr><td style="padding:16px 32px 0 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td align="right" style="padding:4px 0; font-size:14px; line-height:20px; color:#5a6172;">Subtotal</td><td align="right" width="100" style="padding:4px 0 4px 16px; font-size:14px; line-height:20px; color:#1a2a44;">${gbp(d.subtotalPence)}</td></tr>
            ${discountRow}
            <tr><td align="right" style="padding:4px 0; font-size:14px; line-height:20px; color:#5a6172;">Shipping (${escapeHtml(d.shippingZoneName)})</td><td align="right" style="padding:4px 0 4px 16px; font-size:14px; line-height:20px; color:#1a2a44;">${gbp(d.shippingPence)}</td></tr>
            <tr><td align="right" style="padding:12px 0 0 0; border-top:1px solid #e6dfce; font-family:Georgia, 'Times New Roman', serif; font-size:16px; line-height:22px; color:#1a2a44;"><strong>Total</strong></td><td align="right" style="padding:12px 0 0 16px; border-top:1px solid #e6dfce; font-family:Georgia, 'Times New Roman', serif; font-size:16px; line-height:22px; color:#1a2a44;"><strong>${gbp(d.totalPence)}</strong></td></tr>
          </table></td></tr>
          <tr><td style="padding:32px 32px 0 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td valign="top" width="50%" style="padding:0 8px 0 0;"><h2 style="margin:0 0 8px 0; font-family:Georgia, 'Times New Roman', serif; font-size:16px; line-height:22px; font-weight:normal; color:#1a2a44;">Posting to</h2><p style="margin:0; font-size:14px; line-height:21px; color:#1a2a44;">${addressLines}</p></td>
            <td valign="top" width="50%" style="padding:0 0 0 8px;"><h2 style="margin:0 0 8px 0; font-family:Georgia, 'Times New Roman', serif; font-size:16px; line-height:22px; font-weight:normal; color:#1a2a44;">When to expect it</h2><p style="margin:0; font-size:14px; line-height:21px; color:#1a2a44;">${escapeHtml(deliveryEstimate(d))}</p></td>
          </tr></table></td></tr>
          <tr><td style="padding:32px 32px 0 32px;">
            <h2 style="margin:0 0 12px 0; font-family:Georgia, 'Times New Roman', serif; font-size:18px; line-height:24px; font-weight:normal; color:#1a2a44;">What happens next</h2>
            <p style="margin:0 0 12px 0; font-size:15px; line-height:22px; color:#1a2a44;">Charles will wrap and post your parcel within 1 to 2 business days. ${escapeHtml(trackingLine())}</p>
            ${statusLink}
          </td></tr>
          <tr><td style="padding:32px 32px 0 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f3ea; border:1px solid #e6dfce;"><tr><td style="padding:20px 24px;">
            <h2 style="margin:0 0 8px 0; font-family:Georgia, 'Times New Roman', serif; font-size:16px; line-height:22px; font-weight:normal; color:#1a2a44;">If anything goes wrong</h2>
            <p style="margin:0; font-size:14px; line-height:21px; color:#1a2a44;">Books can take a knock in the post. If yours arrives damaged or faulty within 30 days, hit reply with a photo. We will write back with the return address. Once the book is back with us, we will send a fresh copy or issue a full refund.</p>
          </td></tr></table></td></tr>
          <tr><td style="padding:32px 32px 32px 32px;">
            <p style="margin:0 0 12px 0; font-size:15px; line-height:22px; color:#1a2a44;">Charles has been writing aviation history since 1982. First article in Airfix Magazine, then Scots Magazine, then Robert Gibson &amp; Sons in Glasgow from 1985. He still likes hearing what readers think. If you have a moment when you finish, hit reply. I will pass it on.</p>
            <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:15px; line-height:22px; color:#1a2a44;">Cheers,<br>Charles &amp; Angus</p>
          </td></tr>
          <tr><td style="background:#f7f3ea; padding:20px 32px; border-top:1px solid #e6dfce;">
            <p style="margin:0 0 6px 0; font-size:11px; line-height:16px; color:#5a6172;">A Mackay (Publisher) Ltd &middot; Registered in Scotland, Company No. SC858624</p>
            <p style="margin:0 0 6px 0; font-size:11px; line-height:16px; color:#5a6172;">Charles wraps and posts from Glasgow.</p>
            <p style="margin:0; font-size:11px; line-height:16px; color:#5a6172;">Questions? Reply to this email or visit <a href="https://charlesmackaybooks.com" style="color:#5a6172; text-decoration:underline;">charlesmackaybooks.com</a></p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function renderOrderConfirmation(d: OrderEmailData): { subject: string; html: string; text: string } {
  return {
    subject: renderOrderConfirmationSubject(d),
    html: renderOrderConfirmationHtml(d),
    text: renderOrderConfirmationText(d),
  };
}
