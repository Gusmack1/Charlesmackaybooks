'use client'
import Script from 'next/script'

const DEFAULT_GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-RJS2CCBSJP'
const ADDITIONAL_MEASUREMENT_IDS =
  process.env.NEXT_PUBLIC_ADDITIONAL_MEASUREMENTS?.split(',').map((id) => id.trim()).filter(Boolean) || [
    'GT-MR8KZP58',
  ]
const DEFAULT_GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WKRHZDSX'

export default function AnalyticsScripts() {
  const gaId = DEFAULT_GA_ID
  const gtmId = DEFAULT_GTM_ID
  const measurementIds = Array.from(new Set([gaId, ...ADDITIONAL_MEASUREMENT_IDS.filter(Boolean)]))

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
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${configStatements}
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_referrer: document.referrer
          });
        `}
      </Script>
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>
    </>
  )
}

