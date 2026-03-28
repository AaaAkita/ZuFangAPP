<template>
  <view class="page-community page-shell">
    <GlobalBack />

    <scroll-view class="community-scroll" scroll-y>
      <view class="community-hero card-shell">
        <view class="community-hero__head">
          <view>
            <text class="community-hero__title">社区榜单</text>
            <text class="community-hero__subtitle">优质小区排行榜 + 小区避雷榜</text>
          </view>
          <text class="community-hero__badge">每周更新</text>
        </view>
        <view class="community-hero__stats">
          <view class="community-stat community-stat--quality">
            <text class="community-stat__label">优质 TOP1</text>
            <text class="community-stat__value">{{ topQuality?.name || '--' }}</text>
            <text class="community-stat__meta">{{ Math.round(topQuality?.qualityScore || 0) }} 分</text>
          </view>
          <view class="community-stat community-stat--risk">
            <text class="community-stat__label">高风险小区</text>
            <text class="community-stat__value">{{ highRiskCount }}</text>
            <text class="community-stat__meta">风险分 ≥ 70</text>
          </view>
        </view>
      </view>

      <view class="community-board community-board--quality">
        <SectionHeader title="优质小区排行榜" subtitle="综合体验由高到低" />
        <view class="community-list">
          <CommunityCard
            v-for="(item, index) in qualityRanking"
            :key="`q-${item.id}`"
            mode="quality"
            :community="item"
            :rank="index + 1"
            @click="goToDetail(item.id)"
          />
        </view>
      </view>

      <view class="community-board community-board--risk">
        <SectionHeader title="小区避雷榜" subtitle="风险反馈由高到低" />
        <view class="community-list">
          <CommunityCard
            v-for="(item, index) in riskRanking"
            :key="`r-${item.id}`"
            mode="risk"
            :community="item"
            :rank="index + 1"
            @click="goToDetail(item.id)"
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import CommunityCard from '@/components/business/CommunityCard.vue'
import SectionHeader from '@/components/business/SectionHeader.vue'
import { getQualityRanking, getRiskRanking } from '@/data/communities'

const qualityRanking = computed(() => getQualityRanking())
const riskRanking = computed(() => getRiskRanking())
const topQuality = computed(() => qualityRanking.value[0])
const highRiskCount = computed(() => riskRanking.value.filter((item) => item.riskScore >= 70).length)

const goToDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/community-detail/community-detail?id=${id}`
  })
}
</script>

<style scoped lang="scss">
.community-scroll {
  height: calc(100vh - 56rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) + 132rpx);
}

.community-hero {
  margin-bottom: 24rpx;
  background:
    radial-gradient(circle at 86% 12%, rgba(34, 197, 94, 0.16), transparent 36%),
    radial-gradient(circle at 12% 86%, rgba(59, 130, 246, 0.12), transparent 40%),
    linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.community-hero__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16rpx;
}

.community-hero__title {
  display: block;
  font-size: 42rpx;
  font-weight: 800;
  letter-spacing: 1rpx;
  color: #18212f;
}

.community-hero__subtitle {
  display: block;
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #64748b;
}

.community-hero__badge {
  flex-shrink: 0;
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  font-weight: 600;
  color: #14532d;
  background: rgba(34, 197, 94, 0.14);
}

.community-hero__stats {
  margin-top: 18rpx;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14rpx;
}

.community-stat {
  border-radius: 20rpx;
  padding: 16rpx;
  border: 1rpx solid rgba(15, 23, 42, 0.06);
}

.community-stat--quality {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(187, 247, 208, 0.32));
}

.community-stat--risk {
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.08), rgba(254, 205, 211, 0.28));
}

.community-stat__label {
  display: block;
  font-size: 20rpx;
  color: #475569;
}

.community-stat__value {
  display: block;
  margin-top: 8rpx;
  font-size: 30rpx;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.community-stat__meta {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #475569;
}

.community-board + .community-board {
  margin-top: 26rpx;
}

.community-list {
  margin-top: 18rpx;
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}
</style>
