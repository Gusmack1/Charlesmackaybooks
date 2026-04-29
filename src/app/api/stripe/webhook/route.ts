import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { bookIdFromPriceId } from '@/data/stripe-prices';

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

      // Fetch full session details to get line items + expanded shipping_details
      const stripe = getStripe();
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items', 'line_items.data.price.product'],
      });

      const customerEmail =
        fullSession.customer_details?.email ||
        fullSession.customer_email ||
        '';
      const customerName = fullSession.customer_details?.name ?? null;
      const customerPhone = fullSession.customer_details?.phone ?? null;
      const stripeCustomerId =
        typeof fullSession.customer === 'string'
          ? fullSession.customer
          : fullSession.customer?.id ?? null;

      const totalPennies = fullSession.amount_total || 0;
      const subtotalPennies = fullSession.amount_subtotal || 0;
      const shippingPennies = totalPennies - subtotalPennies;

      // Newer Stripe API surfaces shipping on collected_information.shipping_details;
      // older sessions used shipping_details directly. Fall back to customer_details.address.
      // Cast to a permissive shape because these fields vary across Stripe API versions.
      type ShippingShape = {
        name?: string | null;
        address?: {
          line1?: string | null;
          line2?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
          country?: string | null;
        } | null;
      };
      const sessionAny = fullSession as unknown as {
        collected_information?: { shipping_details?: ShippingShape | null } | null;
        shipping_details?: ShippingShape | null;
      };
      const sd: ShippingShape | null =
        sessionAny.collected_information?.shipping_details ??
        sessionAny.shipping_details ??
        null;

      const shipAddr =
        sd?.address ?? fullSession.customer_details?.address ?? null;
      const shipName = sd?.name ?? customerName;

      const shippingAddressJson = {
        full_name: shipName || '',
        line1: shipAddr?.line1 || '',
        line2: shipAddr?.line2 || '',
        city: shipAddr?.city || '',
        state: shipAddr?.state || '',
        postcode: shipAddr?.postal_code || '',
        country: shipAddr?.country || '',
      };

      const userIdFromMetadata = fullSession.metadata?.user_id || null;

      // Upsert order with all the new structured shipping fields.
      // shipping_address JSONB is preserved as the audit copy.
      const orderResult = await supabase
        .from('orders')
        .upsert(
          {
            user_id: userIdFromMetadata,
            email: customerEmail,
            provider: 'stripe',
            provider_order_id: session.id,
            stripe_customer_id: stripeCustomerId,
            status:
              session.payment_status === 'paid' ? 'COMPLETED' : 'PENDING',
            subtotal_pennies: subtotalPennies,
            shipping_pennies: shippingPennies,
            total_pennies: totalPennies,
            currency: session.currency?.toUpperCase() || 'GBP',
            shipping_address: shippingAddressJson,
            shipping_full_name: shipName,
            shipping_email: customerEmail,
            shipping_phone: customerPhone,
            shipping_line1: shipAddr?.line1 ?? null,
            shipping_line2: shipAddr?.line2 ?? null,
            shipping_city: shipAddr?.city ?? null,
            shipping_state: shipAddr?.state ?? null,
            shipping_postal_code: shipAddr?.postal_code ?? null,
            shipping_country: shipAddr?.country ?? null,
          },
          { onConflict: 'provider_order_id' }
        )
        .select('id')
        .single();

      if (orderResult.error) {
        console.error('Order upsert failed:', orderResult.error);
      }

      if (orderResult.data && fullSession.line_items?.data) {
        // Stripe sends back the same line_items if the webhook is replayed.
        // Clear and re-insert keeps order_items idempotent.
        await supabase
          .from('order_items')
          .delete()
          .eq('order_id', orderResult.data.id);

        const items = fullSession.line_items.data.map((item) => {
          const product = item.price?.product as Stripe.Product | null;
          const priceId =
            typeof item.price === 'string' ? item.price : item.price?.id;
          // 1. metadata.bookId on the product, 2. reverse map from price_id, 3. fallback product id
          const bookId =
            product?.metadata?.bookId ||
            bookIdFromPriceId(priceId) ||
            product?.id ||
            'unknown';

          return {
            order_id: orderResult.data!.id,
            book_id: bookId,
            title: item.description || product?.name || 'Unknown title',
            quantity: item.quantity || 1,
            unit_price_pennies: item.price?.unit_amount || 0,
          };
        });

        const itemsResult = await supabase
          .from('order_items')
          .insert(items);
        if (itemsResult.error) {
          console.error('Order items insert failed:', itemsResult.error);
        }
      }

      // If the customer was logged in at checkout, harvest the address into
      // their addresses table for next-time auto-fill. Skip duplicates by
      // (user_id, line1, postcode).
      if (
        userIdFromMetadata &&
        shipAddr?.line1 &&
        shipAddr?.postal_code &&
        shipAddr?.city &&
        shipAddr?.country
      ) {
        const existing = await supabase
          .from('addresses')
          .select('id, is_default')
          .eq('user_id', userIdFromMetadata)
          .eq('line1', shipAddr.line1)
          .eq('postcode', shipAddr.postal_code)
          .maybeSingle();

        if (!existing.data) {
          // Promote to default if user has no other addresses.
          const { count } = await supabase
            .from('addresses')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userIdFromMetadata);

          await supabase.from('addresses').insert({
            user_id: userIdFromMetadata,
            line1: shipAddr.line1,
            line2: shipAddr.line2 || null,
            city: shipAddr.city,
            postcode: shipAddr.postal_code,
            country: shipAddr.country,
            is_default: (count ?? 0) === 0,
          });
        }
      }

      // Best-effort retroactive link: if no metadata.user_id but a profile
      // already exists for this email, attribute the order to them so it
      // shows up in /account/orders. Safe — RLS still gates SELECT to owner.
      if (!userIdFromMetadata && customerEmail) {
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', customerEmail.toLowerCase())
          .maybeSingle();

        if (existingProfile?.id) {
          await supabase
            .from('orders')
            .update({ user_id: existingProfile.id })
            .eq('provider_order_id', session.id)
            .is('user_id', null);
        }
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
