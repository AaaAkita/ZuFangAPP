<template>
  <view class="container">
    <view class="header">
      <text class="title">消息</text>
    </view>
    <view class="content">
      <view class="empty-state">
        <Icon name="message" :size="120" color="var(--text-muted)" class="empty-icon" />
        <text class="empty-text">暂无消息</text>
        <text class="empty-sub">当有新的消息时会在这里显示</text>
      </view>
    </view>
    
    <!-- 底部安全区域 -->
    <view class="bottom-safe-area"></view>
  </view>

  <!-- 底部导航栏 -->
  <view class="tab-bar">
    <view class="tab-item" @click="switchTab('/pages/index/index')">
      <view class="tab-icon">
        <Icon name="home" :size="48" color="var(--text-tertiary)" />
      </view>
      <text class="tab-text">首页</text>
    </view>
    <view class="tab-item" @click="switchTab('/pages/community/index')">
      <view class="tab-icon">
        <Icon name="community" :size="48" color="var(--text-tertiary)" />
      </view>
      <text class="tab-text">发现</text>
    </view>
    <view class="tab-item center" @click="navigateTo('/pages/safety/index')">
      <view class="tab-center-btn">
        <Icon name="plus" :size="56" color="var(--text-inverse)" />
      </view>
      <text class="tab-text">发布</text>
    </view>
    <view class="tab-item active" @click="switchTab('/pages/message/index')">
      <view class="tab-icon active">
        <Icon name="message" :size="48" color="#ee7c2b" />
      </view>
      <text class="tab-text active">消息</text>
    </view>
    <view class="tab-item" @click="switchTab('/pages/profile/index')">
      <view class="tab-icon">
        <Icon name="profile" :size="48" color="var(--text-tertiary)" />
      </view>
      <text class="tab-text">我的</text>
    </view>
  </view>
</template>

<script setup lang="ts">
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

// 切换 Tab 页面
const switchTab = (url: string) => {
  uni.switchTab({ url })
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.container {
  min-height: 100vh;
  background-color: var(--background-light);
}

.header {
  padding: $spacing-lg $spacing-xl $spacing-md $spacing-lg;
  background-color: $color-bg-secondary;
  border-bottom: 1rpx solid $color-border-light;
}

.title {
  font-size: $font-size-hero;
  font-weight: bold;
  color: $color-text-primary;
}

.content {
  padding: $spacing-lg;
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
  color: $color-text-tertiary;
  margin-bottom: $spacing-lg;
}

.empty-text {
  font-size: $font-size-h2;
  color: $color-text-primary;
  font-weight: 600;
  margin-bottom: $spacing-md;
}

.empty-sub {
  font-size: $font-size-body-sm;
  color: $color-text-tertiary;
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
  border-top: 1rpx solid $color-border-light;
  backdrop-filter: blur(20rpx);
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: $spacing-sm $spacing-md $spacing-lg;
  z-index: $z-index-fixed;
  max-width: 750rpx;
  margin: 0 auto;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
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
  color: $color-text-tertiary;
}

.tab-icon.active {
  background-color: rgba(238, 124, 43, 0.1);
  color: $color-primary;
}

.tab-center-btn {
  width: 112rpx;
  height: 112rpx;
  background-color: $color-primary;
  color: $color-text-inverse;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16rpx 40rpx -12rpx rgba(238, 124, 43, 0.5);
}

.tab-text {
  font-size: $font-size-tiny;
  color: $color-text-tertiary;
  font-weight: 500;
}

.tab-text.active {
  color: $color-primary;
  font-weight: bold;
}
</style>
