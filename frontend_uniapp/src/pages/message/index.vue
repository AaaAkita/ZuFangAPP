<template>
  <view class="container page-shell">
    <GlobalBack />
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
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.container {
  min-height: 100vh;
  background-color: var(--background-light);
}

.header {
  padding: calc(var(--status-bar-height, 0px) + 24rpx) 0 $spacing-md 0;
  background-color: $color-bg-secondary;
  border-bottom: 1rpx solid $color-border-light;
}

.title {
  font-size: $font-size-hero;
  font-weight: bold;
  color: $color-text-primary;
}

.content {
  padding: $spacing-lg 0;
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
</style>
