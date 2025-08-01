import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Book data for linking
const books = [
  {
    id: 'beardmore-aviation',
    title: 'Beardmore Aviation: The Story of a Scottish Industrial Giant\'s Aviation Activities',
    price: 12.76,
    cover: '/book-covers/beardmore-aviation.jpg'
  },
  {
    id: 'german-aircraft-great-war',
    title: 'German Aircraft in the Great War 1914-1918',
    price: 13.93,
    cover: '/book-covers/german-aircraft-great-war.jpg'
  },
  {
    id: 'british-aircraft-great-war',
    title: 'British Aircraft of the Great War: Fighters, Bombers, Seaplanes, Trainers, Flying Boats',
    price: 12.91,
    cover: '/book-covers/british-aircraft-great-war.jpg'
  },
  {
    id: 'captain-eric-brown',
    title: 'Captain Eric "Vinkle" Brown, Captain of the Clouds, Test Pilot a Biography',
    price: 6.98,
    cover: '/book-covers/captain-eric-brown.jpg'
  },
  {
    id: 'clydeside-aviation-vol1',
    title: 'Clydeside Aviation Volume One: The Great War',
    price: 16.08,
    cover: '/book-covers/clydeside-aviation-vol1.jpg'
  },
  {
    id: 'clydeside-aviation-vol2',
    title: 'Clydeside Aviation Volume Two: Between the Wars',
    price: 15.54,
    cover: '/book-covers/clydeside-aviation-vol2.jpg'
  },
  {
    id: 'aircraft-carrier-argus',
    title: 'Aircraft Carrier - Beardmore\'s HMS Argus - ex Conte Rosso',
    price: 12.91,
    cover: '/book-covers/aircraft-carrier-argus.jpg'
  },
  {
    id: 'adolf-rohrbach',
    title: 'Adolf Rohrbach\'s Metal Airplanes: Rohrbach Metall-Flugzeugbau GmbH',
    price: 12.86,
    cover: '/book-covers/adolf-rohrbach.jpg'
  },
  {
    id: 'sabres-from-north',
    title: 'Sabres from the North: F-86 Sabre in RAF, RCAF, Luftwaffe Service',
    price: 12.92,
    cover: '/book-covers/sabres-from-north.jpg'
  },
  {
    id: 'enemy-luftwaffe-1945',
    title: 'This Was the Enemy: The Luftwaffe 1945',
    price: 16.08,
    cover: '/book-covers/enemy-luftwaffe-1945.jpg'
  },
  {
    id: 'flying-for-kaiser',
    title: 'Flying for Kaiser Wilhelm 1914-1918: ACES, AEROPLANES & DEFEAT',
    price: 12.86,
    cover: '/book-covers/flying-for-kaiser.jpg'
  },
  {
    id: 'soaring-with-wings',
    title: 'Soaring with Wings: Percy Pilcher wants to Fly- Biography',
    price: 15.01,
    cover: '/book-covers/soaring-with-wings.jpg'
  },
  {
    id: 'mother-of-the-few',
    title: 'Mother of the Few-Lucy Lady Houston, Schneider Trophy Mount Everest Flight',
    price: 14.52,
    cover: '/book-covers/mother-of-the-few.jpg'
  },
  {
    id: 'dieter-dengler',
    title: 'Dieter Dengler, Skyraider 04 Down, the Man the Ship the Plane NEW',
    price: 12.39,
    cover: '/book-covers/dieter-dengler.jpg'
  },
  {
    id: 'sycamore-seeds',
    title: 'The Sycamore Seeds: The Early History of the Helicopter',
    price: 12.86,
    cover: '/book-covers/sycamore-seeds.jpg'
  },
  {
    id: 'modern-furniture',
    title: 'Modern Furniture Shavings for Breakfast: the Morris Furniture Company',
    price: 12.86,
    cover: '/book-covers/modern-furniture.jpg'
  },
  {
    id: 'birth-atomic-bomb',
    title: 'Birth of the Atomic Bomb-Statements from Churchill, TrumanPash etc. German Alsos',
    price: 12.86,
    cover: '/book-covers/birth-atomic-bomb.jpg'
  }
];

