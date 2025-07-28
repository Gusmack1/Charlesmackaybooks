import PageSEO from '@/components/PageSEO'
import { authorData } from '@/data/author';
import Footer from '@/components/Footer';

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviation History Research Guides | Charles E. MacKay',
  description: 'Comprehensive research guides for aviation history, Scottish aviation heritage, WWI & WWII aircraft research. Expert guidance from renowned aviation historian Charles E. MacKay.',
  keywords: [
    'aviation history research',
    'Scottish aviation research',
    'WWI aircraft research',
    'WWII aviation research',
    'aviation historian guides',
    'military aviation research',
    'primary aviation sources',
    'aviation bibliography',
    'aircraft research methods',
    'aviation archives Scotland'
  ],
  alternates: {
    canonical: 'https://charlesmackaybooks.com/research-guides',
  },
};

const researchGuides = [
  {
    title: "Scottish Aviation Heritage Research",
    description: "Essential guide to researching Scotland's aviation history, from early pioneers to modern developments.",
    topics: [
      "Beardmore Aviation Company archives",
      "Clydeside shipbuilding and aviation connections",
      "Scottish aviation pioneers and manufacturers",
      "RAF stations and training facilities in Scotland",
      "Primary source locations and archives"
    ],
    resources: [
      "National Records of Scotland",
      "Glasgow City Archives",
      "Royal Museum of Flight",
      "Dumfries and Galloway Aviation Museum"
    ]
  },
  {
    title: "World War I Aviation Research",
    description: "Comprehensive methodology for researching Great War aircraft, pilots, and military aviation operations.",
    topics: [
      "RFC (Royal Flying Corps) records and personnel",
      "RNAS (Royal Naval Air Service) operations",
      "German aircraft identification and development",
      "British aircraft manufacturers during WWI",
      "Pilot training and casualties research"
    ],
    resources: [
      "The National Archives (Kew)",
      "Imperial War Museums",
      "RAF Museum Hendon",
      "Cross & Cockade International"
    ]
  },
  {
    title: "World War II Aircraft Research",
    description: "Advanced research techniques for WWII aviation history, focusing on aircraft development and operations.",
    topics: [
      "Luftwaffe aircraft and operations",
      "British aircraft development 1939-1945",
      "Test pilot programs and experimental aircraft",
      "Aircraft production statistics and factories",
      "Combat operations and squadron histories"
    ],
    resources: [
      "Bundesarchiv (German Federal Archives)",
      "Churchill Archives Centre",
      "Fleet Air Arm Museum",
      "American Air Museum"
    ]
  },
  {
    title: "Aviation Biography Research",
    description: "Methods for researching aviation pioneers, test pilots, and industry figures.",
    topics: [
      "Service records and military careers",
      "Personal papers and correspondence",
      "Company histories and industrial archives",
      "Newspaper and magazine coverage",
      "Oral history projects and interviews"
    ],
    resources: [
      "British Newspaper Archive",
      "Flight International archives",
      "Royal Aeronautical Society",
      "Society of Experimental Test Pilots"
    ]
  },
  {
    title: "Helicopter and Rotorcraft Research",
    description: "Specialized guidance for researching early helicopter development and autogyro history.",
    topics: [
      "Cierva autogyro development",
      "British helicopter pioneers",
      "Test flight records and development",
      "Industrial helicopter applications",
      "Military helicopter adoption"
    ],
    resources: [
      "Science Museum archives",
      "Helicopter Museum Weston-super-Mare",
      "Cierva estate papers",
      "Westland Aircraft archives"
    ]
  }
];

const researchTips = [
  {
    category: "Primary Sources",
    tips: [
      "Always start with official military records and government archives",
      "Company archives often contain technical drawings and correspondence",
      "Personal diaries and letters provide unique perspectives",
      "Contemporary newspapers offer valuable context and public reaction"
    ]
  },
  {
    category: "Secondary Sources",
    tips: [
      "Cross-reference multiple historical accounts for accuracy",
      "Check bibliography citations for additional source leads",
      "Academic dissertations often contain unpublished research",
      "Aviation magazines provide technical details and industry news"
    ]
  },
  {
    category: "Digital Resources",
    tips: [
      "Online archives are expanding but don't replace physical visits",
      "Digital newspaper databases enable keyword searching",
      "Government databases often have military personnel records",
      "Museums increasingly digitize their photographic collections"
    ]
  }
];

export default function ResearchGuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
          <ol className="flex text-sm flex-wrap">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="mx-2">/</li>
            <li><span className="font-semibold text-gray-800">Research Guides</span></li>
          </ol>
        </nav>

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Aviation History Research Guides
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Expert guidance from {authorData.name}, renowned aviation historian with over {authorData.biography.achievements.find(a => a.includes('12 years'))?.match(/\d+/)?.[0] || '12'} years of research experience
            </p>
            <div className="mt-6 text-sm text-gray-500">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full mr-2">
                19 Published Books
              </span>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2">
                1,700+ Citations
              </span>
              <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                Primary Research Methods
              </span>
            </div>
          </header>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">About These Guides</h2>
            <p className="text-blue-800">
              These research guides are based on decades of experience investigating aviation history.
              Each methodology has been proven through the publication of {authorData.publications.totalBooks} authoritative books
              and is used by researchers worldwide for academic and historical projects.
            </p>
          </div>

          <div className="grid gap-8 mb-12">
            {researchGuides.map((guide, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{guide.title}</h2>
                <p className="text-gray-600 mb-6">{guide.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Research Topics</h3>
                    <ul className="space-y-2">
                      {guide.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Essential Resources</h3>
                    <ul className="space-y-2">
                      {guide.resources.map((resource, resourceIndex) => (
                        <li key={resourceIndex} className="flex items-start">
                          <span className="text-blue-500 mr-2 mt-1">→</span>
                          <span className="text-gray-700">{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Tips & Best Practices</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {researchTips.map((category, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-gray-600 leading-relaxed">
                        <span className="text-yellow-500 mr-2">💡</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Research Assistance?</h2>
            <p className="text-blue-100 mb-6 leading-relaxed">
              These guides represent decades of aviation history research experience.
              For specific research questions or collaboration opportunities, contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact for Research Help
              </Link>
              <Link
                href="/for-researchers"
                className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Academic Resources
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
