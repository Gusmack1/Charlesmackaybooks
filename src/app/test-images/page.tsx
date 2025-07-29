import Image from 'next/image'

export default function TestImages() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Image Test Page</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold mb-2">Beardmore Aviation</h2>
          <Image
            src="/book-covers/beardmore-aviation.jpg"
            alt="Beardmore Aviation"
            width={200}
            height={300}
            className="border"
          />
        </div>

        <div>
          <h2 className="font-semibold mb-2">German Aircraft</h2>
          <Image
            src="/book-covers/german-aircraft-great-war.jpg"
            alt="German Aircraft"
            width={200}
            height={300}
            className="border"
          />
        </div>

        <div>
          <h2 className="font-semibold mb-2">Sycamore Seeds</h2>
          <Image
            src="/book-covers/sycamore-seeds.jpg"
            alt="Sycamore Seeds"
            width={200}
            height={300}
            className="border"
          />
        </div>

        <div>
          <h2 className="font-semibold mb-2">British Aircraft</h2>
          <Image
            src="/book-covers/british-aircraft-great-war.jpg"
            alt="British Aircraft"
            width={200}
            height={300}
            className="border"
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold mb-2">Raw HTML img test</h2>
        <img
          src="/book-covers/beardmore-aviation.jpg"
          alt="Raw img test"
          width="200"
          height="300"
          className="border"
        />
      </div>
    </div>
  )
}
