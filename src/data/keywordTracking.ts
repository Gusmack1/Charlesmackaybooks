import keywordConfig from '../../data/keyword-tracking.json'

export type KeywordTrackingConfig = typeof keywordConfig
export type KeywordEntry = KeywordTrackingConfig['keywords'][number]

export const keywordTracking: KeywordTrackingConfig = keywordConfig
export const trackedKeywords: KeywordEntry[] = keywordTracking.keywords
