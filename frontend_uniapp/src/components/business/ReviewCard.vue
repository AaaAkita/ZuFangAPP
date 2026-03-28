<template>
  <view :class="['biz-review-card', `mode-${mode}`, 'card-shell', compact ? 'card-shell--compact' : 'card-shell--flat']">
    <view class="biz-review-card__head">
      <UserAvatar :src="review.avatar" :verified="review.verified" :size="avatarSize" />
      <view class="biz-review-card__meta">
        <view class="biz-review-card__name-row">
          <text class="biz-review-card__name">{{ review.name }}</text>
          <text class="biz-review-card__time">{{ review.time }}</text>
        </view>
        <text v-if="review.targetName" class="biz-review-card__target">
          评价了 <text class="target-name">{{ review.targetName }}</text>
        </text>
      </view>
    </view>
    <text class="biz-review-card__content">{{ review.content }}</text>
    <view v-if="review.tags && review.tags.length" class="biz-review-card__tags">
      <text v-for="tag in normalizedTags" :key="tag" class="biz-review-card__tag">{{ tag }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UserAvatar from './UserAvatar.vue'
import type { CommunityReviewTag } from '@/data'

interface ReviewData {
  name: string
  avatar: string
  verified: boolean
  time: string
  content: string
  targetName?: string
  tags?: Array<string | CommunityReviewTag>
}

interface Props {
  review: ReviewData
  mode?: 'home' | 'detail' | 'simple'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'detail'
})

const normalizedTags = computed(() =>
  (props.review.tags || []).map((item) => (typeof item === 'string' ? item : item.text))
)

const avatarSize = computed(() => (props.mode === 'home' ? 88 : 72))
const compact = computed(() => props.mode === 'home')
</script>

<style scoped lang="scss">
.biz-review-card {
  width: 100%;
}

.biz-review-card__head {
  display: flex;
  gap: 16rpx;
  align-items: flex-start;
}

.biz-review-card__meta {
  flex: 1;
  min-width: 0;
}

.biz-review-card__name-row {
  display: flex;
  justify-content: space-between;
  gap: 10rpx;
}

.biz-review-card__name {
  font-size: 26rpx;
  font-weight: 700;
  color: #1f2937;
}

.biz-review-card__time {
  font-size: 22rpx;
  color: #94a3b8;
}

.biz-review-card__target {
  display: block;
  margin-top: 4rpx;
  font-size: 22rpx;
  color: #94a3b8;
}

.target-name {
  color: var(--primary);
  font-weight: 600;
}

.biz-review-card__content {
  display: block;
  margin-top: 14rpx;
  line-height: 1.6;
  color: #334155;
  font-size: 24rpx;
}

.biz-review-card__tags {
  margin-top: 14rpx;
  display: flex;
  gap: 10rpx;
  flex-wrap: wrap;
}

.biz-review-card__tag {
  font-size: 20rpx;
  color: #6b7280;
  background: #f3f4f6;
  border-radius: 999rpx;
  padding: 7rpx 14rpx;
}
</style>
