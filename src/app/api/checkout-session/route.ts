import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { stripePriceMap } from '@/data/stripe-prices';
import { ALLOWED_COUNTRIES, SHIPPING_ZONES, getZoneForCountry, type ShippingZone } from '@/data/shipping-zones';
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

/**
 * Build Stripe shipping_options[] from our zone definitions.
 *
 * If a country is supplied (from the cart-side selector), we only emit the
 * single matching zone — Stripe Checkout then auto-applies it with no
 * customer choice. Allowed_countries is also constrained to that zone so
 * a different shipping address on Stripe can't trigger a price mismatch.
 *
 * Fallback: if no country / unknown country, present all zones (legacy).
 */
function zoneToShippingOption(zone: ShippingZone): Stripe.Checkout.SessionCreateParams.ShippingOption {
  return {
    shipping_rate_data: {
      type: 'fixed_amount' as const,
      fixed_amount: { amount: zone.amountPence, currency: 'gbp' },
      display_name: zone.displayName,
      delivery_estimate: {
        minimum: { unit: 'business_day' as const, value: zone.minDays },
        maximum: { unit: 'business_day' as const, value: zone.maxDays },
      },
      metadata: { zone: zone.key },
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { items, discountPct, country } = await req.json();
    const requestedCountry: string | null = typeof country === 'string' ? country.toUpperCase() : null;
    const matchedZone = requestedCountry ? getZoneForCountry(requestedCountry) : null;

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

    const allowedCountries: readonly string[] = matchedZone ? matchedZone.countries : ALLOWED_COUNTRIES;
    const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] = matchedZone
      ? [zoneToShippingOption(matchedZone)]
      : SHIPPING_ZONES.map(zoneToShippingOption);

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: lineItems,
      discounts,
      shipping_address_collection: {
        allowed_countries: [...allowedCountries] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      shipping_options: shippingOptions,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    };

    if (user) {
      sessionParams.metadata = { user_id: user.id };
      sessionParams.customer_email = user.email;
    }

    const checkoutSession = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Stripe checkout error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
