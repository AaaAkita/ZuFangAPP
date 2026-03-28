<template>
  <view :class="['biz-message-item', { 'is-unread': item.unread }]" @click="$emit('select')">
    <view class="biz-message-item__left">
      <UserAvatar v-if="item.avatar" :src="item.avatar" :size="84" />
      <view v-else :class="['biz-message-item__placeholder', `is-${item.category}`]">
        <Icon :name="item.category === 'system' ? 'info' : 'message'" :size="34" color="#ffffff" />
      </view>
    </view>

    <view class="biz-message-item__main">
      <view class="biz-message-item__head">
        <text class="biz-message-item__title">{{ item.title }}</text>
        <text class="biz-message-item__time">{{ item.time }}</text>
      </view>
      <text class="biz-message-item__content">{{ item.content }}</text>
      <view class="biz-message-item__foot">
        <text v-if="item.sender" class="biz-message-item__sender">{{ item.sender }}</text>
        <text v-if="item.tag" :class="['biz-message-item__tag', `is-${item.category}`]">{{ item.tag }}</text>
      </view>
    </view>

    <view
      v-if="item.unread"
      :data-testid="`message-unread-${item.id}`"
      class="biz-message-item__unread-dot"
    ></view>
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import UserAvatar from './UserAvatar.vue'
import type { MessageItem } from '@/data'

interface Props {
  item: MessageItem
}

defineProps<Props>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<style scoped lang="scss">
.biz-message-item {
  position: relative;
  display: flex;
  gap: 16rpx;
  padding: 20rpx;
  border-radius: 24rpx;
  border: 1rpx solid rgba(15, 23, 42, 0.06);
  background: #ffffff;
  box-shadow: 0 10rpx 24rpx rgba(15, 23, 42, 0.05);
}

.biz-message-item.is-unread {
  background:
    linear-gradient(90deg, rgba(238, 124, 43, 0.06), rgba(238, 124, 43, 0)) #ffffff;
}

.biz-message-item__left {
  flex-shrink: 0;
}

.biz-message-item__placeholder {
  width: 84rpx;
  height: 84rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.biz-message-item__placeholder.is-system {
  background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
}

.biz-message-item__placeholder.is-interaction {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.biz-message-item__main {
  flex: 1;
  min-width: 0;
}

.biz-message-item__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12rpx;
}

.biz-message-item__title {
  flex: 1;
  min-width: 0;
  font-size: 27rpx;
  font-weight: 700;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.biz-message-item__time {
  flex-shrink: 0;
  font-size: 20rpx;
  color: #94a3b8;
}

.biz-message-item__content {
  display: block;
  margin-top: 8rpx;
  font-size: 23rpx;
  line-height: 1.5;
  color: #475569;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.biz-message-item__foot {
  margin-top: 10rpx;
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.biz-message-item__sender {
  font-size: 20rpx;
  color: #64748b;
}

.biz-message-item__tag {
  font-size: 18rpx;
  line-height: 1;
  padding: 6rpx 10rpx;
  border-radius: 999rpx;
}

.biz-message-item__tag.is-system {
  color: #9a3412;
  background: rgba(249, 115, 22, 0.14);
}

.biz-message-item__tag.is-interaction {
  color: #1d4ed8;
  background: rgba(59, 130, 246, 0.14);
}

.biz-message-item__unread-dot {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 0 4rpx rgba(239, 68, 68, 0.15);
}
</style>
