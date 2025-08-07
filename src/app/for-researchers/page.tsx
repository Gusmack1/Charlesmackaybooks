import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Researchers & Academic Institutions | Charles E. MacKay Aviation Books',
  description: 'Academic aviation history research support, institutional partnerships, educational resources, and scholarly collaboration with aviation historian Charles E. MacKay.',
  keywords: [
    'aviation research',
    'academic collaboration',
    'Charles MacKay research',
    'aviation history research',
    'institutional partnerships',
    'educational aviation resources',
    'scholarly aviation collaboration',
    'aviation academic support',
    'research consultation',
    'aviation historian collaboration'
  ],
  openGraph: {
    title: 'For Researchers & Academic Institutions',
    description: 'Academic aviation history research support, institutional partnerships, educational resources, and scholarly collaboration.',
    url: 'https://charlesmackaybooks.com/for-researchers',
    siteName: 'Charles E. MacKay - Aviation Historian',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'For Researchers & Academic Institutions',
    description: 'Academic aviation history research support, institutional partnerships, educational resources, and scholarly collaboration.',
  }
};

export default function ForResearchersPage() {
  return (
    <>

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="content h1 text-primary mb-4">For Researchers & Academic Institutions</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Academic resources, citation guides, and research collaboration opportunities
          </p>
        </div>

        {/* Citation Guide */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 How to Cite Charles E. MacKay's Books</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-blue-800 mb-2">Harvard Citation Style:</h3>
                <div className="bg-gray-100 p-4 rounded font-mono text-sm">
                  MacKay, C.E. (2023). <em>Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities</em>. A MacKay: Glasgow.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-blue-800 mb-2">APA Style:</h3>
                <div className="bg-gray-100 p-4 rounded font-mono text-sm">
                  MacKay, C. E. (2023). <em>Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities</em>. A MacKay.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-blue-800 mb-2">Chicago Style:</h3>
                <div className="bg-gray-100 p-4 rounded font-mono text-sm">
                  MacKay, Charles Edward. <em>Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities</em>. Glasgow: A MacKay, 2023.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-blue-800 mb-2">MLA Style:</h3>
                <div className="bg-gray-100 p-4 rounded font-mono text-sm">
                  MacKay, Charles E. <em>Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities</em>. A MacKay, 2023.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">🔗 Link to This Website</h2>
            <p className="text-gray-700 mb-6">
              Academic institutions, researchers, and aviation historians are encouraged to link to this website as a reference source.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-blue-700 mb-2">Website Citation:</h3>
                <div className="bg-white p-4 rounded font-mono text-sm border">
                  MacKay, Charles Edward. "Aviation History Books by Charles E. MacKay." <em>Charles E. MacKay Aviation Books</em>, 2024. https://charlesmackaybooks.com
                </div>
              </div>

              <div>
                <h3 className="font-bold text-blue-700 mb-2">Backlink Code:</h3>
                <div className="bg-white p-4 rounded font-mono text-sm border">
                  &lt;a href="https://charlesmackaybooks.com"&gt;Charles E. MacKay Aviation Books&lt;/a&gt;
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="mailto:charlese1mackay@hotmail.com?subject=Research Collaboration Request"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                📧 Request Research Collaboration
              </a>
            </div>
          </div>
        </div>

        {/* Academic Recognition */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">🏛️ Academic Recognition & Usage</h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-lg mb-2">Academic Citations</div>
              <p className="text-sm opacity-90">In scholarly papers and research</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-lg mb-2">Research Institutions</div>
              <p className="text-sm opacity-90">Using books as primary references</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12+</div>
              <div className="text-lg mb-2">Museum Collections</div>
              <p className="text-sm opacity-90">In aviation museums worldwide</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg opacity-95">
              Listed alongside Putnam and Jane's publications on the British Aviation Database
            </p>
          </div>
        </div>

        {/* Research Partnership Opportunities */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">🤝 Research Partnership & Academic Outreach</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">University Libraries</h3>
              <p className="text-blue-700 mb-4">
                Academic libraries can acquire Charles's books for their aviation history collections and reference sections.
              </p>
              <a
                href="mailto:charlese1mackay@hotmail.com?subject=University Library Bulk Order Inquiry"
                className="text-blue-600 font-semibold hover:underline"
              >
                Contact for Bulk Orders →
              </a>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Research Citations</h3>
              <p className="text-green-700 mb-4">
                Researchers using Charles's books are encouraged to cite this website and link back for additional context.
              </p>
              <a
                href="mailto:charlese1mackay@hotmail.com?subject=Research Citation Submission"
                className="text-green-600 font-semibold hover:underline"
              >
                Submit Your Citation →
              </a>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-4xl mb-4">🎤</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Guest Lectures</h3>
              <p className="text-purple-700 mb-4">
                Charles is available for guest lectures and presentations on Scottish aviation history and WWI/WWII aircraft.
              </p>
              <a
                href="mailto:charlese1mackay@hotmail.com?subject=Guest Lecture/Presentation Booking"
                className="text-purple-600 font-semibold hover:underline"
              >
                Book a Presentation →
              </a>
            </div>
          </div>
        </div>

        {/* Bulk Orders & Institutional Discounts */}
        <div className="bg-gray-100 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">🎓 Institutional Discounts & Bulk Orders</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Bulk Order Pricing</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="font-semibold">5-9 Books</span>
                  <span className="text-blue-600 font-bold">10% Discount</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="font-semibold">10-19 Books</span>
                  <span className="text-green-600 font-bold">15% Discount</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="font-semibold">20+ Books</span>
                  <span className="text-purple-600 font-bold">20% Discount</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Perfect for university libraries, museum collections, and research institutions
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🏛️ Institutional Benefits</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Invoice billing available for institutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Priority shipping for academic orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Custom citation and cataloging assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Direct author contact for questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Guest lecture opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">🔬 Primary Research Areas</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 border-2 border-blue-200 rounded-lg">
              <div className="text-3xl mb-2">⬢</div>
              <h3 className="font-bold text-blue-800 mb-2">Scottish Aviation</h3>
              <p className="text-sm text-blue-600">Beardmore Aviation, Clydeside manufacturers, industrial aviation</p>
            </div>

            <div className="text-center p-4 border-2 border-green-200 rounded-lg">
              <div className="text-3xl mb-2">✈️</div>
              <h3 className="font-bold text-green-800 mb-2">WWI Aircraft</h3>
              <p className="text-sm text-green-600">RFC, RNAS, early RAF operations, German aviation development</p>
            </div>

            <div className="text-center p-4 border-2 border-red-200 rounded-lg">
              <div className="text-3xl mb-2">🛩️</div>
              <h3 className="font-bold text-red-800 mb-2">WWII Aviation</h3>
              <p className="text-sm text-red-600">Luftwaffe operations, British military aviation, wartime production</p>
            </div>

            <div className="text-center p-4 border-2 border-purple-200 rounded-lg">
              <div className="text-3xl mb-2">🎈</div>
              <h3 className="font-bold text-purple-800 mb-2">Airship Development</h3>
              <p className="text-sm text-purple-600">R101 project, British airship programs, commercial aviation</p>
            </div>
          </div>
        </div>

        {/* Contact for Research */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">📞 Research Collaboration</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Interested in research collaboration, need assistance with aviation history research,
            or want to discuss academic partnerships? Charles is available for consultation.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:charlese1mackay@hotmail.com?subject=Academic Research Collaboration"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mr-4"
            >
              📧 Research Collaboration
            </a>
            <a
              href="mailto:charlese1mackay@hotmail.com?subject=Bulk Academic Order"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              📚 Bulk Order Inquiry
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            📍 Based in Glasgow, Scotland • 📞 Response within 24 hours • 🌍 Available for international collaboration
          </p>
        </div>
      </div>

        <Footer />
      </div>
    </>
  );
}
