import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { bookIdFromPriceId } from '@/data/stripe-prices';
import { getZoneForCountry } from '@/data/shipping-zones';
import { renderOrderConfirmation, type OrderEmailItem } from '@/lib/email/order-confirmation';

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
      // Marketing consent flag captured at checkout — UK GDPR requires explicit opt-in.
      // Default false; metadata.marketing_opt_in is the only path to true.
      const marketingOptIn =
        fullSession.metadata?.marketing_opt_in === 'true';

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
            marketing_opt_in_at_checkout: marketingOptIn,
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

      // If logged-in customer ticked the marketing box at checkout, propagate
      // the consent to their profile. Only ever set TRUE here — never silently
      // flip a profile back to FALSE if they unticked at checkout (UK GDPR:
      // withdrawing consent must be a deliberate act on /account/marketing,
      // not a side-effect of a future un-ticked checkout).
      if (userIdFromMetadata && marketingOptIn) {
        const { error: profileOptInErr } = await supabase
          .from('profiles')
          .update({
            marketing_opt_in: true,
            marketing_opt_in_ts: new Date().toISOString(),
            marketing_opt_in_source: 'checkout',
          })
          .eq('id', userIdFromMetadata);
        if (profileOptInErr) {
          console.error('Profile marketing opt-in update failed:', profileOptInErr);
        }
      }

      // Best-effort retroactive link: if no metadata.user_id but a profile
      // already exists for this email, attribute the order to them so it
      // shows up in /account/orders. Safe — RLS still gates SELECT to owner.
      let attributedUserId: string | null = userIdFromMetadata;
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
          attributedUserId = existingProfile.id;
        }
      }

      // Send order confirmation email via Resend (REST API, no SDK).
      // Best-effort: failure does NOT block the webhook (order is already saved).
      if (customerEmail && process.env.RESEND_API_KEY) {
        try {
          const country = (shipAddr?.country || 'GB').toUpperCase();
          const zone = getZoneForCountry(country);
          const items: OrderEmailItem[] = (fullSession.line_items?.data || []).map((item) => {
            const product = item.price?.product as Stripe.Product | null;
            const priceId = typeof item.price === 'string' ? item.price : item.price?.id;
            const bookId =
              product?.metadata?.bookId ||
              bookIdFromPriceId(priceId) ||
              product?.id ||
              'unknown';
            return {
              id: bookId,
              title: item.description || product?.name || 'Untitled',
              qty: item.quantity || 1,
              unitPricePence: item.price?.unit_amount || 0,
            };
          });
          const firstName = customerName?.trim().split(/\s+/)[0] || 'there';
          const orderShortId = session.id.slice(-8).toUpperCase();
          const orderDate = new Date((fullSession.created || Date.now() / 1000) * 1000).toLocaleDateString(
            'en-GB',
            { day: 'numeric', month: 'long', year: 'numeric' }
          );
          // Discounts are passed as Stripe coupons (multibuy 5%/10%); approximate from totals.
          const discountPence = Math.max(
            0,
            (fullSession.total_details?.amount_discount as number | undefined) || 0
          );
          const orderStatusUrl =
            attributedUserId && orderResult.data?.id
              ? `https://charlesmackaybooks.com/account/orders/${orderResult.data.id}`
              : null;

          const { subject, html, text } = renderOrderConfirmation({
            customerFirstName: firstName,
            orderNumber: orderShortId,
            orderDate,
            items,
            subtotalPence: subtotalPennies,
            discountPence,
            shippingPence: shippingPennies,
            totalPence: totalPennies,
            shippingZoneName: zone?.displayName || 'Royal Mail Tracked',
            shippingMinDays: zone?.minDays || 2,
            shippingMaxDays: zone?.maxDays || 7,
            shippingAddress: {
              name: shipName || '',
              line1: shipAddr?.line1 || '',
              line2: shipAddr?.line2 || '',
              city: shipAddr?.city || '',
              state: shipAddr?.state || '',
              postcode: shipAddr?.postal_code || '',
              country: shipAddr?.country || '',
            },
            orderStatusUrl,
          });

          const resendResp = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Charles Mackay Books <orders@charlesmackaybooks.com>',
              to: [customerEmail],
              reply_to: 'info@charlesmackaybooks.com',
              subject,
              html,
              text,
              headers: {
                'List-Unsubscribe': '<mailto:info@charlesmackaybooks.com?subject=unsubscribe>',
              },
            }),
          });
          if (!resendResp.ok) {
            const errBody = await resendResp.text().catch(() => '');
            console.error(`Resend send failed: HTTP ${resendResp.status} ${errBody}`);
          }
        } catch (emailErr: unknown) {
          const msg = emailErr instanceof Error ? emailErr.message : 'unknown';
          console.error('Order confirmation email skipped:', msg);
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
