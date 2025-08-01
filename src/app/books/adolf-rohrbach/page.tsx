import type { Metadata } from 'next'
import BookSalesTemplate from '@/components/BookSalesTemplate'
import type { BookData } from '@/components/BookSalesTemplate'

const bookData: BookData = {
  id: 'adolf-rohrbach',
  title: 'Adolf Rohrbach\'s Metal Aeroplanes',
  subtitle: 'An Aircraft Pioneer And His Designs',
  price: 12.86,
  pageCount: 136,
  isbn: '9781838056728',
  publicationYear: 2021,
  description: `This is the history of Adolf Rohrbach and his pioneering all-metal aeroplanes. Newly researched with 136 Pages, over 200 photographs and drawings, many rare and obscure. Full details of every Rohrbach aeroplane and Rohrbach's design team. There are also rare drawings of Rohrbach's projected aeroplanes of 1931-32 which came to nothing. (Not a download or internet article compendium.) There are descriptions of the founding of Luft Hansa, Deruluft (Deutsch-Russische Luftverkehrs A.G., or Deruluft) and the finances of the Weimar Republic and the growth of German civil aviation directed by Hans von Seekt. Lipetsk (also known as Lipetskiy, Lipetsky, Shakhm 10, and Lipetsk West) in Russia which became the test centre for the Luftwaffe, the Rhorbach Roland airliner was tested there as a bomber. The book describes the growth of Luft Hansa and Deruluft flying Rohrbach types and all the aircraft which were used by both companies. Adolf Hitler used a Rohrbach Roland in his 1932 election campaign which was flown by Hans Baur and this is featured in the book, together with Baur, Hitler and the Rohrbach Roland.`,
  category: 'German Aviation History',
  tags: ["Adolf Rohrbach","Metal Aircraft","German Aviation","Luft Hansa","Aviation Pioneer"],
  imageUrl: '/book-covers/adolf-rohrbach.jpg',
  ebayLink: 'https://www.ebay.co.uk/itm/123456789',
  features: [
    "136 Pages, over 200 photographs and drawings, many rare and obscure",
    "Full details of every Rohrbach aeroplane and Rohrbach's design team",
    "Rare drawings of Rohrbach's projected aeroplanes of 1931-32",
    "Descriptions of the founding of Luft Hansa and Deruluft",
    "Details of Lipetsk test centre for the Luftwaffe",
    "Adolf Hitler's 1932 election campaign Rohrbach Roland",
    "Originally forming part of Beardmore Aviation as an appendix"
  ],
  academicRecognition: [
    "Used by aviation history courses",
    "Referenced in German aviation studies",
    "Cited in metal aircraft construction research"
  ],
  customerReviews: [
    {
      rating: 5,
      text: "Great service, a nice cheap and cheerful book, well worth the value.",
      author: "EBay buyer July 2021",
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
    slug: "adolf-rohrbach-metal-aircraft-construction",
    title: "Adolf Rohrbach: Metal Aircraft Construction Pioneer",
    excerpt: "Comprehensive analysis of Adolf Rohrbach's revolutionary metal aircraft construction techniques",
    readTime: "15 min read"
  },
  {
    slug: "adolf-rohrbach-metal-aircraft-revolution",
    title: "Adolf Rohrbach: The Metal Aircraft Revolution That Changed Aviation",
    excerpt: "In-depth examination of how Rohrbach's innovations transformed aircraft construction",
    readTime: "18 min read"
  }
]

const relatedBooks: Array<BookData> = []

export const metadata: Metadata = {
  title: 'Adolf Rohrbach\'s Metal Aeroplanes | Charles E. MacKay Books',
  description: `The history of Adolf Rohrbach and his pioneering all-metal aeroplanes. Newly researched with 136 Pages, over 200 photographs and drawings, many rare and obscure.`,
  keywords: 'Adolf Rohrbach, Metal Aircraft, German Aviation, Luft Hansa, Aviation Pioneer, Charles MacKay, aviation history books',
  openGraph: {
    title: 'Adolf Rohrbach\'s Metal Aeroplanes',
    description: `The history of Adolf Rohrbach and his pioneering all-metal aeroplanes. Newly researched with 136 Pages, over 200 photographs and drawings, many rare and obscure.`,
    images: ['/book-covers/adolf-rohrbach.jpg'],
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