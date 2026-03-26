export interface BookReview {
  author: string;
  rating: number;
  text: string;
  date: string;
  source?: string;
}

// All reviews extracted from verified eBay purchases and professional journals
export const bookReviews: Record<string, BookReview[]> = {
  'beardmore-aviation': [
    { author: 'Aerosociety.com', rating: 5, text: 'A detailed history of the William Beardmore and Co Ltd.\'s significant contribution to the development of the Scottish aircraft industry.', date: '2023-03-15', source: 'Royal Aeronautical Society' },
    { author: 'Maritime Quest', rating: 5, text: 'This 238 page book is deceptive in size, but is full of so much information it is difficult to describe. Filled with images, specifications, information and the history of early British naval aviation including a detailed history of HMS Argus. This book is highly recommended to anyone interested in naval aviation.', date: '2023-06-20', source: 'Maritime Quest' },
    { author: 'Verified Buyer', rating: 5, text: 'Fills an important gap in British industrial history.', date: '2023-01-10', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'A valuable addition to the histories of British Aviation.', date: '2023-02-18', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Quick delivery, my dad "A Beardmore" loved it.', date: '2024-01-22', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'The Beardmore book is also a treat.', date: '2024-03-10', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'An excellent book on the man and the company.', date: '2023-05-14', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'This book is unique. A treasure trove of over 300 hundred photographs all perfectly reproduced that add immensely to the text.', date: '2024-02-08', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'The detail is amazing, you feel as though your back there, you can see how they produced for the Empire and the world — a brilliant read.', date: '2024-05-24', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Fantastic book, posted super fast and great quality. Highly recommended item and seller.', date: '2024-09-15', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'A detailed and accurate volume on quite a specialist part of a much wider subject. A well produced book, recommended for all early aviation enthusiasts.', date: '2021-07-12', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'The book from Charles MacKay was especially useful in filling in the gaps and clearing the mystery of the W.B.VI designations. A very worthwhile addition to my library!', date: '2023-11-05', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'A splendid account.', date: '2024-04-20', source: 'eBay Purchase' },
  ],

  'clydeside-aviation-vol1': [
    { author: 'Aero-Society', rating: 5, text: 'Beginning with an overview of the development of aviation in Scotland from the 18th century balloon flights, this book proceeds to record a very detailed account of the key contribution which Scottish companies played in British aircraft, airship and aero engine production during WW1, including the major role that women played working in aircraft factories.', date: '2022-08-15', source: 'Royal Aeronautical Society' },
  ],

  'german-aircraft-great-war': [
    { author: 'Verified Buyer', rating: 5, text: 'Great book.', date: '2024-03-18', source: 'eBay Purchase' },
  ],

  'british-aircraft-great-war': [
    { author: 'Verified Buyer', rating: 5, text: 'My initial read it is a great book giving all the technical details of the Aeroplanes used by the UK.', date: '2023-09-10', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Good quality item at a good price.', date: '2021-02-15', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'A1 Product + Prompt Delivery — HIGHLY RECOMMENDED.', date: '2021-03-22', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Great deal pleased with the book well packed fast postage as described and a bonus of some black and white cards of WW1 aircraft, thank you very much.', date: '2025-05-08', source: 'eBay Purchase' },
  ],

  'sycamore-seeds': [
    { author: 'Air Britain Member', rating: 5, text: 'If you have even the remotest interest in British helicopters from the start of the 20th Century, this well-researched book should be of interest to you. It is packed full of interesting facts, data and photos. How many people know of the involvement in helicopter development by the Glasgow-based Morris Furniture Company? Precious few I would contend.', date: '2022-04-10', source: 'Air Britain' },
    { author: 'Verified Buyer', rating: 5, text: 'Outstanding value.', date: '2023-01-15', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Great book and fast delivery. 5 stars!!!!!', date: '2023-06-20', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Thanks for the excellent swift processing of the order. I look forward to reading the book — it looks like it will fill a disappointing hole in British aviation history.', date: '2023-03-05', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'I can recommend The Sycamore Seeds. It may be a small size book but it traces helicopter development from the Autogyros to the 1950s helicopters. It also keeps track of contemporary foreign offerings from the US and Germany during the 1930s and 1940s.', date: '2023-08-12', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Best history of autogyros I\'ve come across.', date: '2024-01-18', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'The Sycamore Seeds is essential for understanding the early development of British helicopters.', date: '2024-05-22', source: 'eBay Purchase' },
  ],

  'captain-eric-brown': [
    { author: 'Verified Buyer', rating: 5, text: 'Amazing pilot, all those planes, amazing.', date: '2022-06-15', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Very good communication, exactly as described, extremely well packaged and protected.', date: '2023-02-10', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Alan\'s book captures the essence of him well.', date: '2023-05-20', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Loved the book.', date: '2023-08-15', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'VERY QUICK DELIVERY, REALLY GOOD BOOK AND GREAT PRICE.', date: '2023-11-10', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Excellent overview of the world\'s greatest pilot.', date: '2023-04-22', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'It nevertheless makes a very worthwhile companion to Wings On My Sleeve. Am very delighted.', date: '2024-01-15', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Excellent biography which I highly recommend.', date: '2024-03-20', source: 'eBay Purchase' },
  ],

  'sabres-from-north': [
    { author: 'Verified Buyer', rating: 5, text: 'A very interesting book.', date: '2023-07-10', source: 'eBay Purchase' },
    { author: 'RRHT Reviewer', rating: 5, text: 'Sabres of the North which was a great, informative read. The best chapter was the development of the jet engine and Whittle. Fully detailed.', date: '2023-04-15', source: 'RRHT Review' },
  ],

  'flying-for-kaiser': [
    { author: 'Verified Buyer', rating: 5, text: 'Adds to the aviation history of the period.', date: '2023-09-05', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Never knew about the Armistice or the Kaiser remarrying and the Crown Prince.', date: '2023-11-20', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Great Book.', date: '2024-02-10', source: 'eBay Purchase' },
  ],

  'soaring-with-wings': [
    { author: 'Verified Buyer', rating: 5, text: 'It is a remarkable piece of scholarship and does Percy justice.', date: '2023-06-15', source: 'eBay Purchase' },
    { author: 'Local History Archive', rating: 5, text: 'We have a little information about Percy Pilcher, but nothing as comprehensive and well researched as this, so it is a wonderful addition to stock. His story is both fascinating and tragic — one can\'t help wondering how the development of flight would have progressed had he survived.', date: '2023-03-10', source: 'Archive' },
    { author: 'Verified Buyer', rating: 5, text: 'The falling scene is brutal to read. I really felt him through the words.', date: '2023-10-08', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'This book, however, is a fitting tribute to Percy Pilcher.', date: '2024-01-22', source: 'eBay Purchase' },
  ],

  'mother-of-the-few': [
    { author: 'Verified Buyer', rating: 5, text: 'Very fast delivery of a great book. I wouldn\'t hesitate in buying again from this seller.', date: '2023-03-18', source: 'eBay Purchase' },
    { author: 'RRHT Reviewer', rating: 5, text: 'This is a book to be recommended for all sorts of reasons — Lady Houston\'s biographical notes, the historical notes, the technical data contained therein and the narrative that brings it all together. It is also well Illustrated with charts and photographs that support the text.', date: '2021-06-15', source: 'RRHT Review' },
    { author: 'Verified Buyer', rating: 5, text: 'The book arrived intact and quickly. The item was carefully packed and as described. It was good value and an interesting read.', date: '2024-02-05', source: 'eBay Purchase' },
  ],

  'dieter-dengler': [
    { author: 'Verified Buyer', rating: 5, text: 'Top seller. Fast shipping. Nice item. Perfect!', date: '2023-08-22', source: 'eBay Purchase' },
  ],

  'modern-furniture': [
    { author: 'Aerosociety.com', rating: 5, text: 'An informative history of the Scottish furniture company detailing its notable contribution to the development of aviation, including manufacturing the rotor blades for Weir autogiros and helicopters, Hafner Rotachute, Cierva Air Horse, Bristol Sycamore and other rotorcraft designs.', date: '2022-05-15', source: 'Royal Aeronautical Society' },
    { author: 'Furniture History Society', rating: 5, text: 'He gives an account of much outfitting of hotels, among them Gleneagles and the Strand Palace, and ocean liners, including the Queens Mary and Elizabeth, a major contribution to the Utility scheme, and many other innovatory initiatives. Historians of twentieth century British furniture will find many clues among his Shavings worth following up.', date: '2022-09-10', source: 'Furniture History Society' },
  ],

  'birth-atomic-bomb': [
    { author: 'Verified Buyer', rating: 5, text: 'A terrifying read.', date: '2023-04-10', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Excellent.', date: '2023-07-22', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Is what it says.', date: '2024-01-08', source: 'eBay Purchase' },
  ],

  'aircraft-carrier-argus': [
    { author: 'Verified Buyer', rating: 5, text: 'My grandfather served on this vessel, and I am delving into the family history. This will be a valuable resource. Wartime is not my thing, I have made an exception! Thank you for providing the text.', date: '2024-03-15', source: 'eBay Purchase' },
    { author: 'Maritime Quest', rating: 5, text: 'A very well researched book which includes details of her entire career. Filled with photographs, including aircraft used, and drawings. Appendix includes commanding officers of the ship and the Fleet Air Arm as well as details of the various operations involving HMS Argus.', date: '2022-08-20', source: 'Maritime Quest' },
    { author: 'Aerosociety Journal', rating: 5, text: 'A detailed well-illustrated history of the world\'s first flat-top aircraft carrier constructed by William Beardmore & Co Ltd at the Dalmuir Naval Construction Works.', date: '2022-06-10', source: 'Aerosociety Journal' },
    { author: 'Verified Buyer', rating: 5, text: 'A lovely piece of work.', date: '2025-07-15', source: 'eBay Purchase' },
    { author: 'Verified Buyer', rating: 5, text: 'Excellent book, beautiful images and a good addition to my library of books on British aircraft carriers.', date: '2025-07-22', source: 'eBay Purchase' },
  ],

  'adolf-rohrbach': [
    { author: 'Verified Buyer', rating: 5, text: 'Great service, a nice cheap and cheerful book, well worth the value.', date: '2021-07-18', source: 'eBay Purchase' },
  ],

  'sonic-to-standoff': [
    { author: 'Librarian', rating: 5, text: 'A valuable addition to our literature on the RAF and the Cold War.', date: '2024-06-10', source: 'Library Review' },
    { author: 'Verified Buyer', rating: 5, text: 'A scholarly document.', date: '2024-08-15', source: 'eBay Purchase' },
  ],
};

// Get reviews for a specific book, with fallback to general reviews
export function getBookReviews(bookId: string): BookReview[] {
  return bookReviews[bookId] || [];
}

// Get total review count across all books
export function getTotalReviewCount(): number {
  return Object.values(bookReviews).reduce((sum, reviews) => sum + reviews.length, 0);
}

// Get all reviews flattened (for homepage etc.)
export function getAllReviews(): (BookReview & { bookId: string })[] {
  return Object.entries(bookReviews).flatMap(([bookId, reviews]) =>
    reviews.map(r => ({ ...r, bookId }))
  );
}
