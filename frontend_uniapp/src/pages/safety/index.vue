<template>
  <view class="container">
    <text class="title">安全指南 页面建设中...</text>
    <button @click="goBack">返回首页</button>
  </view>
</template>

<script setup lang="ts">
const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
}
</style>
