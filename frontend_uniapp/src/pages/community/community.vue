<template>
  <view class="page-community page-shell">
    <GlobalBack />

    <view class="community-header">
      <text class="community-header__title">社区榜单</text>
      <text class="community-header__subtitle">优质小区排行榜 + 小区避雷榜</text>
    </view>

    <scroll-view class="community-scroll" scroll-y>
      <view class="home-section">
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

      <view class="home-section">
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

const goToDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/community-detail/community-detail?id=${id}`
  })
}
</script>
