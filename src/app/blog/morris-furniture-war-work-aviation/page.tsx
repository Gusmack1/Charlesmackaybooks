import type { Metadata } from 'next'
import ComprehensiveBlogTemplate from '@/components/ComprehensiveBlogTemplate'
import { getBooksData } from '@/utils/bookUtils'
import UnifiedSchema from '@/components/UnifiedSchema'

const post = {
  id: 'morris-furniture-war-work-aviation',
  title: 'From Liners to Lancaster Parts: Morris Furniture’s War Work and Aviation Supply Chains',
  subtitle: 'How a Glasgow interiors firm tooled up for war: Lee–Enfield rifle stocks, Upkeep/Highball components, rotor blades for Cierva/Weir, and aeronautical models for research.',
  content: `
    <h2 id="overview">Overview</h2>
    <p>
      Wartime innovation often hides in plain sight: in the machine shops and pattern rooms of firms whose peacetime products seem far removed from aeronautics. The Morris Furniture Company of Glasgow—renowned for luxury liners like the Queen Mary and premier hotels—retooled to supply exacting military work: Lee–Enfield rifle furniture for mass production, precision wooden components for Barnes Wallis’s <em>Upkeep/Highball</em> systems, rotor blades for Weir/Cierva autogyros, and large-scale aerodynamic models used in research and production planning.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Glasgow factory woodworking and wartime precision components" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Industrial Glasgow: joinery and precision work pivoted to military production under tight tolerances.</p>
    </div>

    <h2 id="linings">Luxury Craft to Tolerance Culture</h2>
    <p>
      Pre-war, Morris’s interiors demanded fine surface finishes, repeatable joinery, and efficient workflows—competencies transferable to wartime tolerances. Skilled timber selection, moisture conditioning, jigging, and process supervision underpinned the transition from interiors to armament and aeronautical parts. Pattern-making teams adapted quickly to technical drawings, gauge checks, and acceptance criteria, embedding a “tolerance culture” across the shop floor.
    </p>

    <h2 id="enfield">Lee–Enfield Rifle Furniture</h2>
    <p>
      Nearly a million Lee–Enfield stocks and furniture sets flowed through wartime Glasgow. Output demanded kiln schedules for dimensional stability, fixtures for repeatability, and high-throughput finishing. Lessons in statistical inspection and gauge maintenance fed forward into later aeronautical contracts, where blade tracking and model fidelity depended upon the same measurement discipline.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Fixtures, gauges, and pattern work to scale for repeatability" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">From cabinetry to combat: gauges and fixtures ensured repeatable furniture and aeronautical parts.</p>
    </div>

    <h2 id="upkeep">Upkeep/Highball Components and Aeronautical Models</h2>
    <p>
      Precision wood components for <em>Upkeep/Highball</em> demanded tight concentricity, balanced assemblies, and reliable adhesives under environmental stress. Parallel lines produced large-scale aerodynamic models for proof-of-concept, tooling studies, and factory training—accelerating ramp-up and compressing error loops before metal cutting.
    </p>
    <p>
      Model work linked draughting rooms and shop floors: scaled airfoils, fuselage sections, and jig mock‑ups enabled fixture optimisation and workforce training. Templates and gauges migrated from model shops to production bays, shortening learning curves.
    </p>

    <h2 id="rotor">Weir/Cierva Rotorcraft Work</h2>
    <p>
      Rotor blades for Weir and Cierva bridged furniture craft and flight loads: spar straightness, twist consistency, and surface finish were controlled via lamination schedules, pressure fixtures, and end-weight checks. The workmanship culture—grain matching, adhesive quality, and inspection—aligned with rotorcraft needs and fed into post-war industrial capability.
    </p>

    <div class="my-8">
      <img src="/blog-images/default-generic.svg" alt="Rotor blade layup, balance, and tracking—representative process" class="w-full h-auto rounded-lg shadow-lg"/>
      <p class="text-sm mt-2 text-center italic">Rotorcraft lessons: tracking, balance, and spar integrity demanded measurement discipline.</p>
    </div>

    <h2 id="supply">Supply Chains and Clyde Integration</h2>
    <p>
      Glasgow’s war economy meshed shipyards, engine makers, and precision shops. Morris cooperated with heavy industries for raw materials and with research centres for model validation. Knowledge exchange—jigs, adhesives, inspection routines—moved laterally across local firms, raising the Clyde’s effective capability for complex aeronautical work.
    </p>

    <h2 id="legacy">Legacy</h2>
    <p>
      The company’s wartime pivot shows how furniture craft underwrote aviation. Repeatable, measurable, and inspectable workflows became Glasgow’s comparative advantage. Post-war, these competencies flowed back into commercial interiors and into Scotland’s broader engineering base.
    </p>

    <h2 id="sources">Sources</h2>
    <ul>
      <li>Morris factory records; Glasgow industrial archives.</li>
      <li>Ministry of Aircraft Production circulars on subcontractor inspection.</li>
      <li>Weir/Cierva rotorcraft documentation and museum notes.</li>
    </ul>
    <p>
      Note: Specific quantities and contract identifiers vary across years and sites. Where possible, corroborate with factory ledgers and MAP circulars to trace lot numbers and inspection stamps.
    </p>
  `,
  excerpt: 'How Morris Furniture pivoted to war work: rifle furniture, Upkeep/Highball parts, rotor blades, and aerodynamic models for aviation.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian and editor of primary-source aviation histories.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com'
  },
  publishedDate: new Date().toISOString(),
  readingTime: 26,
  featuredImage: {
    url: '/blog-images/default-generic.svg',
    alt: 'Glasgow wartime industrial work for aviation',
    caption: 'Precision woodcraft meets aviation production on the Clyde.'
  },
  category: 'Industrial History',
  tags: ['Glasgow industry', 'Morris Furniture', 'Upkeep', 'Highball', 'Weir', 'Cierva', 'charles mackay books'],
  relatedBooks: getBooksData(['modern-furniture']),
  relatedPosts: []
}

export const metadata: Metadata = {
  title: 'Morris Furniture War Work & Aviation | Charles E. MacKay',
  description: 'How Morris Furniture pivoted to wartime aviation: rifle furniture, Upkeep/Highball components, rotor blades, and aerodynamic models.',
  keywords: 'Morris Furniture, Glasgow industry, Upkeep, Highball, Cierva rotor blades, aviation supply chain, charles mackay books',
  openGraph: {
    title: 'From Liners to Lancaster Parts: Morris Furniture’s War Work',
    description: 'Glasgow’s precision woodcraft retooled for aviation and armaments.',
    images: ['/blog-images/default-generic.svg'],
    type: 'article'
  }
}

export default function BlogPost() {
  return (
    <>
      <UnifiedSchema
        pageType="blog-post"
        pageTitle={post.title}
        pageDescription={post.excerpt}
        pageUrl="/blog/morris-furniture-war-work-aviation"
      />
      <ComprehensiveBlogTemplate post={post} />
    </>
  )
}


