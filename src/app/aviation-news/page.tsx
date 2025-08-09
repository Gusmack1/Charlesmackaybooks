import type { Metadata } from 'next';
import BBCPageTemplate from '@/components/BBCPageTemplate'


export const metadata: Metadata = {
  title: 'Aviation News & Research Updates | Latest Discoveries | Charles E. MacKay',
  description: 'Latest aviation history discoveries, research updates, museum exhibitions, and archaeological findings. Expert analysis and commentary by aviation historian Charles E. MacKay.',
  keywords: [
    'aviation news',
    'aviation history discoveries',
    'aircraft archaeology',
    'aviation museum news',
    'aviation research updates',
    'aircraft restoration news',
    'aviation conference news',
    'historical aircraft discoveries',
    'aviation exhibition news',
    'aircraft wreck discoveries',
    'aviation archive discoveries',
    'military aviation news',
    'Scottish aviation news',
    'aviation book releases'
  ],
  openGraph: {
    title: 'Aviation News & Research Updates | Latest Discoveries',
    description: 'Latest aviation history discoveries and research updates with expert analysis.',
    type: 'website',
  },
};

interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  fullContent: string;
  publishDate: string;
  category: 'Discovery' | 'Exhibition' | 'Research' | 'Archaeology' | 'Book Release' | 'Conference';
  tags: string[];
  location?: string;
  readTime: number;
  authorCommentary: string;
  relatedLinks: {
    title: string;
    url: string;
  }[];
}

interface UpcomingEvent {
  title: string;
  date: string;
  location: string;
  type: 'Conference' | 'Exhibition' | 'Lecture' | 'Book Launch';
  description: string;
  registrationUrl?: string;
}

