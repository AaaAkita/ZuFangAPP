import { apiRequest } from './client'

export interface CommentUser {
  id: number
  nickname?: string
  avatar?: string
}

export interface CommunityBrief {
  id: number
  name: string
  district?: string
}

export interface CommentEntity {
  id: number
  userId: number
  communityId: number
  content: string
  tags: string[]
  rating: number
  likeCount: number
  isAnonymous: boolean
  isVerified: boolean
  createdAt: string
  user?: CommentUser | null
  community?: CommunityBrief | null
}

export interface CommentListResult {
  items: CommentEntity[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PublishCommentPayload {
  communityId: number
  content: string
  rating: number
  tags?: string[]
  images?: string[]
  videos?: string[]
  isAnonymous?: boolean
}

interface QueryCommentParams {
  communityId?: number
  page?: number
  limit?: number
  sortBy?: 'createdAt' | 'likeCount'
  order?: 'asc' | 'desc'
}

function toQuery(params: QueryCommentParams = {}): string {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value))
    }
  })
  const queryString = query.toString()
  return queryString ? `?${queryString}` : ''
}

export const commentApi = {
  list: (params: QueryCommentParams = {}) =>
    apiRequest<CommentListResult>({
      url: `/comments${toQuery(params)}`
    }),

  publish: (payload: PublishCommentPayload) =>
    apiRequest<CommentEntity>({
      url: '/comments',
      method: 'POST',
      data: payload
    })
}
