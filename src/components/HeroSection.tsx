import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-12">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content Side */}
          <div>


            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-white">
              Authentic Aviation
              <span className="block text-white">History Books</span>
            </h1>
            <p className="text-lg text-white mb-3 leading-relaxed">
              Published by renowned aviation historian Charles E. MacKay.{' '}
              <strong className="text-white">Used as primary references by aviation researchers worldwide.</strong>
            </p>
            <p className="text-white mb-6">
              Specializing in Scottish aviation heritage, World War aircraft, and military aviation history.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-white">1,700+</div>
                <div className="text-xs text-white">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">Academic</div>
                <div className="text-xs text-white">References</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">Worldwide</div>
                <div className="text-xs text-white">Shipping</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/books"
                className="inline-flex items-center justify-center bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-green-700 transition-all duration-300 shadow-lg text-sm"
              >
                <span className="mr-2">🛒</span>
                Shop Aviation Books
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 text-sm"
              >
                <span className="mr-2">📝</span>
                Expert Insights
              </Link>
            </div>
          </div>

          {/* Professional Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/blog-images/spitfire-k5054-prototype.jpg"
                    alt="Supermarine Spitfire prototype"
                    width={250}
                    height={160}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/blog-images/beardmore-clyde-shipyard.jpg"
                    alt="Beardmore Clyde Shipyard - Scottish Industrial Heritage"
                    width={250}
                    height={160}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/blog-images/sopwith-camel-rfc.jpg"
                    alt="Sopwith Camel WWI fighter"
                    width={250}
                    height={160}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/blog-images/eric-brown-test-pilot-portrait.jpg"
                    alt="Test pilot Eric Brown"
                    width={250}
                    height={160}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
