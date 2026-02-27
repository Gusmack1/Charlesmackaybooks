import type { Metadata } from 'next'
import Link from 'next/link'
import BBCPageTemplate from '@/components/BBCPageTemplate'
import { SITE_CONSTANTS } from '@/config/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy | Charles Mackay Books',
  description:
    'Privacy policy for Charles Mackay Books, including what personal data is collected, how it is used, and how to contact support.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/privacy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <BBCPageTemplate
      title="Privacy Policy"
      subtitle="How we handle personal information for orders and customer support."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
    >
      <div className="surface-dark relative -mx-6 px-6 py-12 rounded-2xl bg-slate-900">
        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
        <div className="relative">
          <div className="card content text-white">
            <h2 className="content h2">Who We Are</h2>
            <p className="text-white/90">
              This website is operated by <strong>{SITE_CONSTANTS.BUSINESS_NAME}</strong>, trading as{' '}
              <strong>{SITE_CONSTANTS.BUSINESS_TRADING_NAME}</strong>.
            </p>
            <h3 className="content h3 mt-6">What Information We Collect</h3>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>Contact details you provide for support requests (for example, name and email address).</li>
              <li>Order and delivery details needed to process and fulfill purchases.</li>
              <li>Technical usage data needed for site security, performance, and fraud prevention.</li>
            </ul>

            <h3 className="content h3 mt-6">How We Use Information</h3>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>To process, dispatch, and support book orders.</li>
              <li>To respond to customer service requests and order queries.</li>
              <li>To maintain site security and improve website reliability.</li>
            </ul>

            <h3 className="content h3 mt-6">Sharing Information</h3>
            <p className="text-white/90">
              We share only the information required to complete payments, deliver orders, and comply with legal
              obligations. This can include payment processors and postal/courier services.
            </p>

            <h3 className="content h3 mt-6">Data Retention and Security</h3>
            <p className="text-white/90">
              We keep personal information only as long as necessary for order fulfillment, customer support, legal
              record-keeping, and fraud prevention. We use reasonable technical and organizational safeguards to protect
              customer data.
            </p>

            <h3 className="content h3 mt-6">Your Rights</h3>
            <p className="text-white/90">
              You can request access, correction, or deletion of personal information, subject to legal and accounting
              obligations. To make a request, contact us by email.
            </p>

            <h3 className="content h3 mt-6">Contact</h3>
            <p className="text-white/90">
              Email:{' '}
              <a className="underline" href={`mailto:${SITE_CONSTANTS.AUTHOR_EMAIL}`}>
                {SITE_CONSTANTS.AUTHOR_EMAIL}
              </a>
            </p>
            <p className="text-white/90">
              See also <Link href="/terms" className="underline">Terms and Conditions</Link>,{' '}
              <Link href="/returns" className="underline">Returns and Refunds</Link>, and{' '}
              <Link href="/support" className="underline">Customer Support</Link>.
            </p>

            <p className="text-sm text-white/70 mt-6">Last updated: February 2026.</p>
          </div>
        </div>
      </div>
    </BBCPageTemplate>
  )
}
