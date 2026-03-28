/**
 * 璁よ瘉鐩稿叧杈呭姪鍑芥暟
 * 鎻愪緵鍏叡鐨勯獙璇佸拰璇锋眰閫昏緫
 */

import { config } from '@/config'

/**
 * 楠岃瘉鎵嬫満鍙锋牸寮?
 */
export function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 楠岃瘉瀵嗙爜寮哄害锛堣嚦灏?浣嶏紝鍖呭惈瀛楁瘝鍜屾暟瀛楋級
 */
export function validatePassword(password: string): boolean {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password)
}

/**
 * 瀵嗙爜鐮佸己搴︽娴?
 */
export interface PasswordStrength {
  length: boolean
  hasLetterAndNumber: boolean
}

export function getPasswordStrength(password: string): PasswordStrength {
  return {
    length: password.length >= 8,
    hasLetterAndNumber: /[A-Za-z]/.test(password) && /[0-9]/.test(password)
  }
}

/**
 * API 璇锋眰閿欒澶勭悊
 */
export function handleApiError(error: unknown, defaultMessage: string = '鎿嶄綔澶辫触锛岃閲嶈瘯') {
  console.error('API 璇锋眰澶辫触:', error)

  const errorMessage = error instanceof Error
    ? error.message
    : defaultMessage

  uni.showToast({
    title: errorMessage,
    icon: 'none'
  })
}

/**
 * 鎴愬姛鎻愮ず骞惰烦杞?
 */
export function handleSuccess(message: string, redirectUrl: string = '/pages/home/home') {
  uni.showToast({
    title: message,
    icon: 'success'
  })

  setTimeout(() => {
    uni.switchTab({ url: redirectUrl })
  }, 1500)
}

