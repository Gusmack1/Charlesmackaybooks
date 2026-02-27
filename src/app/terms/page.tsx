import type { Metadata } from 'next'
import Link from 'next/link'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import { SITE_CONSTANTS } from '@/config/constants'

export const metadata: Metadata = {
  title: 'Terms and Conditions | Charles Mackay Books',
  description:
    'Terms and conditions for purchasing books from Charles Mackay Books, including ordering, payment, delivery, and returns.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/terms',
  },
}

export default function TermsPage() {
  return (
    <BBCPageTemplate
      title="Terms and Conditions"
      subtitle="Important terms for using this site and purchasing books."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms and Conditions' }]}
    >
      <div className="surface-dark relative -mx-6 px-6 py-12 rounded-2xl bg-slate-900">
        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
        <div className="relative">
          <div className="card content text-white">
            <h2 className="content h2">Business Information</h2>
            <p className="text-white/90">
              This website is operated by <strong>{SITE_CONSTANTS.BUSINESS_NAME}</strong>, trading as{' '}
              <strong>{SITE_CONSTANTS.BUSINESS_TRADING_NAME}</strong>.
            </p>
            <p className="text-white/90">
              Address: {SITE_CONSTANTS.BUSINESS_STREET_ADDRESS}, {SITE_CONSTANTS.BUSINESS_LOCALITY},{' '}
              {SITE_CONSTANTS.BUSINESS_POSTAL_CODE}, United Kingdom.
            </p>

            <h3 className="content h3 mt-6">Orders and Payment</h3>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>All product information and prices are listed in GBP unless otherwise stated.</li>
              <li>Orders are accepted when payment has been successfully authorized.</li>
              <li>Payments are processed through secure third-party payment providers.</li>
            </ul>

            <h3 className="content h3 mt-6">Availability and Dispatch</h3>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>Stock status shown on product pages is updated in good faith.</li>
              <li>Dispatch and delivery windows are estimates and can vary by destination.</li>
              <li>Shipping details are listed on the <Link href="/how-to-order" className="underline">How to Order</Link> page.</li>
            </ul>

            <h3 className="content h3 mt-6">Returns and Refunds</h3>
            <p className="text-white/90">
              If an item is damaged, not as described, or there is a fulfillment issue, contact support and we will
              provide next steps. Full details are available on the{' '}
              <Link href="/returns" className="underline">Returns and Refunds</Link> page.
            </p>

            <h3 className="content h3 mt-6">Acceptable Use</h3>
            <p className="text-white/90">
              You agree not to misuse the site, attempt unauthorized access, or interfere with normal website operation.
            </p>

            <h3 className="content h3 mt-6">Intellectual Property</h3>
            <p className="text-white/90">
              Book content, text, images, and other materials on this site are protected by applicable intellectual
              property law and may not be reproduced without permission.
            </p>

            <h3 className="content h3 mt-6">Liability</h3>
            <p className="text-white/90">
              Nothing in these terms limits consumer rights under applicable UK law. To the extent permitted by law, we
              are not liable for indirect or consequential losses.
            </p>

            <h3 className="content h3 mt-6">Contact</h3>
            <p className="text-white/90">
              Email:{' '}
              <a className="underline" href="mailto:charlese1mackay@hotmail.com">
                charlese1mackay@hotmail.com
              </a>
            </p>
            <p className="text-white/90">
              See also <Link href="/privacy" className="underline">Privacy Policy</Link> and{' '}
              <Link href="/support" className="underline">Customer Support</Link>.
            </p>

            <p className="text-sm text-white/70 mt-6">Last updated: February 2026.</p>
          </div>
        </div>
      </div>
    </BBCPageTemplate>
  )
}
