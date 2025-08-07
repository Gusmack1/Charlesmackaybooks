'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Book } from '@/types/book'

interface SamplePagesProps {
  book: Book
}

export default function SamplePages({ book }: SamplePagesProps) {
  const [open, setOpen] = useState(false)
  const samples: string[] = (book as any).sampleImages ||
    Array.from({ length: 6 }).map((_, i) => `/book-samples/${book.id}-${i + 1}.jpg`)

  return (
    <div className="card-compact">
      <h3 className="content h3 mb-3">Inside the Book</h3>
      <div className="grid grid-cols-3 gap-2">
        {samples.slice(0, 6).map((src, idx) => (
          <button key={idx} onClick={() => setOpen(true)} className="relative aspect-[3/4] rounded overflow-hidden">
            <Image src={src} alt={`${book.title} sample page ${idx + 1}`} fill className="object-cover"/>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="max-w-4xl w-full bg-white rounded-lg p-4">
            <div className="grid md:grid-cols-2 gap-3">
              {samples.slice(0, 8).map((src, idx) => (
                <div key={idx} className="relative aspect-[3/4] rounded overflow-hidden">
                  <Image src={src} alt={`${book.title} sample page ${idx + 1}`} fill className="object-cover"/>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <button className="badge badge-blue" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


