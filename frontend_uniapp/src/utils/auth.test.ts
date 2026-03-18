import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAuthStore } from './auth'
import { nextTick } from 'vue'

// Mock uni API
const mockUni = {
  getStorageSync: vi.fn(),
  setStorageSync: vi.fn(),
  removeStorageSync: vi.fn(),
  clearStorageSync: vi.fn(),
  showToast: vi.fn()
}

vi.stubGlobal('uni', mockUni)

describe('登录状态管理 (useAuthStore)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUni.getStorageSync.mockReturnValue('')
  })

  afterEach(() => {
    // 清理 store 单例
    vi.unstubAllGlobals()
  })

  describe('初始化', () => {
    it('从本地存储加载登录状态', () => {
      mockUni.getStorageSync.mockImplementation((key: string) => {
        if (key === 'token') return 'test-token'
        if (key === 'userInfo') return JSON.stringify({ id: 1, phone: '13800138000' })
        return ''
      })

      const authStore = useAuthStore()

      expect(authStore.token).toBe('test-token')
      expect(authStore.userInfo).toEqual({ id: 1, phone: '13800138000' })
      expect(authStore.isLoggedIn).toBe(true)
    })

    it('默认为未登录状态', () => {
      const authStore = useAuthStore()

      expect(authStore.token).toBe('')
      expect(authStore.userInfo).toBe(null)
      expect(authStore.isLoggedIn).toBe(false)
    })
  })

  describe('登录功能', () => {
    it('设置 Token 并保存到本地存储', () => {
      const authStore = useAuthStore()
      authStore.setToken('new-test-token')

      expect(authStore.token).toBe('new-test-token')
      expect(mockUni.setStorageSync).toHaveBeenCalledWith('token', 'new-test-token')
    })

    it('设置用户信息并保存到本地存储', () => {
      const userInfo = { id: 1, phone: '13800138000', nickname: '测试用户' }
      const authStore = useAuthStore()
      authStore.setUserInfo(userInfo)

      expect(authStore.userInfo).toEqual(userInfo)
      expect(mockUni.setStorageSync).toHaveBeenCalledWith('userInfo', userInfo)
    })

    it('登录后更新登录状态', () => {
      const authStore = useAuthStore()

      authStore.setToken('test-token')
      authStore.setUserInfo({ id: 1, phone: '13800138000' })

      expect(authStore.isLoggedIn).toBe(true)
    })

    it('提供便捷的登录方法', () => {
      const userInfo = { id: 1, phone: '13800138000', nickname: '测试用户' }
      const authStore = useAuthStore()

      authStore.login('test-token', userInfo)

      expect(authStore.token).toBe('test-token')
      expect(authStore.userInfo).toEqual(userInfo)
      expect(authStore.isLoggedIn).toBe(true)
      expect(mockUni.setStorageSync).toHaveBeenCalledWith('token', 'test-token')
      expect(mockUni.setStorageSync).toHaveBeenCalledWith('userInfo', userInfo)
    })
  })

  describe('登出功能', () => {
    it('清除 Token 和用户信息', () => {
      mockUni.getStorageSync.mockImplementation((key: string) => {
        if (key === 'token') return 'test-token'
        return ''
      })

      const authStore = useAuthStore()

      // 先登录
      authStore.login('test-token', { id: 1, phone: '13800138000' })

      // 登出
      authStore.logout()

      expect(authStore.token).toBe('')
      expect(authStore.userInfo).toBe(null)
      expect(authStore.isLoggedIn).toBe(false)
    })

    it('清除本地存储', () => {
      mockUni.getStorageSync.mockReturnValue('test-token')

      const authStore = useAuthStore()
      authStore.login('test-token', { id: 1, phone: '13800138000' })
      authStore.logout()

      expect(mockUni.removeStorageSync).toHaveBeenCalledWith('token')
      expect(mockUni.removeStorageSync).toHaveBeenCalledWith('userInfo')
    })

    it('显示登出成功提示', () => {
      mockUni.getStorageSync.mockReturnValue('test-token')

      const authStore = useAuthStore()
      authStore.login('test-token', { id: 1, phone: '13800138000' })
      authStore.logout()

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '已退出登录', icon: 'success' })
      )
    })
  })

  describe('API 请求拦截', () => {
    it('自动将 Token 添加到请求头', () => {
      const authStore = useAuthStore()
      authStore.setToken('test-token')

      const headers = authStore.getRequestHeaders()

      expect(headers).toEqual({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      })
    })

    it('未登录时不添加 Authorization 头', () => {
      const authStore = useAuthStore()

      const headers = authStore.getRequestHeaders()

      expect(headers).toEqual({
        'Content-Type': 'application/json'
      })
      expect(headers['Authorization']).toBeUndefined()
    })
  })

  describe('Token 验证', () => {
    it('检查 Token 是否存在', () => {
      const authStore = useAuthStore()

      expect(authStore.hasToken()).toBe(false)

      authStore.setToken('test-token')

      expect(authStore.hasToken()).toBe(true)
    })

    it('检查 Token 是否过期（简单实现）', () => {
      const authStore = useAuthStore()

      // 没有过期时间设置时，默认为不过期
      authStore.setToken('test-token')

      expect(authStore.isTokenExpired()).toBe(false)
    })
  })

  describe('用户信息获取', () => {
    it('获取用户 ID', () => {
      const authStore = useAuthStore()
      authStore.setUserInfo({ id: 123, phone: '13800138000' })

      expect(authStore.userId).toBe(123)
    })

    it('未登录时返回 null', () => {
      const authStore = useAuthStore()

      expect(authStore.userId).toBe(null)
    })

    it('获取用户昵称', () => {
      const authStore = useAuthStore()
      authStore.setUserInfo({ id: 1, phone: '13800138000', nickname: '测试用户' })

      expect(authStore.userNickname).toBe('测试用户')
    })

    it('获取手机号', () => {
      const authStore = useAuthStore()
      authStore.setUserInfo({ id: 1, phone: '13800138000' })

      expect(authStore.userPhone).toBe('13800138000')
    })
  })
})
