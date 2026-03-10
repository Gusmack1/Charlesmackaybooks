import Link from 'next/link';
import type { Metadata } from 'next';
import BBCPageTemplate from '@/components/BBCPageTemplate';
import { SITE_CONSTANTS } from '@/config/constants';
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
  alternates: {
    canonical: 'https://charlesmackaybooks.com/how-to-order'
  },
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
      <div className="surface-dark relative -mx-6 px-6 py-2 rounded-2xl bg-slate-900">
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
                <p className="text-sm opacity-90">Find your aviation history books in our catalogue</p>
              </div>
              <div>
                <div className="text-4xl mb-2">2️⃣</div>
                <h3 className="font-bold mb-2">Choose Payment</h3>
                <p className="text-sm opacity-90">Website checkout (card or PayPal) or eBay checkout</p>
              </div>
              <div>
                <div className="text-4xl mb-2">3️⃣</div>
                <h3 className="font-bold mb-2">Fast Shipping</h3>
                <p className="text-sm opacity-90">Orders dispatch quickly from Scotland</p>
              </div>
            </div>
          </div>

          {/* Payment Options - Website first to drive on-site sales */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">💳</div>
                <h3 className="text-xl font-bold text-primary">Guest Checkout</h3>
                <p className="text-sm text-accent-green font-semibold">Recommended</p>
              </div>
              <ul className="space-y-2 text-sm opacity-90 mb-4">
                <li>✓ No account required</li>
                <li>✓ Card and PayPal available</li>
                <li>✓ Fast checkout on this website</li>
                <li>✓ Use basket for one or multiple books</li>
                <li>✓ Order tracking available after purchase</li>
              </ul>
              <div className="text-center">
                <Link
                  href="/books"
                  className="btn-books inline-block"
                >
                  Buy via Website →
                </Link>
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
                <li>✓ Edit quantities in basket</li>
                <li>✓ Guest-first checkout</li>
                <li>✓ Card and PayPal support</li>
                <li>✓ Simple order tracking</li>
                <li>✓ Ideal for multi-book orders</li>
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

            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🛒</div>
                <h3 className="text-xl font-bold text-primary">eBay Purchase</h3>
                <p className="text-sm text-accent-blue font-semibold">Alternative option</p>
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
          </div>

          {/* Shipping Information */}
          <div className="border border-white/15 bg-black/10 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">🚚 Shipping & Delivery</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🇬🇧</div>
                <h3 className="font-bold mb-2">UK Shipping</h3>
                <p className="text-sm opacity-90">Free shipping</p>
                <p className="text-sm opacity-90">Usually 1-3 business days</p>
                <p className="text-sm font-semibold">Free</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🇪🇺</div>
                <h3 className="font-bold mb-2">Europe</h3>
                <p className="text-sm opacity-90">Tracked delivery</p>
                <p className="text-sm opacity-90">Usually 5-10 business days</p>
                <p className="text-sm font-semibold">Free</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🇺🇸</div>
                <h3 className="font-bold mb-2">North America</h3>
                <p className="text-sm opacity-90">Tracked delivery</p>
                <p className="text-sm opacity-90">Usually 7-14 business days</p>
                <p className="text-sm font-semibold">Free</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="font-bold mb-2">Worldwide</h3>
                <p className="text-sm opacity-90">Tracked delivery</p>
                <p className="text-sm opacity-90">Usually 10-21 business days</p>
                <p className="text-sm font-semibold">Free</p>
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
                <li>• Contact directly for institutional quotes</li>
              </ul>
              <div className="mt-4">
                <a
                  href={`mailto:${SITE_CONSTANTS.AUTHOR_EMAIL}?subject=Academic Order Inquiry`}
                  className="underline font-semibold"
                >
                  Contact for Academic Pricing →
                </a>
              </div>
            </div>

            <div className="border border-white/15 bg-black/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">📚 Special Requests</h3>
              <ul className="space-y-2 text-sm">
                <li>• Ask about current stock and editions</li>
                <li>• Request guidance for first-time buyers</li>
                <li>• Ask about multi-book recommendations</li>
                <li>• Contact for dispatch and tracking help</li>
                <li>• Message for order support before checkout</li>
              </ul>
              <div className="mt-4">
                <a
                  href={`mailto:${SITE_CONSTANTS.AUTHOR_EMAIL}?subject=Special Request`}
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
                  <p className="text-sm opacity-90">Orders are dispatched from Glasgow, Scotland and tracking is provided after dispatch.</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">What payment methods are accepted?</h3>
                  <p className="text-sm opacity-90">On-site checkout supports card and PayPal. eBay checkout is also available on the official seller profile.</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Are the books in good condition?</h3>
                  <p className="text-sm opacity-90">Condition is clearly shown on each product page so you can check before ordering.</p>
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
                  <p className="text-sm opacity-90">Charles personally responds to all inquiries within 24 hours. Email {SITE_CONSTANTS.AUTHOR_EMAIL} for any questions.</p>
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
                href={`mailto:${SITE_CONSTANTS.AUTHOR_EMAIL}?subject=Book Order Inquiry`}
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
