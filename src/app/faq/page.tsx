import type { Metadata } from 'next';
import BBCPageTemplate from '@/components/BBCPageTemplate';

export const metadata: Metadata = {
  title: 'Aviation History FAQ | Expert Answers | Charles E. MacKay',
  description: 'Comprehensive FAQ about aviation history, Scottish aviation heritage, Beardmore Aviation, and historical aircraft research. Expert answers from aviation historian Charles E. MacKay.',
  keywords: [
    'aviation history FAQ',
    'Scottish aviation questions',
    'Beardmore Aviation FAQ',
    'aviation research questions',
    'aircraft history answers',
    'aviation historian FAQ',
    'Scottish aerospace FAQ',
    'aviation book questions',
    'WWI aviation FAQ',
    'WWII aviation FAQ',
    'helicopter history FAQ',
    'aviation expert answers'
  ],
  alternates: {
    canonical: 'https://charlesmackaybooks.com/faq/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Aviation History FAQ | Expert Answers from Charles E. MacKay',
    description: 'Get expert answers to common aviation history questions from renowned historian Charles E. MacKay.',
    url: 'https://charlesmackaybooks.com/faq/',
    type: 'website',
  },
};

interface FAQItem {
  question: string;
  answer: string;
  category: 'General Aviation History' | 'Scottish Aviation' | 'Research Methods' | 'Book Information' | 'Technical Questions' | 'Academic Resources';
  relatedTopics?: string[];
  relatedBooks?: string[];
}

