import { describe, it, expect, vi, beforeEach } from 'vitest'
import { wechatLogin } from './wechat'

// Mock uni API
const mockUni = {
  login: vi.fn(),
  showToast: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  switchTab: vi.fn(),
  getUserProfile: vi.fn()
}

vi.stubGlobal('uni', mockUni)

// Mock auth store
vi.mock('./auth', () => ({
  useAuthStore: vi.fn(() => ({
    login: vi.fn(),
    setToken: vi.fn(),
    setUserInfo: vi.fn()
  }))
}))

// Mock fetch
global.fetch = vi.fn() as any

describe('微信登录功能', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('微信登录流程', () => {
    it('调用 uni.login 获取 code', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '测试用户',
          avatarUrl: 'https://example.com/avatar.png'
        },
        errMsg: 'getUserProfile:ok'
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            token: 'mock-jwt-token',
            user: {
              id: 1,
              phone: '13800138000',
              nickname: '测试用户',
              avatar: 'https://example.com/avatar.png'
            }
          }
        })
      } as any)

      await wechatLogin()

      expect(mockUni.login).toHaveBeenCalledWith({ provider: 'weixin' })
    })

    it('成功登录后保存 Token 和用户信息', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '微信用户',
          avatarUrl: 'https://example.com/avatar.png'
        },
        errMsg: 'getUserProfile:ok'
      })

      const mockResponse = {
        success: true,
        data: {
          token: 'mock-jwt-token',
          user: {
            id: 1,
            phone: '13800138000',
            nickname: '微信用户',
            avatar: 'https://example.com/avatar.png'
          }
        }
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as any)

      await wechatLogin()

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/auth/wechat'),
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('test-code')
        })
      )

      expect(mockUni.showLoading).toHaveBeenCalledWith({ title: '登录中...' })
      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '登录成功', icon: 'success' })
      )

      expect(mockUni.switchTab).toHaveBeenCalledWith({ url: '/pages/index/index' })
    })

    it('处理 uni.login 失败', async () => {
      mockUni.login.mockResolvedValueOnce({
        errMsg: 'login:fail'
      })

      await wechatLogin()

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '微信登录失败', icon: 'none' })
      )
    })

    it('处理后端登录失败', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '测试用户',
          avatarUrl: 'https://example.com/avatar.png'
        },
        errMsg: 'getUserProfile:ok'
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          error: {
            message: '授权已过期'
          }
        })
      } as any)

      await wechatLogin()

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '授权已过期', icon: 'none' })
      )
    })

    it('处理网络错误', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '测试用户',
          avatarUrl: 'https://example.com/avatar.png'
        },
        errMsg: 'getUserProfile:ok'
      })

      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await wechatLogin()

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '网络错误，请重试', icon: 'none' })
      )
    })
  })

  describe('用户信息获取', () => {
    it('获取用户头像和昵称', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '微信用户',
          avatarUrl: 'https://example.com/avatar.png',
          gender: 1,
          language: 'zh_CN'
        },
        errMsg: 'getUserProfile:ok'
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            token: 'mock-jwt-token',
            user: {
              id: 1,
              phone: '13800138000'
            }
          }
        })
      } as any)

      await wechatLogin()

      expect(mockUni.getUserProfile).toHaveBeenCalledWith({
        withCredentials: true,
        lang: 'zh_CN'
      })
    })

    it('使用默认昵称和头像当获取失败', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        errMsg: 'getUserProfile:fail'
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            token: 'mock-jwt-token',
            user: {
              id: 1,
              phone: '13800138000'
            }
          }
        })
      } as any)

      await wechatLogin()

      // 依然应该发送请求，使用默认值
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe('首次登录处理', () => {
    it('首次登录提示用户授权', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            token: 'mock-jwt-token',
            user: {
              id: 1,
              phone: '13800138000',
              isFirstLogin: true
            }
          }
        })
      } as any)

      await wechatLogin()

      // 应该获取用户信息（昵称、头像）
      expect(mockUni.getUserProfile).toHaveBeenCalled()
    })
  })
})
