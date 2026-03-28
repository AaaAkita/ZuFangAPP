// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import MessagePage from './message.vue'

const mockUni = {
  showToast: vi.fn(),
  navigateTo: vi.fn(),
  switchTab: vi.fn(),
  navigateBack: vi.fn(),
  reLaunch: vi.fn()
}

vi.stubGlobal('uni', mockUni)

const mockMessageData = {
  title: '消息',
  items: [
    {
      id: 1,
      title: '系统提醒一',
      content: '系统消息内容一',
      time: '刚刚',
      category: 'system',
      unread: true,
      sender: '系统通知',
      tag: '审核',
      action: {
        mode: 'navigateTo',
        url: '/pages/reviews/reviews'
      }
    },
    {
      id: 2,
      title: '互动消息一',
      content: '有人点赞了你',
      time: '5分钟前',
      category: 'interaction',
      unread: true,
      sender: '社区互动',
      tag: '互动',
      action: {
        mode: 'switchTab',
        url: '/pages/community/community'
      }
    },
    {
      id: 3,
      title: '系统提醒二',
      content: '功能更新通知',
      time: '1小时前',
      category: 'system',
      unread: true,
      sender: '系统通知',
      tag: '更新',
      action: {
        mode: 'toast',
        toastText: '功能开发中'
      }
    },
    {
      id: 4,
      title: '互动消息二',
      content: '有人收藏了你的内容',
      time: '昨天',
      category: 'interaction',
      unread: false,
      sender: '社区互动',
      tag: '收藏',
      action: {
        mode: 'navigateTo',
        url: '/pages/reviews/reviews'
      }
    }
  ]
}

vi.mock('@/data', () => ({
  getMessageData: () => JSON.parse(JSON.stringify(mockMessageData))
}))

describe('消息页面', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('默认显示全部消息', () => {
    render(MessagePage)

    expect(screen.getByText('系统提醒一')).toBeTruthy()
    expect(screen.getByText('互动消息一')).toBeTruthy()
    expect(screen.getByTestId('tab-badge-all').textContent).toBe('3')
  })

  it('切换到系统/互动分组时正确筛选', async () => {
    render(MessagePage)

    await fireEvent.click(screen.getByText('系统'))
    expect(screen.getByText('系统提醒一')).toBeTruthy()
    expect(screen.queryByText('互动消息一')).toBeNull()
    expect(screen.getByTestId('tab-badge-system').textContent).toBe('2')

    await fireEvent.click(screen.getByText('互动'))
    expect(screen.getByText('互动消息一')).toBeTruthy()
    expect(screen.queryByText('系统提醒一')).toBeNull()
    expect(screen.getByTestId('tab-badge-interaction').textContent).toBe('1')
  })

  it('点击未读消息后标记为已读并减少未读计数', async () => {
    render(MessagePage)

    expect(screen.getByTestId('tab-badge-all').textContent).toBe('3')
    expect(screen.getByTestId('message-unread-1')).toBeTruthy()

    await fireEvent.click(screen.getByText('系统提醒一'))

    await waitFor(() => {
      expect(mockUni.navigateTo).toHaveBeenCalledWith({ url: '/pages/reviews/reviews' })
    })

    expect(screen.getByTestId('tab-badge-all').textContent).toBe('2')
    expect(screen.queryByTestId('message-unread-1')).toBeNull()
  })

  it('根据 action.mode 触发 navigateTo / switchTab / showToast', async () => {
    render(MessagePage)

    await fireEvent.click(screen.getByText('系统提醒一'))
    expect(mockUni.navigateTo).toHaveBeenCalledWith({ url: '/pages/reviews/reviews' })

    await fireEvent.click(screen.getByText('互动消息一'))
    expect(mockUni.switchTab).toHaveBeenCalledWith({ url: '/pages/community/community' })

    await fireEvent.click(screen.getByText('系统提醒二'))
    expect(mockUni.showToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: '功能开发中',
        icon: 'none'
      })
    )
  })
})
