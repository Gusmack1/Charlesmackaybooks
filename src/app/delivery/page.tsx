import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'

export const metadata: Metadata = {
  title: 'Delivery & Shipping Policy | Charles E. MacKay Aviation Books',
  description: 'Free worldwide tracked shipping on all aviation history books. UK 1–3 days, Europe 5–10 days, worldwide 10–21 days. Dispatched from Glasgow, Scotland.',
  alternates: { canonical: 'https://charlesmackaybooks.com/delivery' }
}

export default function DeliveryPage() {
  return (
    <BBCPageTemplate
      title="Delivery & Shipping Policy"
      subtitle="Free worldwide tracked shipping on all orders"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Delivery & Shipping' }]}
    >
      <div className="surface-dark relative -mx-6 px-6 py-12 rounded-2xl bg-slate-900">
        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
        <div className="relative">
          <div className="card content">
            <h2 className="content h2">Overview</h2>
            <p className="text-secondary">
              We offer free worldwide tracked shipping on all aviation history books. Orders are dispatched from Glasgow, Scotland within 1–2 business days.
            </p>

            <h3 className="content h3 mt-6">Delivery times</h3>
            <ul className="list-disc list-inside text-secondary space-y-1">
              <li><strong>UK:</strong> 1–3 business days</li>
              <li><strong>Europe:</strong> 5–10 business days</li>
              <li><strong>North America:</strong> 7–14 business days</li>
              <li><strong>Rest of world:</strong> 10–21 business days</li>
            </ul>

            <h3 className="content h3 mt-6">Shipping features</h3>
            <ul className="list-disc list-inside text-secondary space-y-1">
              <li>Free tracked delivery for all destinations</li>
              <li>Carefully packaged for safe transit</li>
              <li>Tracking number provided after dispatch</li>
              <li>Insurance included</li>
            </ul>

            <h3 className="content h3 mt-6">Handling time</h3>
            <p className="text-secondary">
              Orders are processed and dispatched within 1–2 business days.
            </p>

            <h3 className="content h3 mt-6">Delivery policy</h3>
            <p className="text-secondary">
              This delivery policy applies to all purchases from charlesmackaybooks.com. For eBay purchases, delivery terms apply as per eBay&apos;s policies. Delivery times are estimates; actual transit may vary by destination and carrier.
            </p>
          </div>
        </div>
      </div>
    </BBCPageTemplate>
  )
}
