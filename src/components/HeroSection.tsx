import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="hero-section relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-16 lg:py-24">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Authentic Aviation
              <span className="block">History Books</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-4 leading-relaxed">
              Published by renowned aviation historian <strong className="font-bold">Charles E. MacKay</strong>
            </p>
            
            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
              <strong>Used as primary references by aviation researchers worldwide.</strong><br />
              Specializing in Scottish aviation heritage, World War aircraft, and military aviation history.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">1,700+</div>
                <div className="text-lg font-semibold text-white">Happy Customers</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">19</div>
                <div className="text-lg font-semibold text-white">Published Books</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">FREE</div>
                <div className="text-lg font-semibold text-white">Worldwide Shipping</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/books"
                className="inline-flex items-center justify-center badge badge-green px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl text-lg min-h-[60px]"
              >
                <span className="mr-3 text-xl">🛒</span>
                Buy Books
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center badge badge-blue px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl text-lg min-h-[60px]"
              >
                <span className="mr-3 text-xl">📝</span>
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
    
    {/* Sticky Buy Books CTA - Mobile full-width */}
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-slate-900/90 backdrop-blur border-t border-white/10">
      <div className="container mx-auto px-4 py-3">
        <Link href="/books" className="w-full inline-flex items-center justify-center badge badge-green px-6 py-3 rounded-lg font-bold text-lg min-h-[52px]">
          🛒 Buy Books
        </Link>
      </div>
    </div>

    {/* Sticky Buy Books CTA - Desktop floating */}
    <div className="hidden md:block fixed bottom-6 right-6 z-50">
      <Link href="/books" className="inline-flex items-center justify-center badge badge-green px-6 py-4 rounded-xl font-bold text-lg shadow-2xl">
        🛒 Buy Books
      </Link>
    </div>
  );
}
