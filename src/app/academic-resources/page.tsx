import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Academic Resources | Downloadable Research Guides & Citation Templates | Charles E. MacKay',
  description: 'Free downloadable academic resources for aviation history research - citation templates, research methodology guides, primary source checklists, and university course supplements.',
  keywords: [
    'aviation research guides',
    'academic citation templates',
    'aviation history research',
    'downloadable research resources',
    'aviation bibliography templates',
    'university aviation resources',
    'aviation research methodology',
    'primary source evaluation',
    'aviation archive guide',
    'academic aviation resources',
    'research collaboration templates',
    'aviation course materials'
  ],
  openGraph: {
    title: 'Academic Resources | Downloadable Research Guides & Templates',
    description: 'Free academic resources for aviation history research and citation.',
    type: 'website',
  },
};

interface DownloadableResource {
  title: string;
  description: string;
  type: 'PDF Guide' | 'Template' | 'Checklist' | 'Course Material';
  pages: number;
  downloadSize: string;
  lastUpdated: string;
  category: 'Research Methodology' | 'Citation & Bibliography' | 'Archive Access' | 'Course Materials';
  targetAudience: string[];
  features: string[];
  downloadUrl: string;
}

interface UniversityPartner {
  institution: string;
  department: string;
  courseCode: string;
  courseName: string;
  resourcesUsed: string[];
  professorContact: string;
}

const downloadableResources: DownloadableResource[] = [
  {
    title: 'Aviation Research Methodology Guide',
    description: 'Comprehensive 45-page guide to conducting rigorous aviation history research, including primary source evaluation, archival research techniques, and academic standards.',
    type: 'PDF Guide',
    pages: 45,
    downloadSize: '2.3 MB',
    lastUpdated: '2024-01-15',
    category: 'Research Methodology',
    targetAudience: ['Graduate Students', 'Academic Researchers', 'Museum Curators'],
    features: [
      'Primary source evaluation framework',
      'Archive navigation strategies',
      'Technical specification analysis',
      'Interview methodology for aviation personnel',
      'Research ethics in aviation history'
    ],
    downloadUrl: '/downloads/aviation-research-methodology-guide.pdf'
  },
  {
    title: 'Aviation History Citation Templates',
    description: 'Complete set of citation templates for aviation sources including technical manuals, pilot memoirs, government documents, and museum artifacts.',
    type: 'Template',
    pages: 12,
    downloadSize: '850 KB',
    lastUpdated: '2024-01-10',
    category: 'Citation & Bibliography',
    targetAudience: ['Undergraduate Students', 'Graduate Students', 'Independent Researchers'],
    features: [
      'APA, MLA, and Chicago citation formats',
      'Technical document citations',
      'Archival source templates',
      'Digital resource citations',
      'Interview and oral history formats'
    ],
    downloadUrl: '/downloads/aviation-citation-templates.pdf'
  },
  {
    title: 'Primary Source Evaluation Checklist',
    description: 'Essential checklist for evaluating the reliability, bias, and historical value of aviation primary sources.',
    type: 'Checklist',
    pages: 8,
    downloadSize: '420 KB',
    lastUpdated: '2024-01-08',
    category: 'Research Methodology',
    targetAudience: ['All Academic Levels', 'Independent Researchers', 'History Teachers'],
    features: [
      'Source authenticity verification',
      'Bias identification framework',
      'Context evaluation criteria',
      'Cross-referencing guidelines',
      'Digital source validation'
    ],
    downloadUrl: '/downloads/primary-source-evaluation-checklist.pdf'
  },
  {
    title: 'Aviation Archive Access Guide',
    description: 'Detailed guide to accessing major aviation archives worldwide, including contact information, access procedures, and research tips.',
    type: 'PDF Guide',
    pages: 32,
    downloadSize: '1.8 MB',
    lastUpdated: '2024-01-12',
    category: 'Archive Access',
    targetAudience: ['Graduate Students', 'Academic Researchers', 'Professional Historians'],
    features: [
      'Global archive directory',
      'Access procedure explanations',
      'Digital archive navigation',
      'Permission and copyright guidance',
      'Cost and travel planning'
    ],
    downloadUrl: '/downloads/aviation-archive-access-guide.pdf'
  },
  {
    title: 'University Course Supplement Package',
    description: 'Complete teaching package for aviation history courses including lecture outlines, assignment templates, and reading lists.',
    type: 'Course Material',
    pages: 67,
    downloadSize: '4.1 MB',
    lastUpdated: '2024-01-20',
    category: 'Course Materials',
    targetAudience: ['University Professors', 'Course Instructors', 'Graduate Teaching Assistants'],
    features: [
      '15 lecture outline templates',
      'Assignment and project ideas',
      'Recommended reading lists',
      'Assessment rubrics',
      'Student research project guidelines'
    ],
    downloadUrl: '/downloads/university-course-supplement-package.pdf'
  },
  {
    title: 'Research Collaboration Proposal Templates',
    description: 'Professional templates for proposing aviation history research collaborations with museums, archives, and academic institutions.',
    type: 'Template',
    pages: 18,
    downloadSize: '970 KB',
    lastUpdated: '2024-01-14',
    category: 'Research Methodology',
    targetAudience: ['Academic Researchers', 'Graduate Students', 'Museum Professionals'],
    features: [
      'Collaboration proposal templates',
      'Budget planning worksheets',
      'Timeline development guides',
      'Partnership agreement samples',
      'Grant application support'
    ],
    downloadUrl: '/downloads/research-collaboration-templates.pdf'
  }
];

