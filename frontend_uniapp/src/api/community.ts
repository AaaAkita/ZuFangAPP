import { apiRequest } from './client'

export interface CommunityEntity {
  id: number
  name: string
  province: string
  city: string
  district: string
  address: string
  coverImage?: string
  tags?: string[]
  highlights?: string[]
  description?: string
  ratingAvg: number
  qualityScore: number
  riskScore: number
  riskReason?: string
  safetyScore: number
  quietnessScore: number
  valueScore: number
  commentCount: number
  viewCount: number
  createdAt: string
}

export interface CommunityListResult {
  items: CommunityEntity[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CommunityRankingSummary {
  qualityRanking: CommunityEntity[]
  riskRanking: CommunityEntity[]
}

export interface QueryCommunityParams {
  page?: number
  limit?: number
  keyword?: string
  city?: string
  district?: string
  sortBy?: string
  order?: 'asc' | 'desc'
}

function toQuery(params: QueryCommunityParams = {}): string {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value))
    }
  })
  const queryString = query.toString()
  return queryString ? `?${queryString}` : ''
}

export const communityApi = {
  list: (params: QueryCommunityParams = {}) =>
    apiRequest<CommunityListResult>({
      url: `/communities${toQuery(params)}`
    }),

  detail: (id: number) =>
    apiRequest<CommunityEntity>({
      url: `/communities/${id}`
    }),

  rankings: () =>
    apiRequest<CommunityRankingSummary>({
      url: '/communities/rankings/summary'
    })
}
