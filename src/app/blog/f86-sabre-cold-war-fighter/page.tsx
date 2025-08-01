import type { Metadata } from 'next'
import OptimizedBlogTemplate from '@/components/OptimizedBlogTemplate'

export const metadata: Metadata = {
  title: `North American F-86 Sabre: Cold War Premier Fighter | Charles E. MacKay`,
  description: 'The complete story of the F-86 Sabre, America answer to the MiG-15 and the most successful fighter of the Korean War.',
  keywords: ["F-86 Sabre","Korean War","MiG-15","USAF","swept wing","jet fighter"],
  openGraph: {
    title: `North American F-86 Sabre: Cold War Premier Fighter`,
    description: 'The complete story of the F-86 Sabre, America answer to the MiG-15 and the most successful fighter of the Korean War.',
    url: 'https://charlesmackaybooks.com/blog/f86-sabre-cold-war-fighter',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/f86-sabre-cold-war-fighter.jpg',
        width: 1200,
        height: 630,
        alt: 'North American F-86 Sabre: Cold War Premier Fighter'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: `North American F-86 Sabre: Cold War Premier Fighter`,
    description: 'The complete story of the F-86 Sabre, America answer to the MiG-15 and the most successful fighter of the Korean War.',
    images: ['/blog-images/f86-sabre-cold-war-fighter.jpg'],
  },
}

const post = {
  id: 'f86-sabre-cold-war-fighter',
  title: 'North American F-86 Sabre: Cold War Premier Fighter',
  subtitle: 'The complete story of the F-86 Sabre, America answer to the MiG-15 and the most successful fighter of the Korean War.',
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
    `,
  excerpt: 'The complete story of the F-86 Sabre, America answer to the MiG-15 and the most successful fighter of the Korean War.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in military and civilian aircraft development with over 20 years of research experience.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charles@charlesmackaybooks.com'
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 12,
  featuredImage: {
    url: '/blog-images/f86-sabre-cold-war-fighter.jpg',
    alt: 'North American F-86 Sabre: Cold War Premier Fighter',
    caption: 'North American F-86 Sabre: Cold War Premier Fighter - Expert analysis by Charles E. MacKay'
  },
  category: 'Aviation History',
  tags: ["F-86 Sabre","Korean War","MiG-15","USAF","swept wing","jet fighter"],
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