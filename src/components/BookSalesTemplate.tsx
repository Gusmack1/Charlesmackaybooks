import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, ShoppingCartIcon, HeartIcon, ShareIcon, CheckIcon, ShieldCheckIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface BookSalesTemplateProps {
  book: {
    id: string;
    title: string;
    subtitle?: string;
    author: string;
    isbn: string;
    publicationDate: string;
    pageCount: number;
    dimensions: string;
    coverImage: string;
    price: {
      hardcover?: number;
      paperback?: number;
      ebook?: number;
      audiobook?: number;
    };
    description: string;
    plotSummary: string;
    authorBio: string;
    editorialReviews: string[];
    readerTestimonials: Array<{
      name: string;
      rating: number;
      review: string;
      date: string;
    }>;
    sampleContent: string;
    series?: {
      name: string;
      books: Array<{
        id: string;
        title: string;
        coverImage: string;
      }>;
    };
    ratings: {
      average: number;
      count: number;
    };
    badges: string[];
    stockCount?: number;
    limitedOffer?: {
      text: string;
      endDate: string;
    };
  };
  relatedBooks: Array<{
    id: string;
    title: string;
    author: string;
    coverImage: string;
    price: number;
  }>;
  relatedBlogPosts: Array<{
    id: string;
    title: string;
    excerpt: string;
    image: string;
    url: string;
  }>;
  schemaData: any;
}

const BookSalesTemplate: React.FC<BookSalesTemplateProps> = ({
  book,
  relatedBooks,
  relatedBlogPosts,
  schemaData
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'hardcover' | 'paperback' | 'ebook' | 'audiobook'>('hardcover');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSampleContent, setShowSampleContent] = useState(false);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);

  // Sticky bar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsStickyBarVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPrice = book.price[selectedFormat];
  const isInStock = !book.stockCount || book.stockCount > 0;
  const isLimitedStock = book.stockCount && book.stockCount < 10;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log(`Added ${quantity} ${selectedFormat} of ${book.title} to cart`);
  };

  const handleBuyNow = () => {
    // TODO: Implement direct purchase
    console.log(`Buying ${quantity} ${selectedFormat} of ${book.title} now`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist functionality
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out ${book.title} by ${book.author}`,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Book Cover */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} by ${book.author}`}
                    width={400}
                    height={600}
                    className="rounded-lg shadow-2xl"
                    priority
                  />
                  {book.badges.includes('bestseller') && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      BESTSELLER
                    </div>
                  )}
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {book.title}
                  </h1>
                  {book.subtitle && (
                    <p className="text-xl text-gray-600 mb-4">{book.subtitle}</p>
                  )}
                  <p className="text-lg text-gray-700">by {book.author}</p>
                </div>

                {/* Ratings */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(book.ratings.average)}
                    <span className="ml-2 text-sm text-gray-600">
                      {book.ratings.average.toFixed(1)} ({book.ratings.count} reviews)
                    </span>
                  </div>
                </div>

                {/* Price and Format Selection */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Format
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(book.price).map(([format, price]) => (
                          <button
                            key={format}
                            onClick={() => setSelectedFormat(format as any)}
                            className={`p-3 rounded-lg border-2 text-left transition-colors ${
                              selectedFormat === format
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium capitalize">{format}</div>
                            <div className="text-lg font-bold text-blue-600">
                              ${price?.toFixed(2)}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="text-lg font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Stock Status */}
                    {isLimitedStock && (
                      <div className="flex items-center space-x-2 text-orange-600">
                        <ClockIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Only {book.stockCount} left in stock
                        </span>
                      </div>
                    )}

                    {/* Limited Offer */}
                    {book.limitedOffer && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 text-red-700">
                          <ClockIcon className="w-5 h-5" />
                          <span className="font-medium">{book.limitedOffer.text}</span>
                        </div>
                        <p className="text-sm text-red-600 mt-1">
                          Ends {new Date(book.limitedOffer.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={handleBuyNow}
                        disabled={!isInStock}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        {isInStock ? 'Buy Now' : 'Out of Stock'}
                      </button>
                      <button
                        onClick={handleAddToCart}
                        disabled={!isInStock}
                        className="w-full border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trust Elements */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TruckIcon className="w-4 h-4" />
                      <span>Free Shipping</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckIcon className="w-4 h-4" />
                    <span>30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Buy Bar */}
        {isStickyBarVisible && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={40}
                    height={60}
                    className="rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{book.title}</h3>
                    <p className="text-sm text-gray-600">by {book.author}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-blue-600">
                    ${currentPrice?.toFixed(2)}
                  </span>
                  <button
                    onClick={handleBuyNow}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Information */}
        <section className="bg-white mt-8">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Book</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{book.description}</p>
                  </div>
                </div>

                {/* Plot Summary */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Plot Summary</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{book.plotSummary}</p>
                  </div>
                </div>

                {/* Sample Content */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Look Inside</h2>
                  <div className="border border-gray-200 rounded-lg p-6">
                    {showSampleContent ? (
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">{book.sampleContent}</p>
                        <button
                          onClick={() => setShowSampleContent(false)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Show Less
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 leading-relaxed">
                          {book.sampleContent.substring(0, 300)}...
                        </p>
                        <button
                          onClick={() => setShowSampleContent(true)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Read More
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Editorial Reviews */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Editorial Reviews</h2>
                  <div className="space-y-4">
                    {book.editorialReviews.map((review, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <p className="text-gray-700 italic">"{review}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reader Testimonials */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Reader Reviews</h2>
                  <div className="space-y-6">
                    {book.readerTestimonials.map((testimonial, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          {renderStars(testimonial.rating)}
                          <span className="text-sm text-gray-600">
                            {testimonial.rating}/5
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">"{testimonial.review}"</p>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span className="font-medium">{testimonial.name}</span>
                          <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Book Details */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-600">ISBN</dt>
                      <dd className="text-sm text-gray-900">{book.isbn}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Publication Date</dt>
                      <dd className="text-sm text-gray-900">
                        {new Date(book.publicationDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Pages</dt>
                      <dd className="text-sm text-gray-900">{book.pageCount}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Dimensions</dt>
                      <dd className="text-sm text-gray-900">{book.dimensions}</dd>
                    </div>
                  </dl>
                </div>

                {/* Author Bio */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Author</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{book.authorBio}</p>
                </div>

                {/* Series Information */}
                {book.series && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {book.series.name} Series
                    </h3>
                    <div className="space-y-3">
                      {book.series.books.map((seriesBook) => (
                        <Link
                          key={seriesBook.id}
                          href={`/books/${seriesBook.id}`}
                          className="flex items-center space-x-3 hover:bg-white rounded-lg p-2 transition-colors"
                        >
                          <Image
                            src={seriesBook.coverImage}
                            alt={seriesBook.title}
                            width={40}
                            height={60}
                            className="rounded"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {seriesBook.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleWishlist}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg border transition-colors ${
                      isWishlisted
                        ? 'border-red-500 text-red-600 bg-red-50'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <HeartIcon className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors"
                  >
                    <ShareIcon className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Books */}
        <section className="bg-gray-50 mt-8">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Books by {book.author}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <Link
                  key={relatedBook.id}
                  href={`/books/${relatedBook.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={relatedBook.coverImage}
                    alt={relatedBook.title}
                    width={200}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {relatedBook.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{relatedBook.author}</p>
                    <p className="font-bold text-blue-600">${relatedBook.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Blog Posts */}
        <section className="bg-white mt-8">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={post.url}
                  className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookSalesTemplate; 