import { books } from '@/data/books'
import type { Book } from '@/types/book'

interface CrossSellOptions {
  cartBooks: Book[]
  recentlyViewed: Book[]
  limit?: number
}

function addUniqueBook(
  suggestions: Book[],
  seenIds: Set<string>,
  cartIds: Set<string>,
  book: Book | undefined
) {
  if (!book || !book.inStock || seenIds.has(book.id) || cartIds.has(book.id)) {
    return
  }

  seenIds.add(book.id)
  suggestions.push(book)
}

export function getCrossSellSuggestions({
  cartBooks,
  recentlyViewed,
  limit = 3,
}: CrossSellOptions): Book[] {
  const cartIds = new Set(cartBooks.map((book) => book.id))
  const seenIds = new Set<string>()
  const suggestions: Book[] = []

  for (const book of recentlyViewed) {
    addUniqueBook(suggestions, seenIds, cartIds, book)
    if (suggestions.length >= limit) return suggestions
  }

  for (const cartBook of cartBooks) {
    for (const relatedId of cartBook.relatedBookIds || []) {
      const relatedBook = books.find((book) => book.id === relatedId)
      addUniqueBook(suggestions, seenIds, cartIds, relatedBook)
      if (suggestions.length >= limit) return suggestions
    }
  }

  const cartCategories = new Set(cartBooks.map((book) => book.category))
  for (const book of books) {
    if (!cartCategories.has(book.category)) continue
    addUniqueBook(suggestions, seenIds, cartIds, book)
    if (suggestions.length >= limit) return suggestions
  }

  for (const book of books) {
    addUniqueBook(suggestions, seenIds, cartIds, book)
    if (suggestions.length >= limit) return suggestions
  }

  return suggestions
}
