<template>
  <view class="biz-profile-review card-shell card-shell--flat">
    <view class="biz-profile-review__head">
      <view>
        <text class="biz-profile-review__community">{{ item.communityName }}</text>
        <text class="biz-profile-review__time">{{ item.time }}</text>
      </view>
      <view class="biz-profile-review__likes">
        <Icon name="heart" :size="22" color="#e07a5f" />
        <text>{{ item.likes }}</text>
      </view>
    </view>

    <text class="biz-profile-review__content">{{ item.content }}</text>

    <view class="biz-profile-review__tags">
      <text v-if="item.verified" class="biz-profile-review__tag is-verified">已认证</text>
      <text
        v-for="tag in item.tags"
        :key="tag"
        class="biz-profile-review__tag"
      >
        {{ tag }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { ProfileReviewItem } from '@/data'

interface Props {
  item: ProfileReviewItem
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.biz-profile-review {
  width: 100%;
}

.biz-profile-review__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12rpx;
}

.biz-profile-review__community {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: #1e293b;
}

.biz-profile-review__time {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #94a3b8;
}

.biz-profile-review__likes {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  padding: 6rpx 12rpx;
  border-radius: 999rpx;
  font-size: 22rpx;
  color: #9a6c4c;
  background: rgba(224, 122, 95, 0.12);
}

.biz-profile-review__content {
  display: block;
  margin-top: 12rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #334155;
}

.biz-profile-review__tags {
  margin-top: 12rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.biz-profile-review__tag {
  font-size: 20rpx;
  color: #64748b;
  background: #f3f4f6;
  border-radius: 999rpx;
  padding: 6rpx 14rpx;
}

.biz-profile-review__tag.is-verified {
  color: #15803d;
  background: #ecfdf3;
}
</style>
