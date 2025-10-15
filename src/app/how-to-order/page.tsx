import Link from 'next/link';
import type { Metadata } from 'next';
import BBCPageTemplate from '@/components/BBCPageTemplate';
export const metadata: Metadata = {
  title: 'How to Order Aviation History Books | Charles E. MacKay Aviation Books',
  description: 'Multiple secure purchasing options with fast worldwide shipping from Glasgow, Scotland. Order Charles E. MacKay aviation history books via eBay, PayPal, or direct contact.',
  keywords: [
    'order aviation books',
    'buy aviation history books',
    'Charles MacKay books order',
    'aviation books PayPal',
    'aviation books eBay',
    'worldwide shipping aviation books',
    'Glasgow aviation books',
    'secure book ordering',
    'aviation history purchase',
    'bulk aviation books order'
  ],
  openGraph: {
    title: 'How to Order Aviation History Books',
    description: 'Multiple secure purchasing options with fast worldwide shipping from Glasgow, Scotland.',
    url: 'https://charlesmackaybooks.com/how-to-order',
    siteName: 'Charles E. MacKay - Aviation Historian',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'How to Order Aviation History Books',
    description: 'Multiple secure purchasing options with fast worldwide shipping from Glasgow, Scotland.',
  }
};

export default function HowToOrderPage() {
  return (
    <BBCPageTemplate
      title="How to Order Aviation History Books"
      subtitle="Multiple secure purchasing options with fast worldwide shipping from Glasgow, Scotland"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'How to Order' }]}
    >
      <div className="surface-dark relative -mx-6 px-6 py-12 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
        <div className="relative">

        <div className="max-w-6xl mx-auto">
          {/* Quick Start */}
          <div className="border border-white/15 rounded-lg p-8 mb-12 text-center bg-black/10">
            <h2 className="text-2xl font-bold mb-4">🚀 Quick Start Guide</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl mb-2">1️⃣</div>
                <h3 className="font-bold mb-2">Browse Books</h3>
                <p className="text-sm opacity-90">Find your aviation history books in our catalog</p>
              </div>
              <div>
                <div className="text-4xl mb-2">2️⃣</div>
                <h3 className="font-bold mb-2">Choose Payment</h3>
                <p className="text-sm opacity-90">eBay, PayPal Direct, or Add to Cart</p>
              </div>
              <div>
                <div className="text-4xl mb-2">3️⃣</div>
                <h3 className="font-bold mb-2">Fast Shipping</h3>
                <p className="text-sm opacity-90">Ships within 1-2 days from Scotland</p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🛒</div>
                <h3 className="text-xl font-bold text-primary">eBay Purchase</h3>
                <p className="text-sm text-accent-green font-semibold">Most Popular</p>
              </div>
              <ul className="space-y-2 text-sm opacity-90 mb-4">
                <li>✓ 100% buyer protection</li>
                <li>✓ 1,700+ positive reviews</li>
                <li>✓ Instant purchase</li>
                <li>✓ PayPal or card payment</li>
                <li>✓ Automatic tracking</li>
              </ul>
              <div className="text-center">
                <a
                  href="https://www.ebay.co.uk/usr/chaza87"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline inline-block"
                >
                  Visit eBay Store →
                </a>
              </div>
            </div>

            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">💳</div>
                <h3 className="text-xl font-bold text-primary">PayPal Direct</h3>
                <p className="text-sm text-accent-blue font-semibold">Fastest</p>
              </div>
              <ul className="space-y-2 text-sm opacity-90 mb-4">
                <li>✓ Direct to Charles</li>
                <li>✓ Personal service</li>
                <li>✓ Custom requests welcome</li>
                <li>✓ Bulk discounts available</li>
                <li>✓ All currencies accepted</li>
              </ul>
              <div className="text-center">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Book Order Inquiry"
                  className="underline inline-block"
                >
                  Email for PayPal →
                </a>
              </div>
            </div>

            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🛍️</div>
                <h3 className="text-xl font-bold text-primary">Website Cart</h3>
                <p className="text-sm text-accent-purple font-semibold">Multiple Books</p>
              </div>
              <ul className="space-y-2 text-sm opacity-90 mb-4">
                <li>✓ Add multiple books</li>
                <li>✓ Save for later (wishlist)</li>
                <li>✓ Combined shipping</li>
                <li>✓ Email checkout</li>
                <li>✓ Academic discounts</li>
              </ul>
              <div className="text-center">
                <Link
                  href="/books"
                  className="btn-books inline-block"
                >
                  Browse Books →
                </Link>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="border border-white/15 bg-black/10 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">🚚 Shipping & Delivery</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🇬🇧</div>
                <h3 className="font-bold mb-2">UK Shipping</h3>
                <p className="text-sm opacity-90">Free delivery</p>
                <p className="text-sm opacity-90">1-3 business days</p>
                <p className="text-sm font-semibold">£0.00</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🇪🇺</div>
                <h3 className="font-bold mb-2">Europe</h3>
                <p className="text-sm opacity-90">Tracked delivery</p>
                <p className="text-sm opacity-90">5-10 business days</p>
                <p className="text-sm font-semibold">£4.95</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🇺🇸</div>
                <h3 className="font-bold mb-2">North America</h3>
                <p className="text-sm opacity-90">Tracked delivery</p>
                <p className="text-sm opacity-90">7-14 business days</p>
                <p className="text-sm font-semibold">£8.95</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="font-bold mb-2">Worldwide</h3>
                <p className="text-sm opacity-90">Tracked delivery</p>
                <p className="text-sm opacity-90">10-21 business days</p>
                <p className="text-sm font-semibold">£12.95</p>
              </div>
            </div>

            <div className="mt-8 p-4 border border-white/15 rounded-lg bg-black/10">
              <h3 className="font-bold mb-2">📦 Shipping Features</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>✓ All books carefully packaged</div>
                <div>✓ Tracking number provided</div>
                <div>✓ Insurance included</div>
                <div>✓ Ships within 1-2 business days</div>
              </div>
            </div>
          </div>

          {/* Special Orders */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="border border-white/15 bg-black/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">🎓 Academic Orders</h3>
              <ul className="space-y-2 text-sm">
                <li>• University libraries: Purchase order accepted</li>
                <li>• Bulk orders (5+ books): Special discounts</li>
                <li>• Academic references: Citation support</li>
                <li>• Research institutions: Extended payment terms</li>
                <li>• Conference sales: Event discounts available</li>
              </ul>
              <div className="mt-4">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Academic Order Inquiry"
                  className="underline font-semibold"
                >
                  Contact for Academic Pricing →
                </a>
              </div>
            </div>

            <div className="border border-white/15 bg-black/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">📚 Special Requests</h3>
              <ul className="space-y-2 text-sm">
                <li>• Book signing: Personal messages available</li>
                <li>• Gift wrapping: Free for holidays</li>
                <li>• Express shipping: 2-3 day delivery</li>
                <li>• Custom research: Consultation services</li>
                <li>• Rare editions: Inquire about availability</li>
              </ul>
              <div className="mt-4">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Special Request"
                  className="underline font-semibold"
                >
                  Make Special Request →
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border border-white/15 bg-black/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8">❓ Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-2">How quickly do books ship?</h3>
                  <p className="text-sm opacity-90">All books ship within 1-2 business days from Glasgow, Scotland. Charles personally handles all orders.</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">What payment methods are accepted?</h3>
                  <p className="text-sm opacity-90">PayPal, credit cards (via eBay), bank transfer, and checks. All major currencies accepted through PayPal.</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Are the books in good condition?</h3>
                  <p className="text-sm opacity-90">Most books are in "New" or "Very Good" condition. Condition is clearly marked on each listing. All books are carefully inspected.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-2">Do you offer academic discounts?</h3>
                  <p className="text-sm opacity-90">Yes! Universities, libraries, and bulk orders qualify for special pricing. Contact Charles directly for academic rates.</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Can I track my order?</h3>
                  <p className="text-sm opacity-90">Yes, tracking numbers are provided for all shipments. You'll receive tracking information within 24 hours of shipping.</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">What if I have questions?</h3>
                  <p className="text-sm opacity-90">Charles personally responds to all inquiries within 24 hours. Email charlese1mackay@hotmail.com for any questions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Order?</h2>
            <p className="opacity-90 mb-6">
              Choose your preferred method or contact Charles directly for personalized service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/books"
                className="btn-books"
              >
                📚 Browse Books
              </Link>
              <a
                href="mailto:charlese1mackay@hotmail.com?subject=Book Order Inquiry"
                className="underline font-semibold"
              >
                📧 Email Charles
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </BBCPageTemplate>
  );
}
