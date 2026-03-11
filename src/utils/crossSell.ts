import { books } from '@/data/books'
import type { Book } from '@/types/book'

interface CrossSellOptions {
  cartBooks: Book[]
  recentlyViewed: Book[]
  limit?: number
}

export interface CrossSellSuggestion {
  book: Book
  reason: string
  sourceBookTitle?: string
}

function shortenTitle(title: string, maxLength = 42) {
  if (title.length <= maxLength) return title
  return `${title.slice(0, maxLength - 1).trim()}…`
}

function addUniqueBook(
  suggestions: CrossSellSuggestion[],
  seenIds: Set<string>,
  cartIds: Set<string>,
  book: Book | undefined,
  reason: string,
  sourceBookTitle?: string
) {
  if (!book || !book.inStock || seenIds.has(book.id) || cartIds.has(book.id)) {
    return
  }

  seenIds.add(book.id)
  suggestions.push({
    book,
    reason,
    sourceBookTitle,
  })
}

export function getCrossSellSuggestions({
  cartBooks,
  recentlyViewed,
  limit = 3,
}: CrossSellOptions): CrossSellSuggestion[] {
  const cartIds = new Set(cartBooks.map((book) => book.id))
  const seenIds = new Set<string>()
  const suggestions: CrossSellSuggestion[] = []

  for (const cartBook of cartBooks) {
    for (const relatedId of cartBook.relatedBookIds || []) {
      const relatedBook = books.find((book) => book.id === relatedId)
      addUniqueBook(
        suggestions,
        seenIds,
        cartIds,
        relatedBook,
        `Pairs well with ${shortenTitle(cartBook.title)}`,
        cartBook.title
      )
      if (suggestions.length >= limit) return suggestions
    }
  }

  for (const book of recentlyViewed) {
    addUniqueBook(suggestions, seenIds, cartIds, book, 'Recently viewed')
    if (suggestions.length >= limit) return suggestions
  }

  const cartCategories = new Set(cartBooks.map((book) => book.category))
  for (const book of books) {
    if (!cartCategories.has(book.category)) continue
    addUniqueBook(suggestions, seenIds, cartIds, book, `More in ${book.category}`)
    if (suggestions.length >= limit) return suggestions
  }

  for (const book of books) {
    addUniqueBook(suggestions, seenIds, cartIds, book, 'Popular with aviation readers')
    if (suggestions.length >= limit) return suggestions
  }

  return suggestions
}
