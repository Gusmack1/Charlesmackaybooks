import type { Metadata } from 'next';
import Link from 'next/link';
import CookiePreferencesButton from '@/components/CookiePreferencesButton';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Cookie Policy for charlesmackaybooks.com. What cookies we use, why, and how to control them under the Privacy and Electronic Communications Regulations 2003 (PECR) and UK GDPR.',
  alternates: { canonical: '/cookies' },
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
const muted: React.CSSProperties = { color: '#666', fontSize: 13 };
const table: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
  marginBottom: 18,
};
const th: React.CSSProperties = {
  textAlign: 'left',
  background: '#f6f4ec',
  padding: '8px 10px',
  borderBottom: '1px solid #d9d0b3',
  fontWeight: 700,
};
const td: React.CSSProperties = {
  padding: '8px 10px',
  borderBottom: '1px solid #eee',
  verticalAlign: 'top',
};

export default function CookiesPage() {
  return (
    <article style={wrapper}>
      <h1 style={h1}>Cookie Policy</h1>
      <p style={muted}>Last updated: {LAST_UPDATED}</p>

      <p style={p}>
        This Cookie Policy explains what cookies and similar technologies we use on charlesmackaybooks.com, why we use
        them, and how you can control them. It supplements our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2 style={h2}>1. What are cookies?</h2>
      <p style={p}>
        Cookies are small text files placed on your device by a website. They are widely used to make websites work, or
        work more efficiently, and to provide information to the site owner. Similar technologies include local storage
        and session storage.
      </p>

      <h2 style={h2}>2. The cookies we use</h2>

      <h3 style={{ ...h2, fontSize: 18, marginTop: 24 }}>Strictly necessary (always on)</h3>
      <p style={p}>
        These are required for the site to function. They are exempt from consent under regulation 6(4) of the Privacy
        and Electronic Communications Regulations 2003 (PECR).
      </p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Provider</th>
            <th style={th}>Purpose</th>
            <th style={th}>Lifetime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>sb-* (e.g. sb-access-token, sb-refresh-token)</td>
            <td style={td}>Supabase</td>
            <td style={td}>Authentication session for logged-in customers.</td>
            <td style={td}>Session / up to 1 year</td>
          </tr>
          <tr>
            <td style={td}>cookie_consent</td>
            <td style={td}>This site (localStorage)</td>
            <td style={td}>Stores your cookie preferences so we do not ask again.</td>
            <td style={td}>Until cleared</td>
          </tr>
          <tr>
            <td style={td}>cart / basket</td>
            <td style={td}>This site (localStorage)</td>
            <td style={td}>Remembers items in your basket between page loads.</td>
            <td style={td}>Until cleared or order placed</td>
          </tr>
          <tr>
            <td style={td}>__stripe_mid, __stripe_sid</td>
            <td style={td}>Stripe</td>
            <td style={td}>Fraud prevention on the Stripe-hosted checkout.</td>
            <td style={td}>Up to 1 year</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ ...h2, fontSize: 18, marginTop: 24 }}>Analytics (consent required)</h3>
      <p style={p}>
        Set only if you accept analytics cookies. Used to understand aggregate visitor behaviour and improve the site.
      </p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Provider</th>
            <th style={th}>Purpose</th>
            <th style={th}>Lifetime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>_ga</td>
            <td style={td}>Google Analytics 4</td>
            <td style={td}>Distinguishes unique users.</td>
            <td style={td}>2 years</td>
          </tr>
          <tr>
            <td style={td}>_ga_RJS2CCBSJP</td>
            <td style={td}>Google Analytics 4</td>
            <td style={td}>Persists session state for our GA4 property.</td>
            <td style={td}>2 years</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ ...h2, fontSize: 18, marginTop: 24 }}>Marketing / advertising (consent required)</h3>
      <p style={p}>
        Off by default. May be set in future if/when we run paid advertising campaigns.
      </p>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Provider</th>
            <th style={th}>Purpose</th>
            <th style={th}>Lifetime</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>_gcl_au</td>
            <td style={td}>Google Ads</td>
            <td style={td}>Conversion linker for Google Ads campaigns.</td>
            <td style={td}>3 months</td>
          </tr>
        </tbody>
      </table>

      <h2 style={h2}>3. Managing your cookie preferences</h2>
      <p style={p}>
        You set your initial preferences using the banner shown on first visit. You can change them at any time:
      </p>
      <ul style={{ marginBottom: 14, paddingLeft: 22, fontSize: 15 }}>
        <li>
          <CookiePreferencesButton />: re-opens our banner so you can update your choices.
        </li>
        <li>
          You can also clear cookies and site data through your browser settings (Chrome, Firefox, Safari, Edge all
          provide controls under Settings &raquo; Privacy).
        </li>
        <li>
          Google offers a Google Analytics opt-out browser add-on at{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            tools.google.com/dlpage/gaoptout
          </a>
          .
        </li>
      </ul>

      <h2 style={h2}>4. Changes</h2>
      <p style={p}>
        If we add or change cookies we will update this page and, where required, ask for fresh consent through the
        banner.
      </p>
    </article>
  );
}
