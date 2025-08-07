'use client'

import Link from 'next/link'
import Image from 'next/image'
import { books } from '@/data/books'

interface PostRelatedBooksProps {
  category: string
  tags: string[]
}

function scoreBookMatch(title: string, category: string, tags: string[]) {
  const t = title.toLowerCase()
  let score = 0
  if (category && t.includes(category.toLowerCase().split(' ')[0])) score += 2
  for (const tag of tags) {
    if (!tag) continue
    const k = tag.toLowerCase().split(/[\s\-]/)[0]
    if (t.includes(k)) score += 1
  }
  return score
}

export default function PostRelatedBooks({ category, tags }: PostRelatedBooksProps) {
  const ranked = books
    .map(b => ({ book: b, s: scoreBookMatch(b.title, category, tags) + (b.category === category ? 2 : 0) }))
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)

  if (ranked.length === 0) return null

  return (
    <div className="card mt-8">
      <h3 className="content h3 mb-4">Related Books</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ranked.map(({ book }) => (
          <Link key={book.id} href={`/books/${book.id}`} className="group block">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Image src={book.imageUrl || `/book-covers/${book.id}.jpg`} alt={`${book.title} cover`} fill className="object-cover group-hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="mt-2 text-sm">
              <div className="font-semibold text-primary line-clamp-2 group-hover:text-accent-blue">{book.title}</div>
              <div className="text-secondary">£{book.price.toFixed(2)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


