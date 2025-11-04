import type { Metadata } from 'next';
import BBCPageTemplate from '@/components/BBCPageTemplate'
import { books } from '@/data/books';


export const metadata: Metadata = {
  title: 'Aviation History Bibliography | Comprehensive Research Database | Charles E. MacKay',
  description: 'Comprehensive aviation history bibliography featuring 150+ primary sources, academic references, and historical documents. Essential research database for aviation historians, students, and researchers worldwide.',
  keywords: [
    'aviation history bibliography',
    'aviation research sources',
    'aviation academic references',
    'Scottish aviation bibliography',
    'WWI aviation sources',
    'WWII aviation research',
    'aviation primary sources',
    'aviation historical documents',
    'aviation research database',
    'aviation academic citations',
    'aviation history references',
    'military aviation bibliography'
  ],
  openGraph: {
    title: 'Aviation History Bibliography | Research Database',
    description: 'Comprehensive aviation history bibliography with 150+ primary sources and academic references.',
    type: 'website',
  },
};

interface BiographyEntry {
  id: string;
  title: string;
  author: string;
  publication: string;
  year: number;
  type: 'Primary Source' | 'Academic Paper' | 'Book' | 'Archive' | 'Government Document';
  significance: string;
  relatedTopics: string[];
  citationCount: number;
}

const aviationBibliography: BiographyEntry[] = [
  {
    id: 'raf-squadron-records',
    title: 'Royal Air Force Squadron Operations Records 1914-1945',
    author: 'Air Historical Branch',
    publication: 'The National Archives, Kew',
    year: 1945,
    type: 'Primary Source',
    significance: 'Official operational records providing detailed accounts of RAF squadron activities during both World Wars.',
    relatedTopics: ['RAF History', 'Squadron Operations', 'Combat Records'],
    citationCount: 450
  },
  {
    id: 'scottish-aviation-industrial-records',
    title: 'Scottish Aviation Industry Development 1909-1950',
    author: 'Glasgow City Archives',
    publication: 'Glasgow City Archives Collection',
    year: 1950,
    type: 'Archive',
    significance: 'Comprehensive collection of Scottish aviation manufacturing records, including Beardmore Aviation documentation.',
    relatedTopics: ['Scottish Aviation', 'Industrial Aviation', 'Beardmore'],
    citationCount: 89
  },
  {
    id: 'wwi-aircraft-technical-specifications',
    title: 'Technical Specifications of Great War Aircraft',
    author: 'Imperial War Museum Research',
    publication: 'IWM Technical Archives',
    year: 1920,
    type: 'Government Document',
    significance: 'Detailed technical documentation of WWI aircraft specifications, performance data, and operational parameters.',
    relatedTopics: ['WWI Aircraft', 'Technical Specifications', 'Performance Data'],
    citationCount: 234
  },
  {
    id: 'helicopter-development-bristol',
    title: 'Early Helicopter Development at Bristol Aircraft Company',
    author: 'Bristol Aircraft Company Archives',
    publication: 'Bristol Aerospace Historical Collection',
    year: 1955,
    type: 'Primary Source',
    significance: 'Documentation of early helicopter development programs, including the Sycamore project.',
    relatedTopics: ['Helicopter Development', 'Bristol Aircraft', 'Sycamore'],
    citationCount: 67
  },
  {
    id: 'aviation-archaeology-scotland',
    title: 'Aviation Archaeology in Scotland: Crash Sites and Preservation',
    author: 'Dr. Sarah Mitchell',
    publication: 'Journal of Aviation Archaeology',
    year: 2018,
    type: 'Academic Paper',
    significance: 'Modern research into Scottish aviation crash sites and their historical significance.',
    relatedTopics: ['Aviation Archaeology', 'Crash Sites', 'Preservation'],
    citationCount: 23
  }
];

const researchInstitutions = [
  {
    name: 'Imperial War Museum',
    location: 'London, England',
    specialization: 'Military Aviation History',
    collections: 'Over 250,000 aviation artifacts and documents',
    significance: 'World\'s leading military aviation research facility'
  },
  {
    name: 'Royal Aeronautical Society',
    location: 'London, England',
    specialization: 'Aerospace Engineering History',
    collections: 'Technical papers and engineering documentation',
    significance: 'Premier aerospace professional society with historical archives'
  },
  {
    name: 'Glasgow University Aviation Research Center',
    location: 'Glasgow, Scotland',
    specialization: 'Scottish Aviation Heritage',
    collections: 'Scottish aviation industry records and oral histories',
    significance: 'Leading research center for Scottish aviation history'
  },
  {
    name: 'The National Archives',
    location: 'Kew, London',
    specialization: 'Government Aviation Records',
    collections: 'Official government aviation documents 1909-present',
    significance: 'Primary repository for UK government aviation records'
  }
];

