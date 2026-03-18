<template>
  <view class="container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">个人中心</text>
      <view class="edit-btn" @click="navigateTo('/pages/about/index')">
        <text class="material-symbols-outlined">edit</text>
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
          <text class="material-symbols-outlined stat-icon">rate_review</text>
          <text>发布的评价</text>
        </view>
      </view>
      <view class="stat-item">
        <text class="stat-num">158</text>
        <view class="stat-label">
          <text class="material-symbols-outlined stat-icon">favorite</text>
          <text>获赞</text>
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-list">
      <view class="menu-item" @click="navigateTo('/pages/community/index')">
        <view class="menu-left">
          <view class="menu-icon-bg orange">
            <text class="material-symbols-outlined">reviews</text>
          </view>
          <text class="menu-text">我的评价</text>
        </view>
        <text class="material-symbols-outlined arrow">chevron_right</text>
      </view>
      <view class="menu-item">
        <view class="menu-left">
          <view class="menu-icon-bg blue">
            <text class="material-symbols-outlined">bookmark</text>
          </view>
          <text class="menu-text">收藏房源</text>
        </view>
        <text class="material-symbols-outlined arrow">chevron_right</text>
      </view>
      <view class="menu-item">
        <view class="menu-left">
          <view class="menu-icon-bg gray">
            <text class="material-symbols-outlined">settings</text>
          </view>
          <text class="menu-text">设置</text>
        </view>
        <text class="material-symbols-outlined arrow">chevron_right</text>
      </view>
      <view class="menu-item">
        <view class="menu-left">
          <view class="menu-icon-bg green">
            <text class="material-symbols-outlined">help</text>
          </view>
          <text class="menu-text">帮助与客服</text>
        </view>
        <text class="material-symbols-outlined arrow">chevron_right</text>
      </view>
    </view>

    <!-- 底部安全区域 -->
    <view class="bottom-safe-area"></view>
  </view>

  <!-- 底部导航栏 -->
  <view class="tab-bar">
    <view class="tab-item" @click="switchTab('/pages/index/index')">
      <view class="tab-icon">
        <text class="material-symbols-outlined">home</text>
      </view>
      <text class="tab-text">首页</text>
    </view>
    <view class="tab-item" @click="switchTab('/pages/community/index')">
      <view class="tab-icon">
        <text class="material-symbols-outlined">explore</text>
      </view>
      <text class="tab-text">发现</text>
    </view>
    <view class="tab-item center" @click="navigateTo('/pages/safety/index')">
      <view class="tab-center-btn">
        <text class="material-symbols-outlined">add</text>
      </view>
      <text class="tab-text">发布</text>
    </view>
    <view class="tab-item" @click="switchTab('/pages/message/index')">
      <view class="tab-icon">
        <text class="material-symbols-outlined">chat_bubble</text>
      </view>
      <text class="tab-text">消息</text>
    </view>
    <view class="tab-item active" @click="switchTab('/pages/profile/index')">
      <view class="tab-icon active">
        <text class="material-symbols-outlined">account_circle</text>
      </view>
      <text class="tab-text active">我的</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/utils/auth'

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

// 跳转到新页面
const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}

// 切换 Tab 页面
const switchTab = (url: string) => {
  uni.navigateTo({ url })
}
</script>

<style scoped>
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
  padding: 60rpx 40rpx 20rpx;
  position: relative;
}

.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #1e293b;
  flex: 1;
  text-align: center;
  padding-left: 48rpx;
}

.edit-btn {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.edit-btn .material-symbols-outlined {
  font-size: 40rpx;
  color: #1e293b;
}

/* 用户信息区域 */
.user-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  gap: 40rpx;
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
  border: 8rpx solid #fff;
  box-shadow: 0 8rpx 32rpx rgba(238, 124, 43, 0.15);
}

.online-status {
  position: absolute;
  bottom: 8rpx;
  right: 8rpx;
  width: 56rpx;
  height: 56rpx;
  background-color: #22c55e;
  border-radius: 50%;
  border: 6rpx solid #fff;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.user-name {
  font-size: 40rpx;
  font-weight: bold;
  color: #1e293b;
}

.user-join {
  font-size: 28rpx;
  color: #64748b;
  font-weight: 500;
}

/* 数据统计 */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40rpx;
  padding: 0 40rpx 40rpx;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48rpx 32rpx;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 32rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10rpx);
  transition: transform 0.2s;
}

.stat-item:active {
  transform: scale(0.95);
}

.stat-num {
  font-size: 48rpx;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 16rpx;
}

.stat-label {
  display: flex;
  align-items: center;
  gap: 12rpx;
  font-size: 28rpx;
  color: #64748b;
}

.stat-icon {
  font-size: 36rpx;
}

/* 功能菜单 */
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  padding: 0 40rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40rpx;
  background-color: #fff;
  border-radius: 32rpx;
  border: 1rpx solid rgba(241, 245, 249, 0.5);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.menu-item:active {
  background-color: rgba(255, 247, 237, 0.5);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 40rpx;
}

.menu-icon-bg {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.menu-item:active .menu-icon-bg {
  transform: scale(1.05);
}

.menu-icon-bg.orange {
  background-color: rgba(255, 247, 237, 0.8);
  color: #ee7c2b;
}

.menu-icon-bg.blue {
  background-color: rgba(239, 246, 255, 0.8);
  color: #3b82f6;
}

.menu-icon-bg.gray {
  background-color: rgba(241, 245, 249, 0.8);
  color: #64748b;
}

.menu-icon-bg.green {
  background-color: rgba(240, 253, 244, 0.8);
  color: #16a34a;
}

.menu-icon-bg .material-symbols-outlined {
  font-size: 48rpx;
}

.menu-text {
  font-size: 34rpx;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: 2rpx;
}

.arrow {
  font-size: 40rpx;
  color: #94a3b8;
}

/* 底部安全区域 */
.bottom-safe-area {
  height: 180rpx;
}

/* 底部导航栏 */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 1rpx solid #f1f5f9;
  backdrop-filter: blur(20rpx);
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 16rpx 20rpx 40rpx;
  z-index: 1000;
  max-width: 750rpx;
  margin: 0 auto;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  flex: 1;
}

.tab-item.center {
  margin-top: -40rpx;
}

.tab-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #94a3b8;
}

.tab-icon.active {
  background-color: rgba(238, 124, 43, 0.1);
  color: #ee7c2b;
}

.tab-icon .material-symbols-outlined {
  font-size: 48rpx;
}

.tab-center-btn {
  width: 112rpx;
  height: 112rpx;
  background-color: #ee7c2b;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16rpx 40rpx -12rpx rgba(238, 124, 43, 0.5);
}

.tab-center-btn .material-symbols-outlined {
  font-size: 56rpx;
}

.tab-text {
  font-size: 20rpx;
  color: #94a3b8;
  font-weight: 500;
}

.tab-text.active {
  color: #ee7c2b;
  font-weight: bold;
}
</style>
