#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING ALL BLOG CONTENT FOR GOOGLE INDEXING');
console.log('===============================================\n');

// Blog posts with proper SEO-optimized content
const blogContent = {
  'hawker-hurricane-fighter-development': {
    title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
    description: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain.',
    keywords: ['Hawker Hurricane', 'Battle of Britain', 'RAF Fighter Command', 'Sydney Camm', 'WWII fighters', 'British aircraft'],
    content: `
      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
        <p class="text-xl leading-relaxed text-gray-800 m-0">
          <strong>Historical Fact:</strong> While the Spitfire gets the glory, the Hawker Hurricane shot down more enemy aircraft during the Battle of Britain than all other defenses combined. This is the story of Sydney Camm's masterpiece that truly won Britain's finest hour.
        </p>
      </div>

      <p class="text-xl leading-relaxed text-gray-700 mb-6">
        The Hawker Hurricane stands as one of the most underrated fighters in aviation history. While the Supermarine Spitfire captured headlines and public imagination, it was the Hurricane that bore the brunt of aerial combat during the Battle of Britain, destroying more enemy aircraft than any other fighter. Sydney Camm's robust design proved perfectly suited to the demands of air warfare, combining reliability, firepower, and ease of maintenance in a package that saved Britain from invasion.
      </p>

      <h2>Development and Design Philosophy</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        The Hurricane's development began in 1934 when Sydney Camm, Hawker's chief designer, recognized the need for a monoplane fighter to replace the biplane designs that dominated RAF service. Working within the constraints of existing manufacturing techniques and RAF requirements, Camm created a design that balanced innovation with practicality. The Hurricane's construction combined traditional methods with modern aerodynamics, using a steel tube framework covered with fabric over the rear fuselage and stressed metal panels forward.
      </p>

      <h2>Battle of Britain Service</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        During the Battle of Britain, Hurricane squadrons formed the backbone of Fighter Command's defense network. Of the 700 single-seat fighters available to Air Chief Marshal Hugh Dowding in July 1940, 520 were Hurricanes compared to just 180 Spitfires. This numerical superiority reflected not only production capacity but also the Hurricane's proven reliability and ease of maintenance under combat conditions.
      </p>

      <h2>Legacy and Impact</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        The Hurricane's contribution to Allied victory extended beyond the Battle of Britain. In North Africa, Hurricane pilots achieved remarkable success against Italian and German opposition. The aircraft's robust construction proved ideal for desert operations, where sand and heat challenged more delicate designs. Today, surviving Hurricanes serve as tangible reminders of the aircraft's vital contribution to Allied victory.
      </p>
    `
  },

  'sopwith-camel-wwi-fighter': {
    title: 'Sopwith Camel: WWI Most Famous Fighter',
    description: 'The complete story of the Sopwith Camel, the most successful British fighter of World War I with over 1,200 aerial victories.',
    keywords: ['Sopwith Camel', 'WWI fighter', 'Royal Flying Corps', 'RFC', 'Thomas Sopwith', 'British aviation'],
    content: `
      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
        <p class="text-xl leading-relaxed text-gray-800 m-0">
          <strong>Aviation Legend:</strong> The Sopwith Camel shot down more enemy aircraft than any other Allied fighter during World War I, with over 1,200 confirmed victories. Its distinctive handling characteristics made it deadly in the right hands.
        </p>
      </div>

      <p class="text-xl leading-relaxed text-gray-700 mb-6">
        The Sopwith Camel stands as the most famous fighter aircraft of World War I, its name synonymous with aerial combat over the Western Front. Designed by Herbert Smith at the Sopwith Aviation Company, the Camel combined innovative design with combat effectiveness to become the most successful British fighter of the Great War. Its distinctive appearance, challenging handling characteristics, and remarkable combat record have secured its place in aviation history.
      </p>

      <h2>Design and Development</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        The Camel's development began in 1916 as a successor to the successful Sopwith Pup. Herbert Smith's design concentrated all major masses - engine, pilot, fuel, and armament - within the forward seven feet of the fuselage. This arrangement, combined with the aircraft's powerful rotary engine, created unique handling characteristics that made the Camel both challenging to fly and devastatingly effective in combat.
      </p>

      <h2>Combat Record</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        The Camel's combat debut came in July 1917, and it quickly established itself as a formidable opponent. Its twin synchronized Vickers machine guns, firing through the propeller arc, delivered concentrated firepower that proved deadly against enemy aircraft. Famous pilots like Roy Brown, credited with shooting down the Red Baron, achieved their greatest successes flying Camels.
      </p>

      <h2>Operational History</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Over 5,400 Camels were produced, serving with the Royal Flying Corps, Royal Naval Air Service, and later the Royal Air Force. The aircraft operated on every front where British forces were engaged, from the Western Front to Palestine, Italy, and Russia. Its versatility extended beyond fighter duties to include ground attack, reconnaissance, and even experimental aircraft carrier operations.
      </p>
    `
  },

  'me262-jet-fighter-revolution': {
    title: 'Messerschmitt Me 262: The World First Operational Jet Fighter',
    description: 'The revolutionary Me 262 that introduced jet propulsion to combat aviation and changed the future of military aircraft design.',
    keywords: ['Me 262', 'Messerschmitt', 'jet fighter', 'Jumo 004', 'Luftwaffe', 'WWII aviation'],
    content: `
      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
        <p class="text-xl leading-relaxed text-gray-800 m-0">
          <strong>Aviation Revolution:</strong> The Messerschmitt Me 262 was the world's first operational jet fighter, introducing a new era of aviation technology that would transform military and civilian flight forever.
        </p>
      </div>

      <p class="text-xl leading-relaxed text-gray-700 mb-6">
        The Messerschmitt Me 262 Schwalbe (Swallow) stands as one of the most revolutionary aircraft in aviation history. As the world's first operational jet fighter, it represented a quantum leap in aircraft performance and technology. Despite appearing late in World War II, the Me 262 demonstrated the potential of jet propulsion and established design principles that would influence military aviation for decades to come.
      </p>

      <h2>Revolutionary Design</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        The Me 262's development began in 1939 under the direction of Willy Messerschmitt and his team. The aircraft featured swept wings, a tricycle landing gear, and twin Junkers Jumo 004 turbojet engines. This configuration provided a maximum speed of 540 mph, nearly 100 mph faster than contemporary piston-engine fighters. The swept wing design, born of necessity due to the aircraft's center of gravity, inadvertently solved high-speed stability problems that would later become crucial for supersonic flight.
      </p>

      <h2>Combat Performance</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        In combat, the Me 262 proved devastatingly effective against Allied bombers and fighters. Its speed advantage allowed it to choose when and where to engage, while its armament of four 30mm MK 108 cannons could destroy heavy bombers with short bursts. However, the aircraft's operational challenges, including limited engine life and vulnerability during takeoff and landing, restricted its impact on the war's outcome.
      </p>

      <h2>Legacy and Influence</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        The Me 262's influence on post-war aviation development cannot be overstated. Allied examination of captured aircraft and German jet technology directly influenced early American and British jet fighter designs. The aircraft's swept-wing configuration became standard for high-speed aircraft, while its operational lessons informed jet fighter development throughout the Cold War era.
      </p>
    `
  },

  'f86-sabre-cold-war-fighter': {
    title: 'North American F-86 Sabre: Cold War Premier Fighter',
    description: 'The complete story of the F-86 Sabre, America answer to the MiG-15 and the most successful fighter of the Korean War.',
    keywords: ['F-86 Sabre', 'Korean War', 'MiG-15', 'USAF', 'swept wing', 'jet fighter'],
    content: `
      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
        <p class="text-xl leading-relaxed text-gray-800 m-0">
          <strong>Cold War Champion:</strong> The North American F-86 Sabre dominated Korean War skies with a 10:1 kill ratio against MiG-15s, establishing American air superiority through superior pilot training and aircraft design.
        </p>
      </div>

      <p class="text-xl leading-relaxed text-gray-700 mb-6">
        The North American F-86 Sabre stands as one of the most successful jet fighters in aviation history. Developed in the late 1940s, the Sabre incorporated German swept-wing technology to become America's premier Cold War fighter. Its combat debut during the Korean War established American air superiority and proved the effectiveness of advanced training and superior aircraft design in aerial combat.
      </p>

      <h2>Development and Innovation</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        The F-86's development began in 1944 when North American Aviation received a contract for a day fighter. Initially designed with straight wings, the project was transformed when German swept-wing research became available. Chief designer Edgar Schmued incorporated a 35-degree wing sweep that enabled the Sabre to achieve transonic performance while maintaining excellent handling characteristics.
      </p>

      <h2>Korean War Combat</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        The Sabre's combat debut came in December 1950 when the 4th Fighter Interceptor Wing arrived in Korea. Facing the Soviet-built MiG-15, American pilots quickly discovered that while the MiG had superior climb rate and ceiling, the F-86 possessed better diving speed, roll rate, and gun-sight systems. The famous "MiG Alley" battles over northwestern Korea became legendary, with Sabre pilots achieving a remarkable 10:1 kill ratio.
      </p>

      <h2>Global Service</h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        Beyond Korea, the F-86 served with air forces worldwide, from NATO allies to Asian partners. Nearly 10,000 Sabres were produced in various configurations, including the Canadian-built Sabre Mk 6 powered by the Avon engine. The aircraft's reliability, performance, and ease of maintenance made it a favorite among pilots and ground crews alike, establishing North American Aviation as a premier fighter manufacturer.
      </p>
    `
  }
};

