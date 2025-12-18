export default function AcademicAuthority() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Academic Authority</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-lg">Published Books</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-lg">Research Citations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-lg">Years Research</div>
          </div>
        </div>
      </div>
    </section>
  )
}