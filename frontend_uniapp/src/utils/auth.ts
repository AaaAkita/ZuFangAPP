/**
 * Auth store and auth-related API helpers.
 */

import { config } from '@/config'
import { request as httpRequest } from './request'

export interface UserInfo {
  id: number
  phone: string
  nickname?: string
  avatar?: string
  createdAt?: string | number
}

interface AuthState {
  token: string
  userInfo: UserInfo | null
  initialized: boolean
}

const state: AuthState = {
  token: '',
  userInfo: null,
  initialized: false
}

function initStateFromStorage() {
  if (state.initialized) return

  const rawToken = uni.getStorageSync(config.storageKeys.token)
  state.token = typeof rawToken === 'string' ? rawToken : ''

  const rawUserInfo = uni.getStorageSync(config.storageKeys.userInfo)

  if (typeof rawUserInfo === 'string' && rawUserInfo) {
    try {
      state.userInfo = JSON.parse(rawUserInfo) as UserInfo
    } catch (error) {
      console.error('解析用户信息失败:', error)
      state.userInfo = null
      uni.removeStorageSync(config.storageKeys.userInfo)
    }
  } else if (rawUserInfo && typeof rawUserInfo === 'object') {
    // Backward compatibility: old versions stored plain object directly.
    state.userInfo = rawUserInfo as UserInfo
  }

  state.initialized = true
}

function setToken(token: string) {
  initStateFromStorage()
  state.token = token

  if (token) {
    uni.setStorageSync(config.storageKeys.token, token)
  } else {
    uni.removeStorageSync(config.storageKeys.token)
  }
}

function setUserInfo(userInfo: UserInfo | null) {
  initStateFromStorage()
  state.userInfo = userInfo

  if (userInfo) {
    uni.setStorageSync(config.storageKeys.userInfo, JSON.stringify(userInfo))
  } else {
    uni.removeStorageSync(config.storageKeys.userInfo)
  }
}

function hasToken(): boolean {
  initStateFromStorage()
  return !!state.token && state.token.length > 0
}

function isTokenExpired(): boolean {
  // TODO: Add JWT exp parsing / refresh token strategy when backend finalizes token contract.
  return false
}

function getRequestHeaders() {
  initStateFromStorage()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`
  }

  return headers
}

function login(token: string, userInfo: UserInfo) {
  setToken(token)
  setUserInfo(userInfo)
}

function logout() {
  initStateFromStorage()
  state.token = ''
  state.userInfo = null

  uni.removeStorageSync(config.storageKeys.token)
  uni.removeStorageSync(config.storageKeys.userInfo)

  uni.showToast({
    title: '已退出登录',
    icon: 'success'
  })
}

const authStore = {
  get token() {
    initStateFromStorage()
    return state.token
  },

  get userInfo() {
    initStateFromStorage()
    return state.userInfo
  },

  get isLoggedIn() {
    return hasToken() && !isTokenExpired()
  },

  get userId() {
    initStateFromStorage()
    return state.userInfo?.id ?? null
  },

  get userNickname() {
    initStateFromStorage()
    return state.userInfo?.nickname ?? ''
  },

  get userPhone() {
    initStateFromStorage()
    return state.userInfo?.phone ?? ''
  },

  setToken,
  setUserInfo,
  login,
  logout,
  hasToken,
  isTokenExpired,
  getRequestHeaders
}

/**
 * Auth state management composable.
 */
export function useAuthStore() {
  initStateFromStorage()
  return authStore
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: {
    statusCode: number
    message: string
    path?: string
  }
  timestamp?: number
}

interface ApiRequestOptions {
  method?: NonNullable<UniApp.RequestOptions['method']>
  data?: any
  header?: Record<string, any>
  withAuth?: boolean
}

/**
 * Unified API request helper for auth/business modules.
 */
export async function request<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  return httpRequest<ApiResponse<T>>({
    url: endpoint,
    method: options.method || 'GET',
    data: options.data,
    header: options.header,
    withAuth: options.withAuth
  })
}

/**
 * API quick helpers.
 */
export const api = {
  get: <T = any>(endpoint: string) =>
    request<T>(endpoint, { method: 'GET' }),

  post: <T = any>(endpoint: string, data?: any) =>
    request<T>(endpoint, {
      method: 'POST',
      data
    }),

  put: <T = any>(endpoint: string, data?: any) =>
    request<T>(endpoint, {
      method: 'PUT',
      data
    }),

  delete: <T = any>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' })
}

/**
 * Auth-related backend APIs.
 */
export const authApi = {
  register: (phone: string, password: string, nickname?: string) =>
    api.post('/auth/register', { phone, password, nickname }),

  login: (phone: string, password: string) =>
    api.post('/auth/login', { phone, password }),

  getProfile: () => api.get('/users/profile')
}

export function requireAuth() {
  const store = useAuthStore()

  if (!store.isLoggedIn) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })

    setTimeout(() => {
      uni.navigateTo({ url: '/pages/login/index' })
    }, 1000)

    return false
  }

  return true
}

export function checkAuthBeforeRequest() {
  const store = useAuthStore()

  if (store.isTokenExpired()) {
    store.logout()

    setTimeout(() => {
      uni.navigateTo({ url: '/pages/login/index' })
    }, 1500)

    return false
  }

  return true
}
