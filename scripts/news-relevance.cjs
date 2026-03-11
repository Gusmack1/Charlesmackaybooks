const STRONG_AVIATION_TERMS = [
  'aviation',
  'aircraft',
  'airport',
  'airspace',
  'runway',
  'airline',
  'helicopter',
  'rotorcraft',
  'aerospace',
  'airworthiness',
  'aaib',
  'raf',
  'hial',
  'naval aviation',
  'aircraft carrier',
  'flight operations',
  'low flying',
  'drone-busting',
  'zeroavia',
]

function normalize(text) {
  return String(text || '').toLowerCase()
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term))
}

function hasStrongAviationContext(text) {
  return includesAny(normalize(text), STRONG_AVIATION_TERMS)
}

function chooseBookIdsFromText(text) {
  const lower = normalize(text)
  const hasAviation = hasStrongAviationContext(lower)
  const ids = new Set()

  if (includesAny(lower, ['helicopter', 'rotorcraft', 'autogyro', 'sycamore'])) {
    ids.add('sycamore-seeds')
  }
  if (includesAny(lower, ['lossiemouth', 'typhoon', 'sabre', 'fighter jet'])) {
    ids.add('sabres-from-north')
  }
  if (includesAny(lower, ['beardmore', 'clydebank', 'dalmuir', 'renfrew air school', 'r101', 'r34', 'r36'])) {
    ids.add('beardmore-aviation')
  }
  if (includesAny(lower, ['argus', 'aircraft carrier', 'fleet air arm', 'naval aviation'])) {
    ids.add('aircraft-carrier-argus')
  }
  if (includesAny(lower, ['vulcan', 'lightning', 'v-force', 'deterrent', 'nuclear deterrent'])) {
    ids.add('sonic-to-standoff')
  }
  if (includesAny(lower, ['nuclear', 'atomic', 'silverplate', 'manhattan project', 'maud'])) {
    ids.add('birth-atomic-bomb')
  }
  if (includesAny(lower, ['luftwaffe', 'me262', 'messerschmitt', 'reich air ministry', 'condor legion'])) {
    ids.add('this-was-the-enemy-volume-two')
  }
  if (
    hasAviation &&
    includesAny(lower, [
      'hial',
      'highlands and islands airports',
      'inverness airport',
      'stornoway airport',
      'wick airport',
      'dundee airport',
      'prestwick airport',
      'glasgow airport',
      'zeroavia',
    ])
  ) {
    ids.add('clydeside-aviation-vol2')
  }
  if (
    hasAviation &&
    includesAny(lower, [
      'clydeside',
      'weir ',
      'scottish aeronautical society',
      'lanark meeting',
      'renfrew airport',
    ])
  ) {
    ids.add('clydeside-aviation-vol1')
  }

  return Array.from(ids)
}

function getArticleMatchText(article) {
  return normalize([
    article.title || '',
    article.summary || '',
    ...(article.sections || []).map((section) => section.content || ''),
    ...(article.sourceReferences || []).map((source) => source.citationText || ''),
  ].join(' '))
}

function deriveRelatedBooks(article) {
  const bookIds = chooseBookIdsFromText(getArticleMatchText(article))
  return bookIds.map((bookId) => {
    const existing = (article.relatedBooks || []).find((entry) => entry.bookId === bookId)
    return {
      bookId,
      reason: existing?.reason || 'Related research volume',
    }
  })
}

module.exports = {
  hasStrongAviationContext,
  chooseBookIdsFromText,
  getArticleMatchText,
  deriveRelatedBooks,
}
