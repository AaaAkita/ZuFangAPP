import { apiRequest } from './client'

export interface LoginPayload {
  phone: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  nickname?: string
}

export interface LoginResponse {
  token: string
  userId: number
  nickname?: string
  avatar?: string
  role?: string
}

export interface ProfileResponse {
  id: number
  phone?: string
  nickname?: string
  avatar?: string
  createdAt?: string
}

export interface WechatLoginPayload {
  code: string
  userInfo?: {
    nickname?: string
    avatar?: string
    gender?: number
    province?: string
    city?: string
  }
}

export interface WechatLoginResponse {
  token: string
  user: {
    id: number
    phone?: string
    nickname?: string
    avatar?: string
  }
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiRequest<LoginResponse>({
      url: '/auth/register',
      method: 'POST',
      withAuth: false,
      data: payload
    }),

  login: (payload: LoginPayload) =>
    apiRequest<LoginResponse>({
      url: '/auth/login',
      method: 'POST',
      withAuth: false,
      data: payload
    }),

  getProfile: () =>
    apiRequest<ProfileResponse>({
      url: '/users/profile',
      method: 'GET',
      withAuth: true
    }),

  wechatLogin: (payload: WechatLoginPayload) =>
    apiRequest<WechatLoginResponse>({
      url: '/auth/wechat',
      method: 'POST',
      withAuth: false,
      data: payload
    }),

  refreshWechatToken: (code: string) =>
    apiRequest<WechatLoginResponse>({
      url: '/auth/wechat/refresh',
      method: 'POST',
      withAuth: false,
      data: { code }
    })
}
