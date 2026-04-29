'use client';

import { useEffect, useState } from 'react';

export type CookieConsent = {
  analytics: boolean;
  marketing: boolean;
  ts: string;
};

const STORAGE_KEY = 'cookie_consent';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

// Read consent from a first-party cookie. Cookie is preferred over localStorage
// because UK PECR/GDPR auditors expect a single, inspectable consent record that
// also travels with SSR requests if needed. Old localStorage values are migrated
// transparently.
export function readConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null;
  try {
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(STORAGE_KEY + '='));
    if (match) {
      const raw = decodeURIComponent(match.split('=').slice(1).join('='));
      const parsed = JSON.parse(raw) as CookieConsent;
      if (typeof parsed.analytics === 'boolean' && typeof parsed.marketing === 'boolean') {
        return parsed;
      }
    }
    // Migrate any legacy localStorage value, then drop it.
    if (typeof window !== 'undefined') {
      const legacy = window.localStorage.getItem(STORAGE_KEY);
      if (legacy) {
        const parsed = JSON.parse(legacy) as CookieConsent;
        if (typeof parsed.analytics === 'boolean' && typeof parsed.marketing === 'boolean') {
          window.localStorage.removeItem(STORAGE_KEY);
          writeConsent(parsed);
          return parsed;
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

function writeConsent(consent: CookieConsent) {
  if (typeof document === 'undefined') return;
  try {
    const value = encodeURIComponent(JSON.stringify(consent));
    const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${STORAGE_KEY}=${value}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax${secure}`;
    // Notify the rest of the app (ConsentGate) without a full reload.
    window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: consent }));
  } catch {
    // ignore disabled storage
  }
}

// Public helper so the footer "Cookie preferences" trigger can re-open the banner.
export function openCookiePreferences() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event('cookie-consent-open'));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }
    const reopen = () => {
      const cur = readConsent();
      if (cur) {
        setAnalytics(cur.analytics);
        setMarketing(cur.marketing);
      }
      setVisible(true);
      setShowCustomize(true);
    };
    window.addEventListener('cookie-consent-open', reopen);
    return () => window.removeEventListener('cookie-consent-open', reopen);
  }, []);

  if (!visible) return null;

  const persist = (consent: Omit<CookieConsent, 'ts'>) => {
    const full: CookieConsent = { ...consent, ts: new Date().toISOString() };
    writeConsent(full);
    setVisible(false);
    setShowCustomize(false);
  };

  const acceptAll = () => persist({ analytics: true, marketing: true });
  const rejectNonEssential = () => persist({ analytics: false, marketing: false });
  const saveCustom = () => persist({ analytics, marketing });

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'var(--navy, #0a1628)',
        color: 'white',
        borderTop: '2px solid var(--gold, #c9a961)',
        padding: '20px 24px',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 360px', minWidth: 280 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--gold, #c9a961)' }}>
            Cookies on charlesmackaybooks.com
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
            We use strictly necessary cookies to run the site (login, basket). With your consent we also use analytics
            cookies (Google Analytics) to understand how visitors use the site. No marketing or advertising cookies are
            set without consent. See our{' '}
            <a href="/cookies" style={{ color: 'var(--gold, #c9a961)', textDecoration: 'underline' }}>
              Cookie Policy
            </a>{' '}
            and{' '}
            <a href="/privacy" style={{ color: 'var(--gold, #c9a961)', textDecoration: 'underline' }}>
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={rejectNonEssential}
            style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.5)',
              padding: '10px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: 4,
            }}
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => setShowCustomize((v) => !v)}
            style={{
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.5)',
              padding: '10px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: 4,
            }}
            aria-expanded={showCustomize}
          >
            {showCustomize ? 'Hide options' : 'Customize'}
          </button>
          <button
            type="button"
            onClick={acceptAll}
            style={{
              background: 'var(--gold, #c9a961)',
              color: 'var(--navy, #0a1628)',
              border: 'none',
              padding: '10px 18px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              borderRadius: 4,
            }}
          >
            Accept all
          </button>
        </div>
      </div>

      {showCustomize && (
        <div
          style={{
            maxWidth: 1200,
            margin: '16px auto 0',
            background: 'rgba(255,255,255,0.05)',
            padding: 16,
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 13, lineHeight: 1.5 }}>
              <input type="checkbox" checked disabled style={{ marginTop: 4 }} />
              <span>
                <strong style={{ display: 'block', color: 'var(--gold, #c9a961)' }}>Strictly necessary (always on)</strong>
                Session, basket, login (Supabase auth, Next.js session). Required for the site to function.
              </span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 13, lineHeight: 1.5, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                style={{ marginTop: 4 }}
              />
              <span>
                <strong style={{ display: 'block', color: 'var(--gold, #c9a961)' }}>Analytics</strong>
                Google Analytics 4 (_ga, _ga_*). Helps us improve the site by understanding aggregate visitor behaviour.
              </span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 13, lineHeight: 1.5, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                style={{ marginTop: 4 }}
              />
              <span>
                <strong style={{ display: 'block', color: 'var(--gold, #c9a961)' }}>Marketing / advertising</strong>
                Google Ads conversion tags (_gcl_*) if/when we run paid campaigns. Off by default.
              </span>
            </label>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={saveCustom}
              style={{
                background: 'var(--gold, #c9a961)',
                color: 'var(--navy, #0a1628)',
                border: 'none',
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                borderRadius: 4,
              }}
            >
              Save preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
