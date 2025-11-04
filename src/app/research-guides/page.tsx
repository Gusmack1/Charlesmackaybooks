import type { Metadata } from 'next'
import Link from 'next/link'
import BBCPageTemplate from '@/components/BBCPageTemplate'

export const metadata: Metadata = {
  title: 'Aviation Research Guides | Research Methodology | Charles E. MacKay',
  description: 'Comprehensive research guides for aviation historians including archival research methods, primary source analysis, and academic writing techniques for aviation history.',
  keywords: [
    'aviation research guides',
    'research methodology',
    'archival research',
    'primary sources',
    'aviation history research',
    'academic writing',
    'historical methodology',
    'aviation archives',
    'research techniques',
    'scholarly research'
  ],
  openGraph: {
    title: 'Aviation Research Guides | Research Methodology',
    description: 'Comprehensive research guides for aviation historians including archival research methods and academic writing techniques.',
    type: 'website',
    url: 'https://charlesmackaybooks.com/research-guides'
  },
}

export default function ResearchGuidesPage() {
  const guides = [
    {
      title: 'Archival Research Methods',
      description: 'Learn how to effectively search and utilize aviation archives for historical research',
      topics: ['Archive Navigation', 'Document Analysis', 'Source Verification', 'Digital Archives']
    },
    {
      title: 'Primary Source Analysis',
      description: 'Techniques for analyzing historical documents, photographs, and testimonies',
      topics: ['Document Dating', 'Authenticity Verification', 'Cross-referencing', 'Bias Assessment']
    },
    {
      title: 'Military Aviation Records',
      description: 'Guide to accessing and interpreting military aviation documents and records',
      topics: ['Service Records', 'Aircraft Logs', 'Operational Reports', 'Personnel Files']
    },
    {
      title: 'Academic Writing for Aviation History',
      description: 'Best practices for writing and publishing aviation history research',
      topics: ['Citation Methods', 'Peer Review Process', 'Publishing Guidelines', 'Research Ethics']
    }
  ]

  const archives = [
    {
      name: 'Imperial War Museum',
      location: 'London, UK',
      specialization: 'Military aviation records, WWI & WWII documents',
      website: 'iwm.org.uk'
    },
    {
      name: 'Royal Air Force Museum',
      location: 'London & Cosford, UK', 
      specialization: 'RAF operational records, aircraft development',
      website: 'rafmuseum.org.uk'
    },
    {
      name: 'National Museum of Flight',
      location: 'East Fortune, Scotland',
      specialization: 'Scottish aviation heritage, civilian aviation',
      website: 'nms.ac.uk'
    },
    {
      name: 'Glasgow University Archives',
      location: 'Glasgow, Scotland',
      specialization: 'Scottish industrial aviation, Clydeside records',
      website: 'gla.ac.uk'
    }
  ]

  return (
    <BBCPageTemplate
      title="Aviation Research Guides"
      subtitle="Comprehensive methodologies and best practices for aviation history research"
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Research Guides' }]}
    >

        {/* Research Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Research Methodologies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <div key={index} className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
                <h3 className="text-xl font-semibold text-white mb-3">{guide.title}</h3>
                <p className="text-white/90 mb-4">{guide.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-white">Key Topics:</h4>
                  <ul className="grid grid-cols-2 gap-1 text-sm text-white/90">
                    {guide.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Archives Directory */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Key Aviation Archives</h2>
          <div className="bg-slate-800 border border-white/15 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Institution</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Specialization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">Website</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-800 divide-y divide-white/10">
                  {archives.map((archive, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white">{archive.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                        {archive.location}
                      </td>
                      <td className="px-6 py-4 text-sm text-white/80">
                        {archive.specialization}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <a href={`https://${archive.website}`} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-300 hover:text-blue-200 underline">
                          {archive.website}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Research Ethics */}
        <section className="mb-12">
          <div className="bg-slate-800 border border-white/15 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold text-white mb-6">Research Ethics & Best Practices</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Ethical Guidelines</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Respect copyright and intellectual property</li>
                  <li>• Obtain proper permissions for document use</li>
                  <li>• Acknowledge all sources and contributors</li>
                  <li>• Maintain objectivity in historical analysis</li>
                  <li>• Handle sensitive information responsibly</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quality Standards</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Use multiple primary sources for verification</li>
                  <li>• Cross-reference information across archives</li>
                  <li>• Document research methodology clearly</li>
                  <li>• Peer review before publication</li>
                  <li>• Update research with new findings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Research Consultation</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Charles E. MacKay is available for research consultation, methodology guidance, 
            and collaborative projects with academic institutions and fellow researchers.
          </p>
          <div className="space-x-4">
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact for Consultation
            </Link>
            <Link
              href="/academic-resources"
              className="inline-block bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
            >
              Academic Resources
            </Link>
          </div>
        </section>
    </BBCPageTemplate>
  )
}