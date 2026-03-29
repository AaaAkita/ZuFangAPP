import { request } from '@/utils/request'

export interface ApiEnvelope<T> {
  success: boolean
  data: T
  message: string
  timestamp: string
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export interface RequestConfig {
  url: string
  method?: NonNullable<UniApp.RequestOptions['method']>
  data?: any
  withAuth?: boolean
}

export async function apiRequest<T>(config: RequestConfig): Promise<T> {
  const response = await request<ApiEnvelope<T>>({
    url: config.url,
    method: config.method || 'GET',
    data: config.data,
    withAuth: config.withAuth
  })

  if (!response.success) {
    throw new Error(response.error?.message || response.message || '请求失败')
  }

  return response.data
}

export function getErrorMessage(error: unknown, fallback = '请求失败，请稍后重试'): string {
  if (error instanceof Error && error.message) {
    return error.message
  }

  const anyError = error as any
  const backendMessage = anyError?.data?.error?.message || anyError?.error?.message
  if (typeof backendMessage === 'string' && backendMessage) {
    return backendMessage
  }

  return fallback
}
