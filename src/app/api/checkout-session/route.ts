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

// --- Hardening (V2 #7 input validation, V2 #8 origin allowlist, V2 #44 coupon clamp) ---

// Set of valid book slug ids — built once at module scope from the canonical
// stripe-prices.ts mapping. stripe-prices.ts is hand-aligned with src/data/books.ts.
const VALID_BOOK_IDS: ReadonlySet<string> = new Set(Object.keys(stripePriceMap));

// Allowed discount tiers (V2 #44). Anything else → 400.
const ALLOWED_DISCOUNT_PCTS: ReadonlySet<number> = new Set([0, 5, 10]);

// Origin allowlist (V2 #8). Allow exact prod, any Netlify deploy preview for this site,
// and bypass-flag for local debug.
const PROD_ORIGIN = 'https://charlesmackaybooks.com';
const NETLIFY_PREVIEW_RE = /^https:\/\/[a-z0-9-]+--charlesmackaybooks\.netlify\.app$/;

function isAllowedOrigin(origin: string | null): boolean {
  if (process.env.ALLOW_ORIGINLESS_CHECKOUT === 'true') return true;
  if (!origin) return false;
  if (origin === PROD_ORIGIN) return true;
  if (NETLIFY_PREVIEW_RE.test(origin)) return true;
  return false;
}

type ValidatedPayload = {
  items: Array<{ bookId: string; quantity: number }>;
  discountPct: 0 | 5 | 10;
  country: string;
  marketingOptIn: boolean;
};

class BadRequestError extends Error {}

function assertValidPayload(body: unknown): ValidatedPayload {
  if (!body || typeof body !== 'object') throw new BadRequestError('bad body');
  const b = body as Record<string, unknown>;

  // items
  if (!Array.isArray(b.items) || b.items.length < 1 || b.items.length > 50) {
    throw new BadRequestError('items');
  }
  const items: Array<{ bookId: string; quantity: number }> = [];
  for (const raw of b.items) {
    if (!raw || typeof raw !== 'object') throw new BadRequestError('item');
    const it = raw as Record<string, unknown>;
    const bookId = it.bookId;
    const quantity = it.quantity;
    if (typeof bookId !== 'string' || !VALID_BOOK_IDS.has(bookId)) {
      throw new BadRequestError('bookId');
    }
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new BadRequestError('quantity');
    }
    items.push({ bookId, quantity });
  }

  // discountPct
  let discountPct: 0 | 5 | 10 = 0;
  if (b.discountPct !== undefined && b.discountPct !== null) {
    if (typeof b.discountPct !== 'number' || !ALLOWED_DISCOUNT_PCTS.has(b.discountPct)) {
      throw new BadRequestError('discountPct');
    }
    discountPct = b.discountPct as 0 | 5 | 10;
  }

  // country
  let country = 'GB';
  if (b.country !== undefined && b.country !== null) {
    if (typeof b.country !== 'string') throw new BadRequestError('country');
    const upper = b.country.toUpperCase();
    if (!(ALLOWED_COUNTRIES as readonly string[]).includes(upper)) {
      throw new BadRequestError('country');
    }
    country = upper;
  }

  // marketingOptIn
  const marketingOptIn = b.marketingOptIn === true;

  return { items, discountPct, country, marketingOptIn };
}

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

/**
 * Idempotent coupon creator. Uses a deterministic id (cmb_pct_5 / cmb_pct_10)
 * so retries / parallel checkouts don't pile up new coupon objects.
 */
async function getOrCreatePctCoupon(stripe: Stripe, pct: 5 | 10): Promise<string> {
  const id = `cmb_pct_${pct}`;
  try {
    await stripe.coupons.create({
      id,
      percent_off: pct,
      duration: 'once',
      name: `Multi-buy ${pct}% off`,
    });
  } catch (err: unknown) {
    // Stripe returns 400 "Coupon already exists" on retry — that's the happy path.
    const code = (err as { code?: string } | null)?.code;
    const msg = err instanceof Error ? err.message : '';
    if (code !== 'resource_already_exists' && !/already exists/i.test(msg)) {
      throw err;
    }
  }
  return id;
}

export async function POST(req: NextRequest) {
  // Origin gate (V2 #8) — runs before ANY parsing or Stripe call.
  const origin = req.headers.get('origin');
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Parse + validate body. Any malformed input → generic 400 (no Stripe leak).
  let payload: ValidatedPayload;
  try {
    const raw = await req.json();
    payload = assertValidPayload(raw);
  } catch (err) {
    if (!(err instanceof BadRequestError)) {
      console.error('checkout-session validation error:', err);
    }
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { items, discountPct, country, marketingOptIn } = payload;
    const matchedZone = getZoneForCountry(country);

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      // Safe: bookId already validated against VALID_BOOK_IDS.
      const priceId = stripePriceMap[item.bookId];
      return { price: priceId, quantity: item.quantity };
    });

    // Coupon clamp (V2 #44): only when discountPct ∈ {5, 10}, idempotent ids.
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (discountPct === 5 || discountPct === 10) {
      const couponId = await getOrCreatePctCoupon(stripe, discountPct);
      discounts = [{ coupon: couponId }];
    }

    const successOrigin = origin || PROD_ORIGIN;

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
      success_url: `${successOrigin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${successOrigin}/checkout`,
      // Marketing opt-in is preserved as Stripe metadata so the webhook can
      // persist it onto the order row (and onto profiles for logged-in users).
      metadata: { marketing_opt_in: marketingOptIn ? 'true' : 'false' },
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
    // Server-side: log full Stripe error. Client-side: generic message only.
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: 'Could not create checkout session. Please try again.' },
      { status: 500 },
    );
  }
}
