<template>
  <view class="page-my-reviews page-shell">
    <GlobalBack />

    <view class="page-title-wrap">
      <text class="page-title">{{ reviewsData.title }}</text>
      <text class="my-reviews-subtitle">{{ reviewsData.subtitle }}</text>
    </view>

    <view class="my-reviews-list">
      <ProfileReviewItem
        v-for="item in reviewsData.reviews"
        :key="item.id"
        :item="item"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import ProfileReviewItem from '@/components/business/ProfileReviewItem.vue'
import { getProfileReviewsData } from '@/data'

const reviewsData = computed(() => getProfileReviewsData())
</script>

<style scoped lang="scss">
.my-reviews-subtitle {
  display: block;
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #94a3b8;
}

.my-reviews-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 32rpx);
}
</style>
