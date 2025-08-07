import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact Charles E. MacKay - Aviation Historian & Author | Charles E. MacKay Aviation Books',
  description: 'Contact Charles E. MacKay for academic collaboration, research inquiries, bulk book orders, or historical consultancy. Based in Glasgow, Scotland.',
  keywords: [
    'contact Charles MacKay',
    'aviation historian contact',
    'Charles MacKay aviation',
    'academic collaboration',
    'research inquiries',
    'bulk book orders',
    'historical consultancy',
    'Glasgow aviation historian',
    'Scottish aviation research',
    'aviation history collaboration'
  ],
  openGraph: {
    title: 'Contact Charles E. MacKay - Aviation Historian & Author',
    description: 'Contact Charles E. MacKay for academic collaboration, research inquiries, bulk book orders, or historical consultancy.',
    url: 'https://charlesmackaybooks.com/contact',
    siteName: 'Charles E. MacKay - Aviation Historian',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Charles E. MacKay - Aviation Historian & Author',
    description: 'Contact Charles E. MacKay for academic collaboration, research inquiries, bulk book orders, or historical consultancy.',
  }
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Charles E. MacKay",
  "description": "Contact Charles E. MacKay for academic collaboration, research inquiries, bulk book orders, or historical consultancy",
  "mainEntity": {
    "@type": "Person",
    "name": "Charles E. MacKay",
    "jobTitle": "Aviation Historian & Author",
    "email": "charlese1mackay@hotmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Glasgow",
      "addressCountry": "Scotland"
    }
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Contact Charles E. MacKay
            </h1>
            <p className="text-xl text-white mb-8 leading-relaxed max-w-3xl mx-auto">
              Get in touch for academic collaboration, research inquiries, bulk book orders, or historical consultancy services.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Contact Information */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="content h2 text-primary mb-8">Get in Touch</h2>
              <p className="content text-secondary mb-8 leading-relaxed">
                Charles E. MacKay welcomes inquiries from fellow researchers, academic institutions, museums, and aviation enthusiasts. Whether you're interested in collaboration, seeking historical information, or looking to acquire books for your institution, please don't hesitate to reach out.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Email</h3>
                    <p className="text-secondary">charlese1mackay@hotmail.com</p>
                    <p className="text-sm text-muted mt-1">Response time: Usually within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Location</h3>
                    <p className="text-secondary">Glasgow, Scotland</p>
                    <p className="text-sm text-gray-500 mt-1">Available for local meetings and archive research</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Book Orders</h3>
                    <p className="text-secondary">Available through eBay store</p>
                    <p className="text-sm text-gray-500 mt-1">Secure worldwide shipping with tracking</p>
                    <a
                      href="https://www.ebay.co.uk/usr/chaza87"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Visit eBay Store →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Quick Contact Form</h3>
              <p className="text-secondary mb-6">
                Send me a message directly using your email client:
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Research Inquiry&body=Dear Charles MacKay,%0D%0A%0D%0AI am interested in..."
                  className="block w-full badge badge-blue text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  📧 Send Research Inquiry
                </a>

                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Academic Collaboration&body=Dear Charles MacKay,%0D%0A%0D%0AI would like to discuss..."
                  className="block w-full badge badge-green text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  🎓 Academic Collaboration
                </a>

                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Bulk Book Order&body=Dear Charles MacKay,%0D%0A%0D%0AI am interested in ordering..."
                  className="block w-full badge badge-purple text-center py-3 rounded-lg font-semibold transition-colors"
                >
                  📚 Bulk Book Orders
                </a>

                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=General Inquiry&body=Dear Charles MacKay,%0D%0A%0D%0A"
                  className="block w-full bg-slate-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
                >
                  💬 General Inquiry
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                These links will open your default email client
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Services & Collaboration</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🎓 Academic Services</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Research collaboration</li>
                <li>• University course adoption</li>
                <li>• Academic bulk orders</li>
                <li>• Thesis supervision support</li>
                <li>• Conference presentations</li>
                <li>• Peer review services</li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">🏛️ Museum & Institution</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Exhibition historical support</li>
                <li>• Artifact authentication</li>
                <li>• Curatorial consultation</li>
                <li>• Educational program content</li>
                <li>• Archive organization</li>
                <li>• Research documentation</li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">📺 Media & Publishing</h3>
              <ul className="space-y-2 text-secondary">
                <li>• Documentary consultation</li>
                <li>• Historical accuracy review</li>
                <li>• Interview participation</li>
                <li>• Book forewords</li>
                <li>• Magazine articles</li>
                <li>• Fact-checking services</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-slate-800 mb-2">How can I order books for my university or institution?</h3>
              <p className="text-gray-700">For bulk academic orders, please email directly with your requirements. Special pricing may be available for educational institutions, and I can provide invoicing for institutional purchases.</p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-2">Do you accept research collaboration requests?</h3>
              <p className="text-secondary">Yes, I welcome collaboration with fellow researchers, particularly on Scottish aviation history, WWI/WWII aircraft development, and industrial aviation heritage projects.</p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-2">Can you provide historical consultation for media projects?</h3>
              <p className="text-secondary">I offer consultation services for documentaries, films, books, and other media projects requiring historical accuracy in aviation history, particularly Scottish and British aviation development.</p>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 mb-2">Are your books available internationally?</h3>
              <p className="text-secondary">Yes, all books are available worldwide through the eBay store with tracked shipping. International delivery typically takes 7-14 business days depending on location.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Connect?</h2>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Whether you're a researcher, educator, museum professional, or aviation enthusiast, I'm here to help with your aviation history needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:charlese1mackay@hotmail.com"
              className="badge badge-blue px-8 py-3 rounded-lg font-bold transition-colors"
            >
              📧 Send Email
            </a>
            <Link
              href="/books"
              className="border border-blue-400 text-blue-200 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 hover:text-blue-800 transition-colors"
            >
              📚 Browse Books
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
