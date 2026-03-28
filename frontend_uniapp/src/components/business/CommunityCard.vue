<template>
  <view :class="cardClasses" @click="$emit('click')">
    <template v-if="mode === 'featured'">
      <image class="biz-community-card__bg" :src="community.image" mode="aspectFill" />
      <view class="biz-community-card__overlay"></view>
      <view class="biz-community-card__rating">
        <Icon name="star" :size="16" color="#facc15" />
        <text>{{ toFixed(community.rating) }}</text>
      </view>
      <view class="biz-community-card__content">
        <text class="biz-community-card__name">{{ community.name }}</text>
        <text class="biz-community-card__meta">{{ community.district }} · {{ community.address }}</text>
        <view class="biz-community-card__tags">
          <text
            v-for="tag in community.highlights.slice(0, 2)"
            :key="tag"
            class="biz-community-card__tag"
          >
            {{ tag }}
          </text>
        </view>
      </view>
    </template>

    <template v-else>
      <view v-if="rank !== null" :class="['biz-community-card__rank', mode === 'risk' ? 'is-risk' : '']">
        <text class="biz-community-card__rank-index">{{ rank }}</text>
        <text class="biz-community-card__rank-label">{{ mode === 'risk' ? '风险' : 'TOP' }}</text>
      </view>
      <image class="biz-community-card__cover" :src="community.image" mode="aspectFill" />
      <view class="biz-community-card__main">
        <view class="biz-community-card__row">
          <text class="biz-community-card__title">{{ community.name }}</text>
          <view :class="['biz-community-card__score-pill', mode === 'risk' ? 'is-risk' : 'is-quality']">
            <text class="biz-community-card__score-label">{{ mode === 'risk' ? '风险' : '评分' }}</text>
            <text class="biz-community-card__score-value">
              {{ mode === 'risk' ? Math.round(community.riskScore) : Math.round(community.qualityScore) }}
            </text>
          </view>
        </view>
        <text class="biz-community-card__desc">{{ community.district }} · {{ community.address }}</text>
        <view v-if="mode === 'quality'" class="biz-community-card__chips">
          <text v-for="tag in community.highlights.slice(0, 3)" :key="tag" class="biz-community-card__chip">
            {{ tag }}
          </text>
        </view>
        <view v-else class="biz-community-card__risk-tip">
          <Icon name="warning" :size="18" color="#dc2626" />
          <text class="biz-community-card__risk-text">{{ community.riskReason }}</text>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import type { CommunityItem } from '@/data'

interface Props {
  community: CommunityItem
  mode?: 'featured' | 'quality' | 'risk'
  rank?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'featured',
  rank: null
})

defineEmits<{
  (e: 'click'): void
}>()

const cardClasses = computed(() => [
  'biz-community-card',
  `mode-${props.mode}`,
  props.mode === 'quality' || props.mode === 'risk' ? 'biz-community-card--ranked' : ''
])

const toFixed = (value: number) => value.toFixed(1)
</script>

<style scoped lang="scss">
.biz-community-card {
  position: relative;
  overflow: hidden;
}

.biz-community-card.mode-featured {
  width: 260rpx;
  height: 340rpx;
  border-radius: 24rpx;
  flex-shrink: 0;
}

.biz-community-card--ranked {
  display: grid;
  grid-template-columns: 62rpx 126rpx 1fr;
  align-items: center;
  gap: 14rpx;
  padding: 18rpx;
  border-radius: 26rpx;
  border: 1rpx solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 10rpx 24rpx rgba(15, 23, 42, 0.05);
  background: #ffffff;
}

.biz-community-card.mode-risk.biz-community-card--ranked {
  background: linear-gradient(135deg, #ffffff 0%, #fff7f7 100%);
}

.biz-community-card__bg {
  width: 100%;
  height: 100%;
}

.biz-community-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78), transparent 44%);
}

.biz-community-card__rating {
  position: absolute;
  top: 14rpx;
  left: 14rpx;
  display: flex;
  align-items: center;
  gap: 4rpx;
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
  padding: 4rpx 10rpx;
  border-radius: 18rpx;
  font-size: 18rpx;
}

.biz-community-card__content {
  position: absolute;
  left: 14rpx;
  right: 14rpx;
  bottom: 18rpx;
  color: #fff;
}

.biz-community-card__name {
  display: block;
  font-size: 24rpx;
  font-weight: 700;
}

.biz-community-card__meta {
  display: block;
  margin-top: 6rpx;
  font-size: 18rpx;
  opacity: 0.92;
}

.biz-community-card__tags {
  margin-top: 10rpx;
  display: flex;
  gap: 8rpx;
  flex-wrap: wrap;
}

.biz-community-card__tag {
  font-size: 16rpx;
  padding: 3rpx 10rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.2);
}

.biz-community-card__rank {
  width: 62rpx;
  height: 126rpx;
  border-radius: 999rpx;
  background: linear-gradient(180deg, #34d399 0%, #16a34a 100%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rpx;
  box-shadow: 0 8rpx 18rpx rgba(22, 163, 74, 0.24);
}

.biz-community-card__rank.is-risk {
  background: linear-gradient(180deg, #fb7185 0%, #ef4444 100%);
  box-shadow: 0 8rpx 18rpx rgba(239, 68, 68, 0.24);
}

.biz-community-card__rank-index {
  font-size: 28rpx;
  font-weight: 800;
  line-height: 1;
}

.biz-community-card__rank-label {
  font-size: 17rpx;
  opacity: 0.9;
  line-height: 1;
}

.biz-community-card__cover {
  width: 126rpx;
  height: 126rpx;
  border-radius: 18rpx;
  flex-shrink: 0;
}

.biz-community-card__main {
  flex: 1;
  min-width: 0;
}

.biz-community-card__row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10rpx;
}

.biz-community-card__title {
  font-size: 30rpx;
  font-weight: 700;
  color: #0f172a;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.biz-community-card__score-pill {
  flex-shrink: 0;
  border-radius: 16rpx;
  padding: 6rpx 10rpx 4rpx;
  min-width: 88rpx;
  text-align: center;
}

.biz-community-card__score-pill.is-quality {
  background: rgba(34, 197, 94, 0.14);
  color: #15803d;
}

.biz-community-card__score-pill.is-risk {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.biz-community-card__score-label {
  display: block;
  font-size: 16rpx;
  line-height: 1;
  opacity: 0.8;
}

.biz-community-card__score-value {
  display: block;
  margin-top: 3rpx;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1;
}

.biz-community-card__desc {
  display: block;
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.biz-community-card__chips {
  margin-top: 10rpx;
  display: flex;
  gap: 8rpx;
  flex-wrap: wrap;
}

.biz-community-card__chip {
  background: #ecfdf3;
  color: #15803d;
  border-radius: 999rpx;
  padding: 5rpx 12rpx;
  font-size: 20rpx;
}

.biz-community-card__risk-tip {
  margin-top: 10rpx;
  display: flex;
  align-items: flex-start;
  gap: 6rpx;
  padding: 6rpx 10rpx;
  border-radius: 12rpx;
  background: rgba(254, 226, 226, 0.55);
}

.biz-community-card__risk-text {
  flex: 1;
  min-width: 0;
  font-size: 20rpx;
  color: #b91c1c;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
