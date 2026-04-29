import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for charlesmackaybooks.com. How A Mackay (Publisher) Ltd collects, uses, and protects your personal data under UK GDPR and the Data Protection Act 2018.',
  alternates: { canonical: '/privacy' },
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

export default function PrivacyPage() {
  return (
    <article style={wrapper}>
      <h1 style={h1}>Privacy Policy</h1>
      <p style={muted}>Last updated: {LAST_UPDATED}</p>

      <p style={p}>
        This Privacy Policy explains how A MACKAY (PUBLISHER) LTD (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
        collects and uses personal data when you visit charlesmackaybooks.com or place an order with us. We comply with
        the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
      </p>

      <h2 style={h2}>1. Data controller</h2>
      <p style={p}>
        The data controller is:
      </p>
      <ul style={ul}>
        <li>A MACKAY (PUBLISHER) LTD (trading as Charles Mackay Books)</li>
        <li>Companies House registration: SC858624 (Scotland)</li>
        <li>Registered office: 87 Knightscliffe Avenue, Glasgow, Scotland, G13 2RX</li>
        <li>
          Contact:{' '}
          <a href="mailto:charlese1mackay@hotmail.com">charlese1mackay@hotmail.com</a>
        </li>
      </ul>
      <p style={p}>
        We are a small private limited company. We are working through registration with the UK Information
        Commissioner&apos;s Office (ICO) as a data controller. If you would like our ICO registration number please email
        the address above.
      </p>

      <h2 style={h2}>2. Personal data we collect</h2>
      <ul style={ul}>
        <li>
          <strong>Order data</strong>: name, billing and delivery address, email address, phone number (optional),
          order contents and order history.
        </li>
        <li>
          <strong>Account data</strong> (if you create one): email address, hashed password (or magic-link token),
          saved addresses and wishlist.
        </li>
        <li>
          <strong>Payment metadata</strong>: we do not see or store your full card number. Card payments are
          processed by Stripe Payments UK Limited; we receive only a transaction reference, the last four digits, the
          card brand and country, and the billing postcode.
        </li>
        <li>
          <strong>Communications</strong>: the content of any email or contact-form message you send us.
        </li>
        <li>
          <strong>Technical data</strong>: IP address, browser, device, referrer, and usage statistics, collected
          via cookies and similar technologies (see <Link href="/cookies">Cookie Policy</Link>) only with your consent
          where consent is required.
        </li>
      </ul>

      <h2 style={h2}>3. Legal bases for processing</h2>
      <ul style={ul}>
        <li>
          <strong>Contract (UK GDPR Article 6(1)(b))</strong>: to take and fulfil your order, deliver your books,
          and handle returns.
        </li>
        <li>
          <strong>Legal obligation (Article 6(1)(c))</strong>: to keep tax and accounting records as required by
          HMRC.
        </li>
        <li>
          <strong>Consent (Article 6(1)(a))</strong>: for non-essential cookies (analytics, marketing) and for any
          marketing emails. You can withdraw consent at any time.
        </li>
        <li>
          <strong>Legitimate interests (Article 6(1)(f))</strong>: for security, fraud prevention, and aggregated
          internal reporting. Our legitimate interests are balanced against your rights and freedoms.
        </li>
      </ul>

      <h2 style={h2}>4. How we use your data</h2>
      <ul style={ul}>
        <li>Process orders, take payment, ship goods and handle returns.</li>
        <li>Communicate with you about your order (dispatch confirmation, tracking, refunds).</li>
        <li>Maintain your account and wishlist (if you have created one).</li>
        <li>Comply with tax, accounting, and consumer-protection law.</li>
        <li>Improve the site and detect fraud or abuse.</li>
        <li>Send marketing emails, only if you have explicitly opted in.</li>
      </ul>

      <h2 style={h2}>5. Recipients and sub-processors</h2>
      <p style={p}>
        We share personal data only with the following service providers, each acting as a processor under contract:
      </p>
      <ul style={ul}>
        <li>
          <strong>Stripe Payments UK Limited</strong> (United Kingdom; Stripe, Inc. in the United States): payment
          processing.
        </li>
        <li>
          <strong>Royal Mail Group Limited</strong> (United Kingdom): shipping and tracking.
        </li>
        <li>
          <strong>Supabase Inc.</strong> (data hosted in EU, eu-west region): database, authentication and
          file storage.
        </li>
        <li>
          <strong>Netlify, Inc.</strong> (United States): website hosting and CDN.
        </li>
        <li>
          <strong>Google LLC / Google Ireland Limited</strong> (Ireland and United States): Google Analytics 4 and
          Google Customer Reviews, only if you have consented to analytics cookies.
        </li>
      </ul>
      <p style={p}>
        We do not sell your personal data and we do not share it for third-party advertising.
      </p>

      <h2 style={h2}>6. International transfers</h2>
      <p style={p}>
        Some of our processors are based outside the UK. Where personal data is transferred outside the UK or EEA we
        rely on the UK&apos;s International Data Transfer Agreement (IDTA), the UK Addendum to the EU Standard
        Contractual Clauses, or an applicable adequacy decision. Copies of the safeguards are available on request.
      </p>

      <h2 style={h2}>7. Retention</h2>
      <ul style={ul}>
        <li>Order, invoice and tax records: 6 years from the end of the financial year, as required by HMRC.</li>
        <li>Account data: until you delete your account, then up to 30 days in backups.</li>
        <li>Marketing consent: until you withdraw it; suppression list kept indefinitely to honour opt-outs.</li>
        <li>
          Analytics data (Google Analytics 4): default retention of 14 months for event-level data; aggregate reports may
          be kept longer.
        </li>
        <li>Support email: up to 3 years from last contact.</li>
      </ul>

      <h2 style={h2}>8. Your rights</h2>
      <p style={p}>Under UK GDPR you have the right to:</p>
      <ul style={ul}>
        <li>access a copy of the personal data we hold about you;</li>
        <li>have inaccurate data rectified;</li>
        <li>have your data erased (&ldquo;right to be forgotten&rdquo;), subject to legal retention obligations;</li>
        <li>restrict or object to processing, including direct marketing;</li>
        <li>data portability for data you provided to us under contract or consent;</li>
        <li>withdraw consent at any time, including for cookies and marketing emails.</li>
      </ul>
      <p style={p}>
        To exercise any of these rights, email us at{' '}
        <a href="mailto:charlese1mackay@hotmail.com">charlese1mackay@hotmail.com</a>. We will respond within one month.
      </p>

      <h2 style={h2}>9. Cookies</h2>
      <p style={p}>
        We use cookies and similar technologies as described in our{' '}
        <Link href="/cookies">Cookie Policy</Link>. No analytics or marketing cookies are set until you have given
        consent through the banner shown on first visit. You can change your choice at any time using the &ldquo;Cookie
        preferences&rdquo; link in the footer.
      </p>

      <h2 style={h2}>10. Security</h2>
      <p style={p}>
        We use HTTPS across the entire site, encrypt data in transit, hash account passwords, restrict database access
        to authenticated services, and enforce row-level security on customer data. Stripe is PCI-DSS certified and
        handles all card data in their environment.
      </p>

      <h2 style={h2}>11. Children</h2>
      <p style={p}>
        Our site is not directed at children under 13 and we do not knowingly collect their data. If you believe a child
        has provided personal data, contact us and we will delete it.
      </p>

      <h2 style={h2}>12. Complaints</h2>
      <p style={p}>
        If you are unhappy with how we have handled your personal data you may complain to the UK Information
        Commissioner&apos;s Office at{' '}
        <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
          ico.org.uk/make-a-complaint
        </a>
        , by phone on 0303 123 1113, or by post to: Information Commissioner&apos;s Office, Wycliffe House, Water Lane,
        Wilmslow, Cheshire, SK9 5AF.
      </p>

      <h2 style={h2}>13. Changes to this policy</h2>
      <p style={p}>
        We may update this policy from time to time. The latest version will always be at this URL with the
        &ldquo;Last updated&rdquo; date at the top.
      </p>
    </article>
  );
}
