<template>
  <view class="biz-empty-state">
    <Icon :name="icon" :size="iconSize" color="var(--text-muted)" />
    <text class="biz-empty-state__title">{{ title }}</text>
    <text v-if="subtitle" class="biz-empty-state__subtitle">{{ subtitle }}</text>
    <button v-if="buttonText" class="biz-empty-state__btn" @click="$emit('action')">{{ buttonText }}</button>
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'

interface Props {
  icon?: string
  iconSize?: number
  title: string
  subtitle?: string
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'info',
  iconSize: 120,
  subtitle: '',
  buttonText: ''
})

defineEmits<{
  (e: 'action'): void
}>()
</script>

<style scoped lang="scss">
.biz-empty-state {
  min-height: 520rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20rpx 0;
}

.biz-empty-state__title {
  margin-top: 14rpx;
  font-size: 34rpx;
  font-weight: 700;
  color: var(--text-main);
}

.biz-empty-state__subtitle {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: var(--text-muted);
}

.biz-empty-state__btn {
  margin-top: 26rpx;
  border: none;
  border-radius: 999rpx;
  padding: 0 28rpx;
  background: var(--primary);
  color: #ffffff;
  font-size: 26rpx;
}

.biz-empty-state__btn::after {
  border: none;
}
</style>
