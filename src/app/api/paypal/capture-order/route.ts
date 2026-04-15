import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function getAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  const base = process.env.PAYPAL_API_BASE || 'https://api-m.paypal.com';

  if (!clientId || !secret) {
    throw new Error(`PayPal credentials missing: clientId=${!!clientId}, secret=${!!secret}`);
  }

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  if (!data.access_token) {
    console.error('PayPal auth failed:', JSON.stringify(data));
    throw new Error(`PayPal auth failed: ${data.error_description || data.error || 'unknown'}`);
  }
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
      // Upsert order to Supabase
      try {
        const supabase = await createServiceClient();
        const { payer, purchase_units } = data;

        if (purchase_units && purchase_units.length > 0) {
          const unit = purchase_units[0];
          const amount = unit.amount;

          // Calculate totals in pennies
          const totalPennies = Math.round(parseFloat(amount.value) * 100);
          const subtotalPennies = unit.items
            ? unit.items.reduce((sum: number, item: any) => sum + Math.round(parseFloat(item.unit_amount?.value || '0') * 100) * parseInt(item.quantity || '1'), 0)
            : 0;
          const shippingPennies = unit.shipping
            ? Math.round(parseFloat(unit.shipping.address?.admin_area_1 || '0') * 100)
            : totalPennies - subtotalPennies;

          const shippingAddress = unit.shipping?.address || {};

          // Upsert order
          await supabase
            .from('orders')
            .upsert({
              email: payer?.email_address || '',
              provider: 'paypal',
              provider_order_id: data.id,
              status: 'COMPLETED',
              subtotal_pennies: subtotalPennies,
              shipping_pennies: shippingPennies,
              total_pennies: totalPennies,
              currency: amount.currency_code || 'GBP',
              shipping_address: shippingAddress,
            }, {
              onConflict: 'provider_order_id',
            });

          // Upsert order items
          if (unit.items) {
            const orderResp = await supabase
              .from('orders')
              .select('id')
              .eq('provider_order_id', data.id)
              .single();

            if (orderResp.data) {
              const items = unit.items.map((item: any) => ({
                order_id: orderResp.data.id,
                book_id: item.sku || '',
                title: item.name || '',
                quantity: parseInt(item.quantity || '1'),
                unit_price_pennies: Math.round(parseFloat(item.unit_amount?.value || '0') * 100),
              }));

              await supabase
                .from('order_items')
                .insert(items);
            }
          }
        }
      } catch (dbErr) {
        console.error('Supabase upsert error:', dbErr);
        // Non-fatal: order still completed in PayPal
      }

      return NextResponse.json({ status: 'COMPLETED', id: data.id });
    }
    return NextResponse.json({ error: data.message || 'Capture failed', details: data }, { status: 500 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('PayPal capture error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
