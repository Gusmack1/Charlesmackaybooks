'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { Book } from '@/types/book'

interface BookCardProps {
  book: Book
  sourceContext?: string
}

export default function BookCard({ book, sourceContext }: BookCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const handleAddToBasket = () => {
    if (isAdding) return;
    setIsAdding(true);
    addToCart(book);
    // On listing grids, avoid auto-opening the basket (it interrupts browsing).
    setTimeout(() => setIsAdding(false), 650);
  };

  const handleBuyNow = () => {
    if (isBuyingNow) return;
    setIsBuyingNow(true);
    addToCart(book);
    router.push('/checkout?method=stripe');
  };

  return (
    <div className="w-full bg-slate-800 border border-blue-700/40 rounded-lg shadow-md overflow-hidden hover:border-blue-400/60 transition-all duration-300">
      {/* Book Cover - Now Clickable */}
      <div className="aspect-[3/4] relative bg-gray-100">
        <Link href={`/books/${book.id}`} className="block w-full h-full">
          <Image
            src={book.imageUrl || `/book-covers/${book.id}.jpg`}
            alt={book.title}
            fill
            className="object-cover hover:opacity-90 transition-opacity"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEB//EACUQAAIBAwMEAwEBAAAAAAAAAAECAwAEEQUSITFBURNhcZEigf/EABUBAFEAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A4+iiigAooooAKKKKACiiigD/2Q=="
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {['beardmore-aviation', 'clydeside-aviation-vol1', 'british-aircraft-great-war', 'german-aircraft-great-war', 'aircraft-carrier-argus'].includes(book.id) && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500 text-slate-900">Bestseller</span>
          )}
          <span className={`px-2 py-1 text-xs font-semibold rounded ${
            book.condition === 'New' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
          }`}>
            {book.condition}
          </span>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2 hover:text-blue-300">
          <Link href={`/books/${book.id}`}>
            {book.title}
          </Link>
        </h3>

        <p className="text-sm text-white/75 mb-2">{book.category}</p>

        {/* Key Details */}
        <div className="text-xs text-white/60 space-y-1 mb-3">
          {book.pageCount && <div>{book.pageCount} pages</div>}
          {book.isbn && <div>ISBN: {book.isbn}</div>}
          {book.publicationYear && <div>{book.publicationYear}</div>}
          {book.weight && <div>{book.weight}g</div>}
        </div>

        {/* Price and Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-white">
              £{book.price.toFixed(2)}
            </div>
            <div className="text-xs">
              {book.inStock ? (
                <span className="text-green-300 font-semibold">In stock</span>
              ) : (
                <span className="text-red-300 font-semibold">Out of stock</span>
              )}
            </div>
          </div>
          {book.inStock && (
            <p className="text-[11px] text-green-200 -mt-2">
              Dispatches quickly from the UK with tracked shipping.
            </p>
          )}
          <p className="text-[11px] text-blue-200 -mt-1">
            Save 5% on 2 books or 10% on 3+ at checkout.
          </p>

          <button
            onClick={handleBuyNow}
            disabled={!book.inStock || isBuyingNow}
            className="w-full bg-white text-slate-900 py-2.5 px-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors border border-slate-900 disabled:opacity-60"
          >
            {isBuyingNow ? 'Opening checkout...' : 'Buy now (guest checkout)'}
          </button>

          <button
            onClick={handleAddToBasket}
            disabled={!book.inStock || isAdding}
            className="w-full bg-slate-700 text-white px-3 py-2.5 rounded text-sm hover:bg-slate-600 transition-colors border border-white/20 disabled:opacity-60"
          >
            {isAdding ? 'Adding...' : 'Add to basket'}
          </button>

          <p className="text-[11px] text-white/60 text-center">
            Guest checkout · Free worldwide shipping · 30-day returns
          </p>
        </div>
      </div>
    </div>
  )
}