<template>
  <view class="container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">个人中心</text>
      <view class="edit-btn" @click="navigateTo('/pages/about/index')">
        <Icon name="edit" :size="40" color="var(--text-primary)" />
      </view>
    </view>

    <!-- 用户信息区域 -->
    <view class="user-section">
      <view class="avatar-wrapper">
        <view class="avatar-glow"></view>
        <image class="avatar" :src="userAvatar" mode="aspectFill" />
        <view class="online-status"></view>
      </view>
      <view class="user-info">
        <text class="user-name">{{ userDisplayName }}</text>
        <text class="user-join">{{ userJoinDate }}</text>
      </view>
    </view>

    <!-- 数据统计 -->
    <view class="stats-grid">
      <view class="stat-item" @click="navigateTo('/pages/community/index')">
        <text class="stat-num">24</text>
        <view class="stat-label">
          <Icon name="star" :size="36" color="var(--text-secondary)" class="stat-icon" />
          <text>发布的评价</text>
        </view>
      </view>
      <view class="stat-item">
        <text class="stat-num">158</text>
        <view class="stat-label">
          <Icon name="heart" :size="36" color="var(--text-secondary)" class="stat-icon" />
          <text>获赞</text>
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-list">
      <view class="menu-item" @click="navigateTo('/pages/community/index')">
        <view class="menu-left">
          <view class="menu-icon-bg orange">
            <Icon name="star" :size="48" color="var(--primary)" />
          </view>
          <text class="menu-text">我的评价</text>
        </view>
        <Icon name="arrow-right" :size="40" color="var(--text-tertiary)" class="arrow" />
      </view>
      <view class="menu-item">
        <view class="menu-left">
          <view class="menu-icon-bg blue">
            <Icon name="bookmark" :size="48" color="var(--info)" />
          </view>
          <text class="menu-text">收藏房源</text>
        </view>
        <Icon name="arrow-right" :size="40" color="#94a3b8" class="arrow" />
      </view>
      <view class="menu-item">
        <view class="menu-left">
          <view class="menu-icon-bg gray">
            <Icon name="settings" :size="48" color="var(--text-secondary)" />
          </view>
          <text class="menu-text">设置</text>
        </view>
        <Icon name="arrow-right" :size="40" color="#94a3b8" class="arrow" />
      </view>
      <view class="menu-item">
        <view class="menu-left">
          <view class="menu-icon-bg green">
            <Icon name="help" :size="48" color="var(--success)" />
          </view>
          <text class="menu-text">帮助与客服</text>
        </view>
        <Icon name="arrow-right" :size="40" color="#94a3b8" class="arrow" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/utils/auth'
import Icon from '@/components/ui/Icon.vue'

const authStore = useAuthStore()

// 显示用户信息
const userDisplayName = computed(() => {
  return authStore.userNickname || '租客用户'
})

const userAvatar = computed(() => {
  // 默认头像占位符
  const defaultAvatar = 'https://lh3.googleusercontent.com/ida-public/AB6AXuD923g4BO4e90wR5iqWkTqhYtvCujz8IVhDHDnkNxjAjKet7YR_R1Mnhg_LDdN-OusEysohzB-RFXSCqjKoAF1V4xEe6c9t3kvBiKVpOgogd5UMmmf7U1KIkDBe2o8m3LL8IMxousnWZ4d8yH1JwFf-zEs4mUmghDmdPzZ7L4FX7hgWS4EfO5KIAd63KnnhSPDpb4J83ZLVkht56IFFnz8u4kadgBXuLADQdSmaZkpxlV0iXobSXBFr9hPhVUduoTtKndkjeNGCow'
  return authStore.userInfo?.avatar || defaultAvatar
})

const userJoinDate = computed(() => {
  // 如果有注册日期，显示格式化的日期
  if (authStore.userInfo?.createdAt) {
    return `2024年加入租客社区`
  }
  return '欢迎加入租客社区'
})

onMounted(() => {
  // 如果未登录，跳转到登录页
  if (!authStore.isLoggedIn) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    setTimeout(() => {
      uni.navigateTo({ url: '/pages/login/index' })
    }, 1000)
  }
})