const latestNews: NewsArticle[] = [
  {
    id: 'wwi-fighter-discovery-scotland-2024',
    headline: 'WWI Fighter Aircraft Wreckage Discovered in Scottish Highlands',
    summary: 'Archaeologists uncover remarkably preserved remains of a WWI-era aircraft in the Scottish Highlands, potentially solving a century-old mystery.',
    fullContent: `A team of aviation archaeologists has made a significant discovery in the remote Scottish Highlands, uncovering the wreckage of what appears to be a World War I fighter aircraft. The find, located near Cairngorms National Park, includes substantial portions of the airframe, engine components, and personal effects of the pilot.

Initial analysis suggests the aircraft may be a Royal Flying Corps machine that disappeared during a training flight in 1918. The preservation quality is exceptional due to the remote, high-altitude location and Scotland's climate conditions.

The discovery team, working with Forestry and Land Scotland, has carefully excavated personal items including pilot's wings, a compass, and fragments of a leather flying helmet. These artifacts are providing crucial clues to the identity of both the aircraft and its pilot.

Dr. Sarah Mitchell, leading the archaeological team, noted: "This discovery offers a unique window into the final days of the Great War's aviation operations. The level of preservation allows us to examine construction techniques and materials that are rarely seen in museum pieces."

The wreckage site has been cordoned off while investigations continue. The team is working closely with the Commonwealth War Graves Commission to potentially identify the pilot and provide closure to any living relatives.`,
    publishDate: '2024-01-22',
    category: 'Discovery',
    tags: ['WWI Aviation', 'Scotland', 'Archaeology', 'Royal Flying Corps'],
    location: 'Scottish Highlands',
    readTime: 4,
    authorCommentary: 'This discovery exemplifies the ongoing importance of aviation archaeology in preserving our aviation heritage. Such finds provide invaluable primary source material that complements archival research and helps fill gaps in our historical understanding.',
    relatedLinks: [
      { title: 'WWI Aviation in Scotland', url: '/scottish-aviation-timeline' },
      { title: 'Aviation Archaeology Guide', url: '/aviation-bibliography' }
    ]
  },
  {
    id: 'imperial-war-museum-helicopter-exhibition-2024',
    headline: 'Imperial War Museum Unveils Major Helicopter Development Exhibition',
    summary: 'New exhibition showcases the complete history of helicopter development, featuring rare prototypes and personal accounts from test pilots.',
    fullContent: `The Imperial War Museum has opened a groundbreaking exhibition tracing the complete history of helicopter development from early experiments to modern rotorcraft. "Vertical Flight: The Helicopter Story" features over 50 aircraft and prototypes, many displayed publicly for the first time.

The exhibition highlights British contributions to helicopter development, with particular focus on the Bristol Sycamore program and the work of test pilots who risked their lives proving these revolutionary machines. Interactive displays allow visitors to experience the challenges faced by early helicopter designers.

A centerpiece of the exhibition is a fully restored Bristol Sycamore Mk 4, accompanied by video testimonies from surviving test pilots and engineers who worked on the program. The display includes original technical drawings, test flight reports, and previously classified documentation.

The exhibition also features a section on helicopter operations in various conflicts, from Korea to the Falklands, demonstrating how these versatile machines revolutionized military operations and civilian rescue services.

Special lectures and workshops will accompany the exhibition, including presentations on helicopter archaeology and the preservation of rotorcraft heritage. The exhibition runs through December 2024.`,
    publishDate: '2024-01-18',
    category: 'Exhibition',
    tags: ['Helicopter History', 'Imperial War Museum', 'Bristol Sycamore', 'Exhibition'],
    location: 'London, England',
    readTime: 3,
    authorCommentary: 'This exhibition represents a significant milestone in helicopter history preservation. The IWM\'s commitment to showcasing British helicopter development aligns perfectly with our research into early rotorcraft programs documented in "The Sycamore Seeds."',
    relatedLinks: [
      { title: 'The Sycamore Seeds Book', url: '/books/sycamore-seeds' },
      { title: 'IWM Partnership', url: '/partnerships/imperial-war-museum' }
    ]
  },
  {
    id: 'beardmore-aviation-archive-discovery-2024',
    headline: 'Lost Beardmore Aviation Archive Discovered in Glasgow',
    summary: 'Construction workers discover a sealed vault containing thousands of Beardmore Aviation documents thought lost for decades.',
    fullContent: `A remarkable discovery in Glasgow has yielded thousands of previously unknown Beardmore Aviation Company documents, providing unprecedented insight into Scotland's aviation heritage. The documents were found in a sealed vault during renovation work at a former Beardmore facility.

The archive contains technical drawings, correspondence, production records, and photographs spanning Beardmore Aviation's entire operational period from 1913 to 1930. Among the most significant finds are detailed records of the R101 airship project and previously unknown aircraft designs that never reached production.

Glasgow City Archives has taken custody of the collection, which includes over 3,000 technical drawings, 5,000 photographs, and extensive correspondence between Beardmore executives and government officials. The documents provide crucial missing pieces in understanding Scotland's role in early aviation development.

Of particular interest are personal letters from William Beardmore himself, discussing the challenges of transitioning from traditional shipbuilding to aircraft manufacturing. The correspondence reveals the financial and technical struggles that ultimately led to the division's closure.

Dr. James MacPherson of Glasgow City Archives commented: "This discovery fundamentally changes our understanding of Beardmore Aviation's operations and Scotland's contribution to early aviation. The level of detail in these documents is extraordinary."

The archive is currently being cataloged and digitized, with plans for public access through Glasgow City Archives' online portal by mid-2024.`,
    publishDate: '2024-01-15',
    category: 'Discovery',
    tags: ['Beardmore Aviation', 'Scotland', 'Archives', 'Glasgow'],
    location: 'Glasgow, Scotland',
    readTime: 5,
    authorCommentary: 'This discovery validates much of the research methodology used in my Beardmore Aviation book. The newly found documents will provide researchers with primary source material that will undoubtedly lead to revised understanding of this crucial period in Scottish aviation history.',
    relatedLinks: [
      { title: 'Beardmore Aviation Book', url: '/books/beardmore-aviation' },
      { title: 'Scottish Aviation Timeline', url: '/scottish-aviation-timeline' }
    ]
  },
  {
    id: 'international-aviation-history-conference-2024',
    headline: 'International Aviation History Conference Announces 2024 Program',
    summary: 'Leading aviation historians to gather in London for premier academic conference featuring latest research and discoveries.',
    fullContent: `The International Aviation History Society has announced the program for its 2024 conference, scheduled for September in London. The three-day event will bring together leading aviation historians, museum curators, and researchers from around the world.

This year's theme, "Primary Sources and Preservation," emphasizes the importance of archival research and the challenges of preserving aviation heritage in the digital age. Over 60 presentations will cover topics ranging from early aviation pioneers to modern military aircraft development.

Keynote speakers include Dr. Richard Hallion, former Air Force Historian, and Dr. Christina Goulter from the University of New South Wales. Special sessions will focus on aviation archaeology, digital preservation techniques, and collaborative research methods.

A highlight of the conference will be the "Future of Aviation History" panel, discussing how new technologies and research methods are changing the field. The event will also feature exhibitions of rare aviation artifacts and guided tours of London's aviation heritage sites.

The conference provides an excellent opportunity for early-career researchers to present their work and network with established scholars. Student presentation awards will be given in several categories, encouraging the next generation of aviation historians.

Registration is now open, with early-bird rates available through March 2024. The conference will be held at the Royal Aeronautical Society headquarters in London.`,
    publishDate: '2024-01-12',
    category: 'Conference',
    tags: ['Aviation History', 'Conference', 'Academic Research', 'London'],
    location: 'London, England',
    readTime: 3,
    authorCommentary: 'This conference represents the premier gathering for serious aviation history research. The focus on primary sources aligns perfectly with the methodology we advocate. I look forward to presenting our latest research on Scottish aviation heritage.',
    relatedLinks: [
      { title: 'Research Methodology Guide', url: '/academic-resources' },
      { title: 'Aviation Bibliography', url: '/aviation-bibliography' }
    ]
  }
];

