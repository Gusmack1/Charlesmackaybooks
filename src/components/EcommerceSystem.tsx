import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { ShoppingCartIcon, HeartIcon, EyeIcon, BellIcon, UserIcon } from '@heroicons/react/24/outline';

// Types and Interfaces
interface CartItem {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  format: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  quantity: number;
  addedAt: Date;
}

interface WishlistItem {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  addedAt: Date;
}

interface RecentlyViewed {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  viewedAt: Date;
}

interface UserPreferences {
  genres: string[];
  authors: string[];
  formats: ('hardcover' | 'paperback' | 'ebook' | 'audiobook')[];
  priceRange: {
    min: number;
    max: number;
  };
}

interface InventoryItem {
  id: string;
  stockCount: number;
  estimatedDelivery: string;
  isPreOrder: boolean;
  preOrderDate?: string;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// Context for E-commerce State
interface EcommerceContextType {
  // Cart functionality
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'addedAt'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  
  // Wishlist functionality
  wishlist: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  
  // Recently viewed
  recentlyViewed: RecentlyViewed[];
  addToRecentlyViewed: (item: Omit<RecentlyViewed, 'viewedAt'>) => void;
  
  // User preferences
  userPreferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  
  // Inventory
  inventory: Record<string, InventoryItem>;
  checkStock: (id: string) => InventoryItem | null;
  
  // Orders
  orders: Order[];
  createOrder: (items: CartItem[]) => Promise<Order>;
  getOrderStatus: (orderId: string) => Order | null;
  
  // Analytics
  trackEvent: (event: string, data: any) => void;
  trackConversion: (order: Order) => void;
  
  // Price alerts
  priceAlerts: string[];
  addPriceAlert: (bookId: string, targetPrice: number) => void;
  removePriceAlert: (bookId: string) => void;
}

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

// Hook to use e-commerce context
export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
};

// E-commerce Provider Component
interface EcommerceProviderProps {
  children: React.ReactNode;
}

export const EcommerceProvider: React.FC<EcommerceProviderProps> = ({ children }) => {
  // State management
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    genres: [],
    authors: [],
    formats: ['hardcover', 'paperback'],
    priceRange: { min: 0, max: 100 }
  });
  const [inventory, setInventory] = useState<Record<string, InventoryItem>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<string[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('charles-mackay-cart');
    const savedWishlist = localStorage.getItem('charles-mackay-wishlist');
    const savedRecentlyViewed = localStorage.getItem('charles-mackay-recently-viewed');
    const savedPreferences = localStorage.getItem('charles-mackay-preferences');
    const savedPriceAlerts = localStorage.getItem('charles-mackay-price-alerts');

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }

    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlist(parsedWishlist.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        })));
      } catch (error) {
        console.error('Error parsing saved wishlist:', error);
      }
    }

    if (savedRecentlyViewed) {
      try {
        const parsedRecentlyViewed = JSON.parse(savedRecentlyViewed);
        setRecentlyViewed(parsedRecentlyViewed.map((item: any) => ({
          ...item,
          viewedAt: new Date(item.viewedAt)
        })));
      } catch (error) {
        console.error('Error parsing saved recently viewed:', error);
      }
    }

    if (savedPreferences) {
      try {
        setUserPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error parsing saved preferences:', error);
      }
    }

    if (savedPriceAlerts) {
      try {
        setPriceAlerts(JSON.parse(savedPriceAlerts));
      } catch (error) {
        console.error('Error parsing saved price alerts:', error);
      }
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('charles-mackay-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('charles-mackay-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('charles-mackay-recently-viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('charles-mackay-preferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  useEffect(() => {
    localStorage.setItem('charles-mackay-price-alerts', JSON.stringify(priceAlerts));
  }, [priceAlerts]);

  // Cart functionality
  const addToCart = useCallback((item: Omit<CartItem, 'addedAt'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        cartItem.id === item.id && cartItem.format === item.format
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && cartItem.format === item.format
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, addedAt: new Date() }];
      }
    });

    // Track analytics
    trackEvent('add_to_cart', {
      book_id: item.id,
      format: item.format,
      quantity: item.quantity,
      price: item.price
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    
    trackEvent('remove_from_cart', { book_id: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    trackEvent('update_cart_quantity', { book_id: id, quantity });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    trackEvent('clear_cart', {});
  }, []);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist functionality
  const addToWishlist = useCallback((item: Omit<WishlistItem, 'addedAt'>) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(wishlistItem => wishlistItem.id === item.id);
      if (!exists) {
        return [...prevWishlist, { ...item, addedAt: new Date() }];
      }
      return prevWishlist;
    });

    trackEvent('add_to_wishlist', { book_id: item.id });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== id));
    trackEvent('remove_from_wishlist', { book_id: id });
  }, []);

  const isInWishlist = useCallback((id: string) => {
    return wishlist.some(item => item.id === id);
  }, [wishlist]);

  // Recently viewed functionality
  const addToRecentlyViewed = useCallback((item: Omit<RecentlyViewed, 'viewedAt'>) => {
    setRecentlyViewed(prevRecentlyViewed => {
      const filtered = prevRecentlyViewed.filter(recentItem => recentItem.id !== item.id);
      const newRecentlyViewed = [{ ...item, viewedAt: new Date() }, ...filtered];
      return newRecentlyViewed.slice(0, 10); // Keep only last 10 items
    });
  }, []);

  // User preferences
  const updatePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...newPreferences }));
    trackEvent('update_preferences', newPreferences);
  }, []);

  // Inventory management
  const checkStock = useCallback((id: string) => {
    return inventory[id] || null;
  }, [inventory]);

  // Order management
  const createOrder = useCallback(async (items: CartItem[]): Promise<Order> => {
    const order: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    };

    setOrders(prev => [...prev, order]);
    setCart([]); // Clear cart after order

    // Track conversion
    trackConversion(order);

    // Simulate order processing
    setTimeout(() => {
      setOrders(prev =>
        prev.map(o =>
          o.id === order.id ? { ...o, status: 'processing' } : o
        )
      );
    }, 2000);

    return order;
  }, []);

  const getOrderStatus = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId) || null;
  }, [orders]);

  // Analytics
  const trackEvent = useCallback((event: string, data: any) => {
    // Send to analytics service (Google Analytics, etc.)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, data);
    }
    
    // Also log to console for development
    console.log('Analytics Event:', event, data);
  }, []);

  const trackConversion = useCallback((order: Order) => {
    trackEvent('purchase', {
      transaction_id: order.id,
      value: order.total,
      currency: 'USD',
      items: order.items.map(item => ({
        item_id: item.id,
        item_name: item.title,
        price: item.price,
        quantity: item.quantity
      }))
    });
  }, [trackEvent]);

  // Price alerts
  const addPriceAlert = useCallback((bookId: string, targetPrice: number) => {
    setPriceAlerts(prev => [...prev, bookId]);
    trackEvent('add_price_alert', { book_id: bookId, target_price: targetPrice });
  }, [trackEvent]);

  const removePriceAlert = useCallback((bookId: string) => {
    setPriceAlerts(prev => prev.filter(id => id !== bookId));
    trackEvent('remove_price_alert', { book_id: bookId });
  }, [trackEvent]);

  const contextValue: EcommerceContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    recentlyViewed,
    addToRecentlyViewed,
    userPreferences,
    updatePreferences,
    inventory,
    checkStock,
    orders,
    createOrder,
    getOrderStatus,
    trackEvent,
    trackConversion,
    priceAlerts,
    addPriceAlert,
    removePriceAlert
  };

  return (
    <EcommerceContext.Provider value={contextValue}>
      {children}
    </EcommerceContext.Provider>
  );
};