// TabBar 页面列表
const tabBarPages = [
  '/pages/index/index',
  '/pages/community/index',
  '/pages/message/index',
  '/pages/profile/index'
]

// 跳转到新页面
const navigateTo = (url: string) => {
  // 如果目标是 tabBar 页面，使用 switchTab
  if (tabBarPages.includes(url)) {
    uni.switchTab({ url })
  } else {
    uni.navigateTo({ url })
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.container {
  min-height: 100vh;
  background: linear-gradient(180deg, #fff0e6 0%, #fffaf5 30%, #faf9f8 100%);
  padding-bottom: 40rpx;
}

/* 顶部标题栏 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--status-bar-height, 0px) + 24rpx) $spacing-xl $spacing-md $spacing-lg;
  position: relative;
}

.header-title {
  font-size: $font-size-h2;
  font-weight: bold;
  color: $color-text-primary;
  flex: 1;
  text-align: center;
  padding-left: $spacing-xl;
}

.edit-btn {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $shadow-xs;
}

/* 用户信息区域 */
.user-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-lg;
  gap: $spacing-lg;
}

.avatar-wrapper {
  position: relative;
}

.avatar-glow {
  position: absolute;
  inset: -32rpx;
  background: linear-gradient(135deg, rgba(238, 124, 43, 0.3), rgba(254, 215, 170, 0.4));
  border-radius: 50%;
  filter: blur(20rpx);
  opacity: 0.6;
}

.avatar {
  position: relative;
  width: 256rpx;
  height: 256rpx;
  border-radius: 50%;
  border: 8rpx solid $color-text-inverse;
  box-shadow: 0 8rpx 32rpx rgba(238, 124, 43, 0.15);
}

.online-status {
  position: absolute;
  bottom: 8rpx;
  right: 8rpx;
  width: 56rpx;
  height: 56rpx;
  background-color: $color-success;
  border-radius: 50%;
  border: 6rpx solid $color-text-inverse;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-md;
}

.user-name {
  font-size: $font-size-hero;
  font-weight: bold;
  color: $color-text-primary;
}

.user-join {
  font-size: $font-size-body;
  color: $color-text-secondary;
  font-weight: 500;
}

/* 数据统计 */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-lg;
  padding: 0 $spacing-xl $spacing-lg;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl $spacing-lg;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: $border-radius-lg;
  border: 1rpx solid rgba(255, 255, 255, 0.5);
  box-shadow: $shadow-sm;
  backdrop-filter: blur(10rpx);
  transition: transform $duration-normal $easing-default;
}

.stat-item:active {
  transform: scale(0.95);
}

.stat-num {
  font-size: $font-size-display;
  font-weight: bold;
  color: $color-text-primary;
  margin-bottom: $spacing-md;
}

.stat-label {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  font-size: $font-size-body;
  color: $color-text-secondary;
}

.stat-icon {
  font-size: $font-size-h2;
}

/* 功能菜单 */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  padding: 0 $spacing-xl;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg;
  background-color: $color-bg-secondary;
  border-radius: $border-radius-lg;
  border: 1rpx solid rgba(241, 245, 249, 0.5);
  box-shadow: $shadow-sm;
  transition: all $duration-normal $easing-default;
}

.menu-item:active {
  background-color: rgba(255, 247, 237, 0.5);
  box-shadow: $shadow-md;
}

.menu-left {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
}

.menu-icon-bg {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform $duration-normal $easing-default;
}

.menu-item:active .menu-icon-bg {
  transform: scale(1.05);
}

.menu-icon-bg.orange {
  background-color: rgba(255, 247, 237, 0.8);
  color: $color-primary;
}

.menu-icon-bg.blue {
  background-color: rgba(239, 246, 255, 0.8);
  color: $color-info;
}

.menu-icon-bg.gray {
  background-color: rgba(241, 245, 249, 0.8);
  color: $color-text-secondary;
}

.menu-icon-bg.green {
  background-color: rgba(240, 253, 244, 0.8);
  color: $color-success;
}

.menu-text {
  font-size: $font-size-h3;
  font-weight: 600;
  color: $color-text-primary;
  letter-spacing: 2rpx;
}

.arrow {
  font-size: $font-size-hero;
  color: $color-text-tertiary;
}
</style>