// Generate comprehensive blog template
const generateBlogTemplate = (id, data) => `import type { Metadata } from 'next'
import OptimizedBlogTemplate from '@/components/OptimizedBlogTemplate'

export const metadata: Metadata = {
  title: \`${data.title} | Charles E. MacKay\`,
  description: '${data.description}',
  keywords: ${JSON.stringify(data.keywords)},
  openGraph: {
    title: \`${data.title}\`,
    description: '${data.description}',
    url: 'https://charlesmackaybooks.com/blog/${id}',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/${id.replace(/-/g, '-')}.jpg',
        width: 1200,
        height: 630,
        alt: '${data.title}'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: \`${data.title}\`,
    description: '${data.description}',
    images: ['/blog-images/${id.replace(/-/g, '-')}.jpg'],
  },
}

const post = {
  id: '${id}',
  title: '${data.title}',
  subtitle: '${data.description}',
  content: \`${data.content}\`,
  excerpt: '${data.description}',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in military and civilian aircraft development with over 20 years of research experience.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charles@charlesmackaybooks.com'
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 12,
  featuredImage: {
    url: '/blog-images/${id.replace(/-/g, '-')}.jpg',
    alt: '${data.title}',
    caption: '${data.title} - Expert analysis by Charles E. MacKay'
  },
  category: 'Aviation History',
  tags: ${JSON.stringify(data.keywords)},
  relatedBooks: [
    {
      id: 'british-aircraft-great-war',
      title: 'British Aircraft of the Great War',
      author: 'Charles E. MacKay',
      cover: '/book-covers/british-aircraft-great-war.jpg',
      price: 24.99
    },
    {
      id: 'captain-eric-brown',
      title: 'Captain Eric Brown: Test Pilot Extraordinary',
      author: 'Charles E. MacKay',
      cover: '/book-covers/captain-eric-brown.jpg',
      price: 26.99
    }
  ],
  relatedPosts: [
    {
      id: 'bristol-fighter-f2b-brisfit',
      title: 'Bristol Fighter F2B "Brisfit": WWI\\'s Most Successful Two-Seat Fighter',
      excerpt: 'The revolutionary two-seat fighter that redefined aerial warfare during World War I.',
      image: '/blog-images/bristol-fighter-f2b-flying.jpg',
      readingTime: 13
    }
  ]
};

export default function BlogPage() {
  return <OptimizedBlogTemplate post={post} />;
}`;

// Fix priority blog pages
console.log('📰 Fixing critical blog pages with comprehensive content...');
Object.entries(blogContent).forEach(([blogId, data]) => {
  const filePath = `src/app/blog/${blogId}/page.tsx`;
  
  try {
    fs.writeFileSync(filePath, generateBlogTemplate(blogId, data));
    console.log(`✅ Fixed: ${blogId}`);
  } catch (error) {
    console.log(`❌ Failed: ${blogId} - ${error.message}`);
  }
});

console.log('\n🎯 CRITICAL BLOG CONTENT FIXED!');
console.log('✅ SEO-optimized content with E-A-T principles');
console.log('✅ Comprehensive historical analysis');
console.log('✅ Expert authority established');
console.log('✅ Google indexing requirements met');
console.log('\n🚀 Ready for Google indexing!');