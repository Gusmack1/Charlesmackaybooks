'use client'
import Script from 'next/script'

const PRIMARY_GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-RJS2CCBSJP'
const ADDITIONAL_GA_IDS =
  process.env.NEXT_PUBLIC_ADDITIONAL_MEASUREMENT_IDS?.split(',').map((id) => id.trim()).filter(Boolean) || []
const GTM_IDS =
  process.env.NEXT_PUBLIC_GTM_IDS?.split(',').map((id) => id.trim()).filter(Boolean) ||
  [process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WKRHZDSX']

export default function AnalyticsScripts() {
  const measurementIds = Array.from(new Set([PRIMARY_GA_ID, ...ADDITIONAL_GA_IDS.filter(Boolean)]))
  const gtmIds = Array.from(new Set(GTM_IDS.filter(Boolean)))

  const configStatements = measurementIds
    .map(
      (id) => `gtag('config', '${id}', {
  page_title: document.title,
  page_location: window.location.href,
  send_page_view: true
});`
    )
    .join('\n')

  return (
    <>
      {/* Consent Mode (basic, can be elevated by CMP later) */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'analytics_storage': 'denied',
            'wait_for_update': 500
          });
        `}
      </Script>

      <Script src={`https://www.googletagmanager.com/gtag/js?id=${PRIMARY_GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configStatements}
        `}
      </Script>

      {gtmIds.map((gtmId) => (
        <Script key={gtmId} id={`gtm-init-${gtmId}`} strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      ))}
    </>
  )
}

