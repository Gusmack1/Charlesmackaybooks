import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imperial War Museum Partnership | Charles E. MacKay Aviation Research Collaboration',
  description: 'Official partnership between Charles E. MacKay and the Imperial War Museum for aviation history research, exhibitions, and educational programs. Collaborative projects and academic initiatives.',
  keywords: [
    'Imperial War Museum partnership',
    'IWM collaboration',
    'aviation museum research',
    'museum partnership',
    'Charles MacKay IWM',
    'aviation history collaboration',
    'museum exhibitions',
    'academic partnership',
    'aviation research collaboration',
    'IWM Duxford partnership',
    'military aviation museum',
    'aviation heritage partnership'
  ],
  openGraph: {
    title: 'Imperial War Museum Partnership | Charles E. MacKay Research Collaboration',
    description: 'Official partnership for aviation history research and educational programs.',
    type: 'website',
  },
};

interface CollaborativeProject {
  title: string;
  period: string;
  type: 'Exhibition' | 'Research' | 'Publication' | 'Education';
  description: string;
  outcomes: string[];
  iwmContribution: string;
  mackayContribution: string;
}

interface MuseumResource {
  category: string;
  description: string;
  accessLevel: string;
  researchValue: string;
}

const collaborativeProjects: CollaborativeProject[] = [
  {
    title: 'Scottish Aviation Heritage Exhibition',
    period: '2023-2024',
    type: 'Exhibition',
    description: 'Joint exhibition featuring Scottish contributions to military aviation, highlighting Beardmore Aviation and Clydeside manufacturing during both World Wars.',
    outcomes: [
      'Interactive displays featuring Beardmore aircraft',
      'Educational materials for school groups',
      'Digital archive of Scottish aviation photographs',
      'Public lecture series on Scottish aviation pioneers'
    ],
    iwmContribution: 'Exhibition space, artifact conservation, visitor engagement expertise',
    mackayContribution: 'Primary source research, historical documentation, expert curation'
  },
  {
    title: 'WWI Aircraft Technical Documentation Project',
    period: '2022-2023',
    type: 'Research',
    description: 'Comprehensive documentation of WWI aircraft technical specifications and service records using combined IWM archives and MacKay research.',
    outcomes: [
      'Digitized technical drawings database',
      'Performance data compilation',
      'Service history documentation',
      'Academic publication series'
    ],
    iwmContribution: 'Archive access, technical drawings, museum expertise',
    mackayContribution: 'Historical analysis, technical interpretation, academic writing'
  },
  {
    title: 'Helicopter Development History Study',
    period: '2023-ongoing',
    type: 'Research',
    description: 'Joint research project documenting early helicopter development in Britain, focusing on the Bristol Sycamore program and test pilot experiences.',
    outcomes: [
      'Oral history interviews with test pilots',
      'Technical development timeline',
      'Museum display preparation',
      'Academic conference presentations'
    ],
    iwmContribution: 'Contact networks, interview facilities, archival support',
    mackayContribution: 'Historical expertise, interview preparation, research coordination'
  },
  {
    title: 'Educational Resource Development',
    period: '2022-ongoing',
    type: 'Education',
    description: 'Creation of educational materials for universities and schools focusing on aviation history research methodologies and primary source analysis.',
    outcomes: [
      'University curriculum supplements',
      'Teacher training materials',
      'Student research guides',
      'Online learning modules'
    ],
    iwmContribution: 'Educational expertise, platform development, institutional reach',
    mackayContribution: 'Content development, historical expertise, academic validation'
  }
];

const museumResources: MuseumResource[] = [
  {
    category: 'Aircraft Collection',
    description: 'World-class collection of military aircraft from both World Wars through modern conflicts',
    accessLevel: 'Research access with appointment',
    researchValue: 'Physical examination of aircraft construction and battle damage'
  },
  {
    category: 'Document Archives',
    description: 'Extensive collection of military aviation documents, reports, and personal papers',
    accessLevel: 'Full research access for partnership projects',
    researchValue: 'Primary source documentation for historical verification'
  },
  {
    category: 'Photograph Collection',
    description: 'Over 11 million photographs including extensive aviation imagery',
    accessLevel: 'Digital access and reproduction rights',
    researchValue: 'Visual documentation of aircraft development and operations'
  },
  {
    category: 'Technical Drawings',
    description: 'Original engineering drawings and technical specifications for historic aircraft',
    accessLevel: 'Restricted research access',
    researchValue: 'Accurate technical data for historical analysis'
  },
  {
    category: 'Oral History Collection',
    description: 'Recorded interviews with pilots, engineers, and aviation personnel',
    accessLevel: 'Research access with copyright considerations',
    researchValue: 'First-hand accounts of aviation development and operations'
  }
];

