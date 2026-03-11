'use client'

import type { Book } from '@/types/book'

interface BundleCompletionCardProps {
  title: string
  badge?: string
  includedBooks: Book[]
  missingBooks: Book[]
  onAddMissing: () => void
  isAdding?: boolean
}

export default function BundleCompletionCard({
  title,
  badge,
  includedBooks,
  missingBooks,
  onAddMissing,
  isAdding = false,
}: BundleCompletionCardProps) {
  const missingTotal = missingBooks.reduce((sum, book) => sum + book.price, 0)

  return (
    <div className="rounded-lg border border-blue-700/50 bg-slate-800/80 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-blue-200">Complete the set</p>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-[11px] text-white/70 mt-1">
            You already have {includedBooks.length} of {includedBooks.length + missingBooks.length} titles in this set.
          </p>
        </div>
        {badge ? (
          <span className="rounded-full border border-blue-300/40 bg-blue-500/20 px-2.5 py-1 text-[11px] font-semibold text-blue-200">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-3 space-y-2">
        {missingBooks.map((book) => (
          <div key={book.id} className="flex items-center justify-between gap-2 rounded border border-white/10 bg-slate-900/60 p-2">
            <a href={`/books/${book.id}`} className="min-w-0 flex-1">
              <p className="text-xs text-white line-clamp-1">{book.title}</p>
              <p className="text-[11px] text-green-300">£{book.price.toFixed(2)}</p>
            </a>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-[11px] text-white/75">
          Add the remaining title{missingBooks.length > 1 ? 's' : ''} for £{missingTotal.toFixed(2)} and keep your multi-book discount moving.
        </p>
        <button
          type="button"
          onClick={onAddMissing}
          disabled={isAdding}
          className="shrink-0 rounded-lg border border-slate-900 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-gray-100 disabled:opacity-60"
        >
          {isAdding ? 'Adding…' : `Add ${missingBooks.length} book${missingBooks.length > 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  )
}
