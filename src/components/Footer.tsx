import Link from 'next/link';
import { SITE_CONSTANTS } from '@/config/constants'

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
            <div className="space-y-2 text-base">
              <Link href="/research-guides" className="block text-white underline decoration-white/30 hover:decoration-white">
                Aviation Research Guides
              </Link>
              <Link href="/aviation-glossary" className="block text-white underline decoration-white/30 hover:decoration-white">
                Aviation Glossary
              </Link>
              <Link href="/scottish-aviation-timeline" className="block text-white underline decoration-white/30 hover:decoration-white">
                Scottish Aviation Timeline
              </Link>
              <Link href="/faq" className="block text-white underline decoration-white/30 hover:decoration-white">
                Frequently Asked Questions
              </Link>
              <Link href="/for-researchers" className="block text-white underline decoration-white/30 hover:decoration-white">
                Academic Resources
              </Link>
            </div>
          </div>

          {/* Share This Page */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>⬢</span> Share This Page
            </h3>
            <p className="text-base text-white mb-4">
              Perfect for social media: Facebook, Twitter, LinkedIn,<br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>aviation groups, academic forums
            </p>
            <div className="text-white text-base font-mono bg-white/20 p-3 rounded">
              charlesmackaybooks.com
            </div>
          </div>

          {/* Direct Contact */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>⬢</span> Direct Contact
            </h3>
            <div className="space-y-2 text-base">
              <div>
                <strong>Email:</strong>
                <a
                  href={`mailto:${SITE_CONSTANTS.AUTHOR_EMAIL}`}
                  className="text-white ml-1 break-all underline decoration-white/30 hover:decoration-white"
                >
                  {SITE_CONSTANTS.AUTHOR_EMAIL}
                </a>
              </div>
              <div><strong>eBay Store:</strong> <span className="text-white">chaza87</span></div>
              <div className="text-white"><strong>Location:</strong> {SITE_CONSTANTS.BUSINESS_LOCALITY}, Scotland</div>
              <div className="text-white"><strong>PayPal:</strong> Direct checkout available</div>
            </div>
          </div>
        </div>

        <div className="text-center text-base text-white/90 mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm mb-4">
            <Link href="/support" className="underline decoration-white/30 hover:decoration-white">
              Support
            </Link>
            <Link href="/returns" className="underline decoration-white/30 hover:decoration-white">
              Returns
            </Link>
            <Link href="/privacy" className="underline decoration-white/30 hover:decoration-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="underline decoration-white/30 hover:decoration-white">
              Terms and Conditions
            </Link>
          </div>
          <p>© 2025 Charles E. MacKay - Aviation Historian & Author</p>
          <p className="mt-2">Specializing in Scottish Aviation Heritage and Military Aviation History</p>
        </div>
      </div>
    </footer>
  );
}
