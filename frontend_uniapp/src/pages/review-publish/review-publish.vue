<template>
  <view class="page-review-publish page-shell">
    <GlobalBack />
    <view class="page-title-wrap">
      <text class="page-title">发布评价</text>
    </view>

    <view class="review-publish-form">
      <view class="review-publish-field card-shell card-shell--flat">
        <text class="review-publish-label">评分</text>
        <slider
          :min="1"
          :max="5"
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
        <text class="review-publish-label">内容</text>
        <textarea
          v-model="content"
          class="review-publish-textarea"
          maxlength="500"
          placeholder="写下你的真实体验，帮助更多租客避坑"
        />
      </view>

      <button class="review-publish-submit" :disabled="isSubmitting" @click="submitReview">
        {{ isSubmitting ? '提交中...' : '提交评价' }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import { commentApi } from '@/api/comment'
import { getErrorMessage } from '@/api/client'
import { useAuthStore } from '@/utils/auth'

const authStore = useAuthStore()
const score = ref(4)
const content = ref('')
const communityId = ref(0)
const isSubmitting = ref(false)

onLoad((query) => {
  const id = Number((query as Record<string, string> | undefined)?.communityId || '0')
  communityId.value = id
})

const onScoreChange = (event: Record<string, any>) => {
  score.value = Number(event?.detail?.value || 1)
}

const submitReview = async () => {
  if (!authStore.isLoggedIn) {
    uni.showToast({ title: '请先登录', icon: 'none' })
    setTimeout(() => uni.navigateTo({ url: '/pages/login/login' }), 800)
    return
  }

  if (!communityId.value) {
    uni.showToast({ title: '缺少小区参数', icon: 'none' })
    return
  }

  if (!content.value.trim()) {
    uni.showToast({ title: '请输入评价内容', icon: 'none' })
    return
  }

  try {
    isSubmitting.value = true
    await commentApi.publish({
      communityId: communityId.value,
      content: content.value.trim(),
      rating: score.value
    })
    uni.showToast({ title: '提交成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 800)
  } catch (error) {
    uni.showToast({
      title: getErrorMessage(error, '提交失败，请重试'),
      icon: 'none'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
