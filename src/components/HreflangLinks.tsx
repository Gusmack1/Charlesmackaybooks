import { headers } from 'next/headers'

const SITE_DOMAIN = 'https://charlesmackaybooks.com'

/**
 * Renders hreflang link tags for en-GB and x-default.
 * Helps search engines understand the site targets British English.
 */
export default async function HreflangLinks() {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'
  const url = `${SITE_DOMAIN}${pathname.startsWith('/') ? pathname : `/${pathname}`}`

  return (
    <>
      <link rel="alternate" hrefLang="en-GB" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </>
  )
}
