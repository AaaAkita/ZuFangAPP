<template>
  <view class="container">
    <view class="login-wrapper">
      <view class="header-section">
        <view class="logo-box">
          <text class="material-symbols-outlined logo-icon">cottage</text>
        </view>
        <view class="welcome-text">
          <text class="welcome-title">欢迎回来</text>
          <text class="welcome-subtitle">登录以发现理想温馨好房</text>
        </view>
      </view>

      <view class="form-section">
        <view class="input-group">
          <view class="input-icon-box">
            <text class="material-symbols-outlined input-icon">person</text>
          </view>
          <input
            v-model="formData.account"
            class="input-field"
            placeholder="手机号 / 邮箱"
            type="text"
            placeholder-class="input-placeholder"
          />
        </view>

        <view class="input-group">
          <view class="input-icon-box">
            <text class="material-symbols-outlined input-icon">lock</text>
          </view>
          <input
            v-model="formData.password"
            class="input-field"
            :password="!showPassword"
            placeholder="密码"
            placeholder-class="input-placeholder"
          />
          <view class="toggle-password" @click="togglePassword">
            <text class="material-symbols-outlined toggle-icon">
              {{ showPassword ? 'visibility' : 'visibility_off' }}
            </text>
          </view>
        </view>

        <view class="forgot-row">
          <text class="forgot-link" @click="handleForgotPassword">忘记密码？</text>
        </view>

        <button class="login-btn" @click="handleLogin">
          <text class="login-text">登录</text>
          <text class="material-symbols-outlined arrow-icon">arrow_forward</text>
        </button>
      </view>

      <view class="divider-section">
        <view class="divider-line"></view>
        <text class="divider-text">其他方式登录</text>
      </view>

      <view class="social-section">
        <view class="social-btn wechat" @click="handleWechatLogin">
          <view class="social-icon-wrapper">
            <text class="material-symbols-outlined social-icon">chat</text>
          </view>
        </view>
        <view class="social-btn apple" @click="handleAppleLogin">
          <view class="social-icon-wrapper">
            <text class="material-symbols-outlined social-icon">apple</text>
          </view>
        </view>
        <view class="social-btn more" @click="handleMoreLogin">
          <view class="social-icon-wrapper">
            <text class="material-symbols-outlined social-icon">more_horiz</text>
          </view>
        </view>
      </view>

      <view class="register-section">
        <text class="register-text">还没有账号？</text>
        <text class="register-link" @click="goToRegister">立即注册</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  account: '',
  password: ''
})

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  if (!formData.value.account) {
    uni.showToast({
      title: '请输入手机号或邮箱',
      icon: 'none'
    })
    return
  }
  if (!formData.value.password) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none'
    })
    return
  }
  
  uni.showLoading({ title: '登录中...' })
  
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
    setTimeout(() => {
      uni.switchTab({ url: '/pages/index/index' })
    }, 1500)
  }, 1000)
}

const handleForgotPassword = () => {
  uni.showToast({
    title: '忘记密码功能开发中',
    icon: 'none'
  })
}

const handleWechatLogin = () => {
  uni.showToast({
    title: '微信登录功能开发中',
    icon: 'none'
  })
}

const handleAppleLogin = () => {
  uni.showToast({
    title: 'Apple登录功能开发中',
    icon: 'none'
  })
}

const handleMoreLogin = () => {
  uni.showToast({
    title: '更多登录方式开发中',
    icon: 'none'
  })
}

const goToRegister = () => {
  uni.navigateTo({ url: '/pages/register/index' })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #FFFDF5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 48rpx;
}

.login-wrapper {
  width: 100%;
  max-width: 800rpx;
  display: flex;
  flex-direction: column;
  padding-top: 120rpx;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80rpx;
}

.logo-box {
  width: 192rpx;
  height: 192rpx;
  background-color: rgba(224, 122, 95, 0.1);
  border-radius: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx;
  transform: rotate(3deg);
  transition: transform 0.3s ease;
}

.logo-box:active {
  transform: rotate(6deg);
}

.logo-icon {
  font-size: 96rpx;
  color: #E07A5F;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.welcome-title {
  font-size: 60rpx;
  font-weight: 800;
  color: #4A403A;
  letter-spacing: -1rpx;
}

