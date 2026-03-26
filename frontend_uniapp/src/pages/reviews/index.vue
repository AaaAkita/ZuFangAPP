<template>
  <view class="container">
    <view class="header">
      <view class="back-btn" @click="goBack">
        <Icon name="arrow_back" :size="36" />
      </view>
      <text class="title">全部评价</text>
      <view class="placeholder"></view>
    </view>

    <scroll-view class="content" scroll-y>
      <view v-for="(item, index) in reviews" :key="index" class="review-card">
        <view class="review-head">
          <text class="name">{{ item.name }}</text>
          <text class="time">{{ item.time }}</text>
        </view>
        <text class="text">{{ item.content }}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'

const reviews = ref([
  {
    name: '张雨萱',
    time: '2天前',
    content: '小区整体环境不错，物业响应速度快。'
  },
  {
    name: '李明',
    time: '1周前',
    content: '交通便利，周边配套齐全，居住体验良好。'
  }
])

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
  min-height: 100vh;
  background-color: #faf9f8;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--status-bar-height, 0px) + 20rpx) 32rpx 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f1f1f1;
}

.back-btn,
.placeholder {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: $font-size-h2;
  font-weight: 700;
  color: #1e293b;
}

.content {
  height: calc(100vh - 120rpx);
  padding: 24rpx;
  box-sizing: border-box;
}

.review-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.04);
}

.review-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.name {
  font-size: $font-size-h3;
  font-weight: 600;
}

.time {
  font-size: $font-size-caption;
  color: #64748b;
}

.text {
  font-size: $font-size-body;
  color: #334155;
  line-height: 1.6;
}
</style>
