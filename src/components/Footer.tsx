import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8">
          {/* Research Resources */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>📚</span> Research Resources
            </h3>
            <div className="space-y-2 text-sm">
              <Link href="/research-guides" className="block text-white/80 hover:text-white">
                Aviation Research Guides
              </Link>
              <Link href="/aviation-glossary" className="block text-white/80 hover:text-white">
                Aviation Glossary
              </Link>
              <Link href="/scottish-aviation-timeline" className="block text-white/80 hover:text-white">
                Scottish Aviation Timeline
              </Link>
              <Link href="/faq" className="block text-white/80 hover:text-white">
                Frequently Asked Questions
              </Link>
              <Link href="/for-researchers" className="block text-white/80 hover:text-white">
                Academic Resources
              </Link>
            </div>
          </div>

          {/* Share This Page */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>⬢</span> Share This Page
            </h3>
            <p className="text-sm text-white/80 mb-4">
              Perfect for social media: Facebook, Twitter, LinkedIn,<br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>aviation groups, academic forums
            </p>
            <div className="text-white/90 text-sm font-mono bg-white/10 p-3 rounded">
              charlesmackaybooks.com
            </div>
          </div>

          {/* Direct Contact */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>⬢</span> Direct Contact
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Email:</strong>
                <a
                  href="mailto:charlese1mackay@hotmail.com"
                  className="text-white/90 hover:text-white ml-1 break-all underline decoration-white/30 hover:decoration-white"
                >
                  charlese1mackay@hotmail.com
                </a>
              </div>
              <div><strong>eBay Store:</strong> <span className="text-white/90">chaza87</span></div>
              <div className="text-white/90"><strong>Location:</strong> Glasgow, Scotland</div>
              <div className="text-white/90"><strong>PayPal:</strong> Direct checkout available</div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-white/70 mt-8 pt-8 border-t border-white/20">
          <p>© 2025 Charles E. MacKay - Aviation Historian & Author</p>
          <p className="mt-2">Specializing in Scottish Aviation Heritage and Military Aviation History</p>
          <p className="mt-2 text-xs">Website optimized for academic citations, social media sharing, and direct book sales</p>
        </div>
      </div>
    </footer>
  );
}
