import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_SECRET!;
  const base = process.env.PAYPAL_API_BASE || 'https://api-m.paypal.com';

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { items, discountPct, totalAmount } = await req.json();
    const base = process.env.PAYPAL_API_BASE || 'https://api-m.paypal.com';
    const token = await getAccessToken();

    // Build item list for PayPal
    const paypalItems = items.map((i: { title: string; price: number; quantity: number }) => ({
      name: i.title.substring(0, 127),
      unit_amount: { currency_code: 'GBP', value: i.price.toFixed(2) },
      quantity: i.quantity.toString(),
    }));

    const subtotal = items.reduce(
      (sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity,
      0
    );
    const discountAmount = discountPct > 0 ? subtotal * (discountPct / 100) : 0;

    const breakdown: Record<string, { currency_code: string; value: string }> = {
      item_total: { currency_code: 'GBP', value: subtotal.toFixed(2) },
      shipping: { currency_code: 'GBP', value: '0.00' },
    };
    if (discountAmount > 0) {
      breakdown.discount = { currency_code: 'GBP', value: discountAmount.toFixed(2) };
    }

    const res = await fetch(`${base}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            description: 'Charles MacKay Books',
            amount: {
              currency_code: 'GBP',
              value: totalAmount.toFixed(2),
              breakdown,
            },
            items: paypalItems,
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              brand_name: 'Charles MacKay Books',
              shipping_preference: 'GET_FROM_FILE',
              user_action: 'PAY_NOW',
              return_url: `${req.headers.get('origin') || 'https://charlesmackaybooks.com'}/checkout/success`,
              cancel_url: `${req.headers.get('origin') || 'https://charlesmackaybooks.com'}/checkout`,
            },
          },
        },
      }),
    });

    const order = await res.json();
    if (order.id) {
      return NextResponse.json({ id: order.id });
    }
    return NextResponse.json({ error: order.message || 'Failed to create PayPal order' }, { status: 500 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('PayPal create order error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
