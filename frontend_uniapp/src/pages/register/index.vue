<template>
  <view class="container">
    <view class="register-wrapper">
      <view class="header-section">
        <view class="logo-box">
          <Icon class="app-icon logo-icon" name="cottage" size="inherit" />
        </view>
        <view class="welcome-text">
          <text class="welcome-title">创建账号</text>
          <text class="welcome-subtitle">加入租房避雷社区</text>
        </view>
      </view>

      <view class="form-section">
        <view class="input-group">
          <view class="input-icon-box">
            <Icon class="app-icon input-icon" name="phone" size="inherit" />
          </view>
          <input
            v-model="formData.phone"
            class="input-field"
            placeholder="手机号"
            type="number"
            maxlength="11"
            placeholder-class="input-placeholder"
          />
        </view>

        <view class="input-group">
          <view class="input-icon-box">
            <Icon class="app-icon input-icon" name="person" size="inherit" />
          </view>
          <input
            v-model="formData.nickname"
            class="input-field"
            placeholder="昵称（选填）"
            type="text"
            placeholder-class="input-placeholder"
          />
        </view>

        <view class="input-group">
          <view class="input-icon-box">
            <Icon class="app-icon input-icon" name="lock" size="inherit" />
          </view>
          <input
            v-model="formData.password"
            class="input-field"
            :password="!showPassword"
            placeholder="密码（至少8位，包含字母和数字）"
            type="text"
            placeholder-class="input-placeholder"
            @focus="isPasswordFocused = true"
            @blur="isPasswordFocused = false"
          />
          <view class="toggle-password" @click="togglePassword">
            <Icon
              class="app-icon toggle-icon"
              :name="showPassword ? 'visibility' : 'visibility_off'"
              size="inherit"
            />
          </view>
        </view>

        <view class="password-hint" :class="{ show: isPasswordFocused || !!formData.password }">
          <text class="hint-text" :class="{ valid: passwordStrength.length }">
            <Icon class="app-icon" :name="passwordStrength.length ? 'check_circle' : 'radio_button_unchecked'" size="inherit" />
            至少8位
          </text>
          <text class="hint-text" :class="{ valid: passwordStrength.hasLetterAndNumber }">
            <Icon class="app-icon" :name="passwordStrength.hasLetterAndNumber ? 'check_circle' : 'radio_button_unchecked'" size="inherit" />
            字母+数字
          </text>
        </view>

        <button class="register-btn" @click="handleRegister">
          <text class="submit-text">注册</text>
          <Icon class="app-icon arrow-icon" name="arrow_forward" size="inherit" />
        </button>
      </view>

      <view class="register-section">
        <text class="register-text">已有账号？</text>
        <text class="register-link" @click="goToLogin">立即登录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import { validatePhone, validatePassword, getPasswordStrength, handleApiError, handleSuccess } from '@/utils/auth-helpers'
import { authApi, useAuthStore } from '@/utils/auth'

const authStore = useAuthStore()
const isLoading = ref(false)

const formData = reactive({
  phone: '',
  nickname: '',
  password: ''
})

const showPassword = ref(false)
const isPasswordFocused = ref(false)

// 密码强度检测
const passwordStrength = computed(() => getPasswordStrength(formData.password))

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleRegister = async () => {
  // 防止重复提交
  if (isLoading.value) {
    return
  }

  // 验证手机号
  if (!formData.phone) {
    uni.showToast({
      title: '请输入手机号',
      icon: 'none'
    })
    return
  }

  if (!validatePhone(formData.phone)) {
    uni.showToast({
      title: '请输入有效的11位手机号',
      icon: 'none'
    })
    return
  }

  // 验证密码
  if (!formData.password) {
    uni.showToast({
      title: '请输入密码',
      icon: 'none'
    })
    return
  }

  if (!validatePassword(formData.password)) {
    uni.showToast({
      title: '密码必须至少8位且包含字母和数字',
      icon: 'none'
    })
    return
  }

  try {
    isLoading.value = true
    uni.showLoading({ title: '注册中...' })

    const data = await authApi.register(
      formData.phone,
      formData.password,
      formData.nickname || undefined
    )

    if (data.success && data.data?.token) {
      // 保存 Token
      authStore.setToken(data.data.token)

      // 获取完整用户信息并保存
      try {
        const userData = await authApi.getProfile()
        if (userData.success && userData.data) {
          authStore.setUserInfo({
            id: userData.data.id,
            phone: userData.data.phone,
            nickname: userData.data.nickname || ''
          })
        } else {
          // 如果获取用户信息失败，使用注册返回的数据
          authStore.setUserInfo({
            id: data.data.userId || 0,
            phone: formData.phone,
            nickname: data.data.nickname || formData.nickname || ''
          })
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
        // 即使获取用户信息失败，也使用注册返回的数据
        authStore.setUserInfo({
          id: data.data.userId || 0,
          phone: formData.phone,
          nickname: data.data.nickname || formData.nickname || ''
        })
      }

      handleSuccess('注册成功')
    } else {
      handleApiError(data.error?.message || data.message || '注册失败')
    }
  } catch (error) {
    handleApiError(error, '网络错误，请重试')
  } finally {
    isLoading.value = false
    uni.hideLoading()
  }
}

const goToLogin = () => {
  uni.navigateTo({ url: '/pages/login/index' })
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.container {
  min-height: 100vh;
  background-color: #FFFDF5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 44rpx;
  box-sizing: border-box;
}

.register-wrapper {
  width: 100%;
  max-width: 680rpx;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--status-bar-height, 0px) + 56rpx);
  padding-bottom: 40rpx;
  box-sizing: border-box;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32rpx;
}