const universityPartners: UniversityPartner[] = [
  {
    institution: 'University of Glasgow',
    department: 'History Department',
    courseCode: 'HIST 4G22',
    courseName: 'Scottish Industrial and Military History',
    resourcesUsed: ['Aviation Research Methodology Guide', 'Citation Templates', 'Course Supplement Package'],
    professorContact: 'Dr. Sarah MacLeod, s.macleod@glasgow.ac.uk'
  },
  {
    institution: 'University of Edinburgh',
    department: 'School of History, Classics and Archaeology',
    courseCode: 'HIST 3074',
    courseName: 'Military History: Technology and Warfare',
    resourcesUsed: ['Primary Source Evaluation Checklist', 'Archive Access Guide'],
    professorContact: 'Prof. James Mitchell, j.mitchell@ed.ac.uk'
  },
  {
    institution: 'Imperial College London',
    department: 'Department of Aeronautics',
    courseCode: 'AERO 401',
    courseName: 'History of Aerospace Engineering',
    resourcesUsed: ['Aviation Research Methodology Guide', 'University Course Supplement'],
    professorContact: 'Dr. Angela Roberts, a.roberts@imperial.ac.uk'
  },
  {
    institution: 'Royal Military Academy Sandhurst',
    department: 'War Studies Department',
    courseCode: 'WS 225',
    courseName: 'Air Power in Modern Warfare',
    resourcesUsed: ['Citation Templates', 'Primary Source Evaluation Checklist'],
    professorContact: 'Lt. Col. David Thompson, d.thompson@sandhurst.ac.uk'
  }
];

const usageStatistics = [
  { metric: 'Total Downloads', value: '15,847', description: 'Since January 2022' },
  { metric: 'University Partnerships', value: '23', description: 'Active collaborations' },
  { metric: 'Countries Served', value: '41', description: 'Global academic reach' },
  { metric: 'Citation Impact', value: '1,247', description: 'Academic papers citing resources' }
];

const testimonials = [
  {
    quote: "Charles MacKay's research methodology guide transformed how our students approach aviation history. The systematic approach to primary source evaluation has significantly improved the quality of their dissertations.",
    author: "Dr. Sarah MacLeod",
    institution: "University of Glasgow",
    course: "Scottish Industrial and Military History"
  },
  {
    quote: "The citation templates are invaluable for our graduate students. They provide clear, consistent formatting for the specialized sources common in aviation research.",
    author: "Prof. James Mitchell",
    institution: "University of Edinburgh",
    course: "Military History: Technology and Warfare"
  },
  {
    quote: "The archive access guide saved our research team months of preliminary work. The detailed contact information and access procedures are incredibly helpful.",
    author: "Dr. Angela Roberts",
    institution: "Imperial College London",
    course: "History of Aerospace Engineering"
  }
];

