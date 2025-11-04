import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'

export const metadata: Metadata = {
  title: 'Returns & Refunds Policy | Charles E. MacKay Aviation Books',
  description: 'Returns and refunds information for Charles E. MacKay Aviation Books. If an item is not as described or arrives damaged, contact us to arrange a return and refund. We comply with applicable UK consumer law.',
  alternates: { canonical: 'https://charlesmackaybooks.com/returns' }
}

export default function ReturnsPage() {
  return (
    <BBCPageTemplate
      title="Returns & Refunds"
      subtitle="Clear information about returns, refunds, and how to contact us"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Returns & Refunds' }]}
    >
      <div className="surface-dark relative -mx-6 px-6 py-12 rounded-2xl bg-slate-900">
        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
        <div className="relative">
          <div className="card content">
            <h2 className="content h2">Overview</h2>
            <p className="text-secondary">
              We want you to be satisfied with your purchase. If an item is not as described, arrives damaged, or there is an issue with your order, please contact us and we will arrange a resolution which may include a replacement or refund. We comply with applicable UK consumer law.
            </p>

            <h3 className="content h3 mt-6">How to start a return</h3>
            <ul className="list-disc list-inside text-secondary space-y-1">
              <li>Email: <a href="mailto:charlese1mackay@hotmail.com" className="underline">charlese1mackay@hotmail.com</a></li>
              <li>Include your order details (title, ISBN, date, and issue)</li>
              <li>Keep all packaging until we advise next steps</li>
            </ul>

            <h3 className="content h3 mt-6">Refunds</h3>
            <p className="text-secondary">
              Refunds are issued to the original payment method once the returned item is received and assessed, or as otherwise agreed by email. If the item was not as described or arrived damaged, we will cover reasonable return postage costs.
            </p>

            <h3 className="content h3 mt-6">eBay Orders</h3>
            <p className="text-secondary">
              If you purchased through eBay, you may also initiate a return via your eBay order for full buyer protection. We will coordinate through eBay as required.
            </p>

            <h3 className="content h3 mt-6">Contact</h3>
            <p className="text-secondary">
              For any questions, please email <a href="mailto:charlese1mackay@hotmail.com" className="underline">charlese1mackay@hotmail.com</a>. We aim to reply within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </BBCPageTemplate>
  )
}


