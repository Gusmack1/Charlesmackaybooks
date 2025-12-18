import type { Metadata } from 'next'
import Link from 'next/link'
import BBCPageTemplate from '@/components/BBCPageTemplate'

export const metadata: Metadata = {
  title: 'Glasgow Aviation History | Clyde Shipyards Aircraft | Scottish Aerospace Heritage | Charles E. MacKay',
  description: 'Glasgow aviation history from 1903-2023. Beardmore, Arrol-Johnston, Albion Motors aircraft production. RAF Abbotsinch, Renfrew Airport, Glasgow\'s aerospace legacy. Expert research by Charles E. MacKay.',
  keywords: [
    'Glasgow aviation history',
    'Clyde shipyards aircraft',
    'Scottish aerospace heritage',
    'Glasgow aircraft production',
    'Beardmore aviation Glasgow',
    'RAF Abbotsinch history',
    'Renfrew Airport Glasgow',
    'Scottish aviation pioneers',
    'Glasgow aerospace industry',
    'Clyde aviation heritage',
    'Glasgow military aviation',
    'Scottish aircraft manufacturers',
    'Glasgow aviation timeline',
    'Scottish aerospace development',
    'Glasgow aviation research'
  ],
  alternates: {
    canonical: 'https://charlesmackaybooks.com/glasgow-aviation-history'
  },
  openGraph: {
    title: 'Glasgow Aviation History | Clyde Shipyards Aircraft | Scottish Aerospace Heritage',
    description: 'Glasgow aviation history from 1903-2023. Beardmore, Arrol-Johnston aircraft production. RAF Abbotsinch, Glasgow\'s aerospace legacy. Expert research.',
    type: 'article',
    url: 'https://charlesmackaybooks.com/glasgow-aviation-history',
    images: [
      {
        url: '/glasgow-aviation-history.jpg',
        width: 1200,
        height: 630,
        alt: 'Glasgow Aviation History - Clyde Shipyards Aircraft Production',
      },
    ],
  },
}

