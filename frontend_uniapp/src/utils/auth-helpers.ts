/**
 * 认证相关辅助函数
 * 提供公共的验证和请求逻辑
 */

import { config } from '@/config'

/**
 * 验证手机号格式
 */
export function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 验证密码强度（至少8位，包含字母和数字）
 */
export function validatePassword(password: string): boolean {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password)
}

/**
 * 密码码强度检测
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
 * API 请求错误处理
 */
export function handleApiError(error: unknown, defaultMessage: string = '操作失败，请重试') {
  console.error('API 请求失败:', error)

  const errorMessage = error instanceof Error
    ? error.message
    : defaultMessage

  uni.showToast({
    title: errorMessage,
    icon: 'none'
  })
}

/**
 * 成功提示并跳转
 */
export function handleSuccess(message: string, redirectUrl: string = '/pages/index/index') {
  uni.showToast({
    title: message,
    icon: 'success'
  })

  setTimeout(() => {
    uni.switchTab({ url: redirectUrl })
  }, 1500)
}
