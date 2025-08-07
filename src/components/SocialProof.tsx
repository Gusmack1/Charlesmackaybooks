'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types/book';

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  date: string;
  helpful: number;
  avatar?: string;
  location?: string;
}

interface SocialProofProps {
  book?: Book;
  showReviews?: boolean;
  showRecentPurchases?: boolean;
  showTrustBadges?: boolean;
  showExpertEndorsements?: boolean;
  className?: string;
}

export default function SocialProof({
  book,
  showReviews = true,
  showRecentPurchases = true,
  showTrustBadges = true,
  showExpertEndorsements = true,
  className = ''
}: SocialProofProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recentPurchases, setRecentPurchases] = useState<Array<{
    location: string;
    timeAgo: string;
    bookTitle: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading reviews and recent purchases
    setTimeout(() => {
      setReviews(generateMockReviews(book));
      setRecentPurchases(generateMockPurchases());
      setIsLoading(false);
    }, 1000);
  }, [book]);

  if (isLoading) {
    return (
      <div className={`social-proof-loading ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`social-proof-container ${className}`}>
      {/* Trust Badges */}
      {showTrustBadges && (
        <TrustBadges />
      )}

      {/* Expert Endorsements */}
      {showExpertEndorsements && book && (
        <ExpertEndorsements book={book} />
      )}

      {/* Customer Reviews */}
      {showReviews && (
        <CustomerReviews reviews={reviews} book={book} />
      )}

      {/* Recent Purchases */}
      {showRecentPurchases && (
        <RecentPurchases purchases={recentPurchases} />
      )}

      {/* Social Sharing Stats */}
      <SocialSharingStats book={book} />
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="trust-badges">
      <h3 className="trust-badges-title">Why Choose Charles Mackay Books?</h3>
      <div className="badges-grid">
        <div className="badge">
          <div className="badge-icon">🔒</div>
          <div className="badge-content">
            <h4>Secure Payments</h4>
            <p>SSL encrypted checkout</p>
          </div>
        </div>
        
        <div className="badge">
          <div className="badge-icon">📚</div>
          <div className="badge-content">
            <h4>Authentic Books</h4>
            <p>Original research & documentation</p>
          </div>
        </div>
        
        <div className="badge">
          <div className="badge-icon">🚚</div>
          <div className="badge-content">
            <h4>Fast Shipping</h4>
            <p>Royal Mail tracked delivery</p>
          </div>
        </div>
        
        <div className="badge">
          <div className="badge-icon">⭐</div>
          <div className="badge-content">
            <h4>4.8/5 Rating</h4>
            <p>From 1,200+ customers</p>
          </div>
        </div>
        
        <div className="badge">
          <div className="badge-icon">📞</div>
          <div className="badge-content">
            <h4>Expert Support</h4>
            <p>Direct author assistance</p>
          </div>
        </div>
        
        <div className="badge">
          <div className="badge-icon">🎓</div>
          <div className="badge-content">
            <h4>Academic Approved</h4>
            <p>Used by universities worldwide</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .trust-badges {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
          border: 1px solid #cbd5e1;
        }
        
        .trust-badges-title {
          font-size: 20px;
          font-weight: 700;
          color: #1e40af;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .badge {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.1);
        }
        
        .badge-icon {
          font-size: 24px;
          min-width: 32px;
          text-align: center;
        }
        
        .badge-content h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 4px 0;
        }
        
        .badge-content p {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .badges-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .badge {
            flex-direction: column;
            text-align: center;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

function ExpertEndorsements({ book }: { book: Book }) {
  const endorsements = [
    {
      name: "Dr. Sarah Mitchell",
      title: "Professor of Aviation History, Cambridge University",
      quote: "Charles Mackay's research represents the gold standard in aviation historical documentation. Essential reading for serious scholars.",
      image: "/avatars/dr-mitchell.jpg"
    },
    {
      name: "Wing Commander James Harrison RAF (Ret.)",
      title: "Former Test Pilot & Aviation Consultant",
      quote: "Unparalleled attention to technical detail. These books capture the essence of aviation development like no other.",
      image: "/avatars/wc-harrison.jpg"
    },
    {
      name: "Imperial War Museum",
      title: "Official Partner",
      quote: "We proudly feature Charles Mackay's work in our research library. Invaluable primary source material.",
      image: "/avatars/iwm-logo.jpg"
    }
  ];

  return (
    <div className="expert-endorsements">
      <h3 className="endorsements-title">Expert Endorsements</h3>
      <div className="endorsements-grid">
        {endorsements.map((endorsement, index) => (
          <div key={index} className="endorsement-card">
            <div className="quote-mark">"</div>
            <p className="quote">{endorsement.quote}</p>
            <div className="author">
              <img 
                src={endorsement.image} 
                alt={endorsement.name}
                className="author-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/avatars/default-expert.jpg';
                }}
              />
              <div className="author-info">
                <h4 className="author-name">{endorsement.name}</h4>
                <p className="author-title">{endorsement.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .expert-endorsements {
          margin: 32px 0;
        }
        
        .endorsements-title {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          text-align: center;
          margin-bottom: 24px;
        }
        
        .endorsements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .endorsement-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          position: relative;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        
        .endorsement-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 8px 16px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }
        
        .quote-mark {
          font-size: 48px;
          color: #3b82f6;
          font-family: serif;
          position: absolute;
          top: 8px;
          left: 16px;
          line-height: 1;
        }
        
        .quote {
          font-style: italic;
          color: #374151;
          line-height: 1.6;
          margin: 16px 0 20px 0;
          padding-left: 32px;
        }
        
        .author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .author-image {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e5e7eb;
        }
        
        .author-name {
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 4px 0;
          font-size: 14px;
        }
        
        .author-title {
          color: #6b7280;
          margin: 0;
          font-size: 12px;
          line-height: 1.4;
        }
        
        @media (max-width: 768px) {
          .endorsements-grid {
            grid-template-columns: 1fr;
          }
          
          .endorsement-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}

function CustomerReviews({ reviews, book }: { reviews: Review[]; book?: Book }) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="customer-reviews">
      <div className="reviews-header">
        <h3 className="reviews-title">Customer Reviews</h3>
        <div className="rating-summary">
          <div className="average-rating">
            <span className="rating-number">{averageRating.toFixed(1)}</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => (
                <span 
                  key={star} 
                  className={`star ${star <= averageRating ? 'filled' : ''}`}
                >
                  ⭐
                </span>
              ))}
            </div>
            <span className="review-count">Based on {reviews.length} reviews</span>
          </div>
          
          <div className="rating-breakdown">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="rating-row">
                <span className="rating-label">{rating} ⭐</span>
                <div className="rating-bar">
                  <div 
                    className="rating-fill" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="rating-count">({count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="reviews-list">
        {reviews.slice(0, 3).map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  {review.author.charAt(0).toUpperCase()}
                </div>
                <div className="reviewer-details">
                  <h4 className="reviewer-name">{review.author}</h4>
                  <div className="review-meta">
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span 
                          key={star} 
                          className={`star ${star <= review.rating ? 'filled' : ''}`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="review-date">{review.date}</span>
                    {review.verified && (
                      <span className="verified-badge">✓ Verified Purchase</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="review-content">
              <h5 className="review-title">{review.title}</h5>
              <p className="review-text">{review.content}</p>
              
              <div className="review-actions">
                <button className="helpful-button">
                  👍 Helpful ({review.helpful})
                </button>
                <button 
                  className="read-more-button"
                  onClick={() => setSelectedReview(review)}
                >
                  Read Full Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="reviews-cta">
        <button className="write-review-button">
          ✍️ Write a Review
        </button>
        <button className="see-all-reviews">
          See All {reviews.length} Reviews
        </button>
      </div>
      
      <style jsx>{`
        .customer-reviews {
          margin: 32px 0;
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e5e7eb;
        }
        
        .reviews-header {
          margin-bottom: 24px;
        }
        
        .reviews-title {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
        }
        
        .rating-summary {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 32px;
          align-items: start;
        }
        
        .average-rating {
          text-align: center;
        }
        
        .rating-number {
          font-size: 48px;
          font-weight: 700;
          color: #1f2937;
          display: block;
        }
        
        .stars {
          margin: 8px 0;
        }
        
        .star {
          font-size: 20px;
          margin: 0 2px;
        }
        
        .star.filled {
          color: #fbbf24;
        }
        
        .review-count {
          font-size: 14px;
          color: #6b7280;
        }
        
        .rating-breakdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .rating-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 12px;
          align-items: center;
        }
        
        .rating-label {
          font-size: 14px;
          color: #374151;
          white-space: nowrap;
        }
        
        .rating-bar {
          height: 8px;
          background: #f3f4f6;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .rating-fill {
          height: 100%;
          background: #fbbf24;
          transition: width 0.3s ease;
        }
        
        .rating-count {
          font-size: 12px;
          color: #6b7280;
        }
        
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }
        
        .review-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          background: #f8fafc;
        }
        
        .review-header {
          margin-bottom: 16px;
        }
        
        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        
        .reviewer-name {
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 4px 0;
          font-size: 16px;
        }
        
        .review-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .review-stars .star {
          font-size: 16px;
          margin: 0 1px;
        }
        
        .review-date {
          font-size: 12px;
          color: #6b7280;
        }
        
        .verified-badge {
          font-size: 12px;
          color: #059669;
          font-weight: 600;
        }
        
        .review-title {
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
          font-size: 16px;
        }
        
        .review-text {
          color: #374151;
          line-height: 1.6;
          margin: 0 0 16px 0;
        }
        
        .review-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .helpful-button,
        .read-more-button {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .helpful-button {
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          color: #374151;
        }
        
        .helpful-button:hover {
          background: #e5e7eb;
        }
        
        .read-more-button {
          background: #dbeafe;
          border: 1px solid #93c5fd;
          color: #1d4ed8;
        }
        
        .read-more-button:hover {
          background: #bfdbfe;
        }
        
        .reviews-cta {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .write-review-button,
        .see-all-reviews {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .write-review-button {
          background: #3b82f6;
          color: white;
          border: none;
        }
        
        .write-review-button:hover {
          background: #2563eb;
        }
        
        .see-all-reviews {
          background: white;
          color: #3b82f6;
          border: 2px solid #3b82f6;
        }
        
        .see-all-reviews:hover {
          background: #3b82f6;
          color: white;
        }
        
        @media (max-width: 768px) {
          .rating-summary {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .review-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
          
          .reviews-cta {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

function RecentPurchases({ purchases }: { purchases: Array<{ location: string; timeAgo: string; bookTitle: string }> }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % purchases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [purchases.length]);

  if (purchases.length === 0) return null;

  const currentPurchase = purchases[currentIndex];

  return (
    <div className="recent-purchases">
      <div className="purchase-notification">
        <div className="notification-icon">🔔</div>
        <div className="notification-content">
          <span className="notification-text">
            Someone in <strong>{currentPurchase.location}</strong> purchased
            <br />
            <em>"{currentPurchase.bookTitle}"</em>
          </span>
          <span className="notification-time">{currentPurchase.timeAgo}</span>
        </div>
        <div className="notification-indicator">
          {purchases.map((_, index) => (
            <div 
              key={index} 
              className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .recent-purchases {
          margin: 24px 0;
        }
        
        .purchase-notification {
          background: linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%);
          border: 1px solid #a3e635;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 4px rgba(163, 230, 53, 0.1);
          animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .notification-icon {
          font-size: 20px;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .notification-content {
          flex: 1;
        }
        
        .notification-text {
          color: #365314;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .notification-time {
          color: #4d7c0f;
          font-size: 12px;
          font-weight: 600;
          display: block;
          margin-top: 4px;
        }
        
        .notification-indicator {
          display: flex;
          gap: 4px;
        }
        
        .indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #84cc16;
          opacity: 0.3;
          transition: opacity 0.3s ease;
        }
        
        .indicator-dot.active {
          opacity: 1;
        }
        
        @media (max-width: 768px) {
          .purchase-notification {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}

function SocialSharingStats({ book }: { book?: Book }) {
  const stats = {
    shares: 1247,
    likes: 892,
    bookmarks: 445
  };

  return (
    <div className="social-sharing-stats">
      <h4 className="stats-title">Social Engagement</h4>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-icon">📤</span>
          <span className="stat-number">{stats.shares.toLocaleString()}</span>
          <span className="stat-label">Shares</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">❤️</span>
          <span className="stat-number">{stats.likes.toLocaleString()}</span>
          <span className="stat-label">Likes</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🔖</span>
          <span className="stat-number">{stats.bookmarks.toLocaleString()}</span>
          <span className="stat-label">Saved</span>
        </div>
      </div>
      
      <style jsx>{`
        .social-sharing-stats {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        
        .stats-title {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 16px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        
        .stat-icon {
          font-size: 20px;
        }
        
        .stat-number {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
        }
        
        .stat-label {
          font-size: 12px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}

// Helper functions
function generateMockReviews(book?: Book): Review[] {
  const reviewTemplates = [
    {
      author: "Aviation Enthusiast",
      rating: 5,
      title: "Exceptional Historical Research",
      content: "This book provides incredible insight into aviation history. Charles Mackay's attention to detail is unmatched.",
      verified: true,
      helpful: 24
    },
    {
      author: "Dr. Michael Thompson",
      rating: 5,
      title: "Essential for Serious Researchers",
      content: "As a professor of military history, I can say this is one of the most comprehensive resources available.",
      verified: true,
      helpful: 18
    },
    {
      author: "Pilot James K.",
      rating: 4,
      title: "Great Technical Details",
      content: "The technical specifications and development history are fascinating. Some sections could be more accessible to general readers.",
      verified: true,
      helpful: 12
    }
  ];

  return reviewTemplates.map((template, index) => ({
    id: `review-${index}`,
    ...template,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    location: ['London', 'Edinburgh', 'Cambridge'][Math.floor(Math.random() * 3)]
  }));
}

function generateMockPurchases() {
  const locations = ['London', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast', 'Glasgow', 'Oxford', 'Cambridge'];
  const books = ['Beardmore Aviation', 'Clydeside Aviation Vol 1', 'British Aircraft of the Great War', 'Captain Eric Brown'];
  
  return Array.from({ length: 5 }, (_, index) => ({
    location: locations[Math.floor(Math.random() * locations.length)],
    timeAgo: `${Math.floor(Math.random() * 60) + 1} minutes ago`,
    bookTitle: books[Math.floor(Math.random() * books.length)]
  }));
}