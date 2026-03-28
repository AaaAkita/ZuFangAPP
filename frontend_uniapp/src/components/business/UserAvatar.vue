<template>
  <view class="biz-user-avatar" :style="avatarStyle">
    <image v-if="src" class="biz-user-avatar__img" :src="src" mode="aspectFill" />
    <view v-else class="biz-user-avatar__placeholder">
      <Icon name="person" :size="iconSize" />
    </view>
    <view v-if="verified" class="biz-user-avatar__verified">
      <Icon name="check" :size="18" color="#ffffff" />
    </view>
    <view v-if="online" class="biz-user-avatar__online"></view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/ui/Icon.vue'

interface Props {
  src?: string
  size?: number
  verified?: boolean
  online?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  size: 96,
  verified: false,
  online: false
})

const avatarStyle = computed(() => ({
  width: `${props.size}rpx`,
  height: `${props.size}rpx`
}))

const iconSize = computed(() => Math.max(20, Math.round(props.size * 0.36)))
</script>

<style scoped lang="scss">
.biz-user-avatar {
  position: relative;
  border-radius: 50%;
  overflow: visible;
  flex-shrink: 0;
}

.biz-user-avatar__img,
.biz-user-avatar__placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.biz-user-avatar__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  color: #9ca3af;
}

.biz-user-avatar__verified {
  position: absolute;
  left: -8rpx;
  bottom: -8rpx;
  width: 34rpx;
  height: 34rpx;
  border-radius: 50%;
  background: #10b981;
  border: 3rpx solid #ffffff;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.biz-user-avatar__online {
  position: absolute;
  right: 3rpx;
  bottom: 3rpx;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background: #22c55e;
  border: 3rpx solid #ffffff;
}
</style>
