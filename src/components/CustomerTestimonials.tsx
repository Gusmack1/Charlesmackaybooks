'use client';

import React, { useState } from 'react';
import { Star, Quote, User, CheckCircle } from 'lucide-react';

interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  bookPurchased?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    customerName: 'Dr. James Mitchell',
    location: 'Glasgow, Scotland',
    rating: 5,
    title: 'Exceptional Aviation History Research',
    content: 'Charles E. MacKay\'s books have been invaluable for my research on Scottish aviation history. The depth of detail and accuracy is outstanding. His work on Clydeside Aviation has opened up new perspectives on Scotland\'s industrial heritage.',
    date: '2024-12-15',
    verified: true,
    bookPurchased: 'Clydeside Aviation Volume One: The Great War'
  },
  {
    id: '2',
    customerName: 'Sarah Thompson',
    location: 'London, England',
    rating: 5,
    title: 'Perfect for Aviation Enthusiasts',
    content: 'As an aviation enthusiast, I was thrilled to discover Charles MacKay\'s books. The quality of research and the beautiful presentation make these books a must-have for anyone interested in aviation history. Fast delivery and excellent service.',
    date: '2024-12-10',
    verified: true,
    bookPurchased: 'British Aircraft of the Great War'
  },
  {
    id: '3',
    customerName: 'Prof. Michael O\'Connor',
    location: 'Dublin, Ireland',
    rating: 5,
    title: 'Academic Excellence',
    content: 'I use Charles MacKay\'s books in my university courses on military history. The scholarship is impeccable and the books are beautifully produced. My students find them engaging and informative.',
    date: '2024-12-08',
    verified: true,
    bookPurchased: 'Captain Eric "Winkle" Brown Biography'
  },
  {
    id: '4',
    customerName: 'Robert Wilson',
    location: 'Edinburgh, Scotland',
    rating: 5,
    title: 'Outstanding Service and Quality',
    content: 'Ordered multiple books and was impressed by the quick delivery and excellent packaging. The books themselves are of the highest quality - clearly written by someone who knows their subject intimately.',
    date: '2024-12-05',
    verified: true,
    bookPurchased: 'Beardmore Aviation: Scottish Industrial Giant'
  },
  {
    id: '5',
    customerName: 'Emma Davies',
    location: 'Cardiff, Wales',
    rating: 5,
    title: 'Fascinating Historical Insight',
    content: 'Charles MacKay brings aviation history to life with his detailed research and engaging writing style. The books are not just informative but truly enjoyable to read. Highly recommended!',
    date: '2024-12-01',
    verified: true,
    bookPurchased: 'HMS Argus: First Aircraft Carrier'
  },
  {
    id: '6',
    customerName: 'David Campbell',
    location: 'Aberdeen, Scotland',
    rating: 5,
    title: 'Superb Aviation Literature',
    content: 'These books represent the gold standard in aviation history writing. Charles MacKay\'s expertise shines through on every page. The free worldwide shipping was a nice bonus too!',
    date: '2024-11-28',
    verified: true,
    bookPurchased: 'German Aircraft Development in the Great War'
  }
];

interface CustomerTestimonialsProps {
  showAll?: boolean;
  maxDisplay?: number;
}

export default function CustomerTestimonials({ 
  showAll = false, 
  maxDisplay = 3 
}: CustomerTestimonialsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredTestimonials = selectedRating 
    ? testimonials.filter(t => t.rating === selectedRating)
    : testimonials;

  const displayTestimonials = showAll 
    ? filteredTestimonials 
    : filteredTestimonials.slice(0, maxDisplay);

  const averageRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;
  const totalReviews = testimonials.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary">Customer Reviews</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-sm font-medium text-primary">
            {averageRating.toFixed(1)} ({totalReviews} reviews)
          </span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedRating(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedRating === null
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({totalReviews})
        </button>
        {[5, 4, 3, 2, 1].map(rating => {
          const count = testimonials.filter(t => t.rating === rating).length;
          return (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedRating === rating
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {rating}★ ({count})
            </button>
          );
        })}
      </div>

      {/* Testimonials */}
      <div className="space-y-6">
        {displayTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-primary">{testimonial.customerName}</h4>
                    {testimonial.verified && (
                    <CheckCircle className="w-4 h-4 text-green-600" aria-label="Verified Purchase" />
                    )}
                  </div>
                  <p className="text-sm text-secondary">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(testimonial.rating)}
              </div>
            </div>

            <div className="mb-3">
              <h5 className="font-medium text-primary mb-1">{testimonial.title}</h5>
              <p className="text-sm text-secondary italic">
                "{testimonial.content}"
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-secondary">
              <span>{new Date(testimonial.date).toLocaleDateString()}</span>
              {testimonial.bookPurchased && (
                <span className="text-primary font-medium">
                  Purchased: {testimonial.bookPurchased}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {!showAll && filteredTestimonials.length > maxDisplay && (
        <div className="mt-6 text-center">
          <button className="text-primary hover:text-primary-dark font-medium">
            View All {filteredTestimonials.length} Reviews →
          </button>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{totalReviews}+</div>
            <div className="text-sm text-secondary">Verified Reviews</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{averageRating.toFixed(1)}</div>
            <div className="text-sm text-secondary">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-sm text-secondary">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">24h</div>
            <div className="text-sm text-secondary">Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