.logo-box {
  width: 172rpx;
  height: 172rpx;
  background-color: rgba(224, 122, 95, 0.1);
  border-radius: 54rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28rpx;
  transform: rotate(3deg);
  transition: transform 0.3s ease;
}

.logo-box:active {
  transform: rotate(6deg);
}

.logo-icon {
  font-size: 84rpx;
  color: #E07A5F;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.welcome-title {
  font-size: $font-size-display-lg;
  font-weight: 800;
  color: #4A403A;
  letter-spacing: -1rpx;
}

.welcome-subtitle {
  font-size: $font-size-h3;
  font-weight: 500;
  color: #8C817D;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
  margin-top: 54rpx;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  height: 96rpx;
  background-color: #ffffff;
  border: 3rpx solid #F4D1C6;
  border-radius: 96rpx;
  padding-left: 34rpx;
  padding-right: 30rpx;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 20rpx -8rpx rgba(224, 122, 95, 0.1);
  box-sizing: border-box;
}

.input-group:focus-within {
  border-color: #E07A5F;
  box-shadow: 0 8rpx 32rpx -8rpx rgba(224, 122, 95, 0.2);
}

.input-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 18rpx;
}

.input-icon {
  font-size: 38rpx;
  color: rgba(224, 122, 95, 0.5);
  transition: color 0.3s ease;
}

.input-group:focus-within .input-icon {
  color: #E07A5F;
}

.input-field {
  flex: 1;
  height: 100%;
  font-size: $font-size-h3;
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
  font-size: 32rpx;
  color: #8C817D;
  transition: color 0.3s ease;
}

.toggle-password:active .toggle-icon {
  color: #E07A5F;
}

.password-hint {
  display: flex;
  flex-direction: row;
  gap: 22rpx;
  margin-top: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateY(-6rpx);
  transition: max-height 0.24s ease, opacity 0.24s ease, transform 0.24s ease;
  padding-left: 6rpx;
  flex-wrap: wrap;
}

.password-hint.show {
  max-height: 56rpx;
  opacity: 1;
  transform: translateY(0);
}

.hint-text {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: $font-size-tiny;
  color: rgba(140, 129, 125, 0.6);
  transition: color 0.3s ease;
}

.hint-text.valid {
  color: #10b981;
}

.hint-text .app-icon {
  font-size: 22rpx;
}

.register-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16rpx;
  height: 104rpx;
  background-color: #E07A5F;
  border-radius: 104rpx;
  margin-top: 8rpx;
  box-shadow: 0 16rpx 48rpx -12rpx rgba(224, 122, 95, 0.3);
  transition: all 0.3s ease;
  border: none;
  box-sizing: border-box;
}

.register-btn::after {
  border: none;
}

.register-btn:active {
  background-color: #D0654B;
  transform: scale(0.98);
  box-shadow: 0 20rpx 56rpx -12rpx rgba(224, 122, 95, 0.4);
}

.submit-text {
  font-size: $font-size-h2;
  font-weight: 700;
  color: #ffffff;
}

.arrow-icon {
  font-size: 36rpx;
  color: #ffffff;
  transition: transform 0.3s ease;
}

.register-btn:active .arrow-icon {
  transform: translateX(8rpx);
}

.register-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding-bottom: 28rpx;
}

.register-text {
  font-size: $font-size-h3;
  color: #8C817D;
}

.register-link {
  font-size: $font-size-h3;
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
