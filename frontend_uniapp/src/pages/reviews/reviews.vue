<template>
  <view class="page-reviews page-shell">
    <GlobalBack />
    <view class="page-title-wrap">
      <text class="page-title">{{ reviewsData.title }}</text>
    </view>

    <scroll-view class="reviews-scroll" scroll-y>
      <view class="reviews-list">
        <ReviewCard
          v-for="(item, index) in reviewsData.reviews"
          :key="`${item.name}-${index}`"
          :review="item"
          mode="simple"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import ReviewCard from '@/components/business/ReviewCard.vue'
import { getReviewsPageData } from '@/data'

const reviewsData = computed(() => getReviewsPageData())
</script>
