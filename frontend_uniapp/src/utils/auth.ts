/**
 * 登录状态管理
 * 提供 Token 和用户信息的存储、获取、验证功能
 */

import { config } from '@/config'

interface UserInfo {
  id: number
  phone: string
  nickname?: string
  avatar?: string
}

// Store 单例
let store: {
  token: string
  userInfo: UserInfo | null
} | null = null

// 初始化 Store
function getStore() {
  if (!store) {
    // 从本地存储加载
    const token = uni.getStorageSync(config.storageKeys.token) || ''
    const userInfoStr = uni.getStorageSync(config.storageKeys.userInfo) || ''

    let userInfo: UserInfo | null = null
    if (userInfoStr) {
      try {
        userInfo = JSON.parse(userInfoStr)
      } catch (error) {
        console.error('解析用户信息失败:', error)
        userInfo = null
      }
    }

    store = {
      token,
      userInfo
    }
  }
  return store
}

/**
 * 登录状态管理 Hook
 */
export function useAuthStore() {
  const state = getStore()

  const setToken = (token: string) => {
    state.token = token
    uni.setStorageSync(config.storageKeys.token, token)
  }

  const setUserInfo = (userInfo: UserInfo) => {
    state.userInfo = userInfo
    uni.setStorageSync(config.storageKeys.userInfo, userInfo)
  }

  const login = (token: string, userInfo: UserInfo) => {
    setToken(token)
    setUserInfo(userInfo)
  }

  const logout = () => {
    state.token = ''
    state.userInfo = null
    uni.removeStorageSync(config.storageKeys.token)
    uni.removeStorageSync(config.storageKeys.userInfo)
    uni.showToast({
      title: '已退出登录',
      icon: 'success'
    })
  }

  const getRequestHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    if (state.token) {
      headers['Authorization'] = `Bearer ${state.token}`
    }

    return headers
  }

  const hasToken = (): boolean => {
    return !!state.token && state.token.length > 0
  }

  const isTokenExpired = (): boolean => {
    // 简单实现：Token 存在即为有效
    // 后续可以添加过期时间检查
    return false
  }

  return {
    // 状态
    token: state.token,
    userInfo: state.userInfo,
    isLoggedIn: hasToken() && !isTokenExpired(),

    // 用户信息快捷访问
    userId: state.userInfo?.id || null,
    userNickname: state.userInfo?.nickname || '',
    userPhone: state.userInfo?.phone || '',

    // 方法
    setToken,
    setUserInfo,
    login,
    logout,
    hasToken,
    isTokenExpired,
    getRequestHeaders
  }
}

/**
 * API 请求封装
 */
const API_BASE_URL = config.apiBaseUrl

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

/**
 * 封装的 fetch 请求，自动处理 Token
 */
export async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const authStore = useAuthStore()

  const defaultOptions: RequestInit = {
    headers: authStore.getRequestHeaders()
  }

  // 合并选项，如果用户提供了 headers，会覆盖默认的
  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers as Record<string, string>,
      ...(options.headers as Record<string, string>)
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions)
    const data = await response.json()

    return data as ApiResponse<T>
  } catch (error) {
    console.error('API 请求失败:', error)
    throw error
  }
}

/**
 * API 方法快捷封装
 */
export const api = {
  get: <T = any>(endpoint: string) =>
    request<T>(endpoint, { method: 'GET' }),

  post: <T = any>(endpoint: string, body?: any) =>
    request<T>(endpoint, {
    method: 'POST',
      body: body ? JSON.stringify(body) : undefined
    }),

  put: <T = any>(endpoint: string, body?: any) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined
    }),

  delete: <T = any>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' })
}

/**
 * 认证相关 API
 */
export const authApi = {
  // 注册
  register: (phone: string, password: string, nickname?: string) =>
    api.post('/auth/register', { phone, password, nickname }),

  // 登录
  login: (phone: string, password: string) =>
    api.post('/auth/login', { phone, password }),

  // 获取当前用户信息
  getProfile: () => api.get('/users/profile')
}

/**
 * 请求拦截器 - 检查登录状态
 */
export function requireAuth() {
  const authStore = useAuthStore()

  if (!authStore.isLoggedIn) {
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

/**
 * 请求拦截器 - 检查 Token 是否过期
 */
export function checkAuthBeforeRequest() {
  const authStore = useAuthStore()

  if (authStore.isTokenExpired()) {
    authStore.logout()

    setTimeout(() => {
      uni.navigateTo({ url: '/pages/login/index' })
    }, 1500)

    return false
  }

  return true
}
