<template>
  <view class="biz-section-header">
    <view class="biz-section-header__left">
      <text class="biz-section-header__title">{{ title }}</text>
      <text v-if="subtitle" class="biz-section-header__subtitle">{{ subtitle }}</text>
    </view>
    <navigator v-if="linkText && linkUrl" :url="linkUrl" class="biz-section-header__link">
      <text>{{ linkText }}</text>
      <Icon name="arrow-right" :size="26" />
    </navigator>
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'

interface Props {
  title: string
  subtitle?: string
  linkText?: string
  linkUrl?: string
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  linkText: '',
  linkUrl: ''
})
</script>

<style scoped lang="scss">
.biz-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16rpx;
}

.biz-section-header__left {
  min-width: 0;
}

.biz-section-header__title {
  font-size: 38rpx;
  font-weight: 700;
  color: var(--text-main);
}

.biz-section-header__subtitle {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--text-muted);
}

.biz-section-header__link {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  color: var(--text-muted);
  font-size: 24rpx;
}
</style>