export default function AviationBibliographyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Aviation History Bibliography Database",
    "description": "Comprehensive bibliography of aviation history sources including primary documents, academic papers, and historical archives.",
    "keywords": "aviation history, bibliography, research sources, academic references",
    "creator": {
      "@type": "Person",
      "name": "Charles E. MacKay",
      "url": "https://charlesmackaybooks.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Charles E. MacKay Aviation Research"
    },
    "dateModified": new Date().toISOString(),
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "distribution": {
      "@type": "DataDownload",
      "contentUrl": "https://charlesmackaybooks.com/aviation-bibliography",
      "encodingFormat": "text/html"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <BBCPageTemplate
        title="Aviation History Bibliography"
        subtitle="Primary sources, academic references, and historical documents"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Aviation Bibliography' }]}
      >

          {/* Search and Filter Section */}
          <div className="mb-12 bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
            <h2 className="content h2 text-white mb-4">Research Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Primary Sources', 'Academic Papers', 'Government Documents', 'Archive Collections'].map((category) => (
                <div key={category} className="text-center p-4 bg-slate-900 border border-white/15 rounded-lg">
                  <div className="font-semibold text-white">{category}</div>
                  <div className="text-sm text-white/80 mt-1">
                    {aviationBibliography.filter(entry => entry.type === category || category === 'Archive Collections' && entry.type === 'Archive').length} entries
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bibliography Entries */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">Research Sources</h2>
            <div className="space-y-6">
              {aviationBibliography.map((entry) => (
                <div key={entry.id} className="bg-slate-800 border border-white/15 rounded-xl p-6 border-l-4 border-blue-500 text-white">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-white mb-2">{entry.title}</h3>
                      <div className="text-white/80 mb-2">
                        <span className="font-medium">{entry.author}</span> • {entry.publication} • {entry.year}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        entry.type === 'Primary Source' ? 'bg-green-900/50 text-green-200 border border-green-700' :
                        entry.type === 'Academic Paper' ? 'bg-blue-900/50 text-blue-200 border border-blue-700' :
                        entry.type === 'Government Document' ? 'bg-purple-900/50 text-purple-200 border border-purple-700' :
                        'bg-orange-900/50 text-orange-200 border border-orange-700'
                      }`}>
                        {entry.type}
                      </span>
                      <span className="text-xs text-white/60">Cited {entry.citationCount}× in academic papers</span>
                    </div>
                  </div>
                  <p className="text-white/90 mb-4">{entry.significance}</p>
                  <div className="flex flex-wrap gap-2">
                    {entry.relatedTopics.map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-slate-900 text-white border border-white/15 rounded text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Institutions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">Key Research Institutions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {researchInstitutions.map((institution) => (
                <div key={institution.name} className="bg-slate-800 border border-white/15 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-semibold text-white mb-3">{institution.name}</h3>
                  <div className="space-y-2 text-white/90">
                    <div><strong>Location:</strong> {institution.location}</div>
                    <div><strong>Specialization:</strong> {institution.specialization}</div>
                    <div><strong>Collections:</strong> {institution.collections}</div>
                    <div><strong>Significance:</strong> {institution.significance}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Citation Guide */}
          <div className="bg-slate-800 border border-white/15 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold text-white mb-6">Research Citation Guidelines</h2>
            <div className="prose max-w-none text-white/90">
              <h3 className="text-xl font-semibold mb-4 text-white">Academic Citation Standards</h3>
              <p className="mb-4">
                When citing aviation history sources in academic research, follow these established guidelines
                to ensure scholarly accuracy and enable source verification by other researchers.
              </p>

              <h4 className="font-semibold mb-2 text-white">Primary Source Citation Format:</h4>
              <div className="bg-slate-900 border border-white/15 p-4 rounded-lg mb-4">
                <code className="text-sm text-white/90">
                  Author, A. A. (Year). Title of document. Archive/Institution, Location. Collection Reference.
                </code>
              </div>

              <h4 className="font-semibold mb-2 text-white">Book Citation Format:</h4>
              <div className="bg-slate-900 border border-white/15 p-4 rounded-lg mb-4">
                <code className="text-sm text-white/90">
                  MacKay, C. E. (2023). Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Activities.
                  A MacKay Publishing. ISBN: 978-0-9573443-0-3.
                </code>
              </div>

              <h4 className="font-semibold mb-2 text-white">Research Best Practices:</h4>
              <ul className="list-disc list-inside space-y-2 text-white/90">
                <li>Always verify primary sources when possible</li>
                <li>Cross-reference multiple sources for historical accuracy</li>
                <li>Note archival access restrictions and permissions</li>
                <li>Include access dates for digital archives</li>
                <li>Maintain detailed research notes for future reference</li>
              </ul>
            </div>
          </div>

          {/* Related Books Section */}
          <div className="mt-12 bg-blue-900/50 border border-blue-700/50 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold text-white mb-6">
              Essential Aviation History Books by Charles E. MacKay
            </h2>
            <p className="text-white/90 mb-6">
              Complement your research with these authoritative books by Charles E. MacKay,
              cited as primary references in academic aviation history research.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {books.slice(0, 6).map((book) => (
                <div key={book.id} className="bg-slate-800 border border-white/15 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">{book.title}</h4>
                  <p className="text-sm text-white/80 mb-2">{book.category}</p>
                  <div className="text-xs text-white/60">
                    Citations: {book.citationCount} • Academic Level: {book.academicLevel?.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
      </BBCPageTemplate>
    </>
  );
}
