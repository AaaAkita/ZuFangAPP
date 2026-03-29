import { authApi } from '@/api/auth'
import { getErrorMessage } from '@/api/client'
import { useAuthStore } from './auth'

interface WechatUserInfo {
  nickName: string
  avatarUrl: string
  gender: number
  city: string
  province: string
}

interface WechatLoginResponse {
  code?: string
  errMsg?: string
}

interface WechatProfileResponse {
  userInfo?: WechatUserInfo
  errMsg?: string
}

export async function wechatLogin() {
  try {
    const loginRes = (await uni.login({
      provider: 'weixin'
    })) as unknown as WechatLoginResponse

    if (!loginRes?.code || loginRes.errMsg !== 'login:ok') {
      uni.showToast({ title: '微信登录失败', icon: 'none' })
      return false
    }

    let profile: WechatUserInfo | undefined
    try {
      const profileRes = (await uni.getUserProfile({
        withCredentials: true,
        lang: 'zh_CN'
      })) as unknown as WechatProfileResponse

      if (profileRes?.errMsg === 'getUserProfile:ok' && profileRes.userInfo) {
        profile = profileRes.userInfo
      }
    } catch {
      profile = undefined
    }

    uni.showLoading({ title: '登录中...' })

    const data = await authApi.wechatLogin({
      code: loginRes.code,
      userInfo: profile
        ? {
            nickname: profile.nickName,
            avatar: profile.avatarUrl,
            gender: profile.gender,
            city: profile.city,
            province: profile.province
          }
        : undefined
    })

    const store = useAuthStore()
    store.setToken(data.token)
    store.setUserInfo({
      id: data.user?.id || 0,
      phone: data.user?.phone || '',
      nickname: data.user?.nickname || profile?.nickName || '微信用户',
      avatar: data.user?.avatar || profile?.avatarUrl || ''
    })

    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      uni.switchTab({ url: '/pages/home/home' })
    }, 1200)

    return true
  } catch (error) {
    uni.showToast({
      title: getErrorMessage(error, '登录失败，请重试'),
      icon: 'none'
    })
    return false
  } finally {
    uni.hideLoading()
  }
}

export async function refreshWechatToken() {
  try {
    const loginRes = (await uni.login({
      provider: 'weixin'
    })) as unknown as WechatLoginResponse

    if (!loginRes?.code || loginRes.errMsg !== 'login:ok') {
      return null
    }

    const result = await authApi.refreshWechatToken(loginRes.code)
    return result.token
  } catch {
    return null
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
  const length = Math.max(current.length, target.length)

  for (let index = 0; index < length; index += 1) {
    if ((current[index] || 0) < (target[index] || 0)) {
      return false
    }
  }

  return true
}

export function shareToWechat(options: {
  title: string
  path?: string
  imageUrl?: string
}) {
  // #ifdef MP-WEIXIN
  return {
    title: options.title,
    path: options.path || '/pages/home/home',
    imageUrl: options.imageUrl
  }
  // #endif
  return {}
}
