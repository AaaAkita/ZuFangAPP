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

describe('寰俊鐧诲綍鍔熻兘', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('寰俊鐧诲綍娴佺▼', () => {
    it('璋冪敤 uni.login 鑾峰彇 code', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '娴嬭瘯鐢ㄦ埛',
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
              nickname: '娴嬭瘯鐢ㄦ埛',
              avatar: 'https://example.com/avatar.png'
            }
          }
        })
      } as any)

      await wechatLogin()

      expect(mockUni.login).toHaveBeenCalledWith({ provider: 'weixin' })
    })

    it('鎴愬姛鐧诲綍鍚庝繚瀛?Token 鍜岀敤鎴蜂俊鎭?, async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '寰俊鐢ㄦ埛',
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
            nickname: '寰俊鐢ㄦ埛',
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

      expect(mockUni.showLoading).toHaveBeenCalledWith({ title: '鐧诲綍涓?..' })
      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '鐧诲綍鎴愬姛', icon: 'success' })
      )

      expect(mockUni.switchTab).toHaveBeenCalledWith({ url: '/pages/home/home' })
    })

    it('澶勭悊 uni.login 澶辫触', async () => {
      mockUni.login.mockResolvedValueOnce({
        errMsg: 'login:fail'
      })

      await wechatLogin()

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '寰俊鐧诲綍澶辫触', icon: 'none' })
      )
    })

    it('澶勭悊鍚庣鐧诲綍澶辫触', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '娴嬭瘯鐢ㄦ埛',
          avatarUrl: 'https://example.com/avatar.png'
        },
        errMsg: 'getUserProfile:ok'
      })

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          error: {
            message: '鎺堟潈宸茶繃鏈?
          }
        })
      } as any)

      await wechatLogin()

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '鎺堟潈宸茶繃鏈?, icon: 'none' })
      )
    })

    it('澶勭悊缃戠粶閿欒', async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '娴嬭瘯鐢ㄦ埛',
          avatarUrl: 'https://example.com/avatar.png'
        },
        errMsg: 'getUserProfile:ok'
      })

      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      await wechatLogin()

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '缃戠粶閿欒锛岃閲嶈瘯', icon: 'none' })
      )
    })
  })

  describe('鐢ㄦ埛淇℃伅鑾峰彇', () => {
    it('鑾峰彇鐢ㄦ埛澶村儚鍜屾樀绉?, async () => {
      mockUni.login.mockResolvedValueOnce({
        code: 'test-code',
        errMsg: 'login:ok'
      })

      mockUni.getUserProfile.mockResolvedValueOnce({
        userInfo: {
          nickName: '寰俊鐢ㄦ埛',
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

    it('浣跨敤榛樿鏄电О鍜屽ご鍍忓綋鑾峰彇澶辫触', async () => {
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

      // 渚濈劧搴旇鍙戦€佽姹傦紝浣跨敤榛樿鍊?
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe('棣栨鐧诲綍澶勭悊', () => {
    it('棣栨鐧诲綍鎻愮ず鐢ㄦ埛鎺堟潈', async () => {
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

      // 搴旇鑾峰彇鐢ㄦ埛淇℃伅锛堟樀绉般€佸ご鍍忥級
      expect(mockUni.getUserProfile).toHaveBeenCalled()
    })
  })
})

