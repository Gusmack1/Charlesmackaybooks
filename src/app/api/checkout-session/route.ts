import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { stripePriceMap } from '@/data/stripe-prices';
import { createClient } from '@/lib/supabase/server';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2026-02-25.clover',
  });
}

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const { items, discountPct } = await req.json();

    // Build line items from cart
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: { bookId: string; quantity: number }) => {
        const priceId = stripePriceMap[item.bookId];
        if (!priceId) throw new Error(`No Stripe price for book: ${item.bookId}`);
        return { price: priceId, quantity: item.quantity };
      }
    );

    // Build discount coupon on the fly if multi-buy applies
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (discountPct > 0) {
      const coupon = await stripe.coupons.create({
        percent_off: discountPct,
        duration: 'once',
        name: `Multi-buy ${discountPct}% off`,
      });
      discounts = [{ coupon: coupon.id }];
    }

    const origin = req.headers.get('origin') || 'https://charlesmackaybooks.com';

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      discounts,
      shipping_address_collection: {
        allowed_countries: [
          'GB', 'US', 'CA', 'AU', 'NZ', 'IE', 'DE', 'FR', 'NL', 'BE',
          'AT', 'CH', 'IT', 'ES', 'PT', 'SE', 'NO', 'DK', 'FI', 'PL',
        ],
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    };

    if (session?.user) {
      sessionParams.metadata = { user_id: session.user.id };
      sessionParams.customer_email = session.user.email;
    }

    const checkoutSession = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Stripe checkout error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
