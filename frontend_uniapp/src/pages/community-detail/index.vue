<template>
  <view class="container">
    <view class="hero-section">
      <image
        class="hero-image"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp_v7nyrkpQ0xdB127lc3BhGXDZiu76kESZr1QasI_8FNlikpNXzBSMpR_Q8cKzjEVRrzEXn99rkVKgBLqgCMZF8sJ0Qa2pCEzFBrvELXeZZVdDovCF3UF3H0JETavUFNEGc2ywkLtBZXglLSC2nlLLC53QfB7_kQvSnZ0uhfQXoLuidnr2kNxZKLugKMD6JAMaKHTjFqT4-IOA4q2ZmeURAo-NplsG0JisCLIGkkzslIPiTs3goTxu1IOpWt6nXqJWHSJUZ35WQ"
        mode="aspectFill"
      />
      <view class="hero-overlay"></view>
      
      <view class="hero-header">
        <view class="header-btn" @click="goBack">
          <Icon class="app-icon" name="arrow_back" size="inherit" />
        </view>
        <view class="header-actions">
          <view class="header-btn" @click="handleShare">
            <Icon class="app-icon" name="share" size="inherit" />
          </view>
          <view class="header-btn" @click="toggleFavorite">
            <Icon
              class="app-icon"
              :name="isFavorite ? 'favorite' : 'favorite_border'"
              size="inherit"
            />
          </view>
        </view>
      </view>
      
      <view class="hero-content">
        <view class="hero-info">
          <text class="hero-title">{{ communityInfo.name }}</text>
          <view class="hero-location">
            <Icon class="app-icon" name="location_on" size="inherit" />
            <text>{{ communityInfo.district }} · {{ communityInfo.address }}</text>
          </view>
        </view>
        <view class="hero-rating">
          <Icon class="app-icon star-icon" name="star" size="inherit" />
          <text class="rating-value">{{ communityInfo.rating }}</text>
        </view>
      </view>
    </view>
    
    <view class="content-wrapper">
      <scroll-view class="scroll-content" scroll-y="true" show-scrollbar="false">
        <view class="tags-row">
          <text
            v-for="(tag, index) in communityInfo.tags"
            :key="index"
            class="tag-item"
          >{{ tag }}</text>
        </view>
        
        <view class="section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">核心指标</text>
          </view>
          <view class="metrics-card">
            <view class="metric-item">
              <view class="progress-ring">
                <svg width="144" height="144" viewBox="0 0 72 72">
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="transparent"
                    stroke="#f3f4f6"
                    stroke-width="8"
                    stroke-linecap="round"
                  />
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="transparent"
                    stroke="#06D6A0"
                    stroke-width="8"
                    stroke-linecap="round"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="getStrokeDashoffset(metrics.safety)"
                    class="progress-circle"
                  />
                </svg>
                <view class="progress-value">
                  <text class="value-text">{{ metrics.safety.toFixed(1) }}</text>
                </view>
              </view>
              <text class="metric-label">安全性</text>
            </view>
            
            <view class="metric-divider"></view>
            
            <view class="metric-item">
              <view class="progress-ring">
                <svg width="144" height="144" viewBox="0 0 72 72">
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="transparent"
                    stroke="#f3f4f6"
                    stroke-width="8"
                    stroke-linecap="round"
                  />
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="transparent"
                    stroke="#118AB2"
                    stroke-width="8"
                    stroke-linecap="round"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="getStrokeDashoffset(metrics.quietness)"
                    class="progress-circle"
                  />
                </svg>
                <view class="progress-value">
                  <text class="value-text">{{ metrics.quietness.toFixed(1) }}</text>
                </view>
              </view>
              <text class="metric-label">安静度</text>
            </view>
            
            <view class="metric-divider"></view>
            
            <view class="metric-item">
              <view class="progress-ring">
                <svg width="144" height="144" viewBox="0 0 72 72">
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="transparent"
                    stroke="#f3f4f6"
                    stroke-width="8"
                    stroke-linecap="round"
                  />
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    fill="transparent"
                    stroke="#FF8C42"
                    stroke-width="8"
                    stroke-linecap="round"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="getStrokeDashoffset(metrics.value)"
                    class="progress-circle"
                  />
                </svg>
                <view class="progress-value">
                  <text class="value-text">{{ metrics.value.toFixed(1) }}</text>
                </view>
              </view>
              <text class="metric-label">性价比</text>
            </view>
          </view>
        </view>
        
        <view class="section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">小区简介</text>
          </view>
          <text class="description-text">{{ communityInfo.description }}</text>
        </view>
        
        <view class="section review-section">
          <view class="section-header-row">
            <view class="section-header">
              <view class="section-indicator"></view>
              <text class="section-title">住户评价</text>
              <text class="review-count">({{ reviews.length }})</text>
            </view>
            <navigator url="/pages/reviews/index" class="view-all-link">
              查看全部 <Icon class="app-icon" name="arrow_forward_ios" size="inherit" />
            </navigator>
          </view>
          
          <view class="review-list">
            <view v-for="(review, index) in reviews" :key="index" class="review-item">
              <view class="review-avatar-wrapper">
                <image
                  v-if="review.avatar"
                  class="review-avatar"
                  :src="review.avatar"
                  mode="aspectFill"
                />
                <view v-else class="review-avatar-placeholder">
                  <Icon class="app-icon" name="face" size="inherit" />
                </view>
                <view v-if="review.verified" class="verified-badge">
                  <Icon class="app-icon" name="star" size="inherit" />
                </view>
              </view>
              <view class="review-bubble">
                <view class="bubble-triangle"></view>
                <view class="bubble-header">
                  <text class="reviewer-name">{{ review.name }}</text>
                  <text class="review-time">{{ review.time }}</text>
                </view>
                <text class="review-content">{{ review.content }}</text>
                <view v-if="review.tags && review.tags.length" class="review-tags">
                  <text
                    v-for="(tag, tagIndex) in review.tags"
                    :key="tagIndex"
                    :class="['review-tag', tag.type]"
                  >{{ tag.text }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        
        <view class="bottom-safe-area"></view>
      </scroll-view>
    </view>
    
    <view class="fab-buttons">
      <view class="fab-button nav-button" @click="showMapPopup = true">
        <Icon class="app-icon" name="navigation" size="inherit" />
        <text class="fab-text">导航</text>
      </view>
      <view class="fab-button" @click="handlePublishReview">
        <Icon class="app-icon" name="edit_square" size="inherit" />
        <text class="fab-text">发布评价</text>
      </view>
    </view>
    
    <view v-if="showMapPopup" class="popup-overlay" @click="closeMapPopup"></view>
    
    <view :class="['popup-container', showMapPopup ? 'popup-show' : '']">
      <view class="popup-content">
        <view class="popup-handle"></view>
        <text class="popup-title">选择导航地图</text>
        <view class="map-options">
          <view class="map-option" @click="selectMap('amap')">
            <view class="map-icon-wrapper">
              <view class="map-icon amap-icon">
                <Icon class="app-icon" name="near_me" size="inherit" />
              </view>
            </view>
            <text class="map-name">高德地图</text>
          </view>
          <view class="map-option" @click="selectMap('baidu')">
            <view class="map-icon-wrapper">
              <view class="map-icon baidu-icon">
                <Icon class="app-icon" name="explore" size="inherit" />
              </view>
            </view>
            <text class="map-name">百度地图</text>
          </view>
          <view class="map-option" @click="selectMap('tencent')">
            <view class="map-icon-wrapper">
              <view class="map-icon tencent-icon">
                <Icon class="app-icon" name="map" size="inherit" />
              </view>
            </view>
            <text class="map-name">腾讯地图</text>
          </view>
        </view>
        <view class="cancel-btn" @click="closeMapPopup">
          <text>取消</text>
        </view>
      </view>
    </view>
    
    <view class="tab-bar">
      <view class="tab-item" @click="switchTab('/pages/index/index')">
        <Icon class="app-icon" name="home" size="inherit" />
        <text class="tab-label">首页</text>
      </view>
      <view class="tab-item active">
        <Icon class="app-icon" name="search" size="inherit" />
        <text class="tab-label">发现</text>
      </view>
      <view class="tab-item" @click="switchTab('/pages/message/index')">
        <Icon class="app-icon" name="bookmark" size="inherit" />
        <text class="tab-label">收藏</text>
      </view>
      <view class="tab-item" @click="switchTab('/pages/profile/index')">
        <Icon class="app-icon" name="person" size="inherit" />
        <text class="tab-label">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Icon from '@/components/ui/Icon.vue'

interface ReviewTag {
  text: string
  type: string
}

interface Review {
  name: string
  avatar: string
  time: string
  content: string
  verified: boolean
  tags: ReviewTag[]
}

const isFavorite = ref(false)
const showMapPopup = ref(false)

const communityInfo = reactive({
  name: '阳光花园小区',
  district: '朝阳区',
  address: '建国路88号',
  rating: 4.8,
  tags: ['允许宠物', '近地铁', '封闭管理', '游泳池'],
  description: '阳光花园坐落于繁华的朝阳区中心地带，为住户提供闹中取静的居住体验。小区绿化率高达40%，拥有现代化的园林设计。近期翻新的单元配备了全新的实木地板和智能家居系统，是年轻白领和家庭的理想居所。'
})

const metrics = reactive({
  safety: 9.0,
  quietness: 8.0,
  value: 7.0
})

const circumference = 188.5

const reviews = ref<Review[]>([
  {
    name: '张雨萱',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvFQuaACVah8dC-gKIkD3uq5pFv1Oe7IyZ3BYx8lpi7UgDTUOKybHY-RHvOHW8hskEGa_GzLI1CCMgd2Mmh9oUzbXCEufVscbe6WS_QXJ9tDscBM0Fn8kyZwZg_7E7Zm1vJJVBw2beJBLaLqB5QibpFoqcp4BZAj3FnPcNm5LP38MiHb3QQ9QgtBJuS7ACncmwZwYsL7PJmyeEbH0ZZBmnMHFfVsdNgJ430G90b1azWAv6X9DZXR7fWDg45jeEeuWPYttzr7b90w',
    time: '2天前',
    content: '超级喜欢这里的环境！物业管理非常负责，每天都能看到清洁人员在工作。唯一的缺点是周末访客停车位有点紧张。',
    verified: true,
    tags: [
      { text: '环境好', type: 'green' },
      { text: '物业负责', type: 'blue' }
    ]
  },
  {
    name: '李明',
    avatar: '',
    time: '1周前',
    content: '地理位置绝佳，走路到地铁站只要5分钟。晚上很安静，非常适合需要早睡的上班族。',
    verified: false,
    tags: []
  },
  {
    name: '王强',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwgr9AF_Q0BYUZ60cOMW8KaLm-8yUizn8aYvCaGNl3MtYqd8MJVK5OfXQUFkBrTpgZZ5521Mgs2sPTSD06WVxh6YmOE9XQTxJWCkdntdh7POf9o5-xrnT4dLIsSY2afuNYdfzs1mOeY-KDtvGmSWftHS1-UyCCPBkc2pcU9c52tL3kwF8XE0F3oIOiqvtkqfQJcpRkOe17OJTEOMUtbzY6PhQ50MMRfPghN85OdwzMBAPPo8Re9_3qTYaWdIInpt1NWIZJYhIbEQ',
    time: '2周前',
    content: '新的健身房设备很棒！虽然租金比周边稍微贵一点，但是考虑到这些配套设施，我觉得还是值得的。',
    verified: false,
    tags: []
  }
])

const getStrokeDashoffset = (value: number): number => {
  const percentage = value / 10
  return circumference * (1 - percentage)
}

const goBack = () => {
  uni.navigateBack()
}

const handleShare = () => {
  uni.showActionSheet({
    itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
    success: (res) => {
      console.log('分享选项:', res.tapIndex)
    }
  })
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  uni.showToast({
    title: isFavorite.value ? '已收藏' : '已取消收藏',
    icon: 'success'
  })
}

const handlePublishReview = () => {
  uni.navigateTo({
    url: '/pages/review-publish/index'
  })
}

const switchTab = (url: string) => {
  uni.navigateTo({ url })
}

const closeMapPopup = () => {
  showMapPopup.value = false
}

const selectMap = (mapType: string) => {
  const mapNames: Record<string, string> = {
    amap: '高德地图',
    baidu: '百度地图',
    tencent: '腾讯地图'
  }
  
  uni.showToast({
    title: `正在打开${mapNames[mapType]}`,
    icon: 'none'
  })
  
  closeMapPopup()
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 680rpx;
  border-radius: 0 0 50rpx 50rpx;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent 30%, rgba(0, 0, 0, 0.7));
}

