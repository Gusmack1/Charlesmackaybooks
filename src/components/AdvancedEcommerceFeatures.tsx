'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Heart, Eye, Star, AlertCircle, CheckCircle } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  price: number;
  stock: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  title: string;
  imageUrl: string;
}

interface AdvancedEcommerceFeaturesProps {
  book: Book;
  onAddToCart: (book: Book, quantity: number) => void;
  onAddToWishlist: (book: Book) => void;
  onViewBook: (book: Book) => void;
}

export default function AdvancedEcommerceFeatures({
  book,
  onAddToCart,
  onAddToWishlist,
  onViewBook
}: AdvancedEcommerceFeaturesProps) {
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showStockAlert, setShowStockAlert] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Book[]>([]);

  // Stock management
  const isLowStock = book.stock <= 5 && book.stock > 0;
  const isOutOfStock = book.stock === 0;

  // Personalization: Track recently viewed
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    const updated = [book, ...viewed.filter((b: Book) => b.id !== book.id)].slice(0, 5);
    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  }, [book]);

  // Ajax cart update
  const handleAddToCart = useCallback(async () => {
    if (isOutOfStock) return;
    
    try {
      // Simulate Ajax request
      await new Promise(resolve => setTimeout(resolve, 500));
      onAddToCart(book, quantity);
      setIsInCart(true);
      
      // Show success feedback
      setTimeout(() => setIsInCart(false), 2000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  }, [book, quantity, onAddToCart, isOutOfStock]);

  // Wishlist management
  const handleWishlistToggle = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsInWishlist(!isInWishlist);
      onAddToWishlist(book);
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  }, [book, isInWishlist, onAddToWishlist]);

  // Price alerts
  const [priceAlert, setPriceAlert] = useState(false);
  const handlePriceAlert = useCallback(() => {
    setPriceAlert(true);
    // In real implementation, this would subscribe to price change notifications
  }, []);

  return (
    <div className="space-y-6">
      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        {isOutOfStock ? (
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Out of Stock</span>
          </div>
        ) : isLowStock ? (
          <div className="flex items-center text-orange-600">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Only {book.stock} left in stock</span>
          </div>
        ) : (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">In Stock</span>
          </div>
        )}
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-secondary">
          {book.rating.toFixed(1)} ({book.reviewCount} reviews)
        </span>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium">Quantity:</label>
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 border-r hover:bg-gray-50"
            disabled={isOutOfStock}
          >
            -
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
            className="px-3 py-1 border-l hover:bg-gray-50"
            disabled={isOutOfStock || quantity >= book.stock}
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'badge badge-blue'
          }`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isInCart ? 'Added to Cart!' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <div className="flex space-x-3">
          <button
            onClick={handleWishlistToggle}
            className={`flex-1 flex items-center justify-center px-4 py-2 border rounded-md transition-colors ${
              isInWishlist
                ? 'border-red-300 bg-red-50 text-red-600'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Heart className={`w-4 h-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
            {isInWishlist ? 'Saved' : 'Wishlist'}
          </button>

          <button
            onClick={() => onViewBook(book)}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:border-gray-400"
          >
            <Eye className="w-4 h-4 mr-2" />
            Quick View
          </button>
        </div>
      </div>

      {/* Price Alert */}
      <div className="border-t pt-4">
        <button
          onClick={handlePriceAlert}
          className="text-sm text-blue-600 hover:text-blue-700 underline"
        >
          Set price alert
        </button>
        {priceAlert && (
          <div className="mt-2 text-sm text-green-600">
            ✓ Price alert set! We'll notify you when the price changes.
          </div>
        )}
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 1 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Recently Viewed</h4>
          <div className="flex space-x-3 overflow-x-auto">
            {recentlyViewed.slice(1, 4).map((viewedBook) => (
              <div
                key={viewedBook.id}
                className="flex-shrink-0 w-16 h-20 bg-gray-100 rounded-md cursor-pointer hover:opacity-80"
                onClick={() => onViewBook(viewedBook)}
              >
                <img
                  src={viewedBook.imageUrl}
                  alt={viewedBook.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 