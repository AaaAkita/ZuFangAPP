import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import Register from './register.vue'

// Mock uni API
const mockUni = {
  showToast: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  navigateBack: vi.fn(),
  navigateTo: vi.fn(),
  setStorageSync: vi.fn(),
  getStorageSync: vi.fn(() => '')
}

vi.stubGlobal('uni', mockUni)

// Mock fetch for API calls
global.fetch = vi.fn() as any

describe('鎵嬫満鍙锋敞鍐屽姛鑳?, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('琛ㄥ崟楠岃瘉', () => {
    it('鏄剧ず鎵嬫満鍙枫€佹樀绉般€佸瘑鐮佽緭鍏ユ', () => {
      render(Register)

      expect(screen.getByPlaceholderText(/鎵嬫満鍙?)).toBeTruthy()
      expect(screen.getByPlaceholderText(/鏄电О/)).toBeTruthy()
      expect(screen.getByPlaceholderText(/瀵嗙爜/)).toBeTruthy()
    })

    it('楠岃瘉鎵嬫満鍙锋牸寮?- 11浣嶆暟瀛?, async () => {
      render(Register)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const submitButton = screen.getByText(/娉ㄥ唽/)

      // 杈撳叆鏃犳晥鎵嬫満鍙?
      await fireEvent.update(phoneInput, '123')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '璇疯緭鍏ユ湁鏁堢殑11浣嶆墜鏈哄彿' })
      )
    })

    it('楠岃瘉鎵嬫満鍙锋牸寮?- 蹇呴』浠?寮€澶?, async () => {
      render(Register)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const submitButton = screen.getByText(/娉ㄥ唽/)

      // 杈撳叆浠ラ潪1寮€澶寸殑鎵嬫満鍙?
      await fireEvent.update(phoneInput, '23456789012')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '璇疯緭鍏ユ湁鏁堢殑11浣嶆墜鏈哄彿' })
      )
    })

    it('楠岃瘉瀵嗙爜寮哄害 - 鑷冲皯8浣?, async () => {
      render(Register)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/娉ㄥ唽/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, '1234567') // 鍙湁7浣?
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '瀵嗙爜鑷冲皯闇€瑕?浣? })
      )
    })

    it('楠岃瘉瀵嗙爜寮哄害 - 蹇呴』鍖呭惈瀛楁瘝鍜屾暟瀛?, async () => {
      render(Register)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/娉ㄥ唽/)

      // 鍙湁鏁板瓧
      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, '12345678')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '瀵嗙爜蹇呴』鍖呭惈瀛楁瘝鍜屾暟瀛? })
      )
    })
  })

  describe('娉ㄥ唽 API 璋冪敤', () => {
    it('娉ㄥ唽鎴愬姛鏃朵繚瀛?Token 鍜岀敤鎴蜂俊鎭?, async () => {
      const mockResponse = {
        success: true,
        data: {
          id: 1,
          phone: '13800138000',
          nickname: '娴嬭瘯鐢ㄦ埛',
          token: 'mock-jwt-token'
        },
        message: '娉ㄥ唽鎴愬姛'
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as any)

      render(Register)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const nicknameInput = screen.getByPlaceholderText(/鏄电О/)
      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/娉ㄥ唽/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(nicknameInput, '娴嬭瘯鐢ㄦ埛')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      expect(mockUni.showLoading).toHaveBeenCalledWith({ title: '娉ㄥ唽涓?..' })

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/v1/auth/register'),
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              'Content-Type': 'application/json'
            })
          })
        )
      })

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '娉ㄥ唽鎴愬姛', icon: 'success' })
      )

      expect(mockUni.setStorageSync).toHaveBeenCalledWith('token', 'mock-jwt-token')
      expect(mockUni.setStorageSync).toHaveBeenCalledWith('userInfo', mockResponse.data)
    })

    it('娉ㄥ唽澶辫触鏃舵樉绀洪敊璇俊鎭?, async () => {
      const mockErrorResponse = {
        success: false,
        error: {
          message: '璇ユ墜鏈哄彿宸叉敞鍐?
        }
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse
      } as any)

      render(Register)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const nicknameInput = screen.getByPlaceholderText(/鏄电О/)
      const passwordInput = screen.getByPlaceholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/娉ㄥ唽/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(nicknameInput, '娴嬭瘯鐢ㄦ埛')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockUni.showToast).toHaveBeenCalledWith(
          expect.objectContaining({ title: '璇ユ墜鏈哄彿宸叉敞鍐?, icon: 'none' })
        )
      })
    })

    it('缃戠粶閿欒鏃舵樉绀哄弸濂芥彁绀?, async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      render(Register)

      const phoneInput = screen.getByPlaceholderText(/鎵嬫満鍙?)
      const nicknameInput = screen.getByPlaceholderText(/鏄电О/)
      const passwordInput = screen.getBy().placeholderText(/瀵嗙爜/)
      const submitButton = screen.getByText(/娉ㄥ唽/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(nicknameInput, '娴嬭瘯鐢ㄦ埛')
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
      render(Register)

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

    it('鐐瑰嚮杩斿洖鎸夐挳杩斿洖涓婁竴椤?, () => {
      render(Register)

      const backButton = screen.getByRole('button', { name: /杩斿洖/ })
      fireEvent.click(backButton)

      expect(mockUni.navigateBack).toHaveBeenCalled()
    })

    it('鐐瑰嚮宸叉湁璐﹀彿閾炬帴璺宠浆鐧诲綍椤?, () => {
      render(Register)

      const loginLink = screen.getByText(/宸叉湁璐﹀彿锛熺珛鍗崇櫥褰?)
      fireEvent.click(loginLink)

      expect(mockUni.navigateTo).toHaveBeenCalledWith({ url: '/pages/login/login' })
    })
  })
})

