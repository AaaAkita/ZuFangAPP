<template>
  <view class="page-message page-shell">
    <GlobalBack />
    <view class="page-title-wrap">
      <text class="page-title">{{ messageData.title }}</text>
    </view>
    <EmptyState
      icon="message"
      :title="messageData.emptyTitle"
      :subtitle="messageData.emptySubtitle"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import EmptyState from '@/components/business/EmptyState.vue'
import { getMessageData } from '@/data'

const messageData = computed(() => getMessageData())
</script>