// Blog post to book mapping
const blogToBookMapping = {
  'beardmore-aviation-scottish-industrial-giant': ['beardmore-aviation', 'clydeside-aviation-vol1'],
  'german-aircraft-great-war-development': ['german-aircraft-great-war', 'flying-for-kaiser'],
  'british-aircraft-great-war-rfc-rnas': ['british-aircraft-great-war', 'clydeside-aviation-vol1'],
  'captain-eric-brown': ['captain-eric-brown'],
  'clydeside-aviation-revolution': ['clydeside-aviation-vol1', 'clydeside-aviation-vol2'],
  'hms-argus-first-aircraft-carrier': ['aircraft-carrier-argus', 'beardmore-aviation'],
  'hms-argus-first-aircraft-carrier-operations': ['aircraft-carrier-argus', 'beardmore-aviation'],
  'adolf-rohrbach-metal-aircraft-construction': ['adolf-rohrbach'],
  'adolf-rohrbach-metal-aircraft-revolution': ['adolf-rohrbach'],
  'sabres-from-north': ['sabres-from-north'],
  'f86-sabre-cold-war-fighter': ['sabres-from-north'],
  'enemy-luftwaffe-1945': ['enemy-luftwaffe-1945'],
  'luftwaffe-1945-final-year': ['enemy-luftwaffe-1945'],
  'flying-for-kaiser': ['flying-for-kaiser', 'german-aircraft-great-war'],
  'percy-pilcher-scotland-aviation-pioneer': ['soaring-with-wings'],
  'lucy-lady-houston-schneider-trophy': ['mother-of-the-few'],
  'test-pilot-biography-eric-brown': ['captain-eric-brown'],
  'sycamore-seeds-helicopter-evolution': ['sycamore-seeds'],
  'modern-furniture': ['modern-furniture'],
  'birth-atomic-bomb': ['birth-atomic-bomb'],
  'bristol-fighter-f2b-brisfit': ['british-aircraft-great-war'],
  'bristol-sycamore-helicopter-development': ['sycamore-seeds'],
  'british-nuclear-deterrent-v-force': ['enemy-luftwaffe-1945'],
  'de-havilland-chipmunk-wp808-turnhouse': ['captain-eric-brown'],
  'english-electric-lightning-development': ['enemy-luftwaffe-1945'],
  'jet-age-aviation-cold-war-development': ['sabres-from-north'],
  'korean-war-air-combat': ['sabres-from-north'],
  'helicopter-development-pioneers': ['sycamore-seeds'],
  'rotorcraft-military-applications': ['sycamore-seeds'],
  'schneider-trophy-racing-development': ['mother-of-the-few'],
  'sikorsky-vs300-helicopter-breakthrough': ['sycamore-seeds'],
  'sopwith-camel-wwi-fighter': ['british-aircraft-great-war'],
  'supermarine-spitfire-development-evolution': ['british-aircraft-great-war'],
  'supermarine-spitfire-development-history': ['british-aircraft-great-war'],
  'hawker-hurricane-fighter-development': ['british-aircraft-great-war'],
  'aviation-manufacturing-wartime-production': ['beardmore-aviation', 'clydeside-aviation-vol1'],
  'naval-aviation-history': ['aircraft-carrier-argus'],
  'me262-jet-fighter-revolution': ['enemy-luftwaffe-1945']
};

// Process all blog posts
const blogDir = path.join(__dirname, '../src/app/blog');
const blogFolders = fs.readdirSync(blogDir).filter(item => {
  const itemPath = path.join(blogDir, item);
  return fs.statSync(itemPath).isDirectory() && item !== 'layout';
});

console.log('Fixing blog posts with blogData instead of post...');

blogFolders.forEach(folder => {
  const pagePath = path.join(blogDir, folder, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    try {
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Check if this blog post still has blogData instead of post
      if (content.includes('const blogData = {') && !content.includes('const post = {')) {
        console.log(`Fixing: ${folder}`);
        
        // Extract data from blogData
        const titleMatch = content.match(/title:\s*[`'"]?([^`'"]+)[`'"]?/);
        const title = titleMatch ? titleMatch[1] : folder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        const excerptMatch = content.match(/excerpt:\s*[`'"]?([^`'"]+)[`'"]?/);
        const excerpt = excerptMatch ? excerptMatch[1] : 'Expert aviation history analysis with comprehensive research and historical context.';
        
        const contentMatch = content.match(/content:\s*`([\s\S]*?)`/);
        const contentData = contentMatch ? contentMatch[1] : '<p>Content coming soon...</p>';
        
        const readTimeMatch = content.match(/readTime:\s*['"`]?(\d+)/);
        const readTime = readTimeMatch ? readTimeMatch[1] : '12';
        
        const categoryMatch = content.match(/category:\s*['"`]?([^'"]+)['"`]?/);
        const category = categoryMatch ? categoryMatch[1] : 'Aviation History';
        
        const tagsMatch = content.match(/tags:\s*(\[[\s\S]*?\])/);
        const tags = tagsMatch ? JSON.parse(tagsMatch[1]) : [];
        
        // Get related books
        const relatedBookIds = blogToBookMapping[folder] || [];
        const relatedBooks = relatedBookIds.map(id => books.find(book => book.id === id)).filter(Boolean);
        
                 // Replace blogData with post
         const newPostData = `const post = {
   id: '${folder}',
   title: '${title}',
   subtitle: '${excerpt}',
   content: \`${contentData}\`,
   excerpt: '${excerpt}',
  author: {
    name: 'Charles E. MacKay',
    bio: 'Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development. With over 19 published books and more than 1,700 satisfied customers worldwide.',
    image: '/charles-mackay-aviation-historian.jpg',
    email: 'charlese1mackay@hotmail.com'
  },
  publishedDate: '2025-01-30T12:00:00.000Z',
  readingTime: ${readTime},
  featuredImage: {
    url: '/blog-images/${folder}.jpg',
    alt: '${title}',
    caption: '${title} - Expert analysis by Charles E. MacKay'
  },
  category: '${category}',
  tags: ${JSON.stringify(tags)},
  relatedBooks: ${JSON.stringify(relatedBooks.map(book => ({
    id: book.id,
    title: book.title,
    author: 'Charles E. MacKay',
    cover: book.cover,
    price: book.price
  })))},
  relatedPosts: []
}`;
        
        // Replace the blogData section
        content = content.replace(/const blogData = \{[\s\S]*?\};/, newPostData);
        
        // Remove old relatedBooks and relatedPosts variables
        content = content.replace(/const relatedBooks = \[[\s\S]*?\];\s*const relatedPosts: any\[\] = \[\];/g, '');
        
        // Write updated content
        fs.writeFileSync(pagePath, content);
        console.log(`✅ Fixed: ${folder}`);
      } else {
        console.log(`✅ Already correct: ${folder}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${folder}:`, error.message);
    }
  }
});

console.log('Blog post fixes complete!'); 