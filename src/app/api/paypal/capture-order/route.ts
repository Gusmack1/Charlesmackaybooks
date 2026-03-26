import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
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
    const { orderId } = await req.json();
    const base = process.env.PAYPAL_API_BASE || 'https://api-m.paypal.com';
    const token = await getAccessToken();

    const res = await fetch(`${base}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (data.status === 'COMPLETED') {
      return NextResponse.json({ status: 'COMPLETED', id: data.id });
    }
    return NextResponse.json({ error: data.message || 'Capture failed', details: data }, { status: 500 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('PayPal capture error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
