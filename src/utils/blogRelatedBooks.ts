import { books } from '@/data/books';
import { getBooksData, type BookData } from '@/utils/bookUtils';

type RelatedBookInput = { id: string };

interface BlogContext {
  id?: string;
  title?: string;
  category?: string;
  tags?: string[];
}

const VALID_BOOK_IDS = new Set(books.map((book) => book.id));

const BLOG_TO_BOOKS: Record<string, string[]> = {
  'beardmore-aviation-scottish-industrial-giant': ['beardmore-aviation', 'clydeside-aviation-vol1', 'aircraft-carrier-argus'],
  'beardmore-wbiii-naval-fighter': ['beardmore-aviation', 'aircraft-carrier-argus', 'british-aircraft-great-war'],
  'british-aircraft-great-war-rfc-rnas': ['british-aircraft-great-war', 'german-aircraft-great-war', 'flying-for-kaiser'],
  'german-aircraft-great-war-development': ['german-aircraft-great-war', 'flying-for-kaiser', 'british-aircraft-great-war'],
  'german-aces-organization-wwi': ['flying-for-kaiser', 'german-aircraft-great-war'],
  'hms-argus-first-aircraft-carrier': ['aircraft-carrier-argus', 'beardmore-aviation'],
  'hms-argus-first-aircraft-carrier-operations': ['aircraft-carrier-argus', 'beardmore-aviation'],
  'jet-age-aviation-cold-war-development': ['sonic-to-standoff', 'sabres-from-north', 'enemy-luftwaffe-1945'],
  'f86-sabre-cold-war-fighter': ['sabres-from-north', 'sonic-to-standoff'],
  'korean-war-air-combat': ['sabres-from-north', 'sonic-to-standoff'],
  'luftwaffe-1945-final-year': ['enemy-luftwaffe-1945', 'this-was-the-enemy-volume-two', 'german-aircraft-great-war'],
  'me262-jet-fighter-revolution': ['enemy-luftwaffe-1945', 'this-was-the-enemy-volume-two'],
  'maud-alsos-atomic-program': ['birth-atomic-bomb', 'sonic-to-standoff'],
  'british-nuclear-deterrent-v-force': ['sonic-to-standoff', 'birth-atomic-bomb'],
  'avro-vulcan-bomber': ['sonic-to-standoff'],
  'sycamore-seeds-helicopter-evolution': ['sycamore-seeds'],
  'helicopter-development-pioneers': ['sycamore-seeds'],
  'bristol-sycamore-helicopter-development': ['sycamore-seeds'],
  'sikorsky-vs300-helicopter-breakthrough': ['sycamore-seeds'],
  'autogyro-vs-helicopter': ['sycamore-seeds'],
  'test-pilot-biography-eric-brown': ['captain-eric-brown', 'aircraft-carrier-argus'],
  'dieter-dengler-skyraider-escape': ['dieter-dengler', 'sabres-from-north'],
  'percy-pilcher-scotland-aviation-pioneer': ['soaring-with-wings', 'clydeside-aviation-vol1'],
  'lucy-lady-houston-schneider-trophy': ['mother-of-the-few', 'soaring-with-wings'],
  'schneider-trophy-racing-development': ['mother-of-the-few', 'soaring-with-wings'],
  'dorothy-wordsworth-scottish-tour-1803': ['dorothy-wordsworth'],
  'morris-furniture-war-work-aviation': ['modern-furniture', 'sycamore-seeds'],
  'adolf-rohrbach-metal-aircraft-revolution': ['adolf-rohrbach', 'beardmore-aviation', 'german-aircraft-great-war'],
  'adolf-rohrbach-metal-aircraft-construction': ['adolf-rohrbach', 'beardmore-aviation', 'german-aircraft-great-war'],
  'clydeside-aviation-revolution': ['clydeside-aviation-vol1', 'clydeside-aviation-vol2', 'beardmore-aviation'],
};

