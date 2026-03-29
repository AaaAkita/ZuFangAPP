import { apiRequest } from './client'
import type { HotSearchItem } from './search'

export interface HomeRecommendedItem {
  id: number
  name: string
  district: string
  address: string
  coverImage?: string
  ratingAvg: number
  qualityScore: number
  riskScore: number
  riskReason?: string
  highlights?: string[]
}

export interface HomeRiskWarningItem {
  id: number
  name: string
  district: string
  riskScore: number
  riskReason: string
}

export interface HomeLatestReview {
  id: number
  communityId: number
  communityName: string
  content: string
  rating: number
  createdAt: string
  tags: string[]
  verified: boolean
  user: {
    id: number
    nickname: string
    avatar?: string
  }
}

export interface HomeData {
  recommendedCommunities: HomeRecommendedItem[]
  riskWarnings: HomeRiskWarningItem[]
  latestReviews: HomeLatestReview[]
  hotSearches: HotSearchItem[]
}

export const homeApi = {
  get: () =>
    apiRequest<HomeData>({
      url: '/home'
    })
}
