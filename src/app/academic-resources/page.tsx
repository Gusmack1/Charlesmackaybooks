import type { Metadata } from 'next'
import Link from 'next/link'
import { books } from '@/data/books'
import BBCPageTemplate from '@/components/BBCPageTemplate'

export const metadata: Metadata = {
  title: 'Free Aviation History Research Resources',
  description:
    'Free aviation history research resources: bibliography, glossary, research guides, and Scottish aviation timeline for students and researchers.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/academic-resources'
  },
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
    title: 'Free Aviation History Research Resources',
    description:
      'Free aviation history research resources: bibliography, glossary, research guides, and Scottish aviation timeline.',
    type: 'website',
    url: 'https://charlesmackaybooks.com/academic-resources'
  },
}

export default function AcademicResourcesPage() {
  const academicBooks = books.filter(book => 
    book.academicLevel && book.academicLevel.length > 0
  );

  return (
    <BBCPageTemplate
      title="Academic Resources"
      subtitle="Comprehensive research resources for aviation historians, students, and scholars"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Academic Resources' }]}
    >

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Link href="/aviation-bibliography" className="bg-slate-800 border border-white/15 rounded-lg p-6 text-center hover:shadow-lg transition-shadow text-white">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-white mb-2">Bibliography</h3>
            <p className="text-sm text-white/80">150+ primary sources and references</p>
          </Link>
          <Link href="/aviation-glossary" className="bg-slate-800 border border-white/15 rounded-lg p-6 text-center hover:shadow-lg transition-shadow text-white">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-semibold text-white mb-2">Glossary</h3>
            <p className="text-sm text-white/80">500+ aviation terms and definitions</p>
          </Link>
          <Link href="/research-guides" className="bg-slate-800 border border-white/15 rounded-lg p-6 text-center hover:shadow-lg transition-shadow text-white">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-white mb-2">Research Guides</h3>
            <p className="text-sm text-white/80">Methodologies and best practices</p>
          </Link>
          <Link href="/scottish-aviation-timeline" className="bg-slate-800 border border-white/15 rounded-lg p-6 text-center hover:shadow-lg transition-shadow text-white">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-semibold text-white mb-2">Timeline</h3>
            <p className="text-sm text-white/80">Scottish aviation chronology</p>
          </Link>
        </div>

        {/* Academic Books */}
        <div className="bg-slate-800 border border-white/15 rounded-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold text-white mb-6">Academic Publications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicBooks.map((book) => (
              <div key={book.id} className="border border-white/15 bg-slate-900 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">
                  <Link href={`/books/${book.id}`} className="text-blue-300 hover:text-blue-200">
                    {book.title}
                  </Link>
                </h3>
                <p className="text-white/80 text-sm mb-3">{book.description}</p>
                <div className="flex justify-between items-center text-xs text-white/60">
                  <span>{book.category}</span>
                  <span>£{book.price}</span>
                </div>
                {book.citationCount && (
                  <div className="mt-2 text-xs text-green-300">
                    {book.citationCount} academic citations
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Research Institutions */}
        <div className="bg-slate-800 border border-white/15 rounded-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold text-white mb-6">Partner Institutions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-white">Museums & Archives</h3>
              <ul className="space-y-2 text-white/90">
                <li>• Imperial War Museum</li>
                <li>• Royal Air Force Museum</li>
                <li>• National Museum of Flight</li>
                <li>• Fleet Air Arm Museum</li>
                <li>• Glasgow University Archives</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3 text-white">Academic Institutions</h3>
              <ul className="space-y-2 text-white/90">
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
          <h2 className="text-2xl font-bold text-white mb-4">Research Collaboration</h2>
          <p className="text-white/90 mb-6">
            Available for academic consultation, research collaboration, and guest lectures
          </p>
          <Link
            href="/contact"
            className="inline-block badge badge-blue px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact for Academic Inquiries
          </Link>
        </div>
    </BBCPageTemplate>
  )
}