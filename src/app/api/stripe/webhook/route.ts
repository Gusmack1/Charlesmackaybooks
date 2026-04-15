import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2026-02-25.clover',
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
    }

    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    const supabase = await createServiceClient();

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Fetch full session details to get line items
      const stripe = getStripe();
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items', 'line_items.data.price.product'],
      });

      const customerId = session.customer_email || session.customer_details?.email || '';
      const totalPennies = fullSession.amount_total || 0;
      const subtotalPennies = fullSession.amount_subtotal || 0;
      const shippingPennies = totalPennies - subtotalPennies;

      const shippingAddress = {
        line1: session.customer_details?.address?.line1 || '',
        line2: session.customer_details?.address?.line2 || '',
        city: session.customer_details?.address?.city || '',
        postcode: session.customer_details?.address?.postal_code || '',
        country: session.customer_details?.address?.country || '',
      };

      // Upsert order
      const orderResult = await supabase
        .from('orders')
        .upsert(
          {
            email: customerId,
            provider: 'stripe',
            provider_order_id: session.id,
            status: session.payment_status === 'paid' ? 'COMPLETED' : 'PENDING',
            subtotal_pennies: subtotalPennies,
            shipping_pennies: shippingPennies,
            total_pennies: totalPennies,
            currency: session.currency?.toUpperCase() || 'GBP',
            shipping_address: shippingAddress,
          },
          { onConflict: 'provider_order_id' }
        )
        .select('id')
        .single();

      if (orderResult.data && fullSession.line_items?.data) {
        // Upsert order items
        const items = fullSession.line_items.data.map((item) => {
          const product = item.price?.product as Stripe.Product;
          return {
            order_id: orderResult.data.id,
            book_id: product.metadata?.bookId || product.id,
            title: item.description || product.name,
            quantity: item.quantity || 1,
            unit_price_pennies: item.price?.unit_amount || 0,
          };
        });

        await supabase.from('order_items').insert(items);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook processing error:', message);
    // Return 200 to prevent retry loop, but log the error
    return NextResponse.json({ received: true, error: message });
  }
}
