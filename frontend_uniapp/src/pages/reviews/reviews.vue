<template>
  <view class="page-reviews page-shell">
    <GlobalBack />
    <view class="page-title-wrap">
      <text class="page-title">{{ title }}</text>
    </view>

    <scroll-view class="reviews-scroll" scroll-y>
      <view class="reviews-list">
        <ReviewCard
          v-for="item in reviews"
          :key="item.id"
          :review="item"
          mode="simple"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import ReviewCard from '@/components/business/ReviewCard.vue'
import { commentApi } from '@/api/comment'
import { getErrorMessage } from '@/api/client'

const title = ref('住户评价')
const reviews = ref<any[]>([])

function formatTime(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '刚刚'
  const diffHour = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
  if (diffHour < 1) return '刚刚'
  if (diffHour < 24) return `${diffHour} 小时前`
  return `${Math.floor(diffHour / 24)} 天前`
}

onLoad(async (query) => {
  const communityId = Number((query as Record<string, string> | undefined)?.communityId || '0')
  if (communityId) {
    title.value = '小区全部评价'
  }

  try {
    const result = await commentApi.list({
      communityId: communityId || undefined,
      page: 1,
      limit: 50
    })

    reviews.value = result.items.map((item) => ({
      id: item.id,
      name: item.isAnonymous ? '匿名用户' : item.user?.nickname || '匿名用户',
      avatar: item.isAnonymous ? '' : item.user?.avatar || '',
      verified: item.isVerified,
      time: formatTime(item.createdAt),
      content: item.content,
      tags: item.tags || []
    }))
  } catch (error) {
    uni.showToast({
      title: getErrorMessage(error, '评价加载失败'),
      icon: 'none'
    })
  }
})
</script>
