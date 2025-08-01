import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'
import type { BookData } from '@/components/BookSalesTemplate'

const bookData: BookData = {
  id: 'birth-atomic-bomb',
  title: 'Birth of the Atomic Bomb',
  subtitle: 'Statements from Churchill, Truman, Pash etc. German Alsos',
  price: 12.86,
  pageCount: 192,
  isbn: '9780957344396',
  publicationYear: 2020,
  description: `1945 Statements on the Atomic Bomb Churchill ALSOS German Bomb, Oppenheimer MAUD. The original story of the Atomic bomb, its invention and deployment. The chronicle of its manufacture, its use against Japan and how it was installed in the Boeing B-29 Superfortress in "Silverplate." These are the first published statements by the United Kingdom, Canada and the United States in August 1945. "The British deserve much of the credit for the Atomic Bomb—their research was way ahead of ours when the project was turned over to the United States to develop because our laboratories and manufacturing facilities were out of range of bombing and it was the Prime Minister who sold the idea of pushing the project to both the British and United States Governments." - W. Averell Harriman, United States Ambassador to the Soviet Union, 7th August 1945.`,
  category: 'Military History',
  tags: ["Atomic Bomb","WWII","Manhattan Project","Churchill","Truman","Military History"],
  imageUrl: '/book-covers/birth-atomic-bomb.jpg',
  ebayLink: 'https://www.ebay.co.uk/itm/123456789',
  features: [
    "66 black and white pictures with three drawings including a 3 view drawing of a B-29",
    "Includes all aspects of the ALSOS Mission, Canada, United States and the German Atomic Bomb",
    "Newly restored statements from lost documents published by the Allies in August 1945",
    "Includes statements on ALSOS, M.A.U.D., Quebec Agreement, Chickenpox, Silverplate etc.",
    "Explains what Silverplate, Chickenpox etc. in terms of atomic weapons deployment",
    "A5 format with comprehensive coverage of atomic bomb development"
  ],
  academicRecognition: [
    "Cited in nuclear history research",
    "Used by military history institutions",
    "Referenced in atomic bomb studies"
  ],
  customerReviews: [
    {
      rating: 5,
      text: "A terrifying read...",
      author: "Recent purchase",
      source: "eBay"
    },
    {
      rating: 5,
      text: "Excellent",
      author: "Recent buyer",
      source: "eBay"
    },
    {
      rating: 5,
      text: "Is what it says,",
      author: "Recent buyer",
      source: "eBay"
    }
  ]
}

const relatedBlogs: Array<{
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
}> = [
  {
    slug: "british-nuclear-deterrent-v-force",
    title: "British Nuclear Deterrent: The V-Force",
    excerpt: "Comprehensive analysis of Britain's nuclear deterrent development and the V-Force bombers",
    readTime: "15 min read"
  }
]

const relatedBooks: Array<BookData> = []

export const metadata: Metadata = {
  title: 'Birth of the Atomic Bomb | Charles E. MacKay Books',
  description: `The original story of the Atomic bomb, its invention and deployment. The chronicle of its manufacture, its use against Japan and how it was installed in the Boeing B-29 Superfortress in "Silverplate."`,
  keywords: 'Atomic Bomb, WWII, Manhattan Project, Churchill, Truman, Military History, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Birth of the Atomic Bomb',
    description: `The original story of the Atomic bomb, its invention and deployment. The chronicle of its manufacture, its use against Japan and how it was installed in the Boeing B-29 Superfortress in "Silverplate."`,
    images: ['/book-covers/birth-atomic-bomb.jpg'],
    type: 'book'
  }
}

export default function BookPage() {
  return (
    <BookSalesTemplate 
      book={bookData}
      relatedBlogs={relatedBlogs}
      relatedBooks={relatedBooks}
    />
  )
}