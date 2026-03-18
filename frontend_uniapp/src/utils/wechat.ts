/**
 * 微信登录工具
 * 处理微信小程序的登录、授权流程
 */

import { useAuthStore } from './auth'
import { config } from '@/config'

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

/**
 * 微信登录主函数
 */
export async function wechatLogin() {
  try {
    // 1. 调用微信登录获取 code
    const loginRes: WechatLoginResponse = await uni.login({
      provider: 'weixin'
    }) as any

    if (loginRes.errMsg !== 'login:ok') {
      uni.showToast({
        title: '微信登录失败',
        icon: 'none'
      })
      return false
    }

    const code = loginRes.code

    // 2. 获取用户信息（头像、昵称等）
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
      // 继续登录流程，使用默认信息
    }

    uni.showLoading({ title: '登录中...' })

    // 3. 调用后端微信登录接口
    const response = await fetch(`${config.apiBaseUrl}/auth/wechat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        userInfo: userInfo ? {
          nickname: userInfo.nickName,
          avatar: userInfo.avatarUrl,
          gender: userInfo.gender,
          city: userInfo.city,
          province: userInfo.province,
          country: userInfo.country
        } : undefined
      })
    })

    uni.hideLoading()

    const data = await response.json()

    if (data.success && data.data?.token) {
      const authStore = useAuthStore()

      // 保存 Token和用户信息
      authStore.setToken(data.data.token)

      // 构建用户信息对象
      const userObj = {
        id: data.data.user?.id || 0,
        phone: data.data.user?.phone || '',
        nickname: data.data.user?.nickname || userInfo?.nickName || '微信用户',
        avatar: data.data.user?.avatar || userInfo?.avatarUrl || ''
      }

      authStore.setUserInfo(userObj)

      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })

      // 跳转到首页
      setTimeout(() => {
        uni.switchTab({ url: '/pages/index/index' })
      }, 1500)

      return true
    } else {
      uni.showToast({
        title: data.error?.message || data.message || '登录失败，请重试',
        icon: 'none'
      })
      return false
    }
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

/**
 * 检查是否在微信环境中
 */
export function isWechatEnv(): boolean {
  // #ifdef MP-WEIXIN
  return true
  // #endif

  return false
}

/**
 * 获取微信版本
 */
export function getWechatVersion(): string {
  const systemInfo = uni.getSystemInfoSync()
  return systemInfo.SDKVersion || ''
}

/**
 * 检查微信版本是否支持某功能
 */
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

/**
 * 刷新 Token（使用微信静默刷新）
 */
export async function refreshWechatToken() {
  try {
    const loginRes: WechatLoginResponse = await uni.login({
      provider: 'weixin'
    }) as any

    if (loginRes.errMsg !== 'login:ok') {
      return null
    }

    const response = await fetch(`${config.apiBaseUrl}/auth/wechat/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: loginRes.code
      })
    })

    const data = await response.json()

    if (data.success && data.data?.token) {
      return data.data.token
    }

    return null
  } catch (error) {
    console.error('刷新 Token 失败:', error)
    return null
  }
}

/**
 * 分享到微信
 */
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
