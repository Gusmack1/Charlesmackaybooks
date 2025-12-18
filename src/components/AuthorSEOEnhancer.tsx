export default function AuthorSEOEnhancer() {
  return (
    <section className="py-12 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Expert Aviation Historian: Charles E. MacKay</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leading authority on Scottish aviation heritage and military aviation history
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">20+</div>
            <div className="text-lg">Published Books</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">1000+</div>
            <div className="text-lg">Research Citations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">25+</div>
            <div className="text-lg">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">5★</div>
            <div className="text-lg">Reader Reviews</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-300 mb-4">
            Discover aviation history through the eyes of Scotland's leading aviation researcher
          </p>
          <div className="flex justify-center gap-4">
            <a href="/books" className="bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors border border-slate-900">
              Browse All Books
            </a>
            <a href="/contact" className="bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors border border-slate-900">
              Contact Author
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}