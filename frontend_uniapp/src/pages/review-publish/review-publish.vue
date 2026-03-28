<template>
  <view class="page-review-publish page-shell">
    <GlobalBack />
    <view class="page-title-wrap">
      <text class="page-title">{{ publishData.title }}</text>
    </view>

    <view class="review-publish-form">
      <view class="review-publish-field card-shell card-shell--flat">
        <text class="review-publish-label">{{ publishData.scoreLabel }}</text>
        <slider
          :min="publishData.minScore"
          :max="publishData.maxScore"
          :step="1"
          :value="score"
          block-color="#ee7c2b"
          activeColor="#ee7c2b"
          backgroundColor="#f5e5d8"
          @change="onScoreChange"
        />
        <text class="review-publish-hint">当前评分：{{ score }} 星</text>
      </view>

      <view class="review-publish-field card-shell card-shell--flat">
        <text class="review-publish-label">{{ publishData.contentLabel }}</text>
        <textarea
          v-model="content"
          class="review-publish-textarea"
          maxlength="500"
          :placeholder="publishData.contentPlaceholder"
        />
      </view>

      <button class="review-publish-submit" @click="submitReview">{{ publishData.submitText }}</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import { getReviewPublishData } from '@/data'

const publishData = computed(() => getReviewPublishData())
const score = ref(publishData.value.defaultScore)
const content = ref('')

const onScoreChange = (event: Record<string, any>) => {
  score.value = Number(event?.detail?.value || publishData.value.minScore)
}

const submitReview = () => {
  if (!content.value.trim()) {
    uni.showToast({ title: '请输入评价内容', icon: 'none' })
    return
  }

  uni.showToast({ title: '提交成功', icon: 'success' })
  setTimeout(() => uni.navigateBack(), 1000)
}
</script>
