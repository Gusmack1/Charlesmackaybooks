import type { Metadata } from 'next'
import OptimizedBlogTemplate from '@/components/OptimizedBlogTemplate'

export const metadata: Metadata = {
  title: `Sopwith Camel: WWI Most Famous Fighter | Charles E. MacKay`,
  description: 'The complete story of the Sopwith Camel, the most successful British fighter of World War I with over 1,200 aerial victories.',
  keywords: ["Sopwith Camel","WWI fighter","Royal Flying Corps","RFC","Thomas Sopwith","British aviation"],
  openGraph: {
    title: `Sopwith Camel: WWI Most Famous Fighter`,
    description: 'The complete story of the Sopwith Camel, the most successful British fighter of World War I with over 1,200 aerial victories.',
    url: 'https://charlesmackaybooks.com/blog/sopwith-camel-wwi-fighter',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/sopwith-camel-wwi-fighter.jpg',
        width: 1200,
        height: 630,
        alt: 'Sopwith Camel: WWI Most Famous Fighter'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Sopwith Camel: WWI Most Famous Fighter`,
    description: 'The complete story of the Sopwith Camel, the most successful British fighter of World War I with over 1,200 aerial victories.',
    images: ['/blog-images/sopwith-camel-wwi-fighter.jpg'],
  },
}

const post = {
  id: 'sopwith-camel-wwi-fighter',
  title: 'Sopwith Camel: WWI Most Famous Fighter',
  subtitle: 'The complete story of the Sopwith Camel, the most successful British fighter of World War I with over 1,200 aerial victories.',
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
    `,
  excerpt: 'The complete story of the Sopwith Camel, the most successful British fighter of World War I with over 1,200 aerial victories.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in military and civilian aircraft development with over 20 years of research experience.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charles@charlesmackaybooks.com'
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 12,
  featuredImage: {
    url: '/blog-images/sopwith-camel-wwi-fighter.jpg',
    alt: 'Sopwith Camel: WWI Most Famous Fighter',
    caption: 'Sopwith Camel: WWI Most Famous Fighter - Expert analysis by Charles E. MacKay'
  },
  category: 'Aviation History',
  tags: ["Sopwith Camel","WWI fighter","Royal Flying Corps","RFC","Thomas Sopwith","British aviation"],
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
      title: 'Bristol Fighter F2B "Brisfit": WWI\'s Most Successful Two-Seat Fighter',
      excerpt: 'The revolutionary two-seat fighter that redefined aerial warfare during World War I.',
      image: '/blog-images/bristol-fighter-f2b-flying.jpg',
      readingTime: 13
    }
  ]
};

export default function BlogPage() {
  return <OptimizedBlogTemplate post={post} />;
}