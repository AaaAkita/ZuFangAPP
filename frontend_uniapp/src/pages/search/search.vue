<template>
  <view class="page-search page-shell">
    <GlobalBack />

    <view class="search-header card-shell card-shell--flat">
      <view class="search-input-wrap">
        <Icon name="search" :size="30" color="var(--text-muted)" />
        <input
          v-model="searchKeyword"
          class="search-input"
          placeholder="搜索小区、区域或关键词"
          type="text"
          @confirm="runSearch"
        />
        <button class="search-btn" @click="runSearch">搜索</button>
      </view>
      <view v-if="hotKeywords.length" class="search-hot-list">
        <text class="search-hot-label">热门</text>
        <text
          v-for="item in hotKeywords"
          :key="item.keyword"
          class="search-hot-item"
          @click="applyHotKeyword(item.keyword)"
        >
          {{ item.keyword }}
        </text>
      </view>
    </view>

    <view class="search-sort card-shell card-shell--flat">
      <text
        v-for="option in sortOptions"
        :key="option.value"
        :class="['search-sort-item', { active: sort === option.value }]"
        @click="changeSort(option.value)"
      >
        {{ option.label }}
      </text>
    </view>

    <view class="search-result-head">
      <text>找到 {{ total }} 个小区</text>
    </view>

    <scroll-view class="search-content" scroll-y>
      <view class="search-community-list">
        <CommunityCard
          v-for="item in communities"
          :key="item.id"
          mode="quality"
          :community="item"
          @click="navigateToDetail(item.id)"
        />
      </view>
      <view v-if="!communities.length && !loading" class="search-empty">暂无结果，换个关键词试试</view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import CommunityCard from '@/components/business/CommunityCard.vue'
import { searchApi, type HotSearchItem } from '@/api/search'
import { getErrorMessage } from '@/api/client'
import type { CommunityItem } from '@/data'

const searchKeyword = ref('')
const loading = ref(false)
const sort = ref<'default' | 'hot' | 'new' | 'risk'>('default')
const communities = ref<CommunityItem[]>([])
const total = ref(0)
const hotKeywords = ref<HotSearchItem[]>([])

const sortOptions = [
  { label: '默认', value: 'default' },
  { label: '热度', value: 'hot' },
  { label: '最新', value: 'new' },
  { label: '风险', value: 'risk' }
] as const

function toViewCommunity(item: any): CommunityItem {
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
    riskReason: item.riskReason || '暂无说明',
    highlights: Array.isArray(item.highlights) ? item.highlights : [],
    metrics: {
      safety: 0,
      quietness: 0,
      value: 0
    },
    reviews: []
  }
}

async function fetchHotKeywords() {
  try {
    hotKeywords.value = await searchApi.hot()
  } catch {
    hotKeywords.value = []
  }
}

async function runSearch() {
  if (!searchKeyword.value.trim()) {
    communities.value = []
    total.value = 0
    return
  }

  try {
    loading.value = true
    const result = await searchApi.global({
      keyword: searchKeyword.value.trim(),
      sort: sort.value,
      page: 1,
      limit: 20
    })
    communities.value = result.items.map(toViewCommunity)
    total.value = result.total
  } catch (error) {
    uni.showToast({
      title: getErrorMessage(error, '搜索失败'),
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

function changeSort(nextSort: 'default' | 'hot' | 'new' | 'risk') {
  sort.value = nextSort
  void runSearch()
}

function applyHotKeyword(keyword: string) {
  searchKeyword.value = keyword
  void runSearch()
}

function navigateToDetail(id: number) {
  uni.navigateTo({
    url: `/pages/community-detail/community-detail?id=${id}`
  })
}

onMounted(async () => {
  await fetchHotKeywords()
  if (hotKeywords.value.length > 0) {
    searchKeyword.value = hotKeywords.value[0].keyword
    await runSearch()
  }
})
</script>

<style scoped lang="scss">
.search-header {
  margin-bottom: 16rpx;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.search-input {
  flex: 1;
}

.search-btn {
  padding: 8rpx 20rpx;
  font-size: 22rpx;
}

.search-hot-list {
  margin-top: 10rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.search-hot-label {
  font-size: 22rpx;
  color: #94a3b8;
}

.search-hot-item {
  font-size: 22rpx;
  color: #ee7c2b;
}

.search-sort {
  display: flex;
  gap: 16rpx;
  margin-bottom: 14rpx;
}

.search-sort-item {
  font-size: 24rpx;
  color: #64748b;
}

.search-sort-item.active {
  color: #ee7c2b;
  font-weight: 600;
}

.search-result-head {
  margin-bottom: 10rpx;
  font-size: 23rpx;
  color: #64748b;
}

.search-content {
  height: calc(100vh - 280rpx);
}

.search-community-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 80rpx);
}

.search-empty {
  padding: 32rpx 0;
  text-align: center;
  font-size: 24rpx;
  color: #94a3b8;
}
</style>
