'use client';

import Link from 'next/link';

interface ContentClustersProps {
  currentPageId?: string;
  currentPageType?: 'book' | 'blog';
  category?: string;
}

export default function ContentClusters({ currentPageId, currentPageType, category }: ContentClustersProps) {
  // Define content clusters for topical authority
  const clusters = {
    'scottish-aviation': {
      title: 'Scottish Aviation Heritage',
      books: ['beardmore-aviation', 'clydeside-aviation-vol1', 'clydeside-aviation-vol2'],
      blogs: ['beardmore-aviation-scottish-industrial-giant', 'clydeside-aviation-revolution', 'scottish-aviation-between-the-wars', 'percy-pilcher-scotland-aviation-pioneer']
    },
    'wwi-aviation': {
      title: 'WWI Aviation History',
      books: ['british-aircraft-great-war', 'german-aircraft-great-war'],
      blogs: ['british-aircraft-great-war-rfc-rnas', 'german-aircraft-great-war-development', 'sopwith-camel-wwi-fighter', 'german-aces-organization-wwi']
    },
    'wwii-aviation': {
      title: 'WWII Aviation & Aircraft',
      books: ['enemy-luftwaffe-1945', 'sonic-to-standoff'],
      blogs: ['supermarine-spitfire-development-history', 'hawker-hurricane-fighter-development', 'luftwaffe-1945-final-year', 'me262-jet-fighter-revolution']
    },
    'naval-aviation': {
      title: 'Naval Aviation History',
      books: ['aircraft-carrier-argus'],
      blogs: ['hms-argus-first-aircraft-carrier', 'hms-argus-first-aircraft-carrier-operations', 'naval-aviation-history', 'beardmore-wbiii-naval-fighter']
    },
    'helicopter-development': {
      title: 'Helicopter Development',
      books: ['sycamore-seeds'],
      blogs: ['sycamore-seeds-helicopter-evolution', 'bristol-sycamore-helicopter-development', 'sikorsky-vs300-helicopter-breakthrough', 'helicopter-development-pioneers', 'autogyro-vs-helicopter']
    },
    'jet-age': {
      title: 'Jet Age & Cold War Aviation',
      books: ['sonic-to-standoff', 'sabres-from-north'],
      blogs: ['jet-age-aviation-cold-war-development', 'english-electric-lightning-development', 'f86-sabre-cold-war-fighter', 'korean-war-air-combat']
    },
    'aviation-biography': {
      title: 'Aviation Biographies & People',
      books: ['captain-eric-brown', 'soaring-with-wings', 'dieter-dengler'],
      blogs: ['test-pilot-biography-eric-brown', 'dieter-dengler-skyraider-escape', 'lucy-lady-houston-schneider-trophy']
    }
  };

  // Generate content cluster schema for SEO
  const generateClusterSchema = (clusterKey: string) => {
    const cluster = clusters[clusterKey as keyof typeof clusters];
    if (!cluster) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": cluster.title,
      "description": `Comprehensive resources on ${cluster.title.toLowerCase()} including expert books and detailed blog articles`,
      "itemListElement": [
        ...cluster.books.map((bookId, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Book",
            "name": `Aviation History Book: ${bookId.replace(/-/g, ' ')}`,
            "url": `https://charlesmackaybooks.com/books/${bookId}`,
            "author": {
              "@type": "Person",
              "name": "Charles E. MacKay"
            }
          }
        })),
        ...cluster.blogs.map((blogId, index) => ({
          "@type": "ListItem", 
          "position": cluster.books.length + index + 1,
          "item": {
            "@type": "Article",
            "name": `Aviation History Article: ${blogId.replace(/-/g, ' ')}`,
            "url": `https://charlesmackaybooks.com/blog/${blogId}`,
            "author": {
              "@type": "Person",
              "name": "Charles E. MacKay"
            }
          }
        }))
      ]
    };
  };

  // Determine relevant cluster based on current page
  const getRelevantCluster = () => {
    if (!currentPageId) return null;
    
    for (const [clusterKey, cluster] of Object.entries(clusters)) {
      if (cluster.books.includes(currentPageId) || cluster.blogs.includes(currentPageId)) {
        return clusterKey;
      }
    }
    
    // Fallback based on category
    if (category?.toLowerCase().includes('scottish')) return 'scottish-aviation';
    if (category?.toLowerCase().includes('wwi')) return 'wwi-aviation';
    if (category?.toLowerCase().includes('wwii')) return 'wwii-aviation';
    if (category?.toLowerCase().includes('naval')) return 'naval-aviation';
    if (category?.toLowerCase().includes('helicopter')) return 'helicopter-development';
    if (category?.toLowerCase().includes('jet')) return 'jet-age';
    if (category?.toLowerCase().includes('biography')) return 'aviation-biography';
    
    return null;
  };

  const relevantCluster = getRelevantCluster();
  const clusterData = relevantCluster ? clusters[relevantCluster as keyof typeof clusters] : null;
  const schema = relevantCluster ? generateClusterSchema(relevantCluster) : null;

  if (!clusterData) return null;

  return (
    <>
      {/* Content cluster schema for topical authority */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      )}
      
      {/* Visible content cluster links for internal linking */}
      <section className="mt-8 p-6 bg-slate-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-slate-900">
          📚 Related {clusterData.title} Resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Related Books */}
          {clusterData.books.length > 0 && (
            <div>
              <h4 className="font-medium text-slate-700 mb-2">📖 Expert Books:</h4>
              <ul className="space-y-1">
                {clusterData.books.filter(id => id !== currentPageId).slice(0, 3).map(bookId => (
                  <li key={bookId}>
                    <Link 
                      href={`/books/${bookId}`}
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      {bookId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Related Blog Posts */}
          {clusterData.blogs.length > 0 && (
            <div>
              <h4 className="font-medium text-slate-700 mb-2">📄 Research Articles:</h4>
              <ul className="space-y-1">
                {clusterData.blogs.filter(id => id !== currentPageId).slice(0, 3).map(blogId => (
                  <li key={blogId}>
                    <Link 
                      href={`/blog/${blogId}`}
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      {blogId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
