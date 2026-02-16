import type { Metadata } from 'next';
import Link from 'next/link';
import BBCPageTemplate from '@/components/BBCPageTemplate';

export const metadata: Metadata = {
  title: 'Aviation Reading Timeline | Charles E. MacKay Aviation Books',
  description:
    'A sales-focused reading timeline that helps you choose Charles E. MacKay books by period and topic.',
  alternates: {
    canonical: 'https://charlesmackaybooks.com/timeline',
  },
  robots: {
    index: false,
    follow: true,
  },
};

const readingTimeline = [
  {
    era: 'Pioneer and Pre-WWI',
    focus: 'Early flight pioneers, experimentation, and aviation foundations.',
    primaryLink: '/category/aviation-biography',
    primaryLabel: 'Browse Aviation Biographies',
    featuredBooks: [
      { id: 'soaring-with-wings', title: 'Soaring with Wings' },
      { id: 'beardmore-aviation', title: 'Beardmore Aviation' },
    ],
  },
  {
    era: 'WWI Aviation',
    focus: 'Aircraft development, production systems, and front-line operations in 1914-1918.',
    primaryLink: '/category/wwi-aviation',
    primaryLabel: 'Browse WWI Aviation Books',
    featuredBooks: [
      { id: 'british-aircraft-great-war', title: 'British Aircraft of the Great War' },
      { id: 'german-aircraft-great-war', title: 'German Aircraft in the Great War' },
      { id: 'flying-for-kaiser', title: 'Flying for Kaiser Wilhelm 1914-1918' },
    ],
  },
  {
    era: 'Inter-War and Scottish Industrial Aviation',
    focus: 'Regional industry, infrastructure, and development between the wars.',
    primaryLink: '/category/scottish-aviation-history',
    primaryLabel: 'Browse Scottish Aviation History',
    featuredBooks: [
      { id: 'clydeside-aviation-vol1', title: 'Clydeside Aviation Volume One' },
      { id: 'clydeside-aviation-vol2', title: 'Clydeside Aviation Volume Two' },
      { id: 'aircraft-carrier-argus', title: 'Aircraft Carrier - Beardmore\'s HMS Argus' },
    ],
  },
  {
    era: 'WWII and Immediate Post-War',
    focus: 'Luftwaffe studies, late-war systems, and transition to the jet era.',
    primaryLink: '/category/wwii-aviation',
    primaryLabel: 'Browse WWII Aviation Books',
    featuredBooks: [
      { id: 'enemy-luftwaffe-1945', title: 'This Was the Enemy: The Luftwaffe 1945' },
      { id: 'this-was-the-enemy-volume-two', title: 'This Was the Enemy Volume Two' },
      { id: 'birth-atomic-bomb', title: 'Birth of the Atomic Bomb' },
    ],
  },
  {
    era: 'Cold War and Jet Age',
    focus: 'Jet operations, strategic deterrence, and post-war military aviation systems.',
    primaryLink: '/category/jet-age-aviation',
    primaryLabel: 'Browse Jet Age Aviation Books',
    featuredBooks: [
      { id: 'sabres-from-north', title: 'Sabres from the North' },
      { id: 'sonic-to-standoff', title: 'Sonic to Stand Off' },
      { id: 'dieter-dengler', title: 'Dieter Dengler, Skyraider 04 Down' },
    ],
  },
];

export default function TimelinePage() {
  return (
    <BBCPageTemplate
      title="Aviation Reading Timeline"
      subtitle="Choose your next book by period and research focus."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Timeline' }]}
    >
      <div className="container mx-auto container-padding py-6">
        <div className="card card-large mb-8">
          <p className="text-secondary">
            This page is a reading guide, not a historical chronology. Use it to pick books by era,
            then continue in the full catalog or in the detailed Scottish timeline.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/books" className="btn-books">
              Browse All Books
            </Link>
            <Link href="/scottish-aviation-timeline" className="badge badge-amber">
              Open Scottish Aviation Timeline
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {readingTimeline.map((item) => (
            <section key={item.era} className="card card-large">
              <h2 className="content h2 mb-2">{item.era}</h2>
              <p className="text-secondary mb-4">{item.focus}</p>

              <div className="mb-4">
                <Link href={item.primaryLink} className="badge badge-blue">
                  {item.primaryLabel}
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {item.featuredBooks.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    className="border border-white/15 rounded-lg p-4 bg-slate-800/40 hover:border-white/35 transition-colors text-white"
                  >
                    {book.title}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </BBCPageTemplate>
  );
}