const faqItems: FAQItem[] = [
  // General Aviation History
  {
    question: 'What makes Scottish aviation history unique compared to other countries?',
    answer: 'Scottish aviation history is distinguished by several unique factors: the early industrial expertise that enabled companies like Beardmore Aviation to quickly transition into aircraft manufacturing, the strategic geographic location that made Scotland crucial for Atlantic operations during both World Wars, and the concentration of innovation along the Clyde that created a unique aviation manufacturing ecosystem. Scotland also played a pioneering role in helicopter development with the Bristol Sycamore program and maintained strong connections to both military and commercial aviation throughout the 20th century.',
    category: 'Scottish Aviation',
    relatedTopics: ['Beardmore Aviation', 'Clydeside Manufacturing', 'Industrial Heritage'],
    relatedBooks: ['Beardmore Aviation', 'Clydeside Aviation Vol 1', 'Clydeside Aviation Vol 2']
  },
  {
    question: 'Who was William Beardmore and why was his aviation company important?',
    answer: 'Sir William Beardmore was a Scottish industrialist who established one of Britain\'s most significant early aviation companies. His company, William Beardmore & Company, created the Aviation Division in 1913, becoming Scotland\'s first major aircraft manufacturer. The company was crucial because it represented the successful transition of traditional heavy industry into aviation, produced numerous aircraft for WWI including the W.B.III fighter, and contributed to major projects like the R101 airship. Beardmore Aviation\'s work from 1913-1930 established Scotland as a serious player in early aviation development.',
    category: 'Scottish Aviation',
    relatedTopics: ['William Beardmore', 'Scottish Manufacturing', 'WWI Aviation'],
    relatedBooks: ['Beardmore Aviation']
  },
  {
    question: 'What role did Scotland play in helicopter development?',
    answer: 'Scotland played a crucial role in early helicopter development, particularly through the Bristol Aircraft Company\'s work on the Sycamore helicopter. This was one of Britain\'s first successful helicopter programs, with extensive testing and development conducted in Scotland. The Scottish contribution to rotorcraft development included both manufacturing and innovation, with Scottish engineers and facilities contributing significantly to solving the technical challenges of early helicopter flight. This work established Scotland as an important center for rotorcraft technology in Europe.',
    category: 'Technical Questions',
    relatedTopics: ['Helicopter Development', 'Bristol Aircraft', 'Rotorcraft Technology'],
    relatedBooks: ['The Sycamore Seeds']
  },
  {
    question: 'How accurate are the historical claims in aviation history books?',
    answer: 'The accuracy of aviation history depends heavily on the quality of research and sources used. Quality aviation history books rely on primary sources such as company records, government documents, personal papers, and contemporary accounts. Charles E. MacKay\'s research is considered highly accurate because it draws extensively from primary sources including company archives, government records, and personal collections. Academic validation through peer review and citation by major institutions like the Imperial War Museum provides additional verification of historical accuracy.',
    category: 'Research Methods',
    relatedTopics: ['Primary Sources', 'Historical Accuracy', 'Academic Validation'],
    relatedBooks: ['All Charles E. MacKay Publications']
  },

  // Book Information
  {
    question: 'Which Charles E. MacKay book should I read first?',
    answer: 'For newcomers to aviation history, I recommend starting with "Beardmore Aviation: The Story of a Scottish Industrial Giant\'s Aviation Activities" as it provides an excellent foundation in early aviation manufacturing and Scottish industrial heritage. For those interested in broader Scottish aviation, "Clydeside Aviation Volume One: The Great War" offers comprehensive coverage of WWI Scottish aviation. Readers interested in specific aircraft types might prefer "The Sycamore Seeds" for helicopter history or the individual aircraft monographs for detailed technical information.',
    category: 'Book Information',
    relatedTopics: ['Reading Order', 'Aviation History Introduction', 'Scottish Aviation'],
    relatedBooks: ['Beardmore Aviation', 'Clydeside Aviation Vol 1', 'The Sycamore Seeds']
  },
  {
    question: 'Are Charles E. MacKay\'s books suitable for academic research?',
    answer: 'Yes, Charles E. MacKay\'s books are specifically designed for academic use and are cited as primary reference sources by universities worldwide. They include extensive footnotes, bibliography sections, primary source documentation, and have been validated by major academic institutions. The books are listed as Reference #1 in several aviation databases and are used by researchers at institutions including Imperial War Museum, Royal Aeronautical Society, Glasgow University, and Edinburgh University. Each book includes detailed source attribution and methodology notes.',
    category: 'Academic Resources',
    relatedTopics: ['Academic Research', 'Primary Sources', 'University Citations'],
    relatedBooks: ['All Charles E. MacKay Publications']
  },
  {
    question: 'What\'s the difference between Volume 1 and Volume 2 of Clydeside Aviation?',
    answer: 'Clydeside Aviation Volume One focuses on "The Great War" period (1914-1918), covering the establishment and rapid expansion of Scottish aviation manufacturing during WWI, including detailed analysis of companies, aircraft production, and military contracts. Volume Two covers "Between the Wars" (1918-1939), documenting the transition to civilian aviation, the challenges of the inter-war period, technological advancement, and the preparations for WWII. Together, they provide comprehensive coverage of Scottish aviation\'s most formative decades.',
    category: 'Book Information',
    relatedTopics: ['WWI Aviation', 'Inter-War Aviation', 'Scottish Manufacturing'],
    relatedBooks: ['Clydeside Aviation Vol 1', 'Clydeside Aviation Vol 2']
  },

  // Technical Questions
  {
    question: 'What made early aircraft manufacturing so challenging?',
    answer: 'Early aircraft manufacturing faced numerous challenges including the lack of established engineering standards, limited understanding of aerodynamics, shortage of suitable materials (requiring innovation in lightweight yet strong construction), absence of standardized production methods, and the need to train skilled workers in entirely new techniques. Companies like Beardmore Aviation had to essentially invent manufacturing processes while simultaneously developing the aircraft themselves. Quality control was particularly difficult when every aircraft was essentially a prototype.',
    category: 'Technical Questions',
    relatedTopics: ['Manufacturing Challenges', 'Early Aviation', 'Industrial Innovation'],
    relatedBooks: ['Beardmore Aviation', 'British Aircraft of the Great War']
  },
  {
    question: 'How did WWI change aviation development?',
    answer: 'WWI accelerated aviation development by decades, transforming aviation from experimental hobby to essential military capability in just four years. The war created urgent demand for better aircraft, leading to rapid improvements in engine power, structural design, armament systems, and manufacturing techniques. Military funding enabled experimental programs that would have been impossible in peacetime. The war also established aviation as a legitimate industry, created the first generation of trained pilots and mechanics, and demonstrated aviation\'s strategic importance for future conflicts.',
    category: 'General Aviation History',
    relatedTopics: ['WWI Aviation', 'Military Aviation', 'Aviation Development'],
    relatedBooks: ['British Aircraft of the Great War', 'German Aircraft of the Great War', 'Clydeside Aviation Vol 1']
  },

  // Research Methods
  {
    question: 'Where can I find primary sources for aviation history research?',
    answer: 'Primary sources for aviation history research can be found in several key repositories: The National Archives (Kew) for government documents and military records, Imperial War Museum for military aviation materials, company archives (many held by local record offices), family collections (often containing personal papers and photographs), and specialist libraries like the Royal Aeronautical Society. Corporate archives, when accessible, provide invaluable technical and business records. Always verify access requirements and permissions before visiting archives.',
    category: 'Research Methods',
    relatedTopics: ['Primary Sources', 'Archives', 'Research Methodology'],
    relatedBooks: ['Research methodology covered in all publications']
  },
  {
    question: 'How do you verify the accuracy of historical aviation claims?',
    answer: 'Historical accuracy in aviation research requires cross-referencing multiple independent sources, prioritizing contemporary documents over later accounts, examining physical evidence where available, and consulting with subject matter experts. Key verification methods include comparing company records with government documents, checking personal accounts against official records, analyzing photographic evidence, and reviewing technical specifications against known engineering capabilities of the period. Peer review by other historians and validation by institutions adds additional credibility.',
    category: 'Research Methods',
    relatedTopics: ['Historical Verification', 'Source Validation', 'Academic Standards'],
    relatedBooks: ['Methodology discussed in all academic publications']
  },

  // Academic Resources
  {
    question: 'Can I cite Charles E. MacKay\'s books in my university dissertation?',
    answer: 'Yes, Charles E. MacKay\'s books are specifically designed for academic citation and are regularly cited in university dissertations worldwide. They meet academic standards with comprehensive source attribution, extensive bibliographies, and primary source documentation. When citing, use standard academic citation formats and note that many of the books are considered primary reference sources in their subject areas. For dissertation work, these books provide excellent starting points for further research and contain extensive footnotes leading to additional sources.',
    category: 'Academic Resources',
    relatedTopics: ['Academic Citation', 'University Research', 'Dissertation Sources'],
    relatedBooks: ['All Charles E. MacKay Publications']
  },
  {
    question: 'What academic institutions use Charles E. MacKay\'s research?',
    answer: 'Charles E. MacKay\'s research is used by numerous academic institutions including Imperial War Museum, Royal Aeronautical Society, Glasgow University, Edinburgh University, and various international universities. His work is cited in academic papers, used in course curricula, and referenced in museum exhibitions. The research has been validated by peer review and is recognized by major aviation organizations worldwide. Many institutions hold his books in their special collections for aviation and Scottish history research.',
    category: 'Academic Resources',
    relatedTopics: ['Academic Recognition', 'University Citations', 'Institutional Validation'],
    relatedBooks: ['All Charles E. MacKay Publications']
  },

  // General Questions
  {
    question: 'How many books has Charles E. MacKay written?',
    answer: 'Charles E. MacKay has published 19 books on aviation history, covering topics from Scottish aviation heritage to international military aviation development. His publications span from detailed company histories like Beardmore Aviation to comprehensive surveys of aircraft development during major conflicts. Each book represents years of primary source research and contributes unique insights to aviation historical knowledge. The complete catalog includes works on Scottish aviation, helicopter development, WWI and WWII aircraft, and aviation biography.',
    category: 'Book Information',
    relatedTopics: ['Publication List', 'Aviation History', 'Research Output'],
    relatedBooks: ['Complete Charles E. MacKay Catalog']
  },
  {
    question: 'What makes aviation history research different from other historical fields?',
    answer: 'Aviation history research presents unique challenges including rapid technological change requiring technical understanding, the international nature of aviation development, the integration of military and civilian applications, and the need to understand both engineering and operational aspects. Aviation historians must be familiar with technical specifications, manufacturing processes, military organization, and commercial operations. The field also requires careful attention to accuracy given the technical nature of the subject and the importance of aviation in military and social history.',
    category: 'Research Methods',
    relatedTopics: ['Aviation Research', 'Historical Methodology', 'Technical History'],
    relatedBooks: ['Methodology principles applied throughout all publications']
  }
];

