'use client'

import Link from 'next/link';

import Footer from '@/components/Footer';

export default function BookNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold mb-4">Book Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the book you're looking for. It may have been moved or doesn't exist.
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-[#2a384a] text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              ⬢ Browse All Books
            </Link>

            <div className="text-sm text-gray-500">
              <p>Or contact Charles directly at <strong>charlese1mackay@hotmail.com</strong></p>
              <p>if you're looking for a specific aviation history book.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer removed to avoid duplication; provided by root layout */}
    </div>
  );
}
