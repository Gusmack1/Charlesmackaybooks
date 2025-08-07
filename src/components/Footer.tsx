import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2a384a] text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8">
          {/* Research Resources */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>📚</span> Research Resources
            </h3>
            <div className="space-y-2 text-sm">
              <Link href="/research-guides" className="block text-blue-100 hover:text-white">
                Aviation Research Guides
              </Link>
              <Link href="/aviation-glossary" className="block text-blue-100 hover:text-white">
                Aviation Glossary
              </Link>
              <Link href="/scottish-aviation-timeline" className="block text-blue-100 hover:text-white">
                Scottish Aviation Timeline
              </Link>
              <Link href="/faq" className="block text-blue-100 hover:text-white">
                Frequently Asked Questions
              </Link>
              <Link href="/for-researchers" className="block text-blue-100 hover:text-white">
                Academic Resources
              </Link>
            </div>
          </div>

          {/* Share This Page */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>⬢</span> Share This Page
            </h3>
            <p className="text-sm text-blue-100 mb-4">
              Perfect for social media: Facebook, Twitter, LinkedIn,<br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>aviation groups, academic forums
            </p>
            <div className="text-blue-100 text-sm font-mono bg-black/30 p-3 rounded">
              charlesmackaybooks.com
            </div>
          </div>

          {/* Direct Contact */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>⬢</span> Direct Contact
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Email:</strong>
                <a
                  href="mailto:charlese1mackay@hotmail.com"
                  className="text-blue-100 hover:text-white ml-1 break-all"
                >
                  charlese1mackay@hotmail.com
                </a>
              </div>
              <div><strong>eBay Store:</strong> <span className="text-blue-100">chaza87</span></div>
              <div><strong>Location:</strong> Glasgow, Scotland</div>
              <div><strong>PayPal:</strong> Direct checkout available</div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-blue-200/70 mt-8 pt-8 border-t border-blue-200/20">
          <p>© 2025 Charles E. MacKay - Aviation Historian & Author</p>
          <p className="mt-2">Specializing in Scottish Aviation Heritage and Military Aviation History</p>
          <p className="mt-2 text-xs">Website optimized for academic citations, social media sharing, and direct book sales</p>
        </div>
      </div>
    </footer>
  );
}
