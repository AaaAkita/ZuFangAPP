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
      <SectionHeader title="住户评价" link-text="查看全部" :link-url="`/pages/reviews/reviews?communityId=${currentCommunityId}`" />
      <view class="detail-review-list">
        <ReviewCard
          v-for="review in reviewList"
          :key="review.id"
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
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import ReviewCard from '@/components/business/ReviewCard.vue'
import SectionHeader from '@/components/business/SectionHeader.vue'
import { communityApi } from '@/api/community'
import { commentApi } from '@/api/comment'
import { getErrorMessage } from '@/api/client'

const currentCommunityId = ref(0)
const isFavorite = ref(false)
const showMapPopup = ref(false)
const reviewList = ref<any[]>([])

const community = ref({
  id: 0,
  name: '',
  district: '',
  address: '',
  tags: [] as string[],
  image: '',
  description: '',
  metrics: {
    safety: 0,
    quietness: 0,
    value: 0
  }
})

function formatTime(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '刚刚'
  const diffHour = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
  if (diffHour < 1) return '刚刚'
  if (diffHour < 24) return `${diffHour} 小时前`
  return `${Math.floor(diffHour / 24)} 天前`
}

async function loadCommunityDetail(id: number) {
  const [detail, comments] = await Promise.all([
    communityApi.detail(id),
    commentApi.list({
      communityId: id,
      page: 1,
      limit: 3
    })
  ])

  community.value = {
    id: detail.id,
    name: detail.name,
    district: detail.district,
    address: detail.address,
    tags: Array.isArray(detail.tags) ? detail.tags : [],
    image: detail.coverImage || '',
    description: detail.description || '暂无简介',
    metrics: {
      safety: Number(detail.safetyScore || 0),
      quietness: Number(detail.quietnessScore || 0),
      value: Number(detail.valueScore || 0)
    }
  }

  reviewList.value = comments.items.map((item) => ({
    id: item.id,
    name: item.isAnonymous ? '匿名用户' : item.user?.nickname || '匿名用户',
    avatar: item.isAnonymous ? '' : item.user?.avatar || '',
    verified: item.isVerified,
    time: formatTime(item.createdAt),
    content: item.content,
    tags: item.tags || []
  }))
}

onLoad(async (query) => {
  const id = Number((query as Record<string, string> | undefined)?.id || '0')
  if (!id) {
    uni.showToast({ title: '参数错误', icon: 'none' })
    return
  }

  currentCommunityId.value = id
  try {
    await loadCommunityDetail(id)
  } catch (error) {
    uni.showToast({
      title: getErrorMessage(error, '小区详情加载失败'),
      icon: 'none'
    })
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
