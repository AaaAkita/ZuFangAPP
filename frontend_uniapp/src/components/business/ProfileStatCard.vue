<template>
  <view class="biz-profile-stat card-shell card-shell--flat" @click="$emit('click')">
    <text class="biz-profile-stat__value">{{ item.value }}</text>
    <view class="biz-profile-stat__label">
      <Icon :name="item.icon" :size="30" />
      <text>{{ item.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { ProfileStatItem } from '@/data'

interface Props {
  item: ProfileStatItem
}

defineProps<Props>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">
.biz-profile-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26rpx 18rpx;
}

.biz-profile-stat__value {
  font-size: 56rpx;
  font-weight: 700;
  color: #1e293b;
}

.biz-profile-stat__label {
  margin-top: 10rpx;
  display: flex;
  align-items: center;
  gap: 10rpx;
  color: #64748b;
  font-size: 24rpx;
}
</style>
