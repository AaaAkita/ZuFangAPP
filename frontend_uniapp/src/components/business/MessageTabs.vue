<template>
  <view class="biz-message-tabs">
    <view
      v-for="tab in tabs"
      :key="tab.key"
      :class="['biz-message-tabs__item', { active: activeTab === tab.key }]"
      @click="$emit('change', tab.key)"
    >
      <text class="biz-message-tabs__label">{{ tab.label }}</text>
      <text
        v-if="(unreadCount[tab.key] || 0) > 0"
        :data-testid="`tab-badge-${tab.key}`"
        class="biz-message-tabs__badge"
      >
        {{ unreadCount[tab.key] > 99 ? '99+' : unreadCount[tab.key] }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { MessageTabKey } from '@/data'

interface Props {
  activeTab: MessageTabKey
  unreadCount: Record<MessageTabKey, number>
}

defineProps<Props>()

defineEmits<{
  (e: 'change', tab: MessageTabKey): void
}>()

const tabs: Array<{ key: MessageTabKey; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'system', label: '系统' },
  { key: 'interaction', label: '互动' }
]
</script>

<style scoped lang="scss">
.biz-message-tabs {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 8rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.88);
  border: 1rpx solid rgba(15, 23, 42, 0.06);
}

.biz-message-tabs__item {
  position: relative;
  flex: 1;
  min-width: 0;
  height: 64rpx;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  color: #64748b;
  transition: all 0.2s ease;
}

.biz-message-tabs__item.active {
  background: linear-gradient(135deg, #ee7c2b 0%, #d76517 100%);
  color: #ffffff;
  box-shadow: 0 8rpx 18rpx rgba(224, 122, 95, 0.32);
}

.biz-message-tabs__label {
  font-size: 24rpx;
  font-weight: 600;
  line-height: 1;
}

.biz-message-tabs__badge {
  min-width: 28rpx;
  height: 28rpx;
  padding: 0 8rpx;
  border-radius: 999rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18rpx;
  font-weight: 700;
  color: #ffffff;
  background: #ef4444;
}

.biz-message-tabs__item.active .biz-message-tabs__badge {
  color: #ef4444;
  background: #ffffff;
}
</style>
