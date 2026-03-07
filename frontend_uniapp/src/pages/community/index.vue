<template>
  <view class="container">
    <view class="header">
      <text class="title">发现</text>
    </view>
    <view class="content">
      <view class="empty-state">
        <text class="material-symbols-outlined empty-icon">explore</text>
        <text class="empty-text">发现页面</text>
        <text class="empty-sub">更多精彩内容即将上线</text>
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
    <view class="tab-item active" @click="switchTab('/pages/community/index')">
      <view class="tab-icon active">
        <text class="material-symbols-outlined">explore</text>
      </view>
      <text class="tab-text active">发现</text>
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
    <view class="tab-item" @click="switchTab('/pages/profile/index')">
      <view class="tab-icon">
        <text class="material-symbols-outlined">person</text>
      </view>
      <text class="tab-text">我的</text>
    </view>
  </view>
</template>

<script setup lang="ts">
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
  background-color: var(--background-light);
}

.header {
  padding: 60rpx 40rpx 30rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: var(--text-main);
}

.content {
  padding: 40rpx;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
}

.empty-icon {
  font-size: 120rpx;
  color: var(--text-muted);
  margin-bottom: 30rpx;
}

.empty-text {
  font-size: 32rpx;
  color: var(--text-main);
  font-weight: 600;
  margin-bottom: 16rpx;
}

.empty-sub {
  font-size: 26rpx;
  color: var(--text-muted);
}

/* 底部安全区域 */
.bottom-safe-area {
  height: 160rpx;
}

/* 底部导航栏 */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 1rpx solid #f3f4f6;
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