const DEFAULT_FALLBACK = ['beardmore-aviation', 'british-aircraft-great-war', 'sonic-to-standoff'];

function pushUniqueValid(target: string[], bookId: string): void {
  if (!VALID_BOOK_IDS.has(bookId)) return;
  if (target.includes(bookId)) return;
  target.push(bookId);
}

function inferFromSignals(context: BlogContext): string[] {
  const output: string[] = [];
  const haystack = `${context.id || ''} ${context.title || ''} ${context.category || ''} ${(context.tags || []).join(' ')}`.toLowerCase();

  if (haystack.includes('wwi') || haystack.includes('great war')) {
    pushUniqueValid(output, 'british-aircraft-great-war');
    pushUniqueValid(output, 'german-aircraft-great-war');
    pushUniqueValid(output, 'flying-for-kaiser');
  }
  if (haystack.includes('wwii') || haystack.includes('luftwaffe') || haystack.includes('world war ii')) {
    pushUniqueValid(output, 'enemy-luftwaffe-1945');
    pushUniqueValid(output, 'this-was-the-enemy-volume-two');
  }
  if (haystack.includes('jet') || haystack.includes('cold war') || haystack.includes('supersonic') || haystack.includes('v-force')) {
    pushUniqueValid(output, 'sonic-to-standoff');
    pushUniqueValid(output, 'sabres-from-north');
  }
  if (haystack.includes('helicopter') || haystack.includes('rotor') || haystack.includes('autogyro')) {
    pushUniqueValid(output, 'sycamore-seeds');
  }
  if (haystack.includes('naval') || haystack.includes('carrier') || haystack.includes('argus')) {
    pushUniqueValid(output, 'aircraft-carrier-argus');
  }
  if (haystack.includes('scottish') || haystack.includes('clydeside') || haystack.includes('beardmore') || haystack.includes('glasgow')) {
    pushUniqueValid(output, 'beardmore-aviation');
    pushUniqueValid(output, 'clydeside-aviation-vol1');
    pushUniqueValid(output, 'clydeside-aviation-vol2');
  }
  if (haystack.includes('biograph') || haystack.includes('pilot')) {
    pushUniqueValid(output, 'captain-eric-brown');
    pushUniqueValid(output, 'soaring-with-wings');
  }
  if (haystack.includes('nuclear') || haystack.includes('atomic') || haystack.includes('alsos')) {
    pushUniqueValid(output, 'birth-atomic-bomb');
    pushUniqueValid(output, 'sonic-to-standoff');
  }
  if (haystack.includes('travel') || haystack.includes('wordsworth')) {
    pushUniqueValid(output, 'dorothy-wordsworth');
  }
  if (haystack.includes('industrial') || haystack.includes('manufacturing') || haystack.includes('furniture')) {
    pushUniqueValid(output, 'modern-furniture');
    pushUniqueValid(output, 'beardmore-aviation');
  }
  if (haystack.includes('rohrbach') || haystack.includes('metal aircraft')) {
    pushUniqueValid(output, 'adolf-rohrbach');
  }

  return output;
}

export function resolveRelatedBooks(
  context: BlogContext,
  explicitBooks: RelatedBookInput[] = [],
  minCount = 2,
  maxCount = 4
): BookData[] {
  const picked: string[] = [];

  explicitBooks.forEach((book) => {
    if (book?.id) pushUniqueValid(picked, book.id);
  });

  const slugSpecific = context.id ? BLOG_TO_BOOKS[context.id] || [] : [];
  slugSpecific.forEach((bookId) => pushUniqueValid(picked, bookId));

  if (picked.length < minCount) {
    inferFromSignals(context).forEach((bookId) => pushUniqueValid(picked, bookId));
  }

  if (picked.length < minCount) {
    DEFAULT_FALLBACK.forEach((bookId) => pushUniqueValid(picked, bookId));
  }

  return getBooksData(picked.slice(0, Math.max(minCount, maxCount)));
}

