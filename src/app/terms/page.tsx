import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms & Conditions of sale and use for charlesmackaybooks.com. Includes ordering, pricing, delivery, the 14-day cancellation right under the Consumer Contracts Regulations 2013, and 30-day faulty-goods returns under the Consumer Rights Act 2015.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = '29 April 2026';

const wrapper: React.CSSProperties = {
  maxWidth: 820,
  margin: '0 auto',
  padding: '48px 24px 96px',
  fontFamily: 'var(--font-sans)',
  color: 'var(--ink, #1a1a1a)',
  lineHeight: 1.7,
};
const h1: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 36,
  fontWeight: 700,
  marginBottom: 8,
};
const h2: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 22,
  fontWeight: 700,
  marginTop: 36,
  marginBottom: 12,
};
const p: React.CSSProperties = { marginBottom: 14, fontSize: 15 };
const ul: React.CSSProperties = { marginBottom: 14, paddingLeft: 22, fontSize: 15 };
const muted: React.CSSProperties = { color: '#666', fontSize: 13 };
const box: React.CSSProperties = {
  background: '#f6f4ec',
  border: '1px solid #d9d0b3',
  padding: 16,
  marginBottom: 14,
  fontSize: 14,
  lineHeight: 1.6,
};

export default function TermsPage() {
  return (
    <article style={wrapper}>
      <h1 style={h1}>Terms &amp; Conditions</h1>
      <p style={muted}>Last updated: {LAST_UPDATED}</p>

      <p style={p}>
        These Terms govern your use of charlesmackaybooks.com (the &ldquo;Site&rdquo;) and any purchase you make from
        us. Please read them carefully before placing an order.
      </p>

      <h2 style={h2}>1. Who we are</h2>
      {/* V2 #1: registered postal address pending Angus PO Box/accountant/virtual-office choice */}
      <p style={p}>
        The Site is operated by A Mackay (Publisher) Ltd, a private limited company incorporated in Scotland on 11
        August 2025 under company number SC858624. We trade as Charles Mackay Books. Our public company record is
        available on Companies House:{' '}
        <a href="https://find-and-update.company-information.service.gov.uk/company/SC858624" target="_blank" rel="noopener noreferrer">
          SC858624
        </a>
        . Postal address available on request via{' '}
        <a href="mailto:info@charlesmackaybooks.com">info@charlesmackaybooks.com</a>.
      </p>
      <p style={p}>
        Contact: <a href="mailto:charlese1mackay@hotmail.com">charlese1mackay@hotmail.com</a>.
      </p>

      <h2 style={h2}>2. Acceptance of these Terms</h2>
      <p style={p}>
        By browsing the Site, creating an account, or placing an order you confirm that you accept these Terms and our{' '}
        <Link href="/privacy">Privacy Policy</Link>. If you do not accept them, please do not use the Site.
      </p>

      <h2 style={h2}>3. Ordering and contract formation</h2>
      <p style={p}>
        All orders are an offer by you to buy. A binding contract is formed only when payment has been confirmed by our
        payment processor (Stripe) and we have sent you an order confirmation email. We may decline an order, for
        example if a book is out of stock, if there is a pricing error, or if we cannot ship to your address; in that
        case any payment taken will be refunded in full.
      </p>

      <h2 style={h2}>4. Prices, taxes, and currency</h2>
      <p style={p}>
        All prices are in pounds sterling (GBP) and include any UK Value Added Tax that applies. Books in the UK are
        currently zero-rated for VAT. Customers outside the UK may be charged import duties or local taxes by their
        own authorities on delivery; these are your responsibility.
      </p>
      <p style={p}>
        We reserve the right to correct obvious pricing errors before accepting your order.
      </p>

      <h2 style={h2}>5. Shipping and delivery</h2>
      <p style={p}>
        We dispatch from Glasgow, Scotland by Royal Mail Tracked. Indicative rates per order:
      </p>
      <ul style={ul}>
        <li>UK (Royal Mail Tracked 48): &pound;3.95</li>
        <li>Europe (International Tracked): &pound;15.55</li>
        <li>Worldwide (International Tracked): &pound;25.95 to &pound;27.00</li>
      </ul>
      <p style={p}>
        Live rates and full zone detail are shown on our <Link href="/shipping">Delivery</Link> page and at checkout.
        Delivery times are estimates given by Royal Mail and are not guaranteed.
      </p>

      <h2 style={h2}>6. Right to cancel (14-day cooling-off)</h2>
      <p style={p}>
        Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 you have the
        right to cancel a distance-sale contract within 14 days of receiving the goods, without giving any reason. To
        exercise the right, send us a clear written statement (by email to{' '}
        <a href="mailto:charlese1mackay@hotmail.com">charlese1mackay@hotmail.com</a>) before the 14-day period expires.
        You must return the goods to us within 14 days of telling us you wish to cancel; the cost of return is yours
        unless the goods are faulty or mis-described. We will refund the price you paid, including the cheapest standard
        delivery cost we offer, within 14 days of receiving the goods back (or evidence that you have sent them).
      </p>

      <p style={p}>You may use the model cancellation form below; you do not have to.</p>

      <div style={box}>
        <strong>Model Cancellation Form</strong>
        <br />
        To: A Mackay (Publisher) Ltd. Email:{' '}
        charlese1mackay@hotmail.com (postal address available on request via info@charlesmackaybooks.com)
        <br />
        I/We [*] hereby give notice that I/We [*] cancel my/our [*] contract of sale of the following goods [*]/for the
        supply of the following service [*],
        <br />
        Ordered on [*]/received on [*],
        <br />
        Name of consumer(s),
        <br />
        Address of consumer(s),
        <br />
        Signature of consumer(s) (only if this form is notified on paper),
        <br />
        Date.
        <br />
        [*] Delete as appropriate.
      </div>

      <h2 style={h2}>7. Faulty or mis-described goods (Consumer Rights Act 2015)</h2>
      <p style={p}>
        Under the Consumer Rights Act 2015 the goods we supply must be of satisfactory quality, fit for purpose, and as
        described. If a book arrives faulty or is not as described you have the right to:
      </p>
      <ul style={ul}>
        <li>a full refund within 30 days of delivery (the &ldquo;short-term right to reject&rdquo;);</li>
        <li>a replacement or repair after the 30-day window; and</li>
        <li>a price reduction or final right to reject if a replacement still does not conform.</li>
      </ul>
      <p style={p}>
        Email <a href="mailto:charlese1mackay@hotmail.com">charlese1mackay@hotmail.com</a> within 14 days of delivery
        with your order number and a photograph of the damage. We will reply with the return address; once the book is
        back with us, you may choose a replacement copy or a full refund. Return postage on faulty or mis-described
        goods is at our expense.
      </p>

      <h2 style={h2}>8. Voluntary returns policy</h2>
      <p style={p}>
        In addition to your statutory rights, we offer a 30-day voluntary returns window for unwanted books in original
        condition. See our <Link href="/returns">Returns &amp; Refunds page</Link>.
      </p>

      <h2 style={h2}>9. Liability</h2>
      <p style={p}>
        Nothing in these Terms limits or excludes our liability for: death or personal injury caused by our negligence;
        fraud or fraudulent misrepresentation; breach of the implied terms in sections 9 to 11 of the Consumer Rights
        Act 2015; or any other liability that cannot lawfully be limited.
      </p>
      <p style={p}>
        Subject to that, our total liability arising out of or in connection with any order is limited to the price you
        paid for the goods in question. We are not responsible for losses that are unforeseeable, or for indirect or
        consequential losses.
      </p>

      <h2 style={h2}>10. Use of the Site</h2>
      <p style={p}>
        The text, images, and design of this Site are protected by copyright. You may view and print pages for your own
        personal use but you may not reproduce, redistribute, or republish any content without our written permission.
      </p>

      <h2 style={h2}>11. Privacy</h2>
      <p style={p}>
        Your personal data is processed in accordance with our <Link href="/privacy">Privacy Policy</Link>. Cookies are
        described in our <Link href="/cookies">Cookie Policy</Link>.
      </p>

      <h2 style={h2}>12. Governing law and jurisdiction</h2>
      <p style={p}>
        These Terms are governed by the law of Scotland. Any dispute will be subject to the non-exclusive jurisdiction
        of the Scottish courts. If you are a consumer resident in another part of the UK, you may also bring
        proceedings in the courts of the part of the UK where you live; nothing in this clause affects your rights as a
        consumer under mandatory local law.
      </p>

      <h2 style={h2}>13. Complaints and dispute resolution</h2>
      <p style={p}>
        We aim to resolve any complaint quickly. Please email{' '}
        <a href="mailto:charlese1mackay@hotmail.com">charlese1mackay@hotmail.com</a>. If we cannot resolve a dispute,
        the European Commission&apos;s Online Dispute Resolution platform is available at{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>{' '}
        for cross-border disputes.
      </p>

      <h2 style={h2}>14. Changes to these Terms</h2>
      <p style={p}>
        We may update these Terms from time to time. The version in force at the time you place an order will apply to
        that order.
      </p>
    </article>
  );
}