.welcome-subtitle {
  font-size: 32rpx;
  font-weight: 500;
  color: #8C817D;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  margin-top: 64rpx;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  height: 112rpx;
  background-color: #ffffff;
  border: 4rpx solid #F4D1C6;
  border-radius: 112rpx;
  padding-left: 48rpx;
  padding-right: 48rpx;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 20rpx -8rpx rgba(224, 122, 95, 0.1);
}

.input-group:focus-within {
  border-color: #E07A5F;
  box-shadow: 0 8rpx 32rpx -8rpx rgba(224, 122, 95, 0.2);
}

.input-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.input-icon {
  font-size: 48rpx;
  color: rgba(224, 122, 95, 0.5);
  transition: color 0.3s ease;
}

.input-group:focus-within .input-icon {
  color: #E07A5F;
}

.input-field {
  flex: 1;
  height: 100%;
  font-size: 32rpx;
  color: #4A403A;
}

.input-placeholder {
  color: rgba(140, 129, 125, 0.7);
}

.toggle-password {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
  margin-right: -16rpx;
}

.toggle-icon {
  font-size: 40rpx;
  color: #8C817D;
  transition: color 0.3s ease;
}

.toggle-password:active .toggle-icon {
  color: #E07A5F;
}

.forgot-row {
  display: flex;
  justify-content: flex-end;
  padding-right: 16rpx;
  margin-top: -16rpx;
}

.forgot-link {
  font-size: 28rpx;
  font-weight: 600;
  color: #E07A5F;
}

.forgot-link:active {
  color: #D0654B;
}

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  height: 112rpx;
  background-color: #E07A5F;
  border-radius: 112rpx;
  margin-top: 32rpx;
  box-shadow: 0 16rpx 48rpx -12rpx rgba(224, 122, 95, 0.3);
  transition: all 0.3s ease;
  border: none;
}

.login-btn::after {
  border: none;
}

.login-btn:active {
  background-color: #D0654B;
  transform: scale(0.98);
  box-shadow: 0 20rpx 56rpx -12rpx rgba(224, 122, 95, 0.4);
}

.login-text {
  font-size: 36rpx;
  font-weight: 700;
  color: #ffffff;
}

.arrow-icon {
  font-size: 40rpx;
  color: #ffffff;
  transition: transform 0.3s ease;
}

.login-btn:active .arrow-icon {
  transform: translateX(8rpx);
}

.divider-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64rpx;
  margin-bottom: 48rpx;
}

.divider-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2rpx;
  background-color: rgba(244, 209, 198, 0.6);
}

.divider-text {
  font-size: 24rpx;
  font-weight: 500;
  color: #8C817D;
  text-transform: uppercase;
  letter-spacing: 2rpx;
  background-color: #FFFDF5;
  padding: 0 32rpx;
  position: relative;
  z-index: 1;
}

.social-section {
  display: flex;
  justify-content: center;
  gap: 64rpx;
  padding-bottom: 32rpx;
}

.social-btn {
  width: 96rpx;
  height: 96rpx;
  background-color: #ffffff;
  border: 4rpx solid rgba(244, 209, 198, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 16rpx -4rpx rgba(0, 0, 0, 0.05);
}

.social-btn:active {
  transform: translateY(-8rpx);
}

.social-btn.wechat:active {
  border-color: #07c160;
  background-color: rgba(7, 193, 96, 0.05);
}

.social-btn.apple:active {
  border-color: #1d1d1f;
  background-color: rgba(29, 29, 31, 0.05);
}

.social-btn.more:active {
  border-color: #E07A5F;
  background-color: rgba(224, 122, 95, 0.05);
}

.social-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon {
  font-size: 48rpx;
  color: #8C817D;
  transition: color 0.3s ease;
}

.social-btn.wechat:active .social-icon {
  color: #07c160;
}

.social-btn.apple:active .social-icon {
  color: #1d1d1f;
}

.social-btn.more:active .social-icon {
  color: #E07A5F;
}

.register-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding-bottom: 64rpx;
}

.register-text {
  font-size: 28rpx;
  color: #8C817D;
}

.register-link {
  font-size: 28rpx;
  font-weight: 700;
  color: #E07A5F;
  text-decoration: underline;
  text-decoration-color: transparent;
  margin-left: 8rpx;
}

.register-link:active {
  color: #D0654B;
  text-decoration-color: rgba(224, 122, 95, 0.3);
}
</style>
