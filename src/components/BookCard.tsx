import Link from 'next/link'
import Image from 'next/image'

interface BookCardProps {
  book: {
    id: string
    title: string
    price: number
    category: string
    condition: string
    inStock: boolean
    imageUrl?: string
    isbn?: string
    pageCount?: number
    publicationYear?: number
    weight?: number
  }
  sourceContext?: string
}

export default function BookCard({ book, sourceContext }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Book Cover */}
      <div className="aspect-[3/4] relative bg-gray-100">
        <Image
          src={book.imageUrl || `/book-covers/${book.id}.jpg`}
          alt={book.title}
          fill
          className="object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEB//EACUQAAIBAwMEAwEBAAAAAAAAAAECAwAEEQUSITFBURNhcZEigf/EABUBAFEAAAAAAAAAAAAAAAAAAAH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A4+iiigAooooAKKKKACiiigD/2Q=="
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${
            book.condition === 'New' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
          }`}>
            {book.condition}
          </span>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600">
          <Link href={`/books/${book.id}`}>
            {book.title}
          </Link>
        </h3>

        <p className="text-sm text-gray-600 mb-2">{book.category}</p>

        {/* Key Details */}
        <div className="text-xs text-gray-500 space-y-1 mb-3">
          {book.pageCount && <div>{book.pageCount} pages</div>}
          {book.isbn && <div>ISBN: {book.isbn}</div>}
          {book.publicationYear && <div>{book.publicationYear}</div>}
          {book.weight && <div>{book.weight}g</div>}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-green-600">
            £{book.price}
          </div>
          <div className="flex gap-2">
            <Link
              href={`/books/${book.id}`}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              View Details
            </Link>
            <a
              href="#"
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
            >
              Buy Now
            </a>
          </div>
        </div>

        {/* Stock Status */}
        <div className="mt-2 text-xs">
          {book.inStock ? (
            <span className="text-green-600">✓ In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  )
}