.hero-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 80rpx 32rpx 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.header-actions {
  display: flex;
  gap: 24rpx;
}

.header-btn {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20rpx);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.header-btn .app-icon {
  font-size: 40rpx;
}

.hero-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 48rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.hero-info {
  flex: 1;
}

.hero-title {
  font-size: 60rpx;
  font-weight: bold;
  color: #fff;
  display: block;
  margin-bottom: 16rpx;
}

.hero-location {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: rgba(255, 255, 255, 0.95);
  font-size: 28rpx;
}

.hero-location .app-icon {
  font-size: 36rpx;
}

.hero-rating {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10rpx);
  padding: 12rpx 24rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.hero-rating .star-icon {
  font-size: 36rpx;
  color: #FFD166;
}

.rating-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #FF8C42;
}

.content-wrapper {
  flex: 1;
  overflow: hidden;
}

.scroll-content {
  height: 100%;
  padding: 0 40rpx;
}

.tags-row {
  display: flex;
  gap: 20rpx;
  padding: 48rpx 0 32rpx;
  overflow-x: auto;
  white-space: nowrap;
}

.tag-item {
  background-color: #FFF0E6;
  color: #FF8C42;
  font-size: 24rpx;
  font-weight: bold;
  padding: 16rpx 32rpx;
  border-radius: 40rpx;
  border: 1rpx solid rgba(255, 140, 66, 0.1);
  flex-shrink: 0;
}

