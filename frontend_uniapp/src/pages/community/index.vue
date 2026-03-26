<template>
  <view class="container">
    <view class="header">
      <view>
        <text class="title">社区榜单</text>
        <text class="subtitle">优质小区排行榜 + 小区避雷榜</text>
      </view>
    </view>

    <scroll-view class="content" scroll-y>
      <view class="section">
        <view class="section-head">
          <text class="section-title">优质小区排行榜</text>
          <text class="section-desc">按综合体验评分排序</text>
        </view>

        <view class="rank-list">
          <view
            v-for="(item, index) in qualityRanking"
            :key="item.id"
            class="rank-card good"
            @click="goToDetail(item.id)"
          >
            <view class="rank-num">{{ index + 1 }}</view>
            <image class="cover" :src="item.image" mode="aspectFill" />
            <view class="info">
              <view class="name-row">
                <text class="name">{{ item.name }}</text>
                <text class="score">{{ item.qualityScore }}分</text>
              </view>
              <text class="meta">{{ item.district }} · {{ item.address }}</text>
              <view class="tag-row">
                <text v-for="tag in item.highlights" :key="tag" class="tag">{{ tag }}</text>
              </view>
              <text class="foot">评分 {{ item.rating.toFixed(1) }} · 安全 {{ item.metrics.safety.toFixed(1) }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="section">
        <view class="section-head">
          <text class="section-title">小区避雷榜</text>
          <text class="section-desc">按风险反馈热度排序</text>
        </view>

        <view class="rank-list">
          <view
            v-for="(item, index) in riskRanking"
            :key="item.id"
            class="rank-card risk"
            @click="goToDetail(item.id)"
          >
            <view class="rank-num risk-num">{{ index + 1 }}</view>
            <image class="cover" :src="item.image" mode="aspectFill" />
            <view class="info">
              <view class="name-row">
                <text class="name">{{ item.name }}</text>
                <text class="risk-score">风险 {{ item.riskScore }}</text>
              </view>
              <text class="meta">{{ item.district }} · {{ item.address }}</text>
              <text class="risk-reason">{{ item.riskReason }}</text>
              <text class="foot">建议：看房时重点核验合同、噪音与物业记录</text>
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
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
  min-height: 100vh;
  background: #faf9f8;
}

.header {
  padding: calc(var(--status-bar-height, 0px) + 24rpx) 32rpx 20rpx;
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
  padding: 0 24rpx 28rpx;
  box-sizing: border-box;
}

.section {
  margin-top: 18rpx;
}

.section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 18rpx;
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
  gap: 16rpx;
}

.rank-card {
  display: flex;
  gap: 16rpx;
  padding: 18rpx;
  border-radius: 20rpx;
  background-color: #fff;
  border: 1rpx solid #f1f5f9;
  box-shadow: 0 4rpx 14rpx rgba(0, 0, 0, 0.04);
}

.rank-card:active {
  transform: scale(0.99);
}

.rank-card.good {
  border-left: 8rpx solid #22c55e;
}

.rank-card.risk {
  border-left: 8rpx solid #ef4444;
}

.rank-num {
  width: 46rpx;
  height: 46rpx;
  border-radius: 23rpx;
  background: #22c55e;
  color: #fff;
  font-size: $font-size-body-sm;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.risk-num {
  background: #ef4444;
}

.cover {
  width: 120rpx;
  height: 120rpx;
  border-radius: 14rpx;
  flex-shrink: 0;
}

.info {
  flex: 1;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14rpx;
}

.name {
  font-size: $font-size-h3;
  font-weight: 700;
  color: #0f172a;
}

.score {
  font-size: $font-size-caption;
  color: #16a34a;
  font-weight: 700;
}

.risk-score {
  font-size: $font-size-caption;
  color: #ef4444;
  font-weight: 700;
}

.meta {
  display: block;
  margin-top: 8rpx;
  font-size: $font-size-caption;
  color: #64748b;
}

.tag-row {
  display: flex;
  gap: 10rpx;
  flex-wrap: wrap;
  margin-top: 8rpx;
}

.tag {
  padding: 4rpx 10rpx;
  border-radius: 999rpx;
  background: #ecfdf3;
  color: #16a34a;
  font-size: $font-size-tiny;
}

.risk-reason {
  display: block;
  margin-top: 8rpx;
  font-size: $font-size-caption;
  color: #b91c1c;
}

.foot {
  display: block;
  margin-top: 8rpx;
  font-size: $font-size-tiny;
  color: #94a3b8;
}
</style>
