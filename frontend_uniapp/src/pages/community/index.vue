<template>
  <view class="container">
    <view class="header">
      <text class="title">发现</text>
    </view>
    <view class="content">
      <view class="empty-state">
        <Icon name="community" :size="120" color="var(--text-muted)" class="empty-icon" />
        <text class="empty-text">发现页面</text>
        <text class="empty-sub">更多精彩内容即将上线</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.container {
  min-height: 100vh;
  background-color: var(--background-light);
}

.header {
  padding: calc(var(--status-bar-height, 0px) + 24rpx) $spacing-xl $spacing-md $spacing-lg;
  background-color: $color-bg-secondary;
  border-bottom: 1rpx solid $color-border-light;
}

.title {
  font-size: $font-size-hero;
  font-weight: bold;
  color: var(--text-main);
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
  color: var(--text-muted);
  margin-bottom: $spacing-lg;
}

.empty-text {
  font-size: $font-size-h2;
  color: var(--text-main);
  font-weight: 600;
  margin-bottom: $spacing-md;
}

.empty-sub {
  font-size: $font-size-body-sm;
  color: var(--text-muted);
}
</style>
