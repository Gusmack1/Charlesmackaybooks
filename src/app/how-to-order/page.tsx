'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';


export default function HowToOrderPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">How to Order Aviation History Books</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Multiple secure purchasing options with fast worldwide shipping from Glasgow, Scotland
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Quick Start */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 mb-12 text-center">
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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🛒</div>
                <h3 className="text-xl font-bold text-gray-800">eBay Purchase</h3>
                <p className="text-sm text-green-600 font-semibold">Most Popular</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
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
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-block"
                >
                  Visit eBay Store →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">💳</div>
                <h3 className="text-xl font-bold text-gray-800">PayPal Direct</h3>
                <p className="text-sm text-blue-600 font-semibold">Fastest</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li>✓ Direct to Charles</li>
                <li>✓ Personal service</li>
                <li>✓ Custom requests welcome</li>
                <li>✓ Bulk discounts available</li>
                <li>✓ All currencies accepted</li>
              </ul>
              <div className="text-center">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Book Order Inquiry"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                  Email for PayPal →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🛍️</div>
                <h3 className="text-xl font-bold text-gray-800">Website Cart</h3>
                <p className="text-sm text-purple-600 font-semibold">Multiple Books</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li>✓ Add multiple books</li>
                <li>✓ Save for later (wishlist)</li>
                <li>✓ Combined shipping</li>
                <li>✓ Email checkout</li>
                <li>✓ Academic discounts</li>
              </ul>
              <div className="text-center">
                <Link
                  href="/#books"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-block"
                >
                  Browse Books →
                </Link>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">🚚 Shipping & Delivery</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🇬🇧</div>
                <h3 className="font-bold text-gray-800 mb-2">UK Shipping</h3>
                <p className="text-sm text-gray-600">Free delivery</p>
                <p className="text-sm text-gray-600">1-3 business days</p>
                <p className="text-sm text-green-600 font-semibold">£0.00</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🇪🇺</div>
                <h3 className="font-bold text-gray-800 mb-2">Europe</h3>
                <p className="text-sm text-gray-600">Tracked delivery</p>
                <p className="text-sm text-gray-600">5-10 business days</p>
                <p className="text-sm text-blue-600 font-semibold">£4.95</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🇺🇸</div>
                <h3 className="font-bold text-gray-800 mb-2">North America</h3>
                <p className="text-sm text-gray-600">Tracked delivery</p>
                <p className="text-sm text-gray-600">7-14 business days</p>
                <p className="text-sm text-blue-600 font-semibold">£8.95</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="font-bold text-gray-800 mb-2">Worldwide</h3>
                <p className="text-sm text-gray-600">Tracked delivery</p>
                <p className="text-sm text-gray-600">10-21 business days</p>
                <p className="text-sm text-blue-600 font-semibold">£12.95</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800 mb-2">📦 Shipping Features</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
                <div>✓ All books carefully packaged</div>
                <div>✓ Tracking number provided</div>
                <div>✓ Insurance included</div>
                <div>✓ Ships within 1-2 business days</div>
              </div>
            </div>
          </div>

          {/* Special Orders */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">🎓 Academic Orders</h3>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• University libraries: Purchase order accepted</li>
                <li>• Bulk orders (5+ books): Special discounts</li>
                <li>• Academic references: Citation support</li>
                <li>• Research institutions: Extended payment terms</li>
                <li>• Conference sales: Event discounts available</li>
              </ul>
              <div className="mt-4">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Academic Order Inquiry"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Contact for Academic Pricing →
                </a>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-4">📚 Special Requests</h3>
              <ul className="space-y-2 text-amber-700 text-sm">
                <li>• Book signing: Personal messages available</li>
                <li>• Gift wrapping: Free for holidays</li>
                <li>• Express shipping: 2-3 day delivery</li>
                <li>• Custom research: Consultation services</li>
                <li>• Rare editions: Inquire about availability</li>
              </ul>
              <div className="mt-4">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Special Request"
                  className="text-amber-600 font-semibold hover:underline"
                >
                  Make Special Request →
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">❓ Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">How quickly do books ship?</h3>
                  <p className="text-sm text-gray-600">All books ship within 1-2 business days from Glasgow, Scotland. Charles personally handles all orders.</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">What payment methods are accepted?</h3>
                  <p className="text-sm text-gray-600">PayPal, credit cards (via eBay), bank transfer, and checks. All major currencies accepted through PayPal.</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Are the books in good condition?</h3>
                  <p className="text-sm text-gray-600">Most books are in "New" or "Very Good" condition. Condition is clearly marked on each listing. All books are carefully inspected.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Do you offer academic discounts?</h3>
                  <p className="text-sm text-gray-600">Yes! Universities, libraries, and bulk orders qualify for special pricing. Contact Charles directly for academic rates.</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Can I track my order?</h3>
                  <p className="text-sm text-gray-600">Yes, tracking numbers are provided for all shipments. You'll receive tracking information within 24 hours of shipping.</p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-800 mb-2">What if I have questions?</h3>
                  <p className="text-sm text-gray-600">Charles personally responds to all inquiries within 24 hours. Email charlese1mackay@hotmail.com for any questions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Order?</h2>
            <p className="text-gray-600 mb-6">
              Choose your preferred method or contact Charles directly for personalized service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#books"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                📚 Browse Books
              </Link>
              <a
                href="mailto:charlese1mackay@hotmail.com?subject=Book Order Inquiry"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                📧 Email Charles
              </a>
            </div>
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </>
  );
}
