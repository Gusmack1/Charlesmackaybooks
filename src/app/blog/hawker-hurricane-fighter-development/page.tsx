import type { Metadata } from 'next'
import OptimizedBlogTemplate from '@/components/OptimizedBlogTemplate'

export const metadata: Metadata = {
  title: `Hawker Hurricane: The Forgotten Hero of the Battle of Britain | Charles E. MacKay`,
  description: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain.',
  keywords: ["Hawker Hurricane","Battle of Britain","RAF Fighter Command","Sydney Camm","WWII fighters","British aircraft"],
  openGraph: {
    title: `Hawker Hurricane: The Forgotten Hero of the Battle of Britain`,
    description: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain.',
    url: 'https://charlesmackaybooks.com/blog/hawker-hurricane-fighter-development',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/hawker-hurricane-fighter-development.jpg',
        width: 1200,
        height: 630,
        alt: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Hawker Hurricane: The Forgotten Hero of the Battle of Britain`,
    description: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain.',
    images: ['/blog-images/hawker-hurricane-fighter-development.jpg'],
  },
}

const post = {
  id: 'hawker-hurricane-fighter-development',
  title: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
  subtitle: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain.',
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
    `,
  excerpt: 'The comprehensive story of the Hawker Hurricane - the workhorse fighter that shot down more enemy aircraft than any other during the Battle of Britain.',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in military and civilian aircraft development with over 20 years of research experience.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charles@charlesmackaybooks.com'
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: 12,
  featuredImage: {
    url: '/blog-images/hawker-hurricane-fighter-development.jpg',
    alt: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain',
    caption: 'Hawker Hurricane: The Forgotten Hero of the Battle of Britain - Expert analysis by Charles E. MacKay'
  },
  category: 'Aviation History',
  tags: ["Hawker Hurricane","Battle of Britain","RAF Fighter Command","Sydney Camm","WWII fighters","British aircraft"],
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