<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header sticky-top">
      <view class="location-box">
        <view class="location-main">
          <Icon name="location" :size="40" color="var(--primary)" class="icon-location" />
          <text class="location-text">北京市</text>
          <Icon name="arrow-down" :size="28" color="var(--text-muted)" class="icon-expand" />
        </view>
        <text class="location-sub">发现身边的美好社区</text>
      </view>

    </view>

    <!-- 搜索栏 -->
    <view class="search-container">
      <view class="search-bar" @click="navigateTo('/pages/search/index')">
        <view class="search-icon-box">
          <Icon name="search" :size="32" color="var(--text-muted)" />
        </view>
        <text class="search-placeholder">搜索小区或避雷信息</text>
        <view class="filter-btn" @click.stop="goToSearchWithFilter">
          <Icon name="filter" :size="32" color="var(--primary)" />
        </view>
      </view>
    </view>

    <!-- 推荐小区 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">推荐小区</text>
        <navigator url="/pages/community/index" class="more-link">
          查看全部 <Icon name="arrow-right" :size="32" color="var(--text-muted)" class="icon-next" />
        </navigator>
      </view>
      <scroll-view class="recommend-scroll" scroll-x="true" show-scrollbar="false">
        <view class="card-list">
          <!-- 卡片 1: 阳光锦城 -->
          <view class="card-item">
            <image class="card-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYGS65YhEGX-VAmU5CqyDsgWyG8gaaZiuRfx-ekQzPIVLfxpzNq1djHcEn_13Y2gPwXAcpSFMjTsHmT4MGbi4WfKWLjQf0DtKHr9tNX6Pf4SohBiRPhuLJx870V_Am05iUBZo26_kmAtdd5ciku3xJA-cjgsuQYaGmr1g7Cd1wS3x9IjwLmrOwNOspzkjYUkqs3DdlU3ieyGSg7ycg0_unOdNX39XFQl0aqJ8S4Q__lfTOvih-8eZCo0sKlg8STlsvJZoxpaVnPQ" mode="aspectFill" />
            <view class="card-overlay"></view>
            <view class="card-tag">
              <Icon name="star" :size="28" color="#facc15" class="star-icon" />
              <text class="rating">4.9</text>
            </view>
            <view class="card-info">
              <text class="card-title">阳光锦城</text>
              <view class="card-loc">
                <Icon name="location" :size="28" color="#fff" class="loc-small" />
                <text>朝阳区 · 建国路</text>
              </view>
              <view class="badge-row">
                <text class="badge green">绿化好</text>
                <text class="badge orange">近地铁</text>
              </view>
            </view>
          </view>
          <!-- 卡片 2: 云尚国际 -->
          <view class="card-item">
            <image class="card-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYELfyEv7EK1UlHySb9Jpg-m9ses9RZ9ULQIVVVrABL76qXIokTpeSaFhOU6R8YyfWcpq2b1qPA5-r7xwhoAWIQPcTxvDektfOL0fgWGINGjJcjXzogA6koV8qBFTAfIBSBdDuvr-RhWaSWTNM8fW3Ao1VCSXbazPJ_Y9hwus34kys0VkAt3HFANJD2w06gXovGDY95Wlop7c_xexIdDv3I3WTcJ83bY7CrWcPker_MrF5fqEjtYiOmmgIRfJT-NEIPBL0ddkb3g" mode="aspectFill" />
            <view class="card-overlay"></view>
            <view class="card-tag">
              <Icon name="star" :size="28" color="#facc15" class="star-icon" />
              <text class="rating">4.7</text>
            </view>
            <view class="card-info">
              <text class="card-title">云尚国际</text>
              <view class="card-loc">
                <Icon name="location" :size="28" color="#fff" class="loc-small" />
                <text>海淀区 · 中关村</text>
              </view>
              <view class="badge-row">
                <text class="badge blue">安保严</text>
                <text class="badge purple">设施新</text>
              </view>
            </view>
          </view>
          <!-- 卡片 3: 老弄堂公寓 -->
          <view class="card-item">
            <image class="card-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGwpkHsxHUfmBFlEWfrN4-8lomr1e0uzaBma8AYyYxGrB83_7sZydfW8zSq7mhy-HGuCMNh8p5YTjRfvZI-RgMqY6P3oQ3OaCqZ-dIMkJYV9zA2ckMKZtgevmnBGQcJm6jYGrvWY2C5DyhLSmL_VuJH5kIq5_NrBgWKONYG6kBXjtuX73Nt4hlEAJChFklISJ723mjtcbGYoz2PGz79XzLag9i3x4Rw0iXqCVvDuTiD6j7Sev7bWiYmUnIqzvMpzKhc4q9hRt9Ww" mode="aspectFill" />
            <view class="card-overlay"></view>
            <view class="card-tag">
              <Icon name="star" :size="28" color="#facc15" class="star-icon" />
              <text class="rating">4.2</text>
            </view>
            <view class="card-info">
              <text class="card-title">老弄堂公寓</text>
              <view class="card-loc">
                <Icon name="location" :size="28" color="#fff" class="loc-small" />
                <text>西城区 · 鼓楼</text>
              </view>
              <view class="badge-row">
                <text class="badge amber">有情调</text>
                <text class="badge white">需爬楼</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 搬家特惠 -->
    <view class="banner-section">
      <view class="banner-box">
        <view class="banner-content">
          <view class="promo-tag">
            <Icon name="tag" :size="20" color="var(--primary)" /> 搬家特惠
          </view>
          <text class="banner-title">省心搬家服务</text>
          <text class="banner-sub">专业团队，轻拿轻放，温馨送到家</text>
          <Button type="primary" size="small" custom-class="banner-btn">立即预约</Button>
        </view>
        <image class="banner-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ-0S8s3_G7aKFKFWwm8wLEob_K3PVbXuqi3HKxKgmypBMVDdMTfoO3NEabxKb9vLXrXt1SpvMYyKsioqJ0CfBOZzM_pkRPMP4Hg6AmkMuvGNj7MuNfNrKlUcX29WtN8KpVUnCANpwWyZoFALStXxBezN00PMzCbYekUdHQDfjrUssfEY7fNQfuFfgxLig3TDagkXxMBKurT_AickewsyiXZCZKRITHaFK7oRdFEAwoxohxhkFk5LUOFEfoNrBYHnUOomm0vzUSw" mode="aspectFit" />
      </view>
    </view>

    <!-- 租房避雷 -->
    <view class="section warning-section">
      <view class="section-header">
        <view class="title-with-icon">
          <text class="section-title">租房避雷信息</text>
          <Icon name="warning" :size="40" color="var(--primary)" class="warning-icon" />
        </view>
      </view>
      <view class="warning-list">
        <!-- 避雷信息 1 -->
        <view class="warning-item">
          <view class="warning-icon-bg orange">
            <Icon name="warning" :size="40" color="#f97316" />
          </view>
          <view class="warning-body">
            <view class="warning-header">
              <text class="warning-name">时代绿洲小区</text>
              <text class="warning-time">刚刚</text>
            </view>
            <text class="warning-sub">3号楼</text>
            <text class="warning-desc">墙壁薄得像纸一样，邻居晚上说话都能听得一清二楚，严重影响睡眠质量。看房时一定要注意隔音问题！</text>
            <view class="tag-row">
              <view class="tag-warn">
                <Icon name="warning" :size="20" color="#e67326" /> 隔音极差
              </view>
            </view>
          </view>
        </view>
        <!-- 避雷信息 2 -->
        <view class="warning-item">
          <view class="warning-icon-bg red">
            <Icon name="error" :size="40" color="#ef4444" />
          </view>
          <view class="warning-body">
            <view class="warning-header">
              <text class="warning-name">天诚家园附近</text>
              <text class="warning-time">3小时前</text>
            </view>
            <text class="warning-sub">黑中介曝光</text>
            <text class="warning-desc">照片看着精装修，实地看房完全是另一个破旧的房子，还要求先交看房费。大家遇到这种直接拉黑！</text>
            <view class="tag-row">
              <view class="tag-warn">
                <Icon name="camera" :size="20" color="#e67326" /> 虚假房源
              </view>
              <view class="tag-warn">
                <Icon name="warning" :size="20" color="#e67326" /> 黑中介
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 最新评价 -->
    <view class="section review-section">
      <view class="section-header">
        <view class="title-with-icon">
          <text class="section-title">最新评价</text>
          <view class="pulse-dot"></view>
        </view>
      </view>
      <view class="review-list">
        <!-- 评价 1 -->
        <view class="review-item">
          <view class="review-user">
            <image class="user-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk3In2cF6gSAIk-JJ1HCm-k5SrDYH4uZGtAb0WOPyieHEMcYSrpr1CXJmod2P29SybVs-Va1F85zBHbCFeBt3kjlrMmJJCzwwM4IMafJ-ZfKuYMtTp0j78U67ZO5t1WQfHuB6hsSAAGeAc64xELohV02BN0EhWU1DzaPIsu44W7wqGACNf1WhYaZBT5qobukutSsxRwUHx3_r0mNoHPA32z3MQmSup622a53jCODo7P_V7Gqqdhj2JvzwuFAzhWvY8DUZjl3WIAA" mode="aspectFill" />
            <view class="verified-badge">
              <Icon name="check" :size="20" color="#fff" />
            </view>
          </view>
          <view class="review-content">
            <view class="review-header">
              <view class="user-info">
                <text class="user-name">陈静</text>
                <text class="review-target">评价了 <text class="target-name">香樟花园</text></text>
              </view>
              <text class="review-time">2小时前</text>
            </view>
            <text class="review-text">住这里最大的感受就是安全感满满。物业非常负责，进出都需要门禁卡，晚上保安巡逻也很勤快。绿化环境特别好，适合散步。</text>
            <view class="review-tags">
              <view class="review-tag emerald">
                <Icon name="shield" :size="22" color="#059669" /> 安全系数高
              </view>
              <view class="review-tag lime">
                <Icon name="park" :size="22" color="#65a30d" /> 环境优美
              </view>
            </view>
          </view>
        </view>
        <!-- 评价 2 -->
        <view class="review-item">
          <view class="review-user">
            <image class="user-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrDjzVgSxz82q2EQLoJYnh8V85xTtfU_RNHn5KBpYUi78-avO49EGgrgATz2bDhiSgHsjzACktLXxDlo7BVYbykqGx83AEby51WhFpfC-DlTfc3mVYdW_IlGN0rja6hAksIgefooNHDEqmKXVpv-TJpMmKlR5tL2kP5cITwRgSVJqA9Sg4Omvs_NKe_Zc5r3AD7_W4HfnlVXtmhPbq74cLz9qbeN22eFnkOd3tXTpJVkiFJdZFoOK6MYhX8Rmi6ETnETSwFDZJVA" mode="aspectFill" />
          </view>
          <view class="review-content">
            <view class="review-header">
              <view class="user-info">
                <text class="user-name">张伟</text>
                <text class="review-target">评价了 <text class="target-name">高科大厦</text></text>
              </view>
              <text class="review-time">5小时前</text>
            </view>
            <text class="review-text">这里的视野确实不错，但是电梯真的是硬伤，经常只有一部能用，早晚高峰等电梯能等到绝望。</text>
            <view class="review-tags">
              <view class="review-tag orange">
                <Icon name="warning" :size="22" color="#ea580c" /> 注意避雷
              </view>
              <view class="review-tag gray">
                <Icon name="warning" :size="22" color="#6b7280" /> 电梯故障
              </view>
            </view>
          </view>
        </view>
        <!-- 评价 3 -->
        <view class="review-item">
          <view class="review-user">
            <image class="user-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3tixikl416MXE1ZJO49Zg8E1tEYWZr9jkopQ7sHhGbaYOiyN2SQJIhnpPBAvDs9QJ0zfjj8fdpbFMIP-u_bfTqoBXGD3NIOzkA_GEF27w9DO3pYjxyJkMFRgYuiD9ik_Av_9bEjmvFy_WNvCmA-rkZFHJDY7TbHP8Wfx1l4OTw4XgPWISVtxvPTGyjsnjewBQofUPPZPwzuK27S8QZ8TIMij1mCgS3ouu4L-Cac0GcsATBLwwpmbJux5ci-N7GSWV3fXsCg9owQ" mode="aspectFill" />
          </view>
          <view class="review-content">
            <view class="review-header">
              <view class="user-info">
                <text class="user-name">李莎</text>
                <text class="review-target">评价了 <text class="target-name">滨江公寓</text></text>
              </view>
              <text class="review-time">1天前</text>
            </view>
            <text class="review-text">地铁真的很近，就在楼下。就是周末晚上稍微有点吵，毕竟附近有酒吧街。不过为了通勤方便，可以忍受。</text>
            <view class="review-tags">
              <view class="review-tag amber">
                <Icon name="location" :size="22" color="#d97706" /> 交通便利
              </view>
              <view class="review-tag gray">
                <Icon name="warning" :size="22" color="#6b7280" /> 略有噪音
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部占位，避免被导航栏遮挡 -->
    <view class="bottom-safe-area"></view>
  </view>

  <!-- 底部导航栏 -->
  <view class="tab-bar">
    <view class="tab-item active" @click="switchTab('/pages/index/index')">
      <view class="tab-icon active">
        <Icon name="home" :size="48" color="var(--primary)" />
      </view>
      <text class="tab-text active">首页</text>
    </view>
    <view class="tab-item" @click="switchTab('/pages/community/index')">
      <view class="tab-icon">
        <Icon name="community" :size="48" color="var(--text-muted)" />
      </view>
      <text class="tab-text">发现</text>
    </view>
    <view class="tab-item center" @click="navigateTo('/pages/safety/index')">
      <view class="tab-center-btn">
        <Icon name="plus" :size="56" color="#fff" />
      </view>
      <text class="tab-text">发布</text>
    </view>
    <view class="tab-item" @click="switchTab('/pages/message/index')">
      <view class="tab-icon">
        <Icon name="message" :size="48" color="var(--text-muted)" />
      </view>
      <text class="tab-text">消息</text>
    </view>
    <view class="tab-item" @click="switchTab('/pages/profile/index')">
      <view class="tab-icon">
        <Icon name="profile" :size="48" color="var(--text-muted)" />
      </view>
      <text class="tab-text">我的</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import Button from '@/components/ui/Button.vue'

