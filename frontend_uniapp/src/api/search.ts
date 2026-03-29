import { apiRequest } from './client'

export interface SearchCommunityItem {
  id: number
  name: string
  city: string
  district: string
  address: string
  coverImage?: string
  tags?: string[]
  highlights?: string[]
  ratingAvg: number
  qualityScore: number
  riskScore: number
  riskReason?: string
}

export interface SearchResult {
  items: SearchCommunityItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SearchSuggestion {
  id: number
  name: string
  city: string
  district: string
}

export interface HotSearchItem {
  keyword: string
  searchCount: number
}

export interface GlobalSearchParams {
  keyword: string
  city?: string
  sort?: 'default' | 'hot' | 'new' | 'risk'
  page?: number
  limit?: number
}

function toQuery<T extends object>(params: T): string {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if ((typeof value === 'string' || typeof value === 'number') && value !== '') {
      query.set(key, String(value))
    }
  })
  const queryString = query.toString()
  return queryString ? `?${queryString}` : ''
}

export const searchApi = {
  global: (params: GlobalSearchParams) =>
    apiRequest<SearchResult>({
      url: `/search${toQuery(params)}`
    }),

  suggestions: (keyword: string) =>
    apiRequest<SearchSuggestion[]>({
      url: `/search/suggestions${toQuery({ keyword })}`
    }),

  hot: () =>
    apiRequest<HotSearchItem[]>({
      url: '/search/hot'
    })
}
