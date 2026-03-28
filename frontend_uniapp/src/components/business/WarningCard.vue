<template>
  <view class="biz-warning-card card-shell card-shell--flat">
    <view :class="['biz-warning-card__icon', item.level]">
      <Icon :name="item.level === 'red' ? 'error' : 'warning'" :size="36" />
    </view>
    <view class="biz-warning-card__body">
      <view class="biz-warning-card__header">
        <text class="biz-warning-card__name">{{ item.name }}</text>
        <text class="biz-warning-card__time">{{ item.time }}</text>
      </view>
      <text class="biz-warning-card__subtitle">{{ item.subtitle }}</text>
      <text class="biz-warning-card__desc">{{ item.description }}</text>
      <view class="biz-warning-card__tags">
        <text v-for="tag in item.tags" :key="tag" class="biz-warning-card__tag">{{ tag }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { WarningItem } from '@/data'

interface Props {
  item: WarningItem
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.biz-warning-card {
  display: flex;
  gap: 20rpx;
}

.biz-warning-card__icon {
  width: 76rpx;
  height: 76rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.biz-warning-card__icon.orange {
  color: #f97316;
  background: rgba(249, 115, 22, 0.12);
}

.biz-warning-card__icon.red {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
}

.biz-warning-card__body {
  flex: 1;
  min-width: 0;
}

.biz-warning-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12rpx;
}

.biz-warning-card__name {
  font-size: 26rpx;
  font-weight: 700;
  color: #1f2937;
}

.biz-warning-card__time {
  font-size: 20rpx;
  color: #9ca3af;
}

.biz-warning-card__subtitle {
  display: block;
  margin-top: 4rpx;
  font-size: 22rpx;
  color: #64748b;
}

.biz-warning-card__desc {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #4b5563;
}

.biz-warning-card__tags {
  margin-top: 12rpx;
  display: flex;
  gap: 10rpx;
  flex-wrap: wrap;
}

.biz-warning-card__tag {
  font-size: 20rpx;
  color: #ea580c;
  background: #fff0e6;
  border: 1rpx solid #fcd5ba;
  padding: 7rpx 14rpx;
  border-radius: 999rpx;
}
</style>
