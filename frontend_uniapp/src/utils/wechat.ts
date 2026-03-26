/**
 * WeChat auth helpers for MP-WEIXIN.
 */

import { useAuthStore } from './auth'
import { request as httpRequest } from './request'

interface WechatUserInfo {
  nickName: string
  avatarUrl: string
  gender: number
  city: string
  province: string
  country: string
  language: string
}

interface WechatLoginResponse {
  code: string
  errMsg: string
}

interface WechatUserInfoResponse {
  userInfo: WechatUserInfo
  rawData: string
  signature: string
  encryptedData: string
  iv: string
  errMsg: string
}

interface WechatAuthData {
  token: string
  user?: {
    id?: number
    phone?: string
    nickname?: string
    avatar?: string
  }
}

interface WechatAuthResponse {
  success: boolean
  data?: WechatAuthData
  message?: string
  error?: {
    message?: string
  }
}

export async function wechatLogin() {
  try {
    const loginRes: WechatLoginResponse = await uni.login({
      provider: 'weixin'
    }) as any

    if (loginRes.errMsg !== 'login:ok' || !loginRes.code) {
      uni.showToast({
        title: '微信登录失败',
        icon: 'none'
      })
      return false
    }

    const code = loginRes.code
    let userInfo: WechatUserInfo | null = null

    try {
      const userInfoRes: WechatUserInfoResponse = await uni.getUserProfile({
        withCredentials: true,
        lang: 'zh_CN'
      }) as any

      if (userInfoRes.errMsg === 'getUserProfile:ok') {
        userInfo = userInfoRes.userInfo
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }

    uni.showLoading({ title: '登录中...' })

    const data = await httpRequest<WechatAuthResponse>({
      url: '/auth/wechat',
      method: 'POST',
      withAuth: false,
      data: {
        code,
        userInfo: userInfo ? {
          nickname: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          gender: userInfo.gender,
          city: userInfo.city,
          province: userInfo.province,
          country: userInfo.country
        } : undefined
      }
    })

    uni.hideLoading()

    if (data.success && data.data?.token) {
      const authStore = useAuthStore()
      authStore.setToken(data.data.token)

      authStore.setUserInfo({
        id: data.data.user?.id || 0,
        phone: data.data.user?.phone || '',
        nickname: data.data.user?.nickname || userInfo?.nickName || '微信用户',
        avatar: data.data.user?.avatar || userInfo?.avatarUrl || ''
      })

      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })

      setTimeout(() => {
        uni.switchTab({ url: '/pages/index/index' })
      }, 1500)

      return true
    }

    uni.showToast({
      title: data.error?.message || data.message || '登录失败，请重试',
      icon: 'none'
    })
    return false
  } catch (error) {
    uni.hideLoading()
    console.error('微信登录失败:', error)

    uni.showToast({
      title: '网络错误，请重试',
      icon: 'none'
    })

    return false
  }
}

export function isWechatEnv(): boolean {
  // #ifdef MP-WEIXIN
  return true
  // #endif

  return false
}

export function getWechatVersion(): string {
  // #ifdef MP-WEIXIN
  const wxApi = (globalThis as any).wx
  if (wxApi && typeof wxApi.getAppBaseInfo === 'function') {
    const appBaseInfo = wxApi.getAppBaseInfo()
    return appBaseInfo?.SDKVersion || ''
  }
  // #endif

  const systemInfo = uni.getSystemInfoSync()
  return systemInfo.SDKVersion || ''
}

export function checkWechatVersion(version: string): boolean {
  const currentVersion = getWechatVersion()
  if (!currentVersion) return false

  const current = currentVersion.split('.').map(Number)
  const target = version.split('.').map(Number)

  for (let i = 0; i < target.length; i++) {
    if ((current[i] || 0) < (target[i] || 0)) {
      return false
    }
  }

  return true
}

export async function refreshWechatToken() {
  try {
    const loginRes: WechatLoginResponse = await uni.login({
      provider: 'weixin'
    }) as any

    if (loginRes.errMsg !== 'login:ok' || !loginRes.code) {
      return null
    }

    const data = await httpRequest<WechatAuthResponse>({
      url: '/auth/wechat/refresh',
      method: 'POST',
      withAuth: false,
      data: {
        code: loginRes.code
      }
    })

    if (data.success && data.data?.token) {
      return data.data.token
    }

    return null
  } catch (error) {
    console.error('刷新 Token 失败:', error)
    return null
  }
}

export function shareToWechat(options: {
  title: string
  path?: string
  imageUrl?: string
}) {
  // #ifdef MP-WEIXIN
  return {
    title: options.title,
    path: options.path || '/pages/index/index',
    imageUrl: options.imageUrl
  }
  // #endif

  return {}
}
