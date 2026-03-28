<template>
  <view class="page-safety page-shell">
    <GlobalBack />
    <EmptyState
      icon="safety"
      :title="safetyData.title"
      :subtitle="safetyData.description"
      :button-text="safetyData.buttonText"
      @action="goBack"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import EmptyState from '@/components/business/EmptyState.vue'
import { getSafetyData } from '@/data'

const safetyData = computed(() => getSafetyData())

const goBack = () => {
  uni.navigateBack()
}
</script>
