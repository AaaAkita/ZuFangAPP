<template>
  <view class="page-home page-shell-wide">
    <view class="home-header">
      <view class="home-location">
        <Icon name="location" :size="40" color="var(--primary)" />
        <text class="home-city">{{ appData.city }}</text>
      </view>
      <text class="home-subtitle">{{ appData.locationSubtitle }}</text>
    </view>

    <view class="home-search" @click="navigateTo('/pages/search/search')">
      <Icon name="search" :size="30" color="var(--text-muted)" />
      <text class="home-search__placeholder">{{ homeData.searchPlaceholder }}</text>
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
        <text class="home-banner__tag">{{ homeData.banner.tag }}</text>
        <text class="home-banner__title">{{ homeData.banner.title }}</text>
        <text class="home-banner__subtitle">{{ homeData.banner.subtitle }}</text>
        <view class="home-banner__points">
          <text v-for="point in homeData.banner.points" :key="point" class="home-banner__point">{{ point }}</text>
        </view>
        <Button type="primary" size="small">{{ homeData.banner.buttonText }}</Button>
      </view>
    </view>

    <view class="home-section">
      <SectionHeader title="租房避雷信息" />
      <view class="home-warning-list">
        <WarningCard v-for="item in homeData.warnings" :key="item.id" :item="item" />
      </view>
    </view>

    <view class="home-section">
      <SectionHeader title="最新评价" />
      <view class="home-review-list">
        <ReviewCard
          v-for="item in homeData.latestReviews"
          :key="item.id"
          :review="item"
          mode="home"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import CommunityCard from '@/components/business/CommunityCard.vue'
import ReviewCard from '@/components/business/ReviewCard.vue'
import SectionHeader from '@/components/business/SectionHeader.vue'
import WarningCard from '@/components/business/WarningCard.vue'
import { getAppData, getHomeData } from '@/data'
import { getFeaturedCommunities } from '@/data/communities'

const appData = computed(() => getAppData())
const homeData = computed(() => getHomeData())
const featuredCommunities = computed(() => getFeaturedCommunities())

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
