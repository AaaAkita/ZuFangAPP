import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import Register from './index.vue'

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

describe('手机号注册功能', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('表单验证', () => {
    it('显示手机号、昵称、密码输入框', () => {
      render(Register)

      expect(screen.getByPlaceholderText(/手机号/)).toBeTruthy()
      expect(screen.getByPlaceholderText(/昵称/)).toBeTruthy()
      expect(screen.getByPlaceholderText(/密码/)).toBeTruthy()
    })

    it('验证手机号格式 - 11位数字', async () => {
      render(Register)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const submitButton = screen.getByText(/注册/)

      // 输入无效手机号
      await fireEvent.update(phoneInput, '123')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '请输入有效的11位手机号' })
      )
    })

    it('验证手机号格式 - 必须以1开头', async () => {
      render(Register)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const submitButton = screen.getByText(/注册/)

      // 输入以非1开头的手机号
      await fireEvent.update(phoneInput, '23456789012')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '请输入有效的11位手机号' })
      )
    })

    it('验证密码强度 - 至少8位', async () => {
      render(Register)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const passwordInput = screen.getByPlaceholderText(/密码/)
      const submitButton = screen.getByText(/注册/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, '1234567') // 只有7位
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '密码至少需要8位' })
      )
    })

    it('验证密码强度 - 必须包含字母和数字', async () => {
      render(Register)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const passwordInput = screen.getByPlaceholderText(/密码/)
      const submitButton = screen.getByText(/注册/)

      // 只有数字
      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(passwordInput, '12345678')
      await fireEvent.click(submitButton)

      expect(mockUni.showToast).toHaveBeenCalledWith(
        expect.objectContaining({ title: '密码必须包含字母和数字' })
      )
    })
  })

  describe('注册 API 调用', () => {
    it('注册成功时保存 Token 和用户信息', async () => {
      const mockResponse = {
        success: true,
        data: {
          id: 1,
          phone: '13800138000',
          nickname: '测试用户',
          token: 'mock-jwt-token'
        },
        message: '注册成功'
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as any)

      render(Register)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const nicknameInput = screen.getByPlaceholderText(/昵称/)
      const passwordInput = screen.getByPlaceholderText(/密码/)
      const submitButton = screen.getByText(/注册/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(nicknameInput, '测试用户')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      expect(mockUni.showLoading).toHaveBeenCalledWith({ title: '注册中...' })

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
        expect.objectContaining({ title: '注册成功', icon: 'success' })
      )

      expect(mockUni.setStorageSync).toHaveBeenCalledWith('token', 'mock-jwt-token')
      expect(mockUni.setStorageSync).toHaveBeenCalledWith('userInfo', mockResponse.data)
    })

    it('注册失败时显示错误信息', async () => {
      const mockErrorResponse = {
        success: false,
        error: {
          message: '该手机号已注册'
        }
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse
      } as any)

      render(Register)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const nicknameInput = screen.getByPlaceholderText(/昵称/)
      const passwordInput = screen.getByPlaceholderText(/密码/)
      const submitButton = screen.getByText(/注册/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(nicknameInput, '测试用户')
      await fireEvent.update(passwordInput, 'Test123456')
      await fireEvent.click(submitButton)

      await waitFor(() => {
        expect(mockUni.showToast).toHaveBeenCalledWith(
          expect.objectContaining({ title: '该手机号已注册', icon: 'none' })
        )
      })
    })

    it('网络错误时显示友好提示', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

      render(Register)

      const phoneInput = screen.getByPlaceholderText(/手机号/)
      const nicknameInput = screen.getByPlaceholderText(/昵称/)
      const passwordInput = screen.getBy().placeholderText(/密码/)
      const submitButton = screen.getByText(/注册/)

      await fireEvent.update(phoneInput, '13800138000')
      await fireEvent.update(nicknameInput, '测试用户')
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
      render(Register)

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

    it('点击返回按钮返回上一页', () => {
      render(Register)

      const backButton = screen.getByRole('button', { name: /返回/ })
      fireEvent.click(backButton)

      expect(mockUni.navigateBack).toHaveBeenCalled()
    })

    it('点击已有账号链接跳转登录页', () => {
      render(Register)

      const loginLink = screen.getByText(/已有账号？立即登录/)
      fireEvent.click(loginLink)

      expect(mockUni.navigateTo).toHaveBeenCalledWith({ url: '/pages/login/index' })
    })
  })
})
