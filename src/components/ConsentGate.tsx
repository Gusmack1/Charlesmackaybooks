'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { readConsent, type CookieConsent } from './CookieBanner';

/**
 * ConsentGate — only loads Google Analytics + GT- tags + Google Customer Reviews
 * after the visitor has granted analytics consent via the CookieBanner.
 * Required for UK GDPR + PECR compliance: no non-essential cookies before consent.
 */
export default function ConsentGate() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<CookieConsent>).detail;
      setConsent(detail ?? readConsent());
    };
    window.addEventListener('cookie-consent-change', onChange as EventListener);
    return () => window.removeEventListener('cookie-consent-change', onChange as EventListener);
  }, []);

  if (!consent?.analytics) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-RJS2CCBSJP"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-RJS2CCBSJP', { anonymize_ip: true });
        gtag('config', 'GT-MR8KZP58');
        gtag('config', 'GT-WKRHZDSX');
      `}</Script>
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderBadge"
        strategy="afterInteractive"
      />
      <Script id="gcr-badge" strategy="afterInteractive">{`
        window.renderBadge = function() {
          var ratingBadgeContainer = document.getElementById("gcr-badge");
          if (ratingBadgeContainer && window.gapi) {
            window.gapi.load('ratingbadge', function() {
              window.gapi.ratingbadge.render(ratingBadgeContainer, {"merchant_id": 5631213189, "position": "BOTTOM_RIGHT"});
            });
          }
        };
        if (window.gapi) { window.renderBadge(); }
      `}</Script>
    </>
  );
}
