<template>
  <view class="page-message page-shell">
    <GlobalBack />

    <view class="page-title-wrap">
      <text class="page-title">{{ messageData.title }}</text>
    </view>

    <MessageTabs
      :active-tab="activeTab"
      :unread-count="tabUnreadCount"
      @change="handleTabChange"
    />

    <view v-if="filteredItems.length" class="message-list">
      <MessageListItem
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @select="handleMessageClick(item)"
      />
    </view>

    <view v-else class="message-empty">
      <EmptyState
        icon="message"
        :title="currentEmptyState.title"
        :subtitle="currentEmptyState.subtitle"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import EmptyState from '@/components/business/EmptyState.vue'
import MessageTabs from '@/components/business/MessageTabs.vue'
import MessageListItem from '@/components/business/MessageListItem.vue'
import { getMessageData, type MessageItem, type MessageTabKey } from '@/data'

const messageData = getMessageData()

const items = ref<MessageItem[]>(
  messageData.items.map((item) => ({
    ...item,
    action: {
      ...item.action
    }
  }))
)

const activeTab = ref<MessageTabKey>('all')

const filteredItems = computed(() => {
  if (activeTab.value === 'all') {
    return items.value
  }
  return items.value.filter((item) => item.category === activeTab.value)
})

const tabUnreadCount = computed<Record<MessageTabKey, number>>(() => ({
  all: items.value.filter((item) => item.unread).length,
  system: items.value.filter((item) => item.category === 'system' && item.unread).length,
  interaction: items.value.filter((item) => item.category === 'interaction' && item.unread).length
}))

const currentEmptyState = computed(() => {
  if (activeTab.value === 'system') {
    return {
      title: '暂无系统通知',
      subtitle: '新的审核、风控和活动通知会在这里显示'
    }
  }

  if (activeTab.value === 'interaction') {
    return {
      title: '暂无互动消息',
      subtitle: '点赞、评论和关注消息会在这里显示'
    }
  }

  return {
    title: '暂无消息',
    subtitle: '当有新的消息时会在这里显示'
  }
})

const handleTabChange = (tab: MessageTabKey) => {
  activeTab.value = tab
}

const navigateOrToast = (mode: 'navigateTo' | 'switchTab', url?: string) => {
  if (!url) {
    uni.showToast({
      title: '功能开发中',
      icon: 'none'
    })
    return
  }

  if (mode === 'switchTab') {
    uni.switchTab({ url })
    return
  }

  uni.navigateTo({ url })
}

const handleMessageClick = (item: MessageItem) => {
  const target = items.value.find((entry) => entry.id === item.id)
  if (target) {
    target.unread = false
  }

  if (item.action.mode === 'toast') {
    uni.showToast({
      title: item.action.toastText || '功能开发中',
      icon: 'none'
    })
    return
  }

  navigateOrToast(item.action.mode, item.action.url)
}
</script>

<style scoped lang="scss">
.message-list {
  margin-top: 18rpx;
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 120rpx);
}

.message-empty {
  margin-top: 30rpx;
}
</style>
