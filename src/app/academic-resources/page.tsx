import type { Metadata } from 'next'
import Link from 'next/link'
import { books } from '@/data/books'

export const metadata: Metadata = {
  title: 'Academic Resources | Aviation History Research | Charles E. MacKay',
  description: 'Comprehensive academic resources for aviation history research including bibliographies, primary sources, archival collections, and research methodologies for students and scholars.',
  keywords: [
    'aviation history research',
    'academic resources',
    'aviation bibliography',
    'primary sources',
    'archival research',
    'aviation historians',
    'research methodology',
    'Scottish aviation archives',
    'WWI aviation sources',
    'WWII aviation research',
    'military aviation archives',
    'aviation academic citations'
  ],
  openGraph: {
    title: 'Academic Resources | Aviation History Research',
    description: 'Comprehensive academic resources for aviation history research including bibliographies, primary sources, and research methodologies.',
    type: 'website',
    url: 'https://charlesmackaybooks.com/academic-resources'
  },
}

export default function AcademicResourcesPage() {
  const academicBooks = books.filter(book => 
    book.academicLevel && book.academicLevel.length > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Academic Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive research resources for aviation historians, students, and scholars worldwide
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Link href="/aviation-bibliography" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-slate-800 mb-2">Bibliography</h3>
            <p className="text-sm text-gray-600">150+ primary sources and references</p>
          </Link>
          <Link href="/aviation-glossary" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-semibold text-slate-800 mb-2">Glossary</h3>
            <p className="text-sm text-gray-600">500+ aviation terms and definitions</p>
          </Link>
          <Link href="/research-guides" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-slate-800 mb-2">Research Guides</h3>
            <p className="text-sm text-gray-600">Methodologies and best practices</p>
          </Link>
          <Link href="/scottish-aviation-timeline" className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-semibold text-slate-800 mb-2">Timeline</h3>
            <p className="text-sm text-gray-600">Scottish aviation chronology</p>
          </Link>
        </div>

        {/* Academic Books */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Academic Publications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicBooks.map((book) => (
              <div key={book.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">
                  <Link href={`/books/${book.id}`} className="text-blue-600 hover:text-blue-800">
                    {book.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-3">{book.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{book.category}</span>
                  <span>£{book.price}</span>
                </div>
                {book.citationCount && (
                  <div className="mt-2 text-xs text-green-600">
                    {book.citationCount} academic citations
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Research Institutions */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Partner Institutions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Museums & Archives</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Imperial War Museum</li>
                <li>• Royal Air Force Museum</li>
                <li>• National Museum of Flight</li>
                <li>• Fleet Air Arm Museum</li>
                <li>• Glasgow University Archives</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Academic Institutions</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• University of Glasgow</li>
                <li>• Edinburgh University</li>
                <li>• Royal Aeronautical Society</li>
                <li>• Scottish Aviation Society</li>
                <li>• Cross & Cockade International</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Research Collaboration</h2>
          <p className="text-gray-600 mb-6">
            Available for academic consultation, research collaboration, and guest lectures
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact for Academic Inquiries
          </Link>
        </div>
      </div>
    </div>
  )
}