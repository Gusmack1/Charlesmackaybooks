import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
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
    <>

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="content h1 text-primary mb-4">How to Order Aviation History Books</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Multiple secure purchasing options with fast worldwide shipping from Glasgow, Scotland
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Quick Start */}
          <div className="hero-section bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white rounded-lg p-8 mb-12 text-center">
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
            <div className="card p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🛒</div>
                <h3 className="text-xl font-bold text-primary">eBay Purchase</h3>
                <p className="text-sm text-accent-green font-semibold">Most Popular</p>
              </div>
              <ul className="space-y-2 text-sm text-secondary mb-4">
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
                  className="badge badge-green px-4 py-2 rounded-lg transition-colors inline-block"
                >
                  Visit eBay Store →
                </a>
              </div>
            </div>

            <div className="card p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">💳</div>
                <h3 className="text-xl font-bold text-primary">PayPal Direct</h3>
                <p className="text-sm text-accent-blue font-semibold">Fastest</p>
              </div>
              <ul className="space-y-2 text-sm text-secondary mb-4">
                <li>✓ Direct to Charles</li>
                <li>✓ Personal service</li>
                <li>✓ Custom requests welcome</li>
                <li>✓ Bulk discounts available</li>
                <li>✓ All currencies accepted</li>
              </ul>
              <div className="text-center">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Book Order Inquiry"
                  className="badge badge-blue px-4 py-2 rounded-lg transition-colors inline-block"
                >
                  Email for PayPal →
                </a>
              </div>
            </div>

            <div className="card p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🛍️</div>
                <h3 className="text-xl font-bold text-primary">Website Cart</h3>
                <p className="text-sm text-accent-purple font-semibold">Multiple Books</p>
              </div>
              <ul className="space-y-2 text-sm text-secondary mb-4">
                <li>✓ Add multiple books</li>
                <li>✓ Save for later (wishlist)</li>
                <li>✓ Combined shipping</li>
                <li>✓ Email checkout</li>
                <li>✓ Academic discounts</li>
              </ul>
              <div className="text-center">
                <Link
                  href="/books"
                  className="badge badge-blue px-4 py-2 rounded-lg transition-colors inline-block"
                >
                  Browse Books →
                </Link>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="card p-8 mb-12">
            <h2 className="text-2xl font-bold text-center text-primary mb-8">🚚 Shipping & Delivery</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🇬🇧</div>
                <h3 className="font-bold text-primary mb-2">UK Shipping</h3>
                <p className="text-sm text-secondary">Free delivery</p>
                <p className="text-sm text-secondary">1-3 business days</p>
                <p className="text-sm text-accent-green font-semibold">£0.00</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🇪🇺</div>
                <h3 className="font-bold text-primary mb-2">Europe</h3>
                <p className="text-sm text-secondary">Tracked delivery</p>
                <p className="text-sm text-secondary">5-10 business days</p>
                <p className="text-sm text-accent-blue font-semibold">£4.95</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🇺🇸</div>
                <h3 className="font-bold text-primary mb-2">North America</h3>
                <p className="text-sm text-secondary">Tracked delivery</p>
                <p className="text-sm text-secondary">7-14 business days</p>
                <p className="text-sm text-accent-blue font-semibold">£8.95</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="font-bold text-primary mb-2">Worldwide</h3>
                <p className="text-sm text-secondary">Tracked delivery</p>
                <p className="text-sm text-secondary">10-21 business days</p>
                <p className="text-sm text-accent-blue font-semibold">£12.95</p>
              </div>
            </div>

            <div className="mt-8 p-4 card-compact bg-accent-green text-white rounded-lg">
              <h3 className="font-bold text-white mb-2">📦 Shipping Features</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-white">
                <div>✓ All books carefully packaged</div>
                <div>✓ Tracking number provided</div>
                <div>✓ Insurance included</div>
                <div>✓ Ships within 1-2 business days</div>
              </div>
            </div>
          </div>

          {/* Special Orders */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="card-compact bg-accent-blue text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">🎓 Academic Orders</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>• University libraries: Purchase order accepted</li>
                <li>• Bulk orders (5+ books): Special discounts</li>
                <li>• Academic references: Citation support</li>
                <li>• Research institutions: Extended payment terms</li>
                <li>• Conference sales: Event discounts available</li>
              </ul>
              <div className="mt-4">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Academic Order Inquiry"
                  className="text-white font-semibold hover:underline"
                >
                  Contact for Academic Pricing →
                </a>
              </div>
            </div>

            <div className="card-compact bg-accent-amber text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">📚 Special Requests</h3>
              <ul className="space-y-2 text-white text-sm">
                <li>• Book signing: Personal messages available</li>
                <li>• Gift wrapping: Free for holidays</li>
                <li>• Express shipping: 2-3 day delivery</li>
                <li>• Custom research: Consultation services</li>
                <li>• Rare editions: Inquire about availability</li>
              </ul>
              <div className="mt-4">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Special Request"
                  className="text-white font-semibold hover:underline"
                >
                  Make Special Request →
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-center text-primary mb-8">❓ Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-primary mb-2">How quickly do books ship?</h3>
                  <p className="text-sm text-secondary">All books ship within 1-2 business days from Glasgow, Scotland. Charles personally handles all orders.</p>
                </div>

                <div>
                  <h3 className="font-bold text-primary mb-2">What payment methods are accepted?</h3>
                  <p className="text-sm text-secondary">PayPal, credit cards (via eBay), bank transfer, and checks. All major currencies accepted through PayPal.</p>
                </div>

                <div>
                  <h3 className="font-bold text-primary mb-2">Are the books in good condition?</h3>
                  <p className="text-sm text-secondary">Most books are in "New" or "Very Good" condition. Condition is clearly marked on each listing. All books are carefully inspected.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-primary mb-2">Do you offer academic discounts?</h3>
                  <p className="text-sm text-secondary">Yes! Universities, libraries, and bulk orders qualify for special pricing. Contact Charles directly for academic rates.</p>
                </div>

                <div>
                  <h3 className="font-bold text-primary mb-2">Can I track my order?</h3>
                  <p className="text-sm text-secondary">Yes, tracking numbers are provided for all shipments. You'll receive tracking information within 24 hours of shipping.</p>
                </div>

                <div>
                  <h3 className="font-bold text-primary mb-2">What if I have questions?</h3>
                  <p className="text-sm text-secondary">Charles personally responds to all inquiries within 24 hours. Email charlese1mackay@hotmail.com for any questions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-primary mb-4">Ready to Order?</h2>
            <p className="text-secondary mb-6">
              Choose your preferred method or contact Charles directly for personalized service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/books"
                className="badge badge-blue px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                📚 Browse Books
              </Link>
              <a
                href="mailto:charlese1mackay@hotmail.com?subject=Book Order Inquiry"
                className="badge badge-green px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                📧 Email Charles
              </a>
            </div>
          </div>
        </div>
      </div>

        {/* Footer removed to avoid duplication; provided by root layout */}
      </div>
    </>
  );
}
