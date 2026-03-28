<template>
  <view class="container">
    <view class="header page-shell">
      <text class="title">社区榜单</text>
      <text class="subtitle">优质小区排行榜 + 小区避雷榜</text>
    </view>

    <scroll-view class="content page-shell" scroll-y>
      <view class="section">
        <view class="section-head">
          <text class="section-title">优质小区排行榜</text>
          <text class="section-desc">综合体验由高到低</text>
        </view>

        <view class="rank-list">
          <view
            v-for="(item, index) in qualityRanking"
            :key="`q-${item.id}`"
            class="rank-card rank-good"
            @click="goToDetail(item.id)"
          >
            <view class="rank-badge">{{ index + 1 }}</view>
            <image
              class="cover"
              :src="item.image || '/static/logo.png'"
              mode="aspectFill"
            />
            <view class="main">
              <view class="row-top">
                <text class="name">{{ safeText(item.name, '未命名小区') }}</text>
                <text class="score-good">{{ formatNumber(item.qualityScore) }} 分</text>
              </view>
              <text class="meta">{{ safeText(item.district, '-') }} · {{ safeText(item.address, '-') }}</text>
              <view class="tag-row">
                <text v-for="tag in item.highlights" :key="tag" class="tag-good">{{ safeText(tag, '标签') }}</text>
              </view>
              <text class="foot">
                评分 {{ formatFloat(item.rating) }} · 安全 {{ formatFloat(item.metrics.safety) }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="section-head">
          <text class="section-title">小区避雷榜</text>
          <text class="section-desc">风险反馈由高到低</text>
        </view>

        <view class="rank-list">
          <view
            v-for="(item, index) in riskRanking"
            :key="`r-${item.id}`"
            class="rank-card rank-risk"
            @click="goToDetail(item.id)"
          >
            <view class="rank-badge rank-badge-risk">{{ index + 1 }}</view>
            <image
              class="cover"
              :src="item.image || '/static/logo.png'"
              mode="aspectFill"
            />
            <view class="main">
              <view class="row-top">
                <text class="name">{{ safeText(item.name, '未命名小区') }}</text>
                <text class="score-risk">风险 {{ formatNumber(item.riskScore) }}</text>
              </view>
              <text class="meta">{{ safeText(item.district, '-') }} · {{ safeText(item.address, '-') }}</text>
              <text class="risk-reason">{{ safeText(item.riskReason, '暂无风险描述') }}</text>
              <text class="foot">建议：实地核验房源真实性、噪音与物业投诉记录</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getQualityRanking, getRiskRanking } from '@/data/communities'

const qualityRanking = computed(() => getQualityRanking())
const riskRanking = computed(() => getRiskRanking())

const goToDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/community-detail/index?id=${id}`
  })
}

const safeText = (value: unknown, fallback: string) => {
  if (typeof value === 'string' && value.trim()) return value
  return fallback
}

const formatFloat = (value: unknown) => {
  const num = Number(value)
  return Number.isFinite(num) ? num.toFixed(1) : '--'
}

const formatNumber = (value: unknown) => {
  const num = Number(value)
  return Number.isFinite(num) ? String(Math.round(num)) : '--'
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
  min-height: 100vh;
  background: #faf9f8;
}

.header {
  padding-top: calc(var(--status-bar-height, 0px) + 24rpx);
  padding-bottom: 18rpx;
  background: linear-gradient(180deg, #fffaf5 0%, #faf9f8 100%);
}

.title {
  display: block;
  font-size: $font-size-hero;
  font-weight: 700;
  color: #1e293b;
}

.subtitle {
  display: block;
  margin-top: 8rpx;
  font-size: $font-size-body-sm;
  color: #64748b;
}

.content {
  height: calc(100vh - 120rpx);
  padding-top: 0;
  padding-bottom: 30rpx;
  box-sizing: border-box;
}

.section {
  margin-top: 20rpx;
  width: 100%;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 14rpx;
}

.section-title {
  font-size: $font-size-h2;
  font-weight: 700;
  color: #1e293b;
}

.section-desc {
  font-size: $font-size-caption;
  color: #64748b;
}

.rank-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}

.rank-card {
  display: flex;
  gap: 14rpx;
  padding: 18rpx;
  border-radius: 18rpx;
  background: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 1rpx solid #eef2f7;
  width: 100%;
  box-sizing: border-box;
}

.cover {
  width: 120rpx;
  height: 120rpx;
  border-radius: 14rpx;
  flex-shrink: 0;
  background-color: #f1f5f9;
}

.rank-card:active {
  transform: scale(0.995);
}

.rank-good {
  border-left: 8rpx solid #22c55e;
}

.rank-risk {
  border-left: 8rpx solid #ef4444;
}

.rank-badge {
  width: 48rpx;
  height: 48rpx;
  border-radius: 24rpx;
  background: #22c55e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-body;
  font-weight: 700;
  flex-shrink: 0;
}

.rank-badge-risk {
  background: #ef4444;
}

.main {
  flex: 1;
  min-width: 0;
}

.row-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12rpx;
}

.name {
  font-size: $font-size-h3;
  font-weight: 700;
  color: #0f172a;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.score-good {
  color: #16a34a;
  font-size: $font-size-body-sm;
  font-weight: 700;
  flex-shrink: 0;
}

.score-risk {
  color: #ef4444;
  font-size: $font-size-body-sm;
  font-weight: 700;
  flex-shrink: 0;
}

.meta {
  display: block;
  margin-top: 8rpx;
  font-size: $font-size-body-sm;
  color: #64748b;
  word-break: break-all;
}

.tag-row {
  display: flex;
  gap: 8rpx;
  margin-top: 8rpx;
  flex-wrap: wrap;
}

.tag-good {
  background: #ecfdf3;
  color: #16a34a;
  border-radius: 999rpx;
  padding: 4rpx 10rpx;
  font-size: $font-size-tiny;
}

.risk-reason {
  display: block;
  margin-top: 8rpx;
  font-size: $font-size-body-sm;
  color: #b91c1c;
  word-break: break-all;
}

.foot {
  display: block;
  margin-top: 8rpx;
  font-size: $font-size-tiny;
  color: #94a3b8;
  word-break: break-all;
}
</style>
