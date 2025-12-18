import Link from 'next/link'
import type { Metadata } from 'next'
import BBCPageTemplate from '@/components/BBCPageTemplate'
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
  alternates: {
    canonical: 'https://charlesmackaybooks.com/contact'
  },
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
    <BBCPageTemplate
      title="Contact Charles E. MacKay"
      subtitle="Get in touch for academic collaboration, research inquiries, bulk orders, or historical consultancy services."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* BBC-style dark canvas */}
      <div className="surface-dark relative -mx-6 px-6 py-12 rounded-2xl bg-slate-900">
        <div className="absolute inset-0 bg-black/10 rounded-2xl pointer-events-none" />
        <div className="relative">

        {/* Contact Information */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="mb-8 leading-relaxed opacity-90">
                Charles E. MacKay welcomes inquiries from fellow researchers, academic institutions, museums, and aviation enthusiasts. Whether you're interested in collaboration, seeking historical information, or looking to acquire books for your institution, please don't hesitate to reach out.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg p-3 bg-black/10 border border-white/15">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Email</h3>
                    <p>charlese1mackay@hotmail.com</p>
                    <p className="text-sm opacity-80 mt-1">Response time: Usually within 24-48 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg p-3 bg-black/10 border border-white/15">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Location</h3>
                    <p>Glasgow, Scotland</p>
                    <p className="text-sm opacity-80 mt-1">Available for local meetings and archive research</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg p-3 bg-black/10 border border-white/15">
                    <span className="text-2xl">🛒</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Book Orders</h3>
                    <p>Available through eBay store</p>
                    <p className="text-sm opacity-80 mt-1">Secure worldwide shipping with tracking</p>
                    <a
                      href="https://www.ebay.co.uk/usr/chaza87"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 underline"
                    >
                      Visit eBay Store →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-white/15 bg-black/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
              <p className="opacity-90 mb-6">
                Send me a message directly using your email client:
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Research Inquiry&body=Dear Charles MacKay,%0D%0A%0D%0AI am interested in..."
                  className="block w-full underline text-center py-3 font-semibold"
                >
                  📧 Send Research Inquiry
                </a>

                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Academic Collaboration&body=Dear Charles MacKay,%0D%0A%0D%0AI would like to discuss..."
                  className="block w-full underline text-center py-3 font-semibold"
                >
                  🎓 Academic Collaboration
                </a>

                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=Bulk Book Order&body=Dear Charles MacKay,%0D%0A%0D%0AI am interested in ordering..."
                  className="block w-full underline text-center py-3 font-semibold"
                >
                  📚 Bulk Book Orders
                </a>

                <a
                  href="mailto:charlese1mackay@hotmail.com?subject=General Inquiry&body=Dear Charles MacKay,%0D%0A%0D%0A"
                  className="block w-full underline text-center py-3 font-semibold"
                >
                  💬 General Inquiry
                </a>
              </div>

              <p className="text-xs opacity-80 mt-4 text-center">
                These links will open your default email client
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Services & Collaboration</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🎓 Academic Services</h3>
              <ul className="space-y-2 opacity-90">
                <li>• Research collaboration</li>
                <li>• University course adoption</li>
                <li>• Academic bulk orders</li>
                <li>• Thesis supervision support</li>
                <li>• Conference presentations</li>
                <li>• Peer review services</li>
              </ul>
            </div>

            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">🏛️ Museum & Institution</h3>
              <ul className="space-y-2 opacity-90">
                <li>• Exhibition historical support</li>
                <li>• Artifact authentication</li>
                <li>• Curatorial consultation</li>
                <li>• Educational program content</li>
                <li>• Archive organization</li>
                <li>• Research documentation</li>
              </ul>
            </div>

            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">📺 Media & Publishing</h3>
              <ul className="space-y-2 opacity-90">
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
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <h3 className="font-bold mb-2">How can I order books for my university or institution?</h3>
              <p className="opacity-90">For bulk academic orders, please email directly with your requirements. Special pricing may be available for educational institutions, and I can provide invoicing for institutional purchases.</p>
            </div>

            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <h3 className="font-bold mb-2">Do you accept research collaboration requests?</h3>
              <p className="opacity-90">Yes, I welcome collaboration with fellow researchers, particularly on Scottish aviation history, WWI/WWII aircraft development, and industrial aviation heritage projects.</p>
            </div>

            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <h3 className="font-bold mb-2">Can you provide historical consultation for media projects?</h3>
              <p className="opacity-90">I offer consultation services for documentaries, films, books, and other media projects requiring historical accuracy in aviation history, particularly Scottish and British aviation development.</p>
            </div>

            <div className="border border-white/15 bg-black/10 rounded-lg p-6">
              <h3 className="font-bold mb-2">Are your books available internationally?</h3>
              <p className="opacity-90">Yes, all books are available worldwide through the eBay store with tracked shipping. International delivery typically takes 7-14 business days depending on location.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="border border-white/15 bg-black/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Connect?</h2>
          <p className="opacity-90 mb-6 max-w-2xl mx-auto">
            Whether you're a researcher, educator, museum professional, or aviation enthusiast, I'm here to help with your aviation history needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:charlese1mackay@hotmail.com"
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center border border-white/15"
            >
              📧 Send Email
            </a>
            <Link
              href="/books"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              📚 Browse Books
            </Link>
          </div>
        </section>

        </div>
      </div>
    </BBCPageTemplate>
  )
}