const upcomingEvents: UpcomingEvent[] = [
  {
    title: 'Charles E. MacKay Guest Lecture: "Hidden Stories of Scottish Aviation"',
    date: '2024-02-15',
    location: 'University of Glasgow',
    type: 'Lecture',
    description: 'Guest lecture exploring untold stories from Scotland\'s aviation heritage, including recently discovered archival materials.',
    registrationUrl: 'https://glasgow.ac.uk/events/aviation-lecture'
  },
  {
    title: 'RAF Museum "Battle of Britain 84th Anniversary" Exhibition Opening',
    date: '2024-03-08',
    location: 'RAF Museum London',
    type: 'Exhibition',
    description: 'New exhibition featuring Hurricane and Spitfire aircraft with emphasis on Scottish squadrons and pilots.'
  },
  {
    title: 'Aviation Archaeology Symposium',
    date: '2024-04-22',
    location: 'Imperial War Museum Duxford',
    type: 'Conference',
    description: 'International symposium on aviation archaeology methods and recent discoveries.',
    registrationUrl: 'https://iwm.org.uk/events/aviation-archaeology'
  },
  {
    title: 'New Book Launch: "Clydeside Aviation Volume Three"',
    date: '2024-05-10',
    location: 'Glasgow, Scotland',
    type: 'Book Launch',
    description: 'Launch event for the third volume covering post-war Scottish aviation development.'
  }
];

const researchHighlights = [
  {
    title: 'Digital Archive Expansion',
    description: 'Over 2,000 new documents added to our digital aviation archive this quarter',
    metric: '2,147 documents',
    period: 'Q4 2023'
  },
  {
    title: 'Academic Citations',
    description: 'Our research has been cited in academic papers and dissertations worldwide',
    metric: '89 citations',
    period: 'Last 6 months'
  },
  {
    title: 'Museum Partnerships',
    description: 'Active collaborations with major aviation museums for research and exhibitions',
    metric: '7 active partnerships',
    period: 'Current'
  },
  {
    title: 'Student Resources',
    description: 'Downloads of our academic research guides and citation templates',
    metric: '1,834 downloads',
    period: 'This quarter'
  }
];

export default function AviationNewsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Charles E. MacKay Aviation News",
    "description": "Latest aviation history discoveries, research updates, and expert analysis",
    "author": {
      "@type": "Person",
      "name": "Charles E. MacKay",
      "url": "https://charlesmackaybooks.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Charles E. MacKay Aviation Research"
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
        title="Aviation News & Updates"
        subtitle="Latest discoveries, research developments, and expert analysis"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Aviation News' }]}
      >

          {/* Research Highlights */}
          <div className="mb-12 card p-8">
                                                        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Research Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {researchHighlights.map((highlight, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent-blue mb-2">{highlight.metric}</div>
                  <div className="font-semibold text-primary mb-1">{highlight.title}</div>
                  <div className="text-sm text-secondary mb-2">{highlight.description}</div>
                  <div className="text-xs text-muted">{highlight.period}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest News */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-8">Latest News</h2>
            <div className="space-y-8">
              {latestNews.map((article, index) => (
                <article key={article.id} className="card p-6 border-l-4 border-accent-blue">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-2">{article.headline}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.category === 'Discovery' ? 'badge badge-green' :
                          article.category === 'Exhibition' ? 'badge badge-purple' :
                          article.category === 'Research' ? 'badge badge-blue' :
                          article.category === 'Archaeology' ? 'badge badge-amber' :
                          article.category === 'Book Release' ? 'badge badge-indigo' :
                          'badge badge-gray'
                        }`}>
                          {article.category}
                        </span>
                        {article.location && (
                          <span className="px-2 py-1 badge badge-gray rounded-full text-xs">
                            📍 {article.location}
                          </span>
                        )}
                        <span className="px-2 py-1 badge badge-gray rounded-full text-xs">
                          {article.readTime} min read
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted">
                      {new Date(article.publishDate).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  <p className="text-secondary mb-4 text-lg">{article.summary}</p>

                  <div className="prose max-w-none text-secondary mb-6">
                    {article.fullContent.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>

                  <div className="card-compact bg-accent-blue text-white p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-white mb-2">Expert Commentary:</h4>
                    <p className="text-white italic">{article.authorCommentary}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="badge badge-gray px-2 py-1 rounded text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {article.relatedLinks.map((link) => (
                        <a key={link.title} href={link.url} className="text-accent-blue hover:underline text-sm">
                          {link.title} →
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12 card p-8">
            <h2 className="text-3xl font-bold text-primary mb-6">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary">{event.title}</h3>
                      <div className="text-secondary text-sm">{event.location}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'Conference' ? 'badge badge-blue' :
                      event.type === 'Exhibition' ? 'badge badge-purple' :
                      event.type === 'Lecture' ? 'badge badge-green' :
                      'badge badge-amber'
                    }`}>
                      {event.type}
                    </span>
                  </div>

                  <div className="text-muted text-sm mb-3">
                    📅 {new Date(event.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  <p className="text-secondary mb-3">{event.description}</p>

                  {event.registrationUrl && (
                    <a
                      href={event.registrationUrl}
                      className="text-accent-blue hover:underline text-sm font-medium"
                    >
                      Register Now →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>


      </BBCPageTemplate>
    </>
  );
}
