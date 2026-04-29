// Mapping of book IDs to Stripe Price IDs (GBP, one-time, LIVE mode)
// Updated 2026-04-29 — price refresh per Charles's eBay flat-band alignment
// Stripe account: A Mackay (Publisher) Ltd (acct_1Rx3MMRp5sxFkGyl)
// Previous mapping was on acct_1TCzCd (Grid Social) cross-wired per brain #856 — fixed
// Brain refs: #880 (CMB Stripe wiring resolved), #856 (architecture)

// Reverse map: price_id → book_id (slug). Built lazily from stripePriceMap.
// Used by the Stripe webhook to record book_id on order_items rows.
let _reverseMap: Record<string, string> | null = null;
export function bookIdFromPriceId(priceId: string | null | undefined): string | null {
  if (!priceId) return null;
  if (!_reverseMap) {
    _reverseMap = {};
    for (const [bookId, pId] of Object.entries(stripePriceMap)) {
      _reverseMap[pId] = bookId;
    }
  }
  return _reverseMap[priceId] ?? null;
}

export const stripePriceMap: Record<string, string> = {
  'this-was-the-enemy-volume-two': 'price_1TRYv9Rp5sxFkGylTqpeyiB2',
  'beardmore-aviation': 'price_1TEzWSRp5sxFkGylgmzbkTlt',
  'clydeside-aviation-vol1': 'price_1TRYvPRp5sxFkGylopEoXicC',
  'clydeside-aviation-vol2': 'price_1TRYvSRp5sxFkGylpFwkzV13',
  'german-aircraft-great-war': 'price_1TRYvIRp5sxFkGyl4XFrRyt2',
  'british-aircraft-great-war': 'price_1TEzWZRp5sxFkGyldlLNNIJw',
  'sycamore-seeds': 'price_1TEzWbRp5sxFkGylZ5GMq58e',
  'captain-eric-brown': 'price_1TEzWcRp5sxFkGylG5YXIQ9r',
  'sabres-from-north': 'price_1TEzWdRp5sxFkGylPSGYh1Nn',
  'enemy-luftwaffe-1945': 'price_1TRYvCRp5sxFkGylVGWIBgjy',
  'flying-for-kaiser': 'price_1TEzWlRp5sxFkGylL9TWY4Le',
  'soaring-with-wings': 'price_1TRYvFRp5sxFkGylHLV1ilD7',
  'mother-of-the-few': 'price_1TRYvLRp5sxFkGylFUBC1U8f',
  'dieter-dengler': 'price_1TEzWqRp5sxFkGylGlB9q1U1',
  'modern-furniture': 'price_1TEzWrRp5sxFkGylrg4afSxA',
  'birth-atomic-bomb': 'price_1TEzWsRp5sxFkGyl7CZb9D3K',
  'aircraft-carrier-argus': 'price_1TEzWuRp5sxFkGylJds4xPOD',
  'dorothy-wordsworth': 'price_1TRYvWRp5sxFkGylJBeIm6KX',
  'adolf-rohrbach': 'price_1TEzWyRp5sxFkGylKbAXbW5O',
  'sonic-to-standoff': 'price_1TEzWzRp5sxFkGylblgs59Jm',
};