export default function GlasgowAviationHistory() {
  return (
    <BBCPageTemplate
      title="Glasgow Aviation History"
      subtitle="From Clyde Shipyards to Modern Aerospace"
      readingTime="12 min read"
    >
      <div className="prose prose-invert max-w-none">
        <p className="lead">
          Glasgow's aviation history spans over a century of innovation, from pioneering aircraft manufacturers
          along the Clyde to modern aerospace engineering. This comprehensive account explores Glasgow's
          remarkable contribution to aviation development, featuring the legendary Beardmore company,
          wartime aircraft production, and the city's ongoing aerospace legacy.
        </p>

        <h2>Glasgow Aviation Timeline: 1903-2023</h2>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker">1903</div>
            <div className="timeline-content">
              <h3>Early Pioneers: Arrol-Johnston & Albion Motors</h3>
              <p>The Glasgow aviation story begins with local engineering firms experimenting with powered flight.
              Arrol-Johnston and Albion Motors, both based in the city, developed early aircraft and engines,
              laying the foundation for Glasgow's aviation industry.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">1913</div>
            <div className="timeline-content">
              <h3>Beardmore Aviation Takes Flight</h3>
              <p>William Beardmore establishes Beardmore Aviation at Dalmuir on the Clyde. The company becomes
              synonymous with Scottish aviation excellence, producing aircraft for both military and civilian use.</p>
              <Link href="/books/beardmore-aviation" className="badge badge-blue">
                Read: Beardmore Aviation History →
              </Link>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">1916</div>
            <div className="timeline-content">
              <h3>World War I Aircraft Production</h3>
              <p>Glasgow's Clyde shipyards and engineering works shift to aircraft production. Beardmore produces
              the BE.2, BE.12, and W.B.3 aircraft for the Royal Flying Corps. The city's industrial capacity
              proves crucial to the war effort.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">1918</div>
            <div className="timeline-content">
              <h3>Post-War Aviation Expansion</h3>
              <p>Following the Armistice, Beardmore Aviation continues aircraft development and production.
              The company works on commercial aircraft designs and maintains its position as Scotland's
              leading aviation manufacturer.</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">1930s</div>
            <div class="timeline-content">
              <h3>Inter-War Aviation Development</h3>
              <p>Glasgow becomes a center for aviation research and development. Local engineers and designers
              contribute to advances in aircraft technology, materials, and aerodynamics. The city hosts
              aviation exhibitions and demonstrations.</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">1939-1945</div>
            <div class="timeline-content">
              <h3>World War II Aviation Production</h3>
              <p>Glasgow's engineering firms play vital roles in wartime aircraft production. The city's
              shipyards and factories produce aircraft components, engines, and complete airframes for
              the RAF and Allied forces.</p>
              <Link href="/books/modern-furniture" className="badge badge-blue">
                Read: WWII Aircraft Production →
              </Link>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">1950s</div>
            <div class="timeline-content">
              <h3>RAF Abbotsinch & Renfrew Airport</h3>
              <p>The establishment of RAF Abbotsinch brings military aviation to Glasgow's doorstep.
              Later becoming Renfrew Airport, the facility serves both military and civilian aviation
              needs for decades.</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">1960s-1980s</div>
            <div class="timeline-content">
              <h3>Modern Aerospace Engineering</h3>
              <p>Glasgow continues to be a center for aerospace engineering and research. Local universities
              and research institutions contribute to aviation technology development, materials science,
              and aircraft design.</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-marker">1990s-Present</div>
            <div class="timeline-content">
              <h3>Contemporary Aerospace Legacy</h3>
              <p>Glasgow's aviation heritage continues through education, research, and preservation efforts.
              The city remains connected to aviation through Glasgow International Airport and ongoing
              aerospace research initiatives.</p>
            </div>
          </div>
        </div>

        <h2>Key Glasgow Aviation Figures</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3>William Beardmore (1856-1936)</h3>
            <p>Industrialist and aviation pioneer who established Beardmore Aviation. His company became
            one of Scotland's most important aircraft manufacturers, producing military and civilian aircraft
            for decades.</p>
          </div>

          <div className="card">
            <h3>Glasgow Aviation Engineers</h3>
            <p>Numerous Glasgow-based engineers contributed to aviation development. From early pioneers
            working with Arrol-Johnston to post-war designers advancing aircraft technology, Glasgow's
            engineering talent shaped aviation history.</p>
          </div>

          <div className="card">
            <h3>Aviation Researchers</h3>
            <p>Glasgow's universities and research institutions have long been centers for aviation research.
            From aerodynamics studies to materials science, local researchers continue to advance aviation technology.</p>
          </div>

          <div className="card">
            <h3>Modern Aviation Professionals</h3>
            <p>Today's Glasgow aviation community includes engineers, historians, and aviation professionals
            who preserve the city's rich aerospace heritage while contributing to contemporary aviation development.</p>
          </div>
        </div>

        <h2>Glasgow Aviation Landmarks</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-muted rounded-lg p-4 mb-3">
              <h4 className="font-semibold">Dalmuir Shipyards</h4>
              <p className="text-sm text-secondary">Home to Beardmore Aviation and historic aircraft production</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-muted rounded-lg p-4 mb-3">
              <h4 className="font-semibold">Renfrew Airport</h4>
              <p className="text-sm text-secondary">Former RAF Abbotsinch, now Glasgow International Airport</p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-muted rounded-lg p-4 mb-3">
              <h4 className="font-semibold">Glasgow Museums</h4>
              <p className="text-sm text-secondary">Preserving Glasgow's aviation artifacts and history</p>
            </div>
          </div>
        </div>

        <h2>Glasgow's Aviation Legacy</h2>

        <p>
          Glasgow's contribution to aviation extends far beyond its industrial output. The city has been
          a center for aviation innovation, research, and development for over a century. From the early
          experimental aircraft of Arrol-Johnston to the sophisticated aerospace engineering of today,
          Glasgow has consistently demonstrated its commitment to advancing aviation technology.
        </p>

        <p>
          The legacy of Glasgow aviation is preserved through historical research, museum collections,
          and educational programs. Organizations like the Glasgow Aviation Society and local museums
          continue to celebrate and document the city's remarkable aviation heritage.
        </p>

        <h2>Glasgow Aviation Research & Organizations</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3>Glasgow Aviation Society</h3>
            <p>Dedicated to preserving Glasgow's aviation heritage through research, publications, and community engagement.</p>
            <p className="text-sm text-secondary mt-2">📍 Glasgow, Scotland</p>
          </div>

          <div className="card">
            <h3>Scottish Aviation Historical Society</h3>
            <p>Comprehensive archive and research center for Scottish aviation history, from pioneers to modern aerospace.</p>
            <p className="text-sm text-secondary mt-2">📍 Edinburgh & Glasgow</p>
          </div>

          <div className="card">
            <h3>Kelvingrove Art Gallery & Museum</h3>
            <p>Houses significant aviation artifacts and hosts exhibitions on Glasgow's industrial and aviation heritage.</p>
            <p className="text-sm text-secondary mt-2">📍 Kelvingrove, Glasgow</p>
          </div>

          <div className="card">
            <h3>Museum of Transport</h3>
            <p>Features Glasgow's transport history including aviation exhibits and Beardmore aircraft displays.</p>
            <p className="text-sm text-secondary mt-2">📍 Glasgow</p>
          </div>
        </div>

        <h2>Educational Resources</h2>

        <p>
          Glasgow's universities and research institutions offer excellent resources for aviation studies:
        </p>

        <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
          <li><strong>University of Glasgow</strong> - Aerospace engineering and aviation history research programs</li>
          <li><strong>Strathclyde University</strong> - Centre for Aerospace Sciences and advanced aviation research</li>
          <li><strong>Glasgow Caledonian University</strong> - Aviation management and heritage studies</li>
          <li><strong>National Library of Scotland</strong> - Extensive aviation archives and historical collections</li>
        </ul>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 my-8">
          <h3 className="text-primary font-semibold mb-3">Learn More About Glasgow Aviation</h3>
          <p className="text-secondary mb-4">
            Discover the full story of Glasgow's aviation pioneers, aircraft manufacturers, and aerospace heritage.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/books/beardmore-aviation" className="badge badge-primary">
              Beardmore Aviation History
            </Link>
            <Link href="/books/clydeside-aviation-vol1" className="badge badge-primary">
              Clydeside Aviation Vol 1
            </Link>
            <Link href="/timeline" className="badge badge-primary">
              Full Aviation Timeline
            </Link>
            <Link href="/contact" className="badge badge-primary">
              Contact Aviation Historian
            </Link>
          </div>
        </div>

        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
          <h3 className="text-secondary font-semibold mb-3">Professional Aviation Research Services</h3>
          <p className="text-primary mb-4">
            Charles E. MacKay provides professional aviation research, historical consultancy, and academic collaboration services.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/research-guides" className="badge badge-secondary">
              Research Methodology
            </Link>
            <Link href="/aviation-bibliography" className="badge badge-secondary">
              Aviation Bibliography
            </Link>
            <Link href="/academic-resources" className="badge badge-secondary">
              Academic Resources
            </Link>
            <Link href="/contact" className="badge badge-secondary">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </BBCPageTemplate>
  )
}