.section {
  margin-top: 48rpx;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 32rpx;
  padding: 0 8rpx;
}

.section-indicator {
  width: 12rpx;
  height: 48rpx;
  background-color: #FF8C42;
  border-radius: 6rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.metrics-card {
  background-color: #fff;
  padding: 48rpx;
  border-radius: 48rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8rpx 40rpx -8rpx rgba(0, 0, 0, 0.05);
  border: 1rpx solid #f5f5f5;
}

.metric-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
}

.progress-ring {
  position: relative;
  width: 144rpx;
  height: 144rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring svg {
  transform: rotate(-90deg);
}

.progress-circle {
  transition: stroke-dashoffset 0.5s ease;
}

.progress-value {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-text {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.metric-label {
  font-size: 24rpx;
  font-weight: 600;
  color: #888;
}

.metric-divider {
  width: 2rpx;
  height: 96rpx;
  background-color: #f3f4f6;
}

.description-text {
  font-size: 30rpx;
  color: #888;
  line-height: 1.8;
  padding: 0 8rpx;
  text-align: justify;
}

.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
  padding: 0 8rpx;
}

.review-count {
  font-size: 24rpx;
  font-weight: normal;
  color: #888;
  margin-left: 8rpx;
}

.view-all-link {
  font-size: 28rpx;
  color: #FF8C42;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.view-all-link .app-icon {
  font-size: 28rpx;
  margin-left: 4rpx;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 48rpx;
}

.review-item {
  display: flex;
  gap: 32rpx;
}

.review-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.review-avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.review-avatar-placeholder {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background-color: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4rpx solid #fff;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.review-avatar-placeholder .app-icon {
  font-size: 48rpx;
  color: #3b82f6;
}

.verified-badge {
  position: absolute;
  bottom: -4rpx;
  right: -4rpx;
  background-color: #FFD166;
  border-radius: 50%;
  padding: 4rpx;
  border: 4rpx solid #fff;
}

.verified-badge .app-icon {
  font-size: 20rpx;
  color: #fff;
}

.review-bubble {
  flex: 1;
  position: relative;
  background-color: #f3f4f6;
  padding: 32rpx;
  border-radius: 32rpx;
  border-top-left-radius: 0;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.03);
}

.bubble-triangle {
  position: absolute;
  top: 0;
  left: -16rpx;
  width: 0;
  height: 0;
  border-top: 0 solid transparent;
  border-right: 24rpx solid #f3f4f6;
  border-bottom: 24rpx solid transparent;
}

.bubble-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.reviewer-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.review-time {
  font-size: 20rpx;
  color: #888;
  background-color: #fff;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
}

.review-content {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
}

.review-tags {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
  flex-wrap: wrap;
}

.review-tag {
  font-size: 20rpx;
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
}

.review-tag.green {
  color: #06D6A0;
  background-color: rgba(6, 214, 160, 0.1);
}

.review-tag.blue {
  color: #118AB2;
  background-color: rgba(17, 138, 178, 0.1);
}

.review-section {
  padding-bottom: 48rpx;
}

.bottom-safe-area {
  height: 200rpx;
}

.fab-buttons {
  position: fixed;
  bottom: 200rpx;
  right: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  z-index: 100;
}

.fab-button {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: linear-gradient(to right, #FF8C42, #FF9F5E);
  padding: 28rpx 48rpx;
  border-radius: 60rpx;
  box-shadow: 0 16rpx 60rpx rgba(255, 140, 66, 0.4);
}

.fab-button.nav-button {
  background: linear-gradient(to right, #118AB2, #0ea5e9);
  box-shadow: 0 16rpx 60rpx rgba(17, 138, 178, 0.4);
}

.fab-button .app-icon {
  font-size: 40rpx;
  color: #fff;
}

.fab-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1rpx solid #f3f4f6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 24rpx 40rpx 48rpx;
  z-index: 1000;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  flex: 1;
}

.tab-item .app-icon {
  font-size: 52rpx;
  color: #888;
}

.tab-item.active .app-icon {
  color: #FF8C42;
}

.tab-label {
  font-size: 20rpx;
  color: #888;
}

.tab-item.active .tab-label {
  color: #FF8C42;
  font-weight: bold;
}

.popup-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(74, 59, 49, 0.6);
  backdrop-filter: blur(4rpx);
  z-index: 1010;
}

.popup-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 1020;
}