// Shopping Cart Component
export const ShoppingCart: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount
  } = useEcommerce();

  const [isOpen, setIsOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ShoppingCartIcon className="w-6 h-6" />
          <span className="sr-only">Shopping Cart</span>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ShoppingCartIcon className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Shopping Cart</h3>
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={`${item.id}-${item.format}`} className="flex items-center space-x-3">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600">{item.author}</p>
                  <p className="text-xs text-gray-500 capitalize">{item.format}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-sm w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-semibold">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Wishlist Component
export const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useEcommerce();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <HeartIcon className="w-6 h-6" />
        {wishlist.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <h3 className="text-lg font-semibold mb-4">Wishlist</h3>
          
          {wishlist.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your wishlist is empty</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600">{item.author}</p>
                    <p className="text-sm font-medium text-blue-600">${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <HeartIcon className="w-5 h-5 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Recently Viewed Component
export const RecentlyViewed: React.FC = () => {
  const { recentlyViewed } = useEcommerce();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Recently Viewed</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recentlyViewed.slice(0, 6).map((item) => (
          <div key={item.id} className="text-center">
            <img
              src={item.coverImage}
              alt={item.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {item.title}
            </h4>
            <p className="text-xs text-gray-600 truncate">{item.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Price Alert Component
export const PriceAlert: React.FC<{ bookId: string; currentPrice: number }> = ({
  bookId,
  currentPrice
}) => {
  const { priceAlerts, addPriceAlert, removePriceAlert } = useEcommerce();
  const [showForm, setShowForm] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');

  const isAlertSet = priceAlerts.includes(bookId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(targetPrice);
    if (price && price < currentPrice) {
      addPriceAlert(bookId, price);
      setShowForm(false);
      setTargetPrice('');
    }
  };

  if (isAlertSet) {
    return (
      <div className="flex items-center space-x-2">
        <BellIcon className="w-5 h-5 text-green-600 fill-current" />
        <span className="text-sm text-green-600">Price alert set</span>
        <button
          onClick={() => removePriceAlert(bookId)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="number"
            step="0.01"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            placeholder={`Target price (below $${currentPrice})`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700"
            >
              Set Alert
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <BellIcon className="w-5 h-5" />
          <span className="text-sm">Set price alert</span>
        </button>
      )}
    </div>
  );
};

export default EcommerceSystem; 