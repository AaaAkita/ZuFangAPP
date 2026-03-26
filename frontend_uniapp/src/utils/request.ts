/**
 * Unified request wrapper for uni-app / mp-weixin.
 * All business-side network calls should go through this file.
 */

import { config } from '@/config'

type RequestMethod = NonNullable<UniApp.RequestOptions['method']>

export interface RequestOptions {
  url: string
  method?: RequestMethod
  data?: any
  header?: Record<string, any>
  timeout?: number
  withAuth?: boolean
}

function normalizeUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url
  return `${config.apiBaseUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

function getAuthHeader(): Record<string, string> {
  const token = uni.getStorageSync(config.storageKeys.token) || ''
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function request<T>(options: RequestOptions): Promise<T> {
  const {
    url,
    method = 'GET',
    data,
    header = {},
    timeout = config.requestTimeout,
    withAuth = true
  } = options

  return new Promise((resolve, reject) => {
    uni.request({
      url: normalizeUrl(url),
      method,
      data,
      timeout,
      header: {
        'Content-Type': 'application/json',
        ...(withAuth ? getAuthHeader() : {}),
        ...header
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T)
          return
        }

        reject({
          statusCode: res.statusCode,
          data: res.data,
          message: `HTTP ${res.statusCode}`,
          url
        })
      },
      fail: (err) => reject(err)
    })
  })
}

const http = {
  get: <T>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}) =>
    request<T>({ url, method: 'GET', data, ...options }),

  post: <T>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}) =>
    request<T>({ url, method: 'POST', data, ...options }),

  put: <T>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}) =>
    request<T>({ url, method: 'PUT', data, ...options }),

  delete: <T>(url: string, data?: any, options: Omit<RequestOptions, 'url' | 'method' | 'data'> = {}) =>
    request<T>({ url, method: 'DELETE', data, ...options })
}

export default http
