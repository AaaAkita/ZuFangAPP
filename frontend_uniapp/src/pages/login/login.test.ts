import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import Login from './index.vue'

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

describe('手机号登录功能', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('表单验证', () => {
    it('显示手机号和密码输入框', () => {
      render(Login)

      expect(screen.getByPlaceholderText(/手机号/)).toBeTruthy()
      expect(screen.getByPlaceholderText(/密码/)).toBeTruthy()
    })

    it('验证手机号不为空', async () => {
      render(Login)

      const passwordInput = screen.getByPlaceholderText(/密码/)
      const submitButton = screen.getByText(/登录/)

      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '请输入手机号' })
      )
    })

    it('验证手机号格式', async () => {
      render(Login)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const passwordInput = screen.getByPlaceholderText(/密码/)
      const submitButton = screen.getByText(/登录/)

      await fireEvent.update(phoneInput, '123')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '请输入有效的11位手机号' })
      )
    })

    it('验证密码不为空', async () => {
      render(Login)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const submitButton = screen.getByText(/登录/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '请输入密码' })
      )
    })
  })

  describe('登录 API 调用', () => {
    it('登录成功时保存 Token 并跳转首页', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: 1,
          phone: '13800138000',
          nickname: '测试用户',
          token: 'mock-jwt-token'
        },
        message: '登录成功'
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as any)

      render(Login)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const passwordInput = screen.getByPlaceholderText(/密码/)
      const submitButton = screen.getByText(/登录/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      expect(mockUni.showLoading).toHaveBeenCalledWith({ title: '登录中...' })

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
        expect.objectContaining({ title: '登录成功', icon: 'success' })
      )

      expect(mockUni.setStorageSync).toHaveBeenCalledWith('token', 'mock-jwt-token')
      expect(mockUni.setStorageSync).toHaveBeenCalledWith('userInfo', mockResponse.data)

      expect(mockUni.switchTab).toHaveBeenCalledWith({ url: '/pages/index/index' })
    })

    it('登录失败时显示错误信息', async () => {
      const mockErrorResponse = {
        success: false,
        error: {
          message: '用户名或密码错误'
        }
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse
      } as any)

      render(Login)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const passwordInput = screen.getByPlaceholderText(/密码/)
      const submitButton = screen.getByText(/登录/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, 'wrongpassword')
      await fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockUni.showToast).toHaveBeenCalledWith(
          expect.objectContaining({ title: '用户名或密码错误', icon: 'none' })
        )
      })
    })

    it('网络错误时显示友好提示', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      render(Login)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const passwordInput = screen.getByPlaceholderText(/密码/)
      const submitButton = screen.getByText(/登录/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockUni.showToast).toHaveBeenCalledWith(
          expect.objectContaining({ title: '网络错误，请重试', icon: 'none' })
        )
      })
    })
  })

  describe('用户体验', () => {
    it('密码可见性切换', async () => {
      render(Login)

      const toggleButton = screen.getByRole('button', { name: /切换密码可见性/ })
      const passwordInput = screen.getByPlaceholderText(/密码/)

      // 默认隐藏密码
      expect(passwordInput).toHaveAttribute('password', 'true')

      // 切换显示
      await fireEvent.click(toggleButton)
      expect(passwordInput).toHaveAttribute('password', 'false')

      // 再次切换隐藏
      await fireEvent.click(toggleButton)
      expect(passwordInput).toHaveAttribute('password', 'true')
    })

    it('点击忘记密码显示提示', () => {
      render(Login)

      const forgotLink = screen.getByText(/忘记密码/)
      fireEvent.click(forgotLink)

      expect(mockUni.showToast).toHaveBeenCalledWith(

        expect.objectContaining({ title: '忘记密码功能开发中' })
      )
    })

    it('点击立即注册跳转注册页', () => {
      render(Login)

      const registerLink = screen.getByText(/立即注册/)
      fireEvent.click(registerLink)

      expect(mockUni.navigateTo).toHaveBeenCalledWith({ url: '/pages/register/index' })
    })
  })

  describe('社交登录功能', () => {
    it('微信登录显示开发中提示', () => {
      render(Login)

      const wechatButton = screen.getByRole('button', { name: /微信登录/ })
      fireEvent.click(wechatButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '微信登录功能开发中' })
      )
    })

    it('Apple登录显示开发中提示', () => {
      render(Login)

      const appleButton = screen.getByRole('button', { name: /Apple登录/ })
      fireEvent.click(appleButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Apple登录功能开发中' })
      )
    })

    it('更多登录方式显示开发中提示', () => {
      render(Login)

      const moreButton = screen.getByRole('button', { name: /更多登录方式/ })
      fireEvent.click(moreButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '更多登录方式开发中' })
      )
    })
  })
})
