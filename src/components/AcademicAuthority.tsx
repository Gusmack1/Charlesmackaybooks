export default function AcademicAuthority() {
  return (
    <section className="py-12 bg-[#e7e2a4]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">⬢ Academic Recognition & Authority</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Charles E. MacKay's books are listed as <strong>primary reference sources</strong> on the British Aviation
          database (britishaviation-ptp.com), alongside prestigious publishers like Putnam and Jane's All The World's Aircraft.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 border-l-4 border-blue-500">
            <h3 className="font-bold mb-2">Beardmore Aviation</h3>
            <p className="text-sm text-gray-600">Reference #1 - Primary Source</p>
          </div>
          <div className="text-center p-6 border-l-4 border-blue-500">
            <h3 className="font-bold mb-2">Clydeside Aviation Vol 1</h3>
            <p className="text-sm text-gray-600">Reference #10 - Academic Citation</p>
          </div>
          <div className="text-center p-6 border-l-4 border-blue-500">
            <h3 className="font-bold mb-2">Clydeside Aviation Vol 2</h3>
            <p className="text-sm text-gray-600">Reference #11 - Scholarly Work</p>
          </div>
        </div>
      </div>
    </section>
  );
}
