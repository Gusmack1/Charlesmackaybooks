'use client';

import { Book } from '@/types/book';

interface BookSEOContentProps {
  book: Book;
}

export default function BookSEOContent({ book }: BookSEOContentProps) {
  return (
    <div className="space-y-8">
      {/* SEO-optimized book description */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-blue-800">Why This Book Matters</h3>
        <div className="prose max-w-none text-blue-700">
          <p className="mb-3">
            <strong>{book.title}</strong> by Charles E. MacKay represents {book.pageCount} pages of meticulously researched
            {' '}{book.category.toLowerCase()} content. This {book.condition.toLowerCase()} condition book provides
            essential insights into {book.researchThemes?.slice(0, 3).join(', ').toLowerCase() || book.category.toLowerCase()}.
          </p>

          {book.citationCount && book.citationCount > 0 && (
            <p className="mb-3">
              <strong>Academic Recognition:</strong> Cited {book.citationCount} times in academic research,
              this book serves as a primary reference for scholars studying {book.category.toLowerCase()}.
            </p>
          )}

          {book.academicInstitutions && book.academicInstitutions.length > 0 && (
            <p className="mb-3">
              <strong>Institutional Use:</strong> Trusted by leading institutions including {book.academicInstitutions.slice(0, 2).join(' and ')},
              demonstrating its value as a scholarly resource.
            </p>
          )}

          <p>
            <strong>Fast Worldwide Delivery:</strong> Available for immediate shipping.
            FREE shipping worldwide.
          </p>
        </div>
      </div>

      {/* Author credibility section */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-amber-800">About Charles E. MacKay - Aviation Historian</h3>
        <div className="prose max-w-none text-amber-700">
          <p className="mb-3">
            Charles E. MacKay is a renowned aviation historian with over 19 published books and 1,700+ satisfied customers worldwide.
            His expertise in {book.category.toLowerCase()} makes him a leading authority in the field.
          </p>

          <p className="mb-3">
            <strong>Research Excellence:</strong> MacKay's work is based on extensive archival research,
            primary source documentation, and unprecedented access to historical aviation records.
          </p>

          <p>
            <strong>Global Recognition:</strong> His books are used by museums, universities, and research institutions
            across the UK, Europe, and internationally for their accuracy and comprehensive coverage.
          </p>
        </div>
      </div>

      {/* Purchase benefits */}
      <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-green-800">Purchase Benefits & Guarantees</h3>
        <div className="grid md:grid-cols-2 gap-4 text-green-700">
          <div>
            <h4 className="font-semibold mb-2">✓ Quality Guarantee</h4>
            <ul className="text-sm space-y-1">
              <li>• {book.condition} condition guaranteed</li>
              <li>• Secure PayPal checkout</li>
              <li>• Fast worldwide shipping</li>
              <li>• Professional packaging</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">✓ Expert Content</h4>
            <ul className="text-sm space-y-1">
              <li>• {book.pageCount} pages of expert research</li>
              <li>• Primary source documentation</li>
              <li>• Professional aviation history</li>
              <li>• Academic-grade references</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related topics for SEO */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Related Aviation History Topics</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Research Areas</h4>
            <ul className="space-y-1">
              {book.researchThemes?.slice(0, 4).map((theme, index) => (
                <li key={index}>• {theme}</li>
              ))}
            </ul>
          </div>

          {book.era && book.era.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Historical Periods</h4>
              <ul className="space-y-1">
                {book.era.map((period, index) => (
                  <li key={index}>• {period}</li>
                ))}
              </ul>
            </div>
          )}

          {book.geographicFocus && book.geographicFocus.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Geographic Focus</h4>
              <ul className="space-y-1">
                {book.geographicFocus.map((geo, index) => (
                  <li key={index}>• {geo} Aviation History</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
