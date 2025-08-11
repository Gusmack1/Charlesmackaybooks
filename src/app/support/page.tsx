import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'

export const metadata: Metadata = {
  title: 'Support | Charles E. MacKay Aviation Books',
  description: 'Customer support for Charles E. MacKay Aviation Books. Get help with orders, shipping, returns & refunds, academic and bulk orders. Contact: charlese1mackay@hotmail.com',
  alternates: { canonical: 'https://charlesmackaybooks.com/support' },
}

const supportSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Customer Support',
  description: 'Customer support for Charles E. MacKay Aviation Books',
  mainEntity: {
    '@type': 'Organization',
    name: 'Charles E. MacKay Books',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'charlese1mackay@hotmail.com',
      areaServed: 'GB',
      availableLanguage: 'en-GB'
    }
  }
}

export default function SupportPage() {
  return (
    <BBCPageTemplate
      title="Customer Support"
      subtitle="Orders, shipping, returns & refunds, academic and bulk orders"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Support' }]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(supportSchema) }} />

      <div className="surface-dark relative -mx-6 px-6 py-12 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
        <div className="relative">

          {/* Contact */}
          <div className="card content">
            <h2 className="content h2">Contact</h2>
            <p className="text-secondary">
              Email: <a className="underline" href="mailto:charlese1mackay@hotmail.com">charlese1mackay@hotmail.com</a>
            </p>
            <p className="text-secondary">Typical response time: 24–48 hours (Mon–Fri)</p>
          </div>

          {/* Quick Help */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="card content">
              <h3 className="content h3">Order Help</h3>
              <ul className="list-disc list-inside text-secondary space-y-1">
                <li><a className="underline" href="/how-to-order">How to Order</a> – purchase options and shipping</li>
                <li><a className="underline" href="/returns">Returns & Refunds</a> – process and timelines</li>
                <li>Order status: email your title, ISBN, and date of purchase</li>
              </ul>
            </div>
            <div className="card content">
              <h3 className="content h3">Academic & Bulk Orders</h3>
              <ul className="list-disc list-inside text-secondary space-y-1">
                <li>University libraries: purchase orders accepted</li>
                <li>Bulk orders (5+): academic/volume pricing available</li>
                <li>Contact: <a className="underline" href="mailto:charlese1mackay@hotmail.com?subject=Academic%20or%20Bulk%20Order">email support</a></li>
              </ul>
            </div>
          </div>

          {/* Shipping Summary */}
          <div className="card content mt-8">
            <h3 className="content h3">Shipping Summary</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-secondary">
              <div>
                <div className="font-semibold text-primary">UK</div>
                <div>Free delivery</div>
                <div>1–3 business days</div>
              </div>
              <div>
                <div className="font-semibold text-primary">Europe</div>
                <div>Tracked delivery</div>
                <div>5–10 business days</div>
              </div>
              <div>
                <div className="font-semibold text-primary">North America</div>
                <div>Tracked delivery</div>
                <div>7–14 business days</div>
              </div>
              <div>
                <div className="font-semibold text-primary">Worldwide</div>
                <div>Tracked delivery</div>
                <div>10–21 business days</div>
              </div>
            </div>
            <p className="text-secondary mt-3">Full details: <a className="underline" href="/how-to-order">How to Order</a></p>
          </div>

          {/* FAQs */}
          <div className="card content mt-8">
            <h3 className="content h3">Frequently Asked Questions</h3>
            <div className="space-y-4 text-secondary">
              <div>
                <div className="font-semibold text-primary">Can I return a book?</div>
                <div>Yes – see the <a className="underline" href="/returns">Returns & Refunds</a> page for the process.</div>
              </div>
              <div>
                <div className="font-semibold text-primary">Do you offer tracking?</div>
                <div>Yes – tracked shipping for all destinations, with tracking details provided after dispatch.</div>
              </div>
              <div>
                <div className="font-semibold text-primary">Do you ship internationally?</div>
                <div>Yes – worldwide shipping with typical delivery times listed above.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BBCPageTemplate>
  )
}


