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
        {{ rank }}
      </view>
      <image class="biz-community-card__cover" :src="community.image" mode="aspectFill" />
      <view class="biz-community-card__main">
        <view class="biz-community-card__row">
          <text class="biz-community-card__title">{{ community.name }}</text>
          <text :class="['biz-community-card__score', mode === 'risk' ? 'is-risk' : 'is-quality']">
            {{ mode === 'risk' ? `风险 ${Math.round(community.riskScore)}` : `${Math.round(community.qualityScore)} 分` }}
          </text>
        </view>
        <text class="biz-community-card__desc">{{ community.district }} · {{ community.address }}</text>
        <view v-if="mode === 'quality'" class="biz-community-card__chips">
          <text v-for="tag in community.highlights" :key="tag" class="biz-community-card__chip">
            {{ tag }}
          </text>
        </view>
        <text v-else class="biz-community-card__risk-tip">{{ community.riskReason }}</text>
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
  props.mode === 'quality' || props.mode === 'risk' ? 'card-shell card-shell--flat' : ''
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

.biz-community-card.mode-quality,
.biz-community-card.mode-risk {
  display: flex;
  gap: 14rpx;
  padding: 18rpx;
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
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #22c55e;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 700;
  flex-shrink: 0;
}

.biz-community-card__rank.is-risk {
  background: #ef4444;
}

.biz-community-card__cover {
  width: 120rpx;
  height: 120rpx;
  border-radius: 14rpx;
  flex-shrink: 0;
}

.biz-community-card__main {
  flex: 1;
  min-width: 0;
}

.biz-community-card__row {
  display: flex;
  justify-content: space-between;
  gap: 10rpx;
}

.biz-community-card__title {
  font-size: 28rpx;
  font-weight: 700;
  color: #0f172a;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.biz-community-card__score {
  flex-shrink: 0;
  font-size: 24rpx;
  font-weight: 700;
}

.biz-community-card__score.is-quality {
  color: #16a34a;
}

.biz-community-card__score.is-risk {
  color: #ef4444;
}

.biz-community-card__desc {
  display: block;
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #64748b;
}

.biz-community-card__chips {
  margin-top: 8rpx;
  display: flex;
  gap: 8rpx;
  flex-wrap: wrap;
}

.biz-community-card__chip {
  background: #ecfdf3;
  color: #16a34a;
  border-radius: 999rpx;
  padding: 4rpx 10rpx;
  font-size: 20rpx;
}

.biz-community-card__risk-tip {
  display: block;
  margin-top: 8rpx;
  font-size: 20rpx;
  color: #b91c1c;
}
</style>
