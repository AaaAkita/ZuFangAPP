<template>
  <view class="page-login page-shell">
    <GlobalBack />

    <view class="auth-header">
      <view class="auth-logo">
        <Icon name="cottage" :size="76" />
      </view>
      <text class="auth-title">欢迎回来</text>
      <text class="auth-subtitle">登录以发现理想温馨好房</text>
    </view>

    <view class="auth-form">
      <AuthInputField
        v-model="formData.account"
        icon="person"
        placeholder="手机号"
        type="number"
        :maxlength="11"
      />

      <AuthInputField
        v-model="formData.password"
        icon="lock"
        placeholder="密码"
        :password="!showPassword"
        :show-toggle="true"
        @toggle-password="togglePassword"
      />

      <view class="auth-forgot">
        <text @click="handleForgotPassword">忘记密码？</text>
      </view>

      <button class="auth-submit" @click="handleLogin" :disabled="isLoading">
        <text>{{ isLoading ? '登录中...' : '登录' }}</text>
      </button>
    </view>

    <view class="auth-social">
      <text class="auth-social__label">其他方式登录</text>
      <view class="auth-social__btn" @click="handleWechatLogin">
        <Icon name="wechat" :size="40" />
      </view>
    </view>

    <view class="auth-switch">
      <text>还没有账号？</text>
      <text class="auth-switch__link" @click="goToRegister">立即注册</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import AuthInputField from '@/components/business/AuthInputField.vue'
import { wechatLogin } from '@/utils/wechat'
import { validatePhone, handleApiError, handleSuccess } from '@/utils/auth-helpers'
import { useAuthStore } from '@/utils/auth'
import { authApi } from '@/api/auth'

const authStore = useAuthStore()
const isLoading = ref(false)

const formData = reactive({
  account: '',
  password: ''
})

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  if (isLoading.value) return

  if (!formData.account) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return
  }

  if (!validatePhone(formData.account)) {
    uni.showToast({ title: '请输入有效的11位手机号', icon: 'none' })
    return
  }

  if (!formData.password) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return
  }

  try {
    isLoading.value = true
    uni.showLoading({ title: '登录中...' })

    const data = await authApi.login({ phone: formData.account, password: formData.password })
    authStore.setToken(data.token)

    try {
      const userData = await authApi.getProfile()
      authStore.setUserInfo({
        id: userData.id,
        phone: userData.phone || formData.account,
        nickname: userData.nickname || ''
      })
    } catch {
      authStore.setUserInfo({
        id: data.userId || 0,
        phone: formData.account,
        nickname: data.nickname || ''
      })
    }

    handleSuccess('登录成功')
  } catch (error) {
    handleApiError(error, '网络错误，请重试')
  } finally {
    isLoading.value = false
    uni.hideLoading()
  }
}

const handleForgotPassword = () => {
  uni.showToast({ title: '找回密码功能开发中', icon: 'none' })
}

const handleWechatLogin = async () => {
  await wechatLogin()
}

const goToRegister = () => {
  uni.navigateTo({ url: '/pages/register/register' })
}
</script>