// TabBar 页面列表
const tabBarPages = [
  '/pages/index/index',
  '/pages/community/index',
  '/pages/message/index',
  '/pages/profile/index'
]

// 跳转到新页面
const navigateTo = (url: string) => {
  // 如果目标是 tabBar 页面，使用 switchTab
  if (tabBarPages.includes(url)) {
    uni.switchTab({ url })
  } else {
    uni.navigateTo({ url })
  }
}

// 切换 Tab 页面
const switchTab = (url: string) => {
  uni.switchTab({ url })
}

// 跳转到搜索页面并打开筛选
const goToSearchWithFilter = () => {
  uni.navigateTo({ 
    url: '/pages/search/index?showFilter=true'
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.container {
  padding-bottom: 40rpx;
  min-height: 100vh;
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(250, 249, 248, 0.95);
  backdrop-filter: blur(20px);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 40rpx 20rpx;
}

.location-box {
  display: flex;
  flex-direction: column;
}

.location-main {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.icon-location {
  color: var(--primary);
  font-size: 40rpx;
}

.location-text {
  font-size: 36rpx;
  font-weight: bold;
  color: var(--text-main);
}

.icon-expand {
  font-size: 28rpx;
  color: var(--text-muted);
  margin-top: 4rpx;
}

.location-sub {
  font-size: 24rpx;
  color: var(--text-muted);
  margin-top: 4rpx;
}

/* 搜索 */
.search-container {
  padding: 10rpx 40rpx 40rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  height: 110rpx;
  background-color: $color-bg-secondary;
  border-radius: $border-radius-xl;
  box-shadow: $shadow-sm;
}

.search-icon-box {
  padding-left: 30rpx;
  padding-right: 20rpx;
  color: var(--text-muted);
}

.search-placeholder {
  flex: 1;
  font-size: 30rpx;
  color: var(--text-muted);
}

.filter-btn {
  width: 80rpx;
  height: 80rpx;
  margin-right: 15rpx;
  background-color: rgba(238, 124, 43, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  border-radius: 50%;
}

/* 区块通用 */
.section {
  padding: 0 40rpx 40rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: $font-size-hero;
  font-weight: bold;
  color: var(--text-main);
}

.more-link {
  font-size: 28rpx;
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

.icon-next {
  font-size: 32rpx;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.warning-icon {
  color: var(--primary);
  font-size: 40rpx;
}

.pulse-dot {
  width: 12rpx;
  height: 12rpx;
  background-color: var(--primary);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 卡片 */
.recommend-scroll {
  white-space: nowrap;
}

.card-list {
  display: flex;
  gap: 30rpx;
}

.card-item {
  position: relative;
  width: 520rpx;
  height: 680rpx;
  border-radius: 48rpx;
  overflow: hidden;
  flex-shrink: 0;
}

.card-img {
  width: 100%;
  height: 100%;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 40%);
}

.card-tag {
  position: absolute;
  top: 30rpx;
  left: 30rpx;
  display: flex;
  align-items: center;
  gap: 4rpx;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8rpx 24rpx;
  border-radius: 40rpx;
}

.star-icon {
  font-size: 28rpx;
  color: #facc15;
}

.rating {
  font-size: 24rpx;
  font-weight: bold;
  color: #333;
}

.card-info {
  position: absolute;
  bottom: 40rpx;
  left: 30rpx;
  right: 30rpx;
  color: #fff;
}

.card-title {
  font-size: $font-size-hero;
  font-weight: bold;
  display: block;
  margin-bottom: $spacing-xs;
}

.card-loc {
  font-size: $font-size-body;
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  opacity: 0.9;
  margin-bottom: $spacing-lg;
}

.loc-small { font-size: 28rpx; }

.badge-row {
  display: flex;
  gap: $spacing-md;
}

.badge {
  font-size: $font-size-tiny;
  font-weight: bold;
  padding: $spacing-xs $spacing-md;
  border-radius: $border-radius-md;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.badge.green { background-color: rgba(16, 185, 129, 0.2); color: #a7f3d0; }
.badge.orange { background-color: rgba(249, 115, 22, 0.2); color: #fed7aa; }
.badge.blue { background-color: rgba(59, 130, 246, 0.2); color: #bfdbfe; }
.badge.purple { background-color: rgba(147, 51, 234, 0.2); color: #e9d5ff; }
.badge.amber { background-color: rgba(245, 158, 11, 0.2); color: #fde68a; }
.badge.white { background-color: rgba(255, 255, 255, 0.2); color: #fff; }

/* Banner */
.banner-section {
  padding: 0 40rpx 60rpx;
}

.banner-box {
  background-color: #fcf3eb;
  border-radius: $border-radius-xl;
  padding: $spacing-lg;
  position: relative;
  display: flex;
  overflow: hidden;
}

.banner-content {
  width: 70%;
  position: relative;
  z-index: 2;
}

.promo-tag {
  display: inline-flex;
  align-items: center;
  gap: 6rpx;
  background-color: rgba(238, 124, 43, 0.2);
  color: var(--primary);
  font-size: 20rpx;
  font-weight: bold;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
}

.banner-title {
  font-size: $font-size-h2;
  font-weight: bold;
  color: #8a5d3b;
  display: block;
}

.banner-sub {
  font-size: $font-size-body-sm;
  color: #a6866f;
  margin: 10rpx 0 30rpx;
  display: block;
}

.banner-btn {
  background-color: #e69f69;
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
  padding: 10rpx 40rpx;
  border-radius: 40rpx;
  margin: 0;
  width: fit-content;
}

.banner-bg {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 240rpx;
  height: 240rpx;
  opacity: 0.8;
}

/* 避雷信息 */
.warning-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.warning-item {
  display: flex;
  gap: $spacing-lg;
  background-color: $color-bg-secondary;
  padding: $spacing-lg;
  border-radius: $border-radius-lg;
  border: 1rpx solid $color-border-light;
}

.warning-icon-bg {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.warning-icon-bg.orange {
  background-color: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

.warning-icon-bg.red {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.warning-body {
  flex: 1;
}

.warning-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rpx;
}

.warning-name {
  font-size: $font-size-body;
  font-weight: bold;
  color: var(--text-main);
}

.warning-time {
  font-size: $font-size-tiny;
  color: var(--text-muted);
}

.warning-sub {
  font-size: $font-size-caption;
  color: var(--text-muted);
  display: block;
  margin-bottom: $spacing-sm;
}

.warning-desc {
  font-size: $font-size-body;
  color: #4b5563;
  line-height: $line-height-normal;
  margin-bottom: $spacing-lg;
  display: block;
}

.tag-row {
  display: flex;
  gap: 16rpx;
  flex-wrap: wrap;
}

.tag-warn {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  font-size: $font-size-tiny;
  font-weight: bold;
  color: #e67326;
  background-color: #fff0e6;
  padding: $spacing-xs $spacing-md;
  border-radius: $border-radius-lg;
  border: 1rpx solid #fcd5ba;
}

/* 最新评价 */
.review-section {
  padding-bottom: 60rpx;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.review-item {
  display: flex;
  gap: $spacing-lg;
  background-color: $color-bg-secondary;
  padding: $spacing-lg;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-sm;
}

.review-user {
  position: relative;
  flex-shrink: 0;
}

.user-avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  object-fit: cover;
}

.verified-badge {
  position: absolute;
  bottom: -4rpx;
  right: -4rpx;
  background-color: #10b981;
  color: #fff;
  padding: 4rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
}

.verified-badge .material-symbols-outlined {
  font-size: 20rpx;
}

.review-content {
  flex: 1;
  min-width: 0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12rpx;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: $font-size-body;
  font-weight: bold;
  color: var(--text-main);
}

.review-target {
  font-size: $font-size-caption;
  color: var(--text-muted);
  margin-top: $spacing-xs;
}

.target-name {
  color: var(--primary);
  font-weight: 600;
}

.review-time {
  font-size: $font-size-tiny;
  color: var(--text-muted);
  background-color: #f9fafb;
  padding: $spacing-xs $spacing-md;
  border-radius: $border-radius-sm;
}

.review-text {
  font-size: $font-size-body;
  color: #4b5563;
  line-height: $line-height-normal;
  margin-bottom: $spacing-lg;
  display: block;
}

.review-tags {
  display: flex;
  gap: 16rpx;
  flex-wrap: wrap;
}

.review-tag {
  display: inline-flex;
  align-items: center;
  gap: $spacing-md;
  font-size: $font-size-tiny;
  font-weight: 600;
  padding: $spacing-sm $spacing-md;
  border-radius: $border-radius-lg;
}

.review-tag.emerald {
  background-color: #ecfdf5;
  color: #059669;
  border: 1rpx solid #d1fae5;
}

.review-tag.lime {
  background-color: #f7fee7;
  color: #65a30d;
  border: 1rpx solid #ecfccb;
}

.review-tag.orange {
  background-color: #fff7ed;
  color: #ea580c;
  border: 1rpx solid #ffedd5;
}

.review-tag.amber {
  background-color: #fffbeb;
  color: #d97706;
  border: 1rpx solid #fef3c7;
}

.review-tag.gray {
  background-color: #f3f4f6;
  color: #6b7280;
  border: 1rpx solid #e5e7eb;
}

/* 底部安全区域 */
.bottom-safe-area {
  height: 160rpx;
}

/* 底部导航栏 */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 1rpx solid $color-border-light;
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: $spacing-sm $spacing-md $spacing-lg;
  z-index: $z-index-fixed;
  max-width: 750rpx;
  margin: 0 auto;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  flex: 1;
}

.tab-item.center {
  margin-top: -40rpx;
}

.tab-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--text-muted);
}

.tab-icon.active {
  background-color: rgba(238, 124, 43, 0.1);
  color: var(--primary);
}

.tab-center-btn {
  width: 112rpx;
  height: 112rpx;
  background-color: var(--primary);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16rpxrpx -12rpx rgba(238, 124, 43, 0.5);
}

.tab-text {
  font-size: $font-size-tiny;
  color: var(--text-muted);
}

.tab-text.active {
  color: var(--primary);
  font-weight: bold;
}
</style>
