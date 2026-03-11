import { books } from '@/data/books'
import type { Book } from '@/types/book'

export interface BundleConfig {
  id: string
  title: string
  description: string
  badge?: string
  bookIds: string[]
}

export interface ResolvedBundle extends BundleConfig {
  books: Book[]
}

export interface BundleCompletionOffer {
  bundle: ResolvedBundle
  includedBooks: Book[]
  missingBooks: Book[]
}

export const bundleConfigs: BundleConfig[] = [
  {
    id: 'clydeside-duo',
    title: 'Clydeside Aviation Duo',
    description: 'Volume One + Volume Two together for readers building a complete Clydeside reference set.',
    badge: 'Best value',
    bookIds: ['clydeside-aviation-vol1', 'clydeside-aviation-vol2'],
  },
  {
    id: 'great-war-comparison',
    title: 'Great War Air Power Set',
    description: 'Compare both sides of WWI aviation with British and German aircraft development volumes.',
    badge: 'Popular',
    bookIds: ['british-aircraft-great-war', 'german-aircraft-great-war'],
  },
  {
    id: 'enemy-two-volume',
    title: 'This Was The Enemy Collection',
    description: 'Pair both volumes for complete late-war Luftwaffe coverage and production context.',
    badge: 'Research set',
    bookIds: ['enemy-luftwaffe-1945', 'this-was-the-enemy-volume-two'],
  },
]

export function getResolvedBundles(): ResolvedBundle[] {
  const bookMap = new Map(books.map((book) => [book.id, book]))

  return bundleConfigs
    .map((bundle) => {
      const resolvedBooks = bundle.bookIds
        .map((bookId) => bookMap.get(bookId))
        .filter((book): book is Book => Boolean(book))

      return {
        ...bundle,
        books: resolvedBooks,
      }
    })
    .filter((bundle) => bundle.books.length === bundle.bookIds.length)
}

export function getBundleForBook(bookId: string): ResolvedBundle | null {
  return getResolvedBundles().find((bundle) => bundle.bookIds.includes(bookId)) || null
}

export function getBundleCompletionOffer(cartBooks: Book[]): BundleCompletionOffer | null {
  if (!cartBooks.length) return null

  const cartIds = new Set(cartBooks.map((book) => book.id))

  const candidates = getResolvedBundles()
    .map((bundle) => {
      const includedBooks = bundle.books.filter((book) => cartIds.has(book.id))
      const missingBooks = bundle.books.filter((book) => !cartIds.has(book.id) && book.inStock)
      return {
        bundle,
        includedBooks,
        missingBooks,
      }
    })
    .filter((candidate) => candidate.includedBooks.length > 0 && candidate.missingBooks.length > 0)
    .sort((left, right) => {
      if (right.includedBooks.length !== left.includedBooks.length) {
        return right.includedBooks.length - left.includedBooks.length
      }
      return left.missingBooks.length - right.missingBooks.length
    })

  return candidates[0] || null
}
