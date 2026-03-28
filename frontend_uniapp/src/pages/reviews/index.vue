<template>
  <view class="container page-shell">
    <GlobalBack />
    <view class="header">
      <text class="title">全部评价</text>
    </view>

    <scroll-view class="content" scroll-y>
      <view v-for="(item, index) in reviews" :key="index" class="review-card card-shell card-shell--flat">
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
import GlobalBack from '@/components/ui/GlobalBack.vue'

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
  justify-content: center;
  padding: calc(var(--status-bar-height, 0px) + 20rpx) 0 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f1f1f1;
}

.title {
  font-size: $font-size-h2;
  font-weight: 700;
  color: #1e293b;
}

.content {
  height: calc(100vh - 120rpx);
  padding: 0;
  box-sizing: border-box;
}

.review-card {
  margin-bottom: 20rpx;
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