const categories = [...new Set(faqItems.map(item => item.category))];

export default function FAQPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "author": {
          "@type": "Person",
          "name": "Charles E. MacKay"
        }
      }
    }))
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
        title="Aviation History FAQ"
        subtitle="Expert answers to aviation history, Scottish aviation, and research questions"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      >
          {/* Category Filter */}
          <div className="mb-12 bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
            <h2 className="content h2 text-white mb-4">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category} className="text-center p-4 bg-blue-900/50 border border-blue-700/50 text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                  <div className="font-semibold text-white">{category}</div>
                  <div className="text-sm text-white/90 mt-1">
                    {faqItems.filter(item => item.category === category).length} questions
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>

            {categories.map((category) => (
              <div key={category} className="bg-slate-800 border border-white/15 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-semibold text-white mb-6 border-b border-white/15 pb-2">
                  {category}
                </h3>

                <div className="space-y-6">
                  {faqItems
                    .filter(item => item.category === category)
                    .map((faq, index) => (
                      <div key={index} className="border-b border-white/10 last:border-b-0 pb-6 last:pb-0">
                        <h4 className="text-xl font-semibold text-white mb-4 leading-relaxed">
                          {faq.question}
                        </h4>

                        <div className="prose max-w-none">
                          <p className="text-white/90 leading-relaxed mb-4">
                            {faq.answer}
                          </p>
                        </div>

                        {faq.relatedTopics && (
                          <div className="mb-4">
                            <h5 className="font-semibold text-white mb-2">Related Topics:</h5>
                            <div className="flex flex-wrap gap-2">
                              {faq.relatedTopics.map((topic) => (
                                <span key={topic} className="px-3 py-1 bg-slate-900 text-white border border-white/15 rounded-full text-sm">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {faq.relatedBooks && (
                          <div className="mt-4 bg-blue-900/50 border border-blue-700/50 text-white p-4 rounded-lg">
                            <h5 className="font-semibold text-white mb-2">Recommended Reading:</h5>
                            <div className="text-sm text-white/90">
                              {faq.relatedBooks.join(', ')}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact for More Questions */}
          <div className="mt-12 bg-slate-800 border border-white/15 rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold text-white mb-6">Have Additional Questions?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Academic Inquiries</h3>
                <p className="text-white/90 mb-4">
                  For detailed academic questions about aviation history research, source verification,
                  or assistance with dissertation and thesis work, academic inquiries are welcome.
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div><strong>Response Time:</strong> 3-5 business days</div>
                  <div><strong>Best For:</strong> Research methodology, source verification, academic collaboration</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">General Inquiries</h3>
                <p className="text-white/90 mb-4">
                  Questions about books, availability, shipping, or general aviation history topics.
                  Please review the FAQ above first as many common questions are already answered.
                </p>
                <div className="space-y-2 text-sm text-white/80">
                  <div><strong>Response Time:</strong> 1-2 business days</div>
                  <div><strong>Best For:</strong> Book inquiries, general questions, purchase assistance</div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-900/50 border border-green-700/50 rounded-lg text-white">
              <h4 className="font-semibold text-white mb-2">Research Collaboration</h4>
              <p className="text-white/90">
                Charles E. MacKay welcomes collaboration opportunities with academic institutions,
                museums, and serious researchers. Please provide detailed information about your
                research project and specific collaboration interests.
              </p>
            </div>
          </div>

          {/* About the Expert */}
          <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6">About the Expert</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Charles E. MacKay</h3>
                <p className="text-blue-100 mb-4">
                  Renowned aviation historian with over 12 years of dedicated research into Scottish aviation heritage
                  and international military aviation development. Author of 19 published books and recognized as a
                  primary reference source by major academic institutions worldwide.
                </p>
                <div className="space-y-2 text-blue-200">
                  <div>✈️ 18 Published Aviation History Books</div>
                  <div>🎓 Cited by Universities Worldwide</div>
                  <div>🏛️ Recognized by Imperial War Museum</div>
                  <div>📚 Over 1,700 Satisfied Customers</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Areas of Expertise</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• Scottish Aviation Heritage & Industrial History</li>
                  <li>• WWI & WWII Military Aviation Development</li>
                  <li>• Early Helicopter & Rotorcraft Technology</li>
                  <li>• Aviation Manufacturing & Technical Innovation</li>
                  <li>• Primary Source Research & Archive Analysis</li>
                  <li>• Aviation Biography & Personnel History</li>
                </ul>
              </div>
            </div>
          </div>
      </BBCPageTemplate>
    </>
  );
}
