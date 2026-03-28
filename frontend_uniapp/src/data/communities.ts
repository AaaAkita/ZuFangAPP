import { getCommunities, getFeaturedCommunityIds } from './repository'
import type { CommunityItem, CommunityMetrics, CommunityReview, CommunityReviewTag } from './types'

export type { CommunityItem, CommunityMetrics, CommunityReview, CommunityReviewTag }

export const communities: CommunityItem[] = getCommunities()
export const featuredCommunityIds = getFeaturedCommunityIds()

export function getCommunityById(id: number): CommunityItem | undefined {
  return getCommunities().find((item) => item.id === id)
}

export function getFeaturedCommunities(): CommunityItem[] {
  const items = getCommunities()
  return featuredCommunityIds
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is CommunityItem => !!item)
}

export function getQualityRanking(): CommunityItem[] {
  return getCommunities()
    .sort((a, b) => b.qualityScore - a.qualityScore)
    .slice(0, 5)
}

export function getRiskRanking(): CommunityItem[] {
  return getCommunities()
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5)
}
