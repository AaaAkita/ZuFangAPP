import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import Login from './login.vue'

// Mock uni API
const mockUni = {
  showToast: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  navigateBack: vi.fn(),
  switchTab: vi.fn(),
  navigateTo: vi.fn(),
  setStorageSync: vi.fn(),
  getStorageSync: vi.fn(() => '')
}

vi.stubGlobal('uni', mockUni)

// Mock fetch for API calls
global.fetch = vi.fn() as any

describe('鎵嬫満鍙风櫥褰曞姛鑳?, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('琛ㄥ崟楠岃瘉', () => {
    it('鏄剧ず鎵嬫満鍙峰拰瀵嗙爜杈撳叆妗?, () => {
      render(Login)

      expect(screen.getByPlaceholderText(/鎵嬫満鍙?)).toBeTruthy()
      expect(screen.getByPlaceholderText(/瀵嗙爜/)).toBeTruthy()
    })

    it('楠岃瘉鎵嬫満鍙蜂笉涓虹┖', async () => {
      render(Login)

      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/鐧诲綍/)

      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '璇疯緭鍏ユ墜鏈哄彿' })
      )
    })

    it('楠岃瘉鎵嬫満鍙锋牸寮?, async () => {
      render(Login)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/鐧诲綍/)

      await fireEvent.update(phoneInput, '123')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '璇疯緭鍏ユ湁鏁堢殑11浣嶆墜鏈哄彿' })
      )
    })

    it('楠岃瘉瀵嗙爜涓嶄负绌?, async () => {
      render(Login)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const submitButton = screen.getByText(/鐧诲綍/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '璇疯緭鍏ュ瘑鐮? })
      )
    })
  })

  describe('鐧诲綍 API 璋冪敤', () => {
    it('鐧诲綍鎴愬姛鏃朵繚瀛?Token 骞惰烦杞椤?, async () => {
      const mockResponse = {
        success: true,
        data: {
          id: 1,
          phone: '13800138000',
          nickname: '娴嬭瘯鐢ㄦ埛',
          token: 'mock-jwt-token'
        },
        message: '鐧诲綍鎴愬姛'
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as any)

      render(Login)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/鐧诲綍/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      expect(mockUni.showLoading).toHaveBeenCalledWith({ title: '鐧诲綍涓?..' })

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/v1/auth/login'),
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              'Content-Type': 'application/json'
            }),
            body: expect.stringContaining('13800138000')
          })
        )
      })

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '鐧诲綍鎴愬姛', icon: 'success' })
      )

      expect(mockUni.setStorageSync).toHaveBeenCalledWith('token', 'mock-jwt-token')
      expect(mockUni.setStorageSync).toHaveBeenCalledWith('userInfo', mockResponse.data)

      expect(mockUni.switchTab).toHaveBeenCalledWith({ url: '/pages/home/home' })
    })

    it('鐧诲綍澶辫触鏃舵樉绀洪敊璇俊鎭?, async () => {
      const mockErrorResponse = {
        success: false,
        error: {
          message: '鐢ㄦ埛鍚嶆垨瀵嗙爜閿欒'
        }
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse
      } as any)

      render(Login)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/鐧诲綍/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, 'wrongpassword')
      await fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockUni.showToast).toHaveBeenCalledWith(
          expect.objectContaining({ title: '鐢ㄦ埛鍚嶆垨瀵嗙爜閿欒', icon: 'none' })
        )
      })
    })

    it('缃戠粶閿欒鏃舵樉绀哄弸濂芥彁绀?, async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      render(Login)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/鐧诲綍/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockUni.showToast).toHaveBeenCalledWith(
          expect.objectContaining({ title: '缃戠粶閿欒锛岃閲嶈瘯', icon: 'none' })
        )
      })
    })
  })

  describe('鐢ㄦ埛浣撻獙', () => {
    it('瀵嗙爜鍙鎬у垏鎹?, async () => {
      render(Login)

      const toggleButton = screen.getByRole('button', { name: /鍒囨崲瀵嗙爜鍙鎬? })
      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)

      // 榛樿闅愯棌瀵嗙爜
      expect(passwordInput).toHaveAttribute('password', 'true')

      // 鍒囨崲鏄剧ず
      await fireEvent.click(toggleButton)
      expect(passwordInput).toHaveAttribute('password', 'false')

      // 鍐嶆鍒囨崲闅愯棌
      await fireEvent.click(toggleButton)
      expect(passwordInput).toHaveAttribute('password', 'true')
    })

    it('鐐瑰嚮蹇樿瀵嗙爜鏄剧ず鎻愮ず', () => {
      render(Login)

      const forgotLink = screen.getByText(/蹇樿瀵嗙爜/)
      fireEvent.click(forgotLink)

      expect(mockUni.showToast).toHaveBeenCalledWith(

        expect.objectContaining({ title: '蹇樿瀵嗙爜鍔熻兘寮€鍙戜腑' })
      )
    })

    it('鐐瑰嚮绔嬪嵆娉ㄥ唽璺宠浆娉ㄥ唽椤?, () => {
      render(Login)

      const registerLink = screen.getByText(/绔嬪嵆娉ㄥ唽/)
      fireEvent.click(registerLink)

      expect(mockUni.navigateTo).toHaveBeenCalledWith({ url: '/pages/register/register' })
    })
  })

  describe('绀句氦鐧诲綍鍔熻兘', () => {
    it('寰俊鐧诲綍鏄剧ず寮€鍙戜腑鎻愮ず', () => {
      render(Login)

      const wechatButton = screen.getByRole('button', { name: /寰俊鐧诲綍/ })
      fireEvent.click(wechatButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '寰俊鐧诲綍鍔熻兘寮€鍙戜腑' })
      )
    })

    it('Apple鐧诲綍鏄剧ず寮€鍙戜腑鎻愮ず', () => {
      render(Login)

      const appleButton = screen.getByRole('button', { name: /Apple鐧诲綍/ })
      fireEvent.click(appleButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Apple鐧诲綍鍔熻兘寮€鍙戜腑' })
      )
    })

    it('鏇村鐧诲綍鏂瑰紡鏄剧ず寮€鍙戜腑鎻愮ず', () => {
      render(Login)

      const moreButton = screen.getByRole('button', { name: /鏇村鐧诲綍鏂瑰紡/ })
      fireEvent.click(moreButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '鏇村鐧诲綍鏂瑰紡寮€鍙戜腑' })
      )
    })
  })
})

