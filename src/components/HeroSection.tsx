import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="homepage-hero relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-16 lg:py-24">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-center lg:text-left">
            <h1 className="hero-section text-5xl lg:text-6xl font-extrabold mb-8 leading-tight" style={{ color: '#ffffff !important', textShadow: '0 3px 6px rgba(0, 0, 0, 0.9)' }}>
              Authentic Aviation
              <span className="block text-white">History Books</span>
            </h1>
            
            <p className="hero-section text-xl lg:text-2xl mb-6 leading-relaxed" style={{ color: '#ffffff !important', textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>
              Published by renowned aviation historian <strong className="text-white font-bold">Charles E. MacKay</strong>
            </p>
            
            <p className="hero-section text-lg lg:text-xl mb-8 leading-relaxed" style={{ color: '#ffffff !important', textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)' }}>
              <strong>Used as primary references by aviation researchers worldwide.</strong><br />
              Specializing in Scottish aviation heritage, World War aircraft, and military aviation history.
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>1,700+</div>
                <div className="text-lg font-semibold text-white" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)' }}>Happy Customers</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>19</div>
                <div className="text-lg font-semibold text-white" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)' }}>Published Books</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}>FREE</div>
                <div className="text-lg font-semibold text-white" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)' }}>Worldwide Shipping</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/books"
                className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 shadow-xl text-lg min-h-[60px]"
                style={{ color: '#ffffff !important' }}
              >
                <span className="mr-3 text-xl">🛒</span>
                Shop Aviation Books
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-xl text-lg min-h-[60px]"
                style={{ color: '#ffffff !important' }}
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
  );
}
