# Book Weights Update TODO

## Purpose
Add book weights (in grams) to all book entries in the database to improve:
- Google Shopping indexing
- SEO optimization
- Product information completeness
- E-commerce functionality

## Book Weights to Add

| Book Title | Weight (grams) | Status |
|------------|----------------|--------|
| Beardmore Aviation | 378 | ✅ DONE |
| Clydeside Aviation Volume One | 482 | ✅ DONE |
| Clydeside Aviation Volume Two | 545 | ✅ DONE |
| Flying for Kaiser | 234 | ✅ DONE |
| Soaring with Wings (Percy Pilcher) | 294 | ✅ DONE |
| Sabres from the North | 404 | ✅ DONE |
| This Was the Enemy (Luftwaffe 1945) | 387 | ✅ DONE |
| German Aircraft Great War | 378 | ✅ DONE |
| Dieter Dengler | 180 | ✅ DONE |
| Aircraft Carrier Argus | 279 | ✅ DONE |
| Adolf Rohrbach | 226 | ✅ DONE |
| British Aircraft Great War | 228 | ✅ DONE |
| Sonic to Standoff | 324 | ✅ DONE |
| Modern Furniture (Morris) | 313 | ✅ DONE |
| Dorothy Wordsworth | 389 | ✅ DONE |
| Mother of the Few | 415 | ✅ DONE |
| Birth of the Atomic Bomb | 320 | ✅ DONE |
| The Sycamore Seeds (Helicopter) | 336 | ✅ DONE |
| Captain Eric Brown | 111 | ✅ DONE |

## Implementation Details

### Data Structure Update
- Add `weight: number` field to Book interface in `/src/types/book.ts`
- Add weight property to all book objects in `/src/data/books.ts`
- Update book sales templates to display weight information

### SEO Benefits
- Google Shopping will better index books with complete product information
- Improved search visibility for physical book sales
- Better product listings in search results
- Enhanced e-commerce functionality

### Next Steps
1. ✅ Update Book interface with weight field
2. ✅ Add weights to all book entries
3. ✅ Update book sales templates to display weight
4. ✅ Test Google indexing improvements
5. ✅ Monitor search performance

## Notes
- All weights are in grams as provided
- Weights will be displayed in both grams and converted to pounds/ounces for US market
- This update will improve Google's ability to index books for shopping results
- Complete product information helps with conversion rates 