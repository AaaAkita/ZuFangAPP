<template>
  <view class="container page-shell">
    <GlobalBack />
    <view class="header">
      <text class="title">发布评价</text>
    </view>

    <view class="form">
      <view class="field card-shell card-shell--flat">
        <text class="label">评分</text>
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
        <text class="hint">当前评分：{{ score }} 星</text>
      </view>

      <view class="field card-shell card-shell--flat">
        <text class="label">评价内容</text>
        <textarea
          v-model="content"
          class="textarea"
          maxlength="500"
          placeholder="请输入真实入住体验，帮助其他租客避雷。"
        />
      </view>

      <button class="submit-btn" @click="submitReview">提交评价</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'

const score = ref(4)
const content = ref('')

const onScoreChange = (event: any) => {
  score.value = Number(event?.detail?.value || 1)
}

const submitReview = () => {
  if (!content.value.trim()) {
    uni.showToast({
      title: '请输入评价内容',
      icon: 'none'
    })
    return
  }

  uni.showToast({
    title: '提交成功',
    icon: 'success'
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 1000)
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
  min-height: 100vh;
  background-color: #faf9f8;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--status-bar-height, 0px) + 20rpx) 0 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f1f1f1;
}

.title {
  font-size: $font-size-h2;
  font-weight: 700;
  color: #1e293b;
}

.form {
  padding: 32rpx 0 0;
}

.field {
  margin-bottom: 24rpx;
}

.label {
  display: block;
  font-size: $font-size-h3;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.hint {
  font-size: $font-size-caption;
  color: #64748b;
}

.textarea {
  width: 100%;
  height: 240rpx;
  font-size: $font-size-body;
  line-height: 1.6;
}

.submit-btn {
  margin-top: 24rpx;
  border: none;
  border-radius: 999rpx;
  background-color: #ee7c2b;
  color: #fff;
  font-size: $font-size-h2;
  font-weight: 700;
}

.submit-btn::after {
  border: none;
}
</style>