.popup-container.popup-show {
  transform: translateY(0);
}

.popup-content {
  background-color: #FFFDF9;
  border-radius: 64rpx 64rpx 0 0;
  padding: 24rpx 64rpx 80rpx;
  box-shadow: 0 -20rpx 80rpx rgba(0, 0, 0, 0.1);
}

.popup-handle {
  width: 96rpx;
  height: 12rpx;
  background-color: #e5e5e5;
  border-radius: 6rpx;
  margin: 0 auto 64rpx;
}

.popup-title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 80rpx;
}

.map-options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 96rpx;
}

.map-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24rpx;
}

.map-option:active {
  opacity: 0.8;
  transform: scale(0.95);
}

.map-icon-wrapper {
  width: 128rpx;
  height: 128rpx;
  background-color: #fff;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 40rpx -8rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f5f5f5;
}

.map-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-icon .app-icon {
  font-size: 48rpx;
  color: #fff;
}

.amap-icon {
  background: linear-gradient(to bottom right, #60a5fa, #2563eb);
}

.baidu-icon {
  background: linear-gradient(to bottom right, #3b82f6, #ef4444);
}

.tencent-icon {
  background: linear-gradient(to bottom right, #4ade80, #16a34a);
}

.map-name {
  font-size: 24rpx;
  font-weight: 500;
  color: #333;
}

.cancel-btn {
  width: 100%;
  padding: 32rpx 0;
  background-color: #fff;
  border: 2rpx solid #f5f5f5;
  border-radius: 80rpx;
  text-align: center;
}

.cancel-btn text {
  font-size: 30rpx;
  font-weight: bold;
  color: #888;
}

.cancel-btn:active {
  background-color: #f9fafb;
}
</style>
