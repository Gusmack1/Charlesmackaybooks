import approvals from '@/data/image-approvals.json'
import { getImageCandidates } from '@/data/blogImageManifest'

type Candidate = {
  url: string
  source: string
  license: string
  title: string
  alt: string
  caption?: string
  approved: boolean
}

export type PostApprovalRecord = {
  requiredCount: number
  approvedFeaturedIndex: number | null
  candidates: Candidate[]
}

export function getPostApprovals(slug: string): PostApprovalRecord | null {
  const rec = (approvals as any).posts?.[slug]
  return rec || null
}

export function getApprovedFeatured(slug: string, fallbackUrl?: string, fallbackAlt?: string) {
  const rec = getPostApprovals(slug)
  if (!rec) return { url: fallbackUrl, alt: fallbackAlt, caption: undefined }
  if (typeof rec.approvedFeaturedIndex === 'number') {
    const cand = rec.candidates[rec.approvedFeaturedIndex]
    if (cand && cand.approved && cand.url) {
      return { url: cand.url, alt: cand.alt || fallbackAlt, caption: cand.caption }
    }
  }
  const firstApproved = rec.candidates.find(c => c.approved && c.url)
  if (firstApproved) {
    return { url: firstApproved.url, alt: firstApproved.alt || fallbackAlt, caption: firstApproved.caption }
  }
  // If no approvals and fallback is missing or the generic placeholder, try a sensible slug-based asset
  const generic = '/blog-images/default-generic.svg'
  if (!fallbackUrl || fallbackUrl === generic) {
    const manifest = getImageCandidates(slug)
    if (manifest && manifest.length > 0) {
      const first = manifest[0]
      return { url: first.url, alt: first.alt || fallbackAlt, caption: first.caption }
    }
    const guessUrl = `/blog-images/${slug}.jpg`
    return { url: guessUrl, alt: fallbackAlt, caption: undefined }
  }
  return { url: fallbackUrl, alt: fallbackAlt, caption: undefined }
}

export function getApprovedInline(slug: string, count: number): Candidate[] {
  const rec = getPostApprovals(slug)
  const approved = rec ? rec.candidates.filter(c => c.approved && !!c.url) : []
  if (approved.length >= count) {
    return approved.slice(0, count)
  }
  // Fallback to local manifest candidates when approvals are empty/missing
  const manifest = getImageCandidates(slug)
  if (manifest && manifest.length > 0) {
    const mapped: Candidate[] = manifest.slice(0, count).map(m => ({
      url: m.url,
      alt: (m as any).alt || 'Aviation history image',
      title: (m as any).alt || 'Local image',
      caption: (m as any).caption,
      source: 'local',
      license: 'local',
      approved: true
    }))
    return mapped
  }
  return approved.slice(0, count)
}

export function getApprovalStatus(slug: string): {
  approvedCount: number
  requiredCount: number
  pendingCount: number
} | null {
  const rec = getPostApprovals(slug)
  if (!rec) return null
  const approvedCount = rec.candidates.filter(c => c.approved).length
  const requiredCount = rec.requiredCount
  return { approvedCount, requiredCount, pendingCount: Math.max(0, requiredCount - approvedCount) }
}


