<template>
  <view
    :class="['global-back', `global-back--${theme}`]"
    @click="handleBack"
  >
    <Icon class="back-icon" name="arrow_back" :size="36" />
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'

type Theme = 'light' | 'dark'

interface Props {
  theme?: Theme
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light'
})

const theme = props.theme

const tabBarPages = [
  '/pages/home/home',
  '/pages/community/community',
  '/pages/message/message',
  '/pages/profile/profile'
]

const handleBack = () => {
  const pages = getCurrentPages()
  const currentRoute = pages.length ? `/${pages[pages.length - 1].route}` : ''

  if (pages.length > 1) {
    uni.navigateBack()
    return
  }

  if (currentRoute && tabBarPages.includes(currentRoute) && currentRoute !== '/pages/home/home') {
    uni.switchTab({ url: '/pages/home/home' })
    return
  }

  if (currentRoute !== '/pages/home/home') {
    uni.reLaunch({ url: '/pages/home/home' })
    return
  }

  uni.showToast({
    title: '已经是首页',
    icon: 'none'
  })
}
</script>

<style scoped lang="scss">
.global-back {
  position: fixed;
  top: calc(var(--status-bar-height, 0px) + 18rpx);
  left: 20rpx;
  width: 72rpx;
  height: 72rpx;
  border-radius: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14rpx);
  z-index: 2200;
  transition: transform 0.2s ease;
}

.global-back:active {
  transform: scale(0.94);
}

.global-back--light {
  background-color: rgba(255, 255, 255, 0.62);
  box-shadow: 0 10rpx 28rpx rgba(0, 0, 0, 0.12);
  color: #1f2937;
}

.global-back--dark {
  background-color: rgba(0, 0, 0, 0.28);
  box-shadow: 0 10rpx 28rpx rgba(0, 0, 0, 0.3);
  color: #ffffff;
}

.back-icon {
  line-height: 1;
}
</style>
