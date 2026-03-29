<template>
  <view class="page-home page-shell-wide">
    <view class="home-header">
      <view class="home-location">
        <Icon name="location" :size="40" color="var(--primary)" />
        <text class="home-city">{{ city }}</text>
      </view>
      <text class="home-subtitle">{{ locationSubtitle }}</text>
    </view>

    <view class="home-search" @click="navigateTo('/pages/search/search')">
      <Icon name="search" :size="30" color="var(--text-muted)" />
      <text class="home-search__placeholder">{{ searchPlaceholder }}</text>
      <view class="home-search__filter" @click.stop="goToSearchWithFilter">
        <Icon name="filter" :size="28" color="var(--primary)" />
      </view>
    </view>

    <view class="home-section">
      <SectionHeader title="推荐小区" link-text="查看全部" link-url="/pages/community/community" />
      <scroll-view class="home-recommend-scroll" scroll-x :show-scrollbar="false">
        <view class="home-recommend-list">
          <CommunityCard
            v-for="item in featuredCommunities"
            :key="item.id"
            mode="featured"
            :community="item"
            @click="goToCommunityDetail(item.id)"
          />
        </view>
      </scroll-view>
    </view>

    <view class="home-section">
      <view class="home-banner card-shell">
        <text class="home-banner__tag">实时热搜</text>
        <text class="home-banner__title">租房关键词趋势</text>
        <text class="home-banner__subtitle">基于用户最近搜索行为实时更新</text>
        <view class="home-banner__points">
          <text v-for="word in hotSearchLabels" :key="word" class="home-banner__point">{{ word }}</text>
        </view>
        <Button type="primary" size="small" @click="navigateTo('/pages/search/search')">立即搜索</Button>
      </view>
    </view>

    <view class="home-section">
      <SectionHeader title="租房避雷信息" />
      <view class="home-warning-list">
        <WarningCard v-for="item in warningItems" :key="item.id" :item="item" />
      </view>
    </view>

    <view class="home-section">
      <SectionHeader title="最新评价" />
      <view class="home-review-list">
        <ReviewCard
          v-for="item in latestReviews"
          :key="item.id"
          :review="item"
          mode="home"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import CommunityCard from '@/components/business/CommunityCard.vue'
import ReviewCard from '@/components/business/ReviewCard.vue'
import SectionHeader from '@/components/business/SectionHeader.vue'
import WarningCard from '@/components/business/WarningCard.vue'
import { homeApi } from '@/api/home'
import { getErrorMessage } from '@/api/client'
import type { CommunityItem, WarningItem } from '@/data'

const city = ref('北京')
const locationSubtitle = ref('真实租客评价持续更新')
const featuredCommunities = ref<CommunityItem[]>([])
const warningItems = ref<WarningItem[]>([])
const latestReviews = ref<any[]>([])
const hotSearchLabels = ref<string[]>(['地铁近', '押金纠纷', '高性价比'])

const searchPlaceholder = computed(() => {
  if (hotSearchLabels.value.length > 0) {
    return `试试：${hotSearchLabels.value[0]}`
  }
  return '搜索小区或关键词'
})

function toCommunityView(item: any): CommunityItem {
  return {
    id: item.id,
    name: item.name,
    district: item.district,
    address: item.address,
    rating: Number(item.ratingAvg || 0),
    tags: Array.isArray(item.tags) ? item.tags : [],
    description: item.riskReason || '',
    image: item.coverImage || '',
    qualityScore: Number(item.qualityScore || 0),
    riskScore: Number(item.riskScore || 0),
    riskReason: item.riskReason || '暂无风险描述',
    highlights: Array.isArray(item.highlights) ? item.highlights : [],
    metrics: {
      safety: 0,
      quietness: 0,
      value: 0
    },
    reviews: []
  }
}

function formatTime(isoTime: string) {
  const date = new Date(isoTime)
  if (Number.isNaN(date.getTime())) return '刚刚'
  const diff = Date.now() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours < 1) return '刚刚'
  if (hours < 24) return `${hours} 小时前`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} 天前`
  return `${Math.floor(days / 30)} 个月前`
}

async function loadHomeData() {
  try {
    const data = await homeApi.get()

    if (data.recommendedCommunities.length > 0) {
      city.value = '北京市'
    }

    featuredCommunities.value = data.recommendedCommunities.map(toCommunityView)
    warningItems.value = data.riskWarnings.map((item) => ({
      id: item.id,
      name: item.name,
      time: '实时更新',
      subtitle: `${item.district} 风险分 ${Math.round(item.riskScore)}`,
      description: item.riskReason,
      level: item.riskScore >= 70 ? 'red' : 'orange',
      tags: ['风险提示']
    }))
    latestReviews.value = data.latestReviews.map((item) => ({
      id: item.id,
      name: item.user.nickname || '匿名用户',
      avatar: item.user.avatar || '',
      verified: item.verified,
      time: formatTime(item.createdAt),
      targetName: item.communityName,
      content: item.content,
      tags: item.tags || []
    }))
    hotSearchLabels.value = data.hotSearches.map((item) => item.keyword)
  } catch (error) {
    uni.showToast({
      title: getErrorMessage(error, '首页数据加载失败'),
      icon: 'none'
    })
  }
}

onMounted(() => {
  void loadHomeData()
})

const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}

const goToSearchWithFilter = () => {
  uni.navigateTo({
    url: '/pages/search/search?showFilter=true'
  })
}

const goToCommunityDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/community-detail/community-detail?id=${id}`
  })
}
</script>
