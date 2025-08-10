interface Testimonial {
  id: number;
  name: string;
  title: string;
  text: string;
  rating: number;
  verified: boolean;
  source?: string;
}

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Recent eBay Buyer",
      title: "Verified Purchase",
      text: "Very good communication, exactly as described, extremely well packaged and protected.",
      rating: 5,
      verified: true,
      source: "eBay Feedback"
    },
    {
      id: 2,
      name: "Aviation Enthusiast",
      title: "April 2023 Purchase",
      text: "Excellent overview of the worlds greatest pilot.",
      rating: 5,
      verified: true,
      source: "eBay Review"
    },
    {
      id: 3,
      name: "Book Collector",
      title: "Recent eBay Buyer",
      text: "VERY QUICK DELIVERY, REALLY GOOD BOOK AND GREAT PRICE",
      rating: 5,
      verified: true,
      source: "eBay Feedback"
    },
    {
      id: 4,
      name: "Aviation History Reader",
      title: "Recent Purchase",
      text: "it nevertheless makes a very worthwhile companion to 'Wings On My Sleeve'. Am very delighted.",
      rating: 5,
      verified: true,
      source: "eBay Review"
    },
    {
      id: 5,
      name: "eBay Customer",
      title: "Recent Buyer",
      text: "Excellent biography which I highly recommend",
      rating: 5,
      verified: true,
      source: "eBay Feedback"
    },
    {
      id: 6,
      name: "Aircraft Enthusiast",
      title: "Verified Purchase",
      text: "Amazing pilot, all those 'planes, amazing",
      rating: 5,
      verified: true,
      source: "eBay Review"
    }
  ];

  return (
    <section className="py-12 surface-dark bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">⬢ What Customers Say</h2>
        <p className="text-center opacity-90 mb-12 max-w-2xl mx-auto">
          Trusted by aviation historians, museum curators, and enthusiasts worldwide
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="rounded-lg p-6 border border-white/15 bg-black/10">
              {/* Star Rating */}
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
                {testimonial.verified && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    ✓ Verified Purchase
                  </span>
                )}
              </div>

              {/* Testimonial Text */}
              <p className="opacity-90 mb-4 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="border-t pt-3">
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs opacity-80">{testimonial.title}</p>
                {testimonial.source && (
                  <p className="text-xs underline mt-1">Source: {testimonial.source}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 border border-white/15 bg-black/10 rounded-lg px-8 py-4">
            <div className="text-center">
              <p className="text-2xl font-bold">1,718+</p>
              <p className="text-sm opacity-80">Items Sold on eBay</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm opacity-80">Positive Feedback</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">12+</p>
              <p className="text-sm opacity-80">Years Experience</p>
            </div>
          </div>
          <p className="text-xs opacity-70 mt-3">
            All testimonials are from verified eBay purchasers of Charles E. MacKay's aviation books
          </p>
        </div>
      </div>
    </section>
  );
}
