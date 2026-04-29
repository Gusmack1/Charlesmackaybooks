# Email templates

Transactional email templates for charlesmackaybooks.com customers. Plain
Handlebars-style `{{placeholder}}` syntax so templates can be wired to any
sender (Resend, Mailgun, Postmark, AWS SES, Stripe customer email customisation,
or a custom Netlify function calling SendGrid).

Brand tone is small-press / family-business: Charles writes the books AND
hand-wraps + posts every order from Glasgow. Angus runs the digital backend
(website, Stripe, the email account behind the warm voice). Customer-facing
copy must use the name "Angus" not "Gus", and must attribute the physical
wrap+post to Charles — never to Angus. Avoid corporate language ("we value
your business", "your purchase has been processed"). See
`order-confirmation.html` for the established voice. Brain fact #890 is the
canonical record of this rule.

## Templates

| File | Purpose | Trigger |
|---|---|---|
| `order-confirmation.html` | Customer-facing order receipt (HTML) | `checkout.session.completed` webhook |
| `order-confirmation.txt` | Plain-text twin for clients that disable HTML | Same webhook, `multipart/alternative` |
| `supabase-magic-link.html` | Magic-link sign-in email (HTML) | Supabase Auth, **Magic Link** template slot |
| `supabase-magic-link.txt` | Plain-text twin for the magic-link email | Same Supabase slot (used as text fallback by senders that send `multipart/alternative`) |

### Supabase Auth Email Templates — where to paste

Supabase project `iakuafpxuicisqbtmjbf` (the **site** Supabase, distinct from
`claude_brain` rhhsaphcqxgrptrpvljm).

Dashboard path:
`https://supabase.com/dashboard/project/iakuafpxuicisqbtmjbf/auth/templates`

| Template slot in Supabase | Paste this file | Subject line to set |
|---|---|---|
| **Magic Link** | `supabase-magic-link.html` body | `Sign in to Charles Mackay Books — one-click link` |

Supabase uses **Go template** placeholder syntax (`{{ .ConfirmationURL }}`) —
not Handlebars `{{name}}`. The magic-link template MUST keep
`{{ .ConfirmationURL }}` exactly as written; Supabase substitutes the full
sign-in URL (with the embedded one-time code) at send time. Other available
placeholders: `{{ .Email }}`, `{{ .Token }}`, `{{ .TokenHash }}`,
`{{ .SiteURL }}`, `{{ .RedirectTo }}`.

Wiring context: an unauthenticated customer hitting `/checkout/success` after a
Stripe purchase is invited to "save your details for next time" via magic
link. They click → this email arrives → click the confirmation URL → land back
on the site authenticated → their just-placed order auto-links to the new
account (per `supabase/migrations/0001_accounts.sql` — `orders.user_id` is
nullable so guest checkout works, then post-auth backfill links the row).

## Required placeholders

`order-confirmation.{html,txt}` expects the following data shape from whichever
sender renders it:

| Placeholder | Source | Example |
|---|---|---|
| `customer_first_name` | `stripe.customer_details.name.split(' ')[0]` (fallback `"there"`) | `Margaret` |
| `order_number` | Internal order id, OR last 8 chars of `cs_live_…` Stripe session id | `4F2A9B81` |
| `order_date` | `new Date(checkout.created * 1000)` formatted `"D MMMM YYYY"` | `29 April 2026` |
| `book_list[]` | Iterable; each item `{ id, title, qty, price }` | see below |
| `subtotal` | Pre-shipping, pre-discount line-item sum, GBP formatted | `£26.85` |
| `discount_amount` | Optional — only renders when truthy (multibuy, promo) | `£3.00` |
| `shipping_cost` | Royal Mail rate selected at checkout | `£3.95` |
| `shipping_zone_name` | Display label from `src/data/shipping-zones.ts` | `UK Tracked 48` |
| `shipping_estimate` | Plain-English window. e.g. `"Royal Mail Tracked, usually 2–4 business days from dispatch"` | — |
| `shipping_address_block` | Multi-line; the HTML wraps it in `white-space:pre-line` | `Margaret Smith\n12 Hill Rd\nGlasgow\nG12 8AA\nUnited Kingdom` |
| `tracking_link_placeholder` | Sentence — at confirmation time we do not yet have a tracking number, so render: `"You will get a tracking number from Royal Mail by email as soon as they collect."` Once dispatched the tracking link can replace it in a follow-up "Dispatched" email. | — |
| `order_status_url` | `https://charlesmackaybooks.com/account/orders/{id}` for logged-in users; guest tracking page (TBD) for guest checkouts | — |

### `book_list` item shape

```json
{
  "id": "british-aircraft-great-war",
  "title": "British Aircraft of the Great War",
  "qty": 1,
  "price": "£12.89"
}
```

The HTML template iterates with `{{#each book_list}}…{{/each}}` and links each
title to `https://charlesmackaybooks.com/books/{{id}}`.

### Conditional rendering

`{{#if discount_amount}}…{{/if}}` — the multibuy line is suppressed entirely
when no discount applies, rather than rendering as `£0.00`.

## Wiring options

We have not committed to a sender yet. In rough order of effort:

### Option 1: Stripe customer email customisation (zero-code)

Stripe Dashboard → Settings → Customer emails → Receipts. Toggle ON for
`payments`. Stripe sends a basic receipt automatically. Cannot use this
template (Stripe's UI does not accept custom HTML at receipt level — only logo
+ accent colour). Acceptable as a placeholder until a richer template ships,
but will not have the warm-tone signature.

### Option 2: Resend (recommended for a real launch)

Free tier: 3,000 emails / month, 100 emails / day. Per-domain DKIM verification.

```ts
// src/app/api/stripe/webhook/route.ts (excerpt — not yet wired)
import { Resend } from 'resend';
import Handlebars from 'handlebars';
import fs from 'node:fs/promises';

const resend = new Resend(process.env.RESEND_API_KEY);
const html = await fs.readFile('docs/email-templates/order-confirmation.html', 'utf8');
const txt  = await fs.readFile('docs/email-templates/order-confirmation.txt', 'utf8');

const data = { customer_first_name, order_number, ... };

await resend.emails.send({
  from: 'Charles MacKay Books <orders@charlesmackaybooks.com>',
  to: customer_email,
  subject: `Thank you, ${customer_first_name} — your books are on the way`,
  html: Handlebars.compile(html)(data),
  text: Handlebars.compile(txt)(data),
});
```

DNS for `orders@charlesmackaybooks.com`: SPF + DKIM TXT records on Netlify DNS
(Resend dashboard generates them). MX is optional unless we want inbound replies
to land in a separate inbox — at small volume, route replies to existing inbox
via a simple forwarder.

### Option 3: Mailgun / Postmark / AWS SES

Equivalent shape, swap the SDK call. Mailgun has a more generous free tier for
EU sending; Postmark has the best deliverability for transactional. SES is
cheapest at volume but requires sender-domain verification + leaving the
sandbox before going to production.

## Local preview

Quick browser preview (no Handlebars rendering — placeholders show literally):

```bash
# Windows / PowerShell
start docs\email-templates\order-confirmation.html

# macOS / Linux
open docs/email-templates/order-confirmation.html
```

For a rendered preview with sample data, use any Handlebars CLI:

```bash
npx handlebars-cli docs/email-templates/order-confirmation.html \
  --data '{ "customer_first_name":"Margaret","order_number":"4F2A9B81", ... }' \
  > /tmp/preview.html
```

For email-client testing across Gmail / Apple Mail / Outlook, paste the rendered
HTML into [Litmus](https://litmus.com) or [Email on Acid](https://emailonacid.com)
(both have free trials) before going live with paying customers.

## Tone guardrails

When adding new templates or editing existing ones, hold the line on tone:

- Charles writes the books AND hand-wraps + posts every order. Angus runs
  the digital side. Mention the Charles wrap+post somewhere — it is the
  whole point of the brand. NEVER write "I wrap" or "we wrap" in Angus's
  voice; the wrap+post is always Charles's. Use "Angus" not "Gus" in
  customer-facing copy.
- Returns flow when something arrives damaged: customer replies with photo
  → we send return address → on receipt, customer picks fresh copy OR
  refund. Do NOT promise instant replacement on photo alone.
- Refer to the books as objects of care — Charles spent years researching them.
- Glasgow / Scotland is the location, lean into it ("our wee corner of Glasgow",
  "hand-wrapped and posted from Glasgow").
- No emoji.
- No corporate boilerplate ("we value your business", "thank you for your
  purchase", "your order has been received and is being processed").
- No upsell. One soft mention of the rest of the catalogue, at most.
- 30-day faulty / damaged guarantee should always be present, in plain English.

## Footer legal block

Mandatory in every customer-facing email:

```
A MACKAY (PUBLISHER) LTD · Registered in Scotland, Company No. SC858624
Registered office: 87 Knightscliffe Avenue, Glasgow, G13 2RX
```

Source: Companies House (SC858624).