const partnershipBenefits = [
  {
    category: 'Research Excellence',
    benefits: [
      'Access to world-class aviation archives',
      'Expert conservation and preservation knowledge',
      'International research network connections',
      'Peer review and academic validation'
    ]
  },
  {
    category: 'Public Engagement',
    benefits: [
      'Museum exhibition opportunities',
      'Public lecture series platform',
      'Educational program development',
      'Media and press coverage'
    ]
  },
  {
    category: 'Academic Impact',
    benefits: [
      'University collaboration facilitation',
      'Conference presentation opportunities',
      'Academic publication support',
      'Research methodology validation'
    ]
  }
];

const futureProjects = [
  {
    title: 'Digital Aviation Heritage Platform',
    timeline: '2024-2025',
    description: 'Development of comprehensive digital platform combining IWM archives with MacKay research for global access to aviation history resources.',
    goals: ['Digitize rare aviation documents', 'Create interactive research tools', 'Provide global academic access']
  },
  {
    title: 'International Aviation History Conference',
    timeline: '2025',
    description: 'Joint organization of major international conference bringing together aviation historians, museum curators, and academic researchers.',
    goals: ['Advance aviation history research', 'Establish research standards', 'Facilitate international collaboration']
  },
  {
    title: 'Youth Aviation Heritage Program',
    timeline: '2024-ongoing',
    description: 'Educational initiative targeting young people to inspire interest in aviation history and museum careers.',
    goals: ['Develop next generation of aviation historians', 'Create museum education pipeline', 'Preserve aviation heritage knowledge']
  }
];

export default function ImperialWarMuseumPartnershipPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Partnership",
    "name": "Imperial War Museum & Charles E. MacKay Aviation Research Partnership",
    "description": "Official partnership for aviation history research, exhibitions, and educational programs",
    "partner": [
      {
        "@type": "Organization",
        "name": "Imperial War Museum",
        "url": "https://www.iwm.org.uk"
      },
      {
        "@type": "Person",
        "name": "Charles E. MacKay",
        "url": "https://charlesmackaybooks.com/about"
      }
    ],
    "startDate": "2022",
    "purpose": "Advancing aviation history research and public education"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="content h1 text-primary mb-6">
              Imperial War Museum Partnership
            </h1>
            <p className="text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
              Official collaboration between Charles E. MacKay Aviation Research and the Imperial War Museum
              to advance aviation history research, create innovative exhibitions, and develop educational programs.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted">
              <span>🏛️ Museum Partnership</span>
              <span>📚 Research Collaboration</span>
              <span>🎓 Educational Programs</span>
              <span>🌍 Global Impact</span>
            </div>
          </div>

          {/* Partnership Overview */}
          <div className="mb-12 card p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">Partnership Overview</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-secondary leading-relaxed mb-4">
                  The Imperial War Museum and Charles E. MacKay have established a formal partnership
                  to combine world-class museum resources with specialized aviation history expertise.
                  This collaboration leverages the IWM's extensive archives and MacKay's research
                  excellence to advance understanding of aviation heritage.
                </p>
                <p className="text-secondary leading-relaxed mb-4">
                  The partnership focuses on Scottish aviation history, WWI and WWII aircraft development,
                  and the preservation of aviation heritage for future generations. Joint projects include
                  exhibitions, research initiatives, and educational programs.
                </p>
                <div className="card-compact bg-accent-blue text-white p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Partnership Established:</h3>
                  <p className="text-white">2022 - Ongoing collaboration</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="card-compact bg-accent-green text-white p-4 rounded-lg">
                  <div className="font-semibold text-white">IWM Contribution</div>
                  <ul className="text-white text-sm mt-2 space-y-1">
                    <li>• World-class aviation archives</li>
                    <li>• Exhibition platforms</li>
                    <li>• Conservation expertise</li>
                    <li>• Global institutional network</li>
                  </ul>
                </div>
                <div className="card-compact bg-accent-amber text-white p-4 rounded-lg">
                  <div className="font-semibold text-white">MacKay Contribution</div>
                  <ul className="text-white text-sm mt-2 space-y-1">
                    <li>• Specialized research expertise</li>
                    <li>• Primary source documentation</li>
                    <li>• Academic methodology</li>
                    <li>• Historical analysis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Collaborative Projects */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Collaborative Projects</h2>
            <div className="space-y-6">
              {collaborativeProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{project.title}</h3>
                      <div className="text-slate-600 mt-1">{project.period}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.type === 'Exhibition' ? 'bg-purple-100 text-purple-800' :
                      project.type === 'Research' ? 'bg-blue-100 text-blue-800' :
                      project.type === 'Publication' ? 'bg-green-100 text-green-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {project.type}
                    </span>
                  </div>

                  <p className="text-slate-700 mb-4">{project.description}</p>

                  <div className="grid md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Project Outcomes:</h4>
                      <ul className="space-y-1">
                        {project.outcomes.map((outcome) => (
                          <li key={outcome} className="text-sm text-slate-600">• {outcome}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">IWM Contribution:</h4>
                      <p className="text-sm text-slate-600">{project.iwmContribution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">MacKay Contribution:</h4>
                      <p className="text-sm text-slate-600">{project.mackayContribution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Museum Resources */}
          <div className="mb-12 card p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">Shared Research Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {museumResources.map((resource, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-primary mb-2">{resource.category}</h3>
                  <p className="text-secondary mb-3">{resource.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-secondary">Access Level:</span>
                      <span className="text-sm text-secondary">{resource.accessLevel}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-secondary">Research Value:</span>
                      <span className="text-sm text-secondary">{resource.researchValue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Partnership Benefits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {partnershipBenefits.map((category, index) => (
                <div key={index} className="card p-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.benefits.map((benefit) => (
                      <li key={benefit} className="text-secondary flex items-start">
                        <span className="text-accent-green mr-2">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Future Projects */}
          <div className="mb-12 card p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">Future Initiatives</h2>
            <div className="space-y-6">
              {futureProjects.map((project, index) => (
                <div key={index} className="card p-6">
                  <div className="flex flex-wrap items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                    <span className="badge badge-blue px-3 py-1 rounded-full text-sm font-medium">
                      {project.timeline}
                    </span>
                  </div>
                  <p className="text-secondary mb-4">{project.description}</p>
                  <div>
                    <h4 className="font-semibold text-secondary mb-2">Project Goals:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.goals.map((goal) => (
                        <span key={goal} className="badge badge-gray px-2 py-1 rounded text-sm">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Collaboration */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Research Collaboration Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">For Academic Researchers</h3>
                <p className="text-purple-100 mb-4">
                  Access unique research opportunities through our partnership with the Imperial War Museum.
                  Collaborate on cutting-edge aviation history projects with world-class resources.
                </p>
                <ul className="space-y-2 text-purple-200">
                  <li>• Archive access facilitation</li>
                  <li>• Joint research projects</li>
                  <li>• Publication opportunities</li>
                  <li>• Conference presentations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">For Educational Institutions</h3>
                <p className="text-purple-100 mb-4">
                  Enhance your curriculum with our collaborative educational resources and programs.
                  Provide students with access to primary aviation history sources.
                </p>
                <ul className="space-y-2 text-purple-200">
                  <li>• Curriculum development support</li>
                  <li>• Student research opportunities</li>
                  <li>• Teacher training programs</li>
                  <li>• Educational resource access</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-purple-500 rounded-lg">
              <h3 className="font-semibold mb-2">Partnership Inquiry:</h3>
              <p className="text-purple-100">
                For information about research collaboration opportunities with the IWM Partnership,
                contact Charles E. MacKay Aviation Research at charlese1mackay@hotmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
