<template>
  <view class="page-community-detail page-shell">
    <GlobalBack />

    <view class="detail-hero card-shell">
      <image class="detail-hero__image" :src="community.image" mode="aspectFill" />
      <view class="detail-hero__info">
        <text class="detail-hero__title">{{ community.name }}</text>
        <text class="detail-hero__meta">{{ community.district }} · {{ community.address }}</text>
        <view class="detail-hero__tags">
          <text v-for="tag in community.tags" :key="tag" class="detail-tag">{{ tag }}</text>
        </view>
      </view>
      <view class="detail-hero__actions">
        <button class="detail-action-btn" @click="handleShare">分享</button>
        <button class="detail-action-btn" @click="toggleFavorite">{{ isFavorite ? '已收藏' : '收藏' }}</button>
      </view>
    </view>

    <view class="home-section">
      <SectionHeader title="核心指标" />
      <view class="detail-metrics card-shell card-shell--flat">
        <view class="detail-metric-item">
          <text>安全性</text>
          <text>{{ community.metrics.safety.toFixed(1) }}</text>
        </view>
        <view class="detail-metric-item">
          <text>安静度</text>
          <text>{{ community.metrics.quietness.toFixed(1) }}</text>
        </view>
        <view class="detail-metric-item">
          <text>性价比</text>
          <text>{{ community.metrics.value.toFixed(1) }}</text>
        </view>
      </view>
    </view>

    <view class="home-section">
      <SectionHeader title="小区简介" />
      <view class="card-shell card-shell--flat">
        <text>{{ community.description }}</text>
      </view>
    </view>

    <view class="home-section">
      <SectionHeader title="住户评价" link-text="查看全部" link-url="/pages/reviews/reviews" />
      <view class="detail-review-list">
        <ReviewCard
          v-for="(review, index) in community.reviews"
          :key="`${review.name}-${index}`"
          :review="review"
          mode="detail"
        />
      </view>
    </view>

    <view class="detail-footer-actions">
      <button class="detail-main-btn" @click="handlePublishReview">发布评价</button>
      <button class="detail-sub-btn" @click="showMapPopup = true">导航</button>
    </view>

    <view v-if="showMapPopup" class="detail-map-popup" @click="showMapPopup = false">
      <view class="detail-map-popup__panel" @click.stop>
        <text class="detail-map-popup__title">选择导航地图</text>
        <view class="detail-map-popup__actions">
          <text @click="selectMap('amap')">高德地图</text>
          <text @click="selectMap('baidu')">百度地图</text>
          <text @click="selectMap('tencent')">腾讯地图</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import ReviewCard from '@/components/business/ReviewCard.vue'
import SectionHeader from '@/components/business/SectionHeader.vue'
import { getCommunityById, type CommunityItem } from '@/data/communities'

const fallback = getCommunityById(1) as CommunityItem
const currentCommunityId = ref(fallback.id)
const isFavorite = ref(false)
const showMapPopup = ref(false)
const community = ref<CommunityItem>(fallback)

onLoad((query) => {
  const id = Number((query as Record<string, string> | undefined)?.id || '1')
  const target = getCommunityById(id)
  if (target) {
    currentCommunityId.value = target.id
    community.value = target
  }
})

const handleShare = () => {
  uni.showActionSheet({
    itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
    success: () => {
      uni.setClipboardData({
        data: `/pages/community-detail/community-detail?id=${currentCommunityId.value}`
      })
    }
  })
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  uni.showToast({ title: isFavorite.value ? '已收藏' : '已取消收藏', icon: 'success' })
}

const handlePublishReview = () => {
  uni.navigateTo({
    url: `/pages/review-publish/review-publish?communityId=${currentCommunityId.value}`
  })
}

const selectMap = (mapType: string) => {
  const names: Record<string, string> = {
    amap: '高德地图',
    baidu: '百度地图',
    tencent: '腾讯地图'
  }
  uni.showToast({ title: `正在打开${names[mapType] || '地图'}`, icon: 'none' })
  showMapPopup.value = false
}
</script>
