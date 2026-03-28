<template>
  <view class="page-favorites page-shell">
    <GlobalBack />

    <view class="page-title-wrap">
      <text class="page-title">{{ favoritesData.title }}</text>
      <text class="favorites-subtitle">{{ favoritesData.subtitle }}</text>
    </view>

    <view v-if="favoriteList.length" class="favorites-list">
      <PropertyCard
        v-for="(item, index) in favoriteList"
        :key="item.id"
        :property="item"
        @toggle-favorite="toggleFavorite(index)"
        @select="openProperty(item)"
      />
    </view>

    <EmptyState
      v-else
      icon="favorite_border"
      title="还没有收藏房源"
      subtitle="在找房页点亮爱心即可收藏"
    />
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import EmptyState from '@/components/business/EmptyState.vue'
import PropertyCard from '@/components/business/PropertyCard.vue'
import { getFavoritesData, type PropertyItem } from '@/data'

const favoritesData = computed(() => getFavoritesData())
const favoriteList = ref<PropertyItem[]>(favoritesData.value.properties.map((item) => ({ ...item })))

const toggleFavorite = (index: number) => {
  const target = favoriteList.value[index]
  if (!target) return

  target.isFavorite = !target.isFavorite
  if (!target.isFavorite) {
    favoriteList.value.splice(index, 1)
  }
}

const openProperty = (item: PropertyItem) => {
  uni.showToast({
    title: `查看: ${item.title}`,
    icon: 'none'
  })
}
</script>

<style scoped lang="scss">
.favorites-subtitle {
  display: block;
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #94a3b8;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 32rpx);
}
</style>
