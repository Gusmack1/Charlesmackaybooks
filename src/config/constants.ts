// Site-wide constants for easy maintenance and updates

export const SITE_CONSTANTS = {
  // Book counts
  TOTAL_BOOKS: 20,
  PUBLISHED_BOOKS: 19, // Excluding "coming soon" books
  COMING_SOON_BOOKS: 1, // Books marked as "Coming Soon"

  // Customer metrics
  SATISFIED_CUSTOMERS: 1700,

  // Author information
  YEARS_RESEARCH: 25,
  ACADEMIC_CITATIONS: 500,
  UNIVERSITY_COURSES: 15,

  // Site information
  SITE_NAME: 'Charles E. MacKay Aviation Books',
  SITE_DESCRIPTION: 'Authoritative aviation history books by expert historian Charles E. MacKay',
  AUTHOR_NAME: 'Charles E. MacKay',

  // Contact information
  AUTHOR_EMAIL: 'charlese1mackay@hotmail.com',
  AUTHOR_LOCATION: 'Glasgow, Scotland',
  AUTHOR_ALMA_MATER: 'University of Glasgow',

  // SEO defaults
  DEFAULT_KEYWORDS: [
    'aviation history books',
    'Charles E MacKay',
    'Charles E. MacKay',
    'Charles E. MacKay Books',
    'Charles E. MacKay Aviation',
    'WWI aircraft books',
    'WWII aviation history',
    'Scottish aviation heritage',
    'military aviation books',
    'helicopter development history',
    'jet age aviation',
    'naval aviation books',
    'aircraft development books',
    'aviation biography books'
  ]
} as const

// Helper functions for book counts
export const getBookCountText = (includeComingSoon: boolean = false): string => {
  const count = includeComingSoon ? SITE_CONSTANTS.TOTAL_BOOKS : SITE_CONSTANTS.PUBLISHED_BOOKS
  return `${count}${includeComingSoon ? '+' : ''}`
}

export const getBookCountDescription = (includeComingSoon: boolean = false): string => {
  const count = includeComingSoon ? SITE_CONSTANTS.TOTAL_BOOKS : SITE_CONSTANTS.PUBLISHED_BOOKS
  const suffix = includeComingSoon ? '+' : ''
  return `${count}${suffix} aviation history books`
}

// Explicit helpers for clarity in different contexts
export const getTotalBookCountText = (): string => {
  const hasComingSoon = SITE_CONSTANTS.COMING_SOON_BOOKS > 0
  return `${SITE_CONSTANTS.TOTAL_BOOKS}${hasComingSoon ? '+' : ''}`
}

export const getPublishedBookCountText = (): string => {
  return `${SITE_CONSTANTS.PUBLISHED_BOOKS}`
}

export const getAuthorBio = (includeBookCount: boolean = true): string => {
  const bookText = includeBookCount
    ? `With over ${SITE_CONSTANTS.TOTAL_BOOKS}${SITE_CONSTANTS.COMING_SOON_BOOKS > 0 ? '+' : ''} books in the collection and more than ${SITE_CONSTANTS.SATISFIED_CUSTOMERS.toLocaleString()} satisfied customers worldwide.`
    : `Expert aviation historian and author.`

  return `Aviation historian specializing in Scottish aviation heritage, military aviation history, and aircraft development. ${bookText}`
}

