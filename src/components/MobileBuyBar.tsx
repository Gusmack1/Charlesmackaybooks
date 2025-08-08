'use client'

import React from 'react'
import BookOrderClient from '@/components/BookOrderClient'
import { Book } from '@/types/book'

interface MobileBuyBarProps {
  book: Book
}

export default function MobileBuyBar({ book }: MobileBuyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-background border-t pb-safe">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-secondary">Price</div>
          <div className="text-xl font-bold text-primary">£{book.price.toFixed(2)}</div>
        </div>
        <div className="flex items-center gap-2">
          <BookOrderClient
            book={book}
            className="badge badge-green px-6 py-3 rounded-xl font-semibold text-base min-h-[44px]"
          >
            🛒 Add
          </BookOrderClient>
          <a
            href="https://www.ebay.co.uk/usr/chaza87"
            target="_blank"
            rel="noopener noreferrer"
            className="badge badge-amber text-black px-6 py-3 rounded-xl font-semibold text-base min-h-[44px]"
          >
            eBay
          </a>
        </div>
      </div>
    </div>
  )
}


