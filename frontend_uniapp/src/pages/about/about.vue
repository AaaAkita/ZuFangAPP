<template>
  <view class="page-about page-shell">
    <GlobalBack />
    <EmptyState
      icon="about"
      :title="aboutData.title"
      :subtitle="aboutData.description"
      :button-text="aboutData.buttonText"
      @action="goBack"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import EmptyState from '@/components/business/EmptyState.vue'
import { getAboutData } from '@/data'

const aboutData = computed(() => getAboutData())

const goBack = () => {
  uni.switchTab({ url: '/pages/home/home' }).catch(() => {
    uni.navigateBack()
  })
}
</script>