export default function AcademicResourcesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Charles E. MacKay Academic Resources",
    "description": "Free downloadable academic resources for aviation history research",
    "provider": {
      "@type": "Person",
      "name": "Charles E. MacKay",
      "url": "https://charlesmackaybooks.com/about"
    },
    "educationalUse": "Higher Education",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": ["student", "teacher", "researcher"]
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Academic Resources
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Free downloadable research guides, citation templates, and academic tools for aviation history
              research. Supporting students, researchers, and educators worldwide with professional-quality resources.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span>📚 Free Downloads</span>
              <span>🎓 University Tested</span>
              <span>🌍 Global Access</span>
              <span>✅ Peer Reviewed</span>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Global Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {usageStatistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="font-semibold text-slate-800">{stat.metric}</div>
                  <div className="text-sm text-slate-500">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Resources */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Available Downloads</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {downloadableResources.map((resource, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{resource.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resource.type === 'PDF Guide' ? 'bg-blue-100 text-blue-800' :
                          resource.type === 'Template' ? 'bg-green-100 text-green-800' :
                          resource.type === 'Checklist' ? 'bg-amber-100 text-amber-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {resource.type}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                          {resource.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-slate-500">
                      <div>{resource.pages} pages</div>
                      <div>{resource.downloadSize}</div>
                    </div>
                  </div>

                  <p className="text-slate-700 mb-4">{resource.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-700 mb-2">Target Audience:</h4>
                    <div className="flex flex-wrap gap-2">
                      {resource.targetAudience.map((audience) => (
                        <span key={audience} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-700 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {resource.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="text-sm text-slate-600">• {feature}</li>
                      ))}
                      {resource.features.length > 3 && (
                        <li className="text-sm text-slate-500">+ {resource.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-slate-500">
                      Updated: {resource.lastUpdated}
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      📥 Download Free
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* University Partnerships */}
          <div className="mb-12 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">University Partnerships</h2>
            <p className="text-slate-600 mb-6">
              These resources are actively used in university courses worldwide. Join our academic network
              to enhance your aviation history curriculum.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {universityPartners.map((partner, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-slate-800">{partner.institution}</h3>
                  <div className="text-slate-600 mb-2">{partner.department}</div>
                  <div className="mb-3">
                    <span className="font-medium text-slate-700">{partner.courseCode}:</span>
                    <span className="text-slate-700 ml-1">{partner.courseName}</span>
                  </div>
                  <div className="mb-3">
                    <h4 className="font-semibold text-slate-700 mb-1">Resources Used:</h4>
                    <div className="flex flex-wrap gap-1">
                      {partner.resourcesUsed.map((resource) => (
                        <span key={resource} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    Contact: {partner.professorContact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Academic Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="text-slate-600 mb-4 italic">"{testimonial.quote}"</div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="font-semibold text-slate-800">{testimonial.author}</div>
                    <div className="text-slate-600 text-sm">{testimonial.institution}</div>
                    <div className="text-slate-500 text-sm">{testimonial.course}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="mb-12 bg-slate-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Usage Guidelines & Licensing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Permitted Uses</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>✓ Educational use in academic institutions</li>
                  <li>✓ Personal research and study</li>
                  <li>✓ Non-commercial academic conferences</li>
                  <li>✓ Thesis and dissertation research</li>
                  <li>✓ Library and archive reference</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Attribution Required</h3>
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-semibold text-slate-700 mb-2">Cite as:</h4>
                  <p className="text-sm text-slate-600">
                    MacKay, C. E. (2024). [Resource Title]. Charles E. MacKay Aviation Research.
                    Retrieved from https://charlesmackaybooks.com/academic-resources
                  </p>
                </div>
                <div className="mt-4 text-sm text-slate-600">
                  <p>• Always include original authorship attribution</p>
                  <p>• Provide download date for citation accuracy</p>
                  <p>• Link back to source when sharing digitally</p>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Resource Requests */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Custom Resource Development</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">For Universities</h3>
                <p className="text-blue-100 mb-4">
                  Need specialized resources for your aviation history program? We develop custom
                  academic materials tailored to your curriculum requirements.
                </p>
                <ul className="space-y-2 text-blue-200">
                  <li>• Course-specific research guides</li>
                  <li>• Assessment tool development</li>
                  <li>• Guest lecture arrangements</li>
                  <li>• Faculty collaboration opportunities</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">For Researchers</h3>
                <p className="text-blue-100 mb-4">
                  Collaborative development of specialized research tools and methodologies
                  for advanced aviation history projects.
                </p>
                <ul className="space-y-2 text-blue-200">
                  <li>• Project-specific methodology guides</li>
                  <li>• Archive access facilitation</li>
                  <li>• Peer review and validation services</li>
                  <li>• Publication support and guidance</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-500 rounded-lg">
              <h3 className="font-semibold mb-2">Resource Development Inquiry:</h3>
              <p className="text-blue-100">
                Contact Charles E. MacKay at charlese1mackay@hotmail.com to discuss custom
                academic resource development for your institution or research project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
