<template>
  <view class="biz-profile-menu card-shell card-shell--flat" @click="$emit('click')">
    <view class="biz-profile-menu__left">
      <view :class="['biz-profile-menu__icon-wrap', item.theme]">
        <Icon :name="item.icon" :size="36" />
      </view>
      <text class="biz-profile-menu__text">{{ item.label }}</text>
    </view>
    <Icon name="arrow-right" :size="28" color="#94a3b8" />
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { ProfileMenuItem } from '@/data'

interface Props {
  item: ProfileMenuItem
}

defineProps<Props>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">
.biz-profile-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
}

.biz-profile-menu__left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.biz-profile-menu__icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.biz-profile-menu__icon-wrap.orange {
  background: rgba(255, 247, 237, 0.8);
  color: #ee7c2b;
}

.biz-profile-menu__icon-wrap.blue {
  background: rgba(239, 246, 255, 0.8);
  color: #3b82f6;
}

.biz-profile-menu__icon-wrap.gray {
  background: rgba(241, 245, 249, 0.8);
  color: #64748b;
}

.biz-profile-menu__icon-wrap.green {
  background: rgba(240, 253, 244, 0.8);
  color: #22c55e;
}

.biz-profile-menu__text {
  font-size: 28rpx;
  font-weight: 600;
  color: #1e293b;
}
</style>
