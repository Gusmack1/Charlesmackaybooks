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

/**
 * GET /api/checkout-session?session_id=cs_...
 * Used by /checkout/success to render order details + pre-fill the
 * post-purchase signup email. Returns minimal, non-sensitive fields.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }
    // Stripe Checkout session IDs always start with "cs_". Reject anything else
    // to prevent abuse of this endpoint as a generic Stripe object reader.
    if (!/^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
      return NextResponse.json({ error: 'Invalid session_id' }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      email: session.customer_details?.email ?? session.customer_email ?? null,
      name: session.customer_details?.name ?? null,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      country: session.customer_details?.address?.country ?? null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Checkout session GET error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { items, discountPct, country, marketingOptIn } = await req.json();
    const requestedCountry: string | null = typeof country === 'string' ? country.toUpperCase() : null;
    const matchedZone = requestedCountry ? getZoneForCountry(requestedCountry) : null;
    // Strict-boolean coerce for downstream metadata. Default false (UK GDPR — no implicit consent).
    const marketingOptInBool: boolean = marketingOptIn === true;

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
      // Always create a Stripe Customer so we can stash stripe_customer_id
      // on the order for future repeat-purchase / reconciliation.
      customer_creation: 'always',
      // Capture phone for delivery contact (Royal Mail tracked).
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: [...allowedCountries] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
      },
      shipping_options: shippingOptions,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      // Marketing opt-in is preserved as Stripe metadata so the webhook can
      // persist it onto the order row (and onto profiles for logged-in users).
      metadata: { marketing_opt_in: marketingOptInBool ? 'true' : 'false' },
    };

    if (user) {
      sessionParams.metadata = {
        ...sessionParams.metadata,
        user_id: user.id,
      };
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
