'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Book } from '@/types/book'
import { useCart } from '@/context/CartContext'

interface BundleOffersProps {
  primary: Book
  related: Book[]
}

export default function BundleOffers({ primary, related }: BundleOffersProps) {
  const { addToCart, openBasket } = useCart()

  const topRelated = related
    .filter(b => b.id !== primary.id && b.category === primary.category)
    .slice(0, 2)

  if (topRelated.length === 0) return null

  const handleAddBundle = () => {
    addToCart(primary)
    topRelated.forEach(b => addToCart(b))
    openBasket()
  }

  const bundlePrice = [primary, ...topRelated].reduce((s, b) => s + b.price, 0)
  const discounted = Math.round((bundlePrice * 0.9) * 100) / 100 // 10% bundle

  return (
    <div className="card">
      <h3 className="content h3 mb-3">Bundle & Save (10%)</h3>
      <div className="grid md:grid-cols-3 gap-4 items-start">
        {[primary, ...topRelated].map((b) => (
          <Link key={b.id} href={`/books/${b.id}`} className="card-compact hover:shadow">
            <div className="relative aspect-[3/4] rounded overflow-hidden">
              <Image src={b.imageUrl || `/book-covers/${b.id}.jpg`} alt={`${b.title} cover`} fill className="object-cover"/>
            </div>
            <div className="mt-2 text-sm">
              <div className="font-semibold text-primary line-clamp-2">{b.title}</div>
              <div className="text-secondary">£{b.price.toFixed(2)}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-secondary">Bundle Price</div>
        <div className="text-lg font-bold">£{discounted.toFixed(2)} <span className="text-muted line-through ml-2 text-sm">£{bundlePrice.toFixed(2)}</span></div>
      </div>
      <button onClick={handleAddBundle} className="mt-3 badge badge-green w-full text-center py-3 rounded-lg font-semibold">Add Bundle to Basket</button>
    </div>
  )
}


