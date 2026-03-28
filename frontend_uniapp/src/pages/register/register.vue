<template>
  <view class="page-register page-shell">
    <GlobalBack />

    <view class="auth-header">
      <view class="auth-logo">
        <Icon name="cottage" :size="76" />
      </view>
      <text class="auth-title">创建账号</text>
      <text class="auth-subtitle">加入租房避雷社区</text>
    </view>

    <view class="auth-form">
      <AuthInputField
        v-model="formData.phone"
        icon="phone"
        placeholder="手机号"
        type="number"
        :maxlength="11"
      />

      <AuthInputField
        v-model="formData.nickname"
        icon="person"
        placeholder="昵称（选填）"
      />

      <AuthInputField
        v-model="formData.password"
        icon="lock"
        placeholder="密码（至少8位，包含字母和数字）"
        :password="!showPassword"
        :show-toggle="true"
        @toggle-password="togglePassword"
        @focus="isPasswordFocused = true"
        @blur="isPasswordFocused = false"
      />

      <view class="register-hint" :class="{ show: isPasswordFocused || !!formData.password }">
        <text :class="{ valid: passwordStrength.length }">至少8位</text>
        <text :class="{ valid: passwordStrength.hasLetterAndNumber }">字母+数字</text>
      </view>

      <button class="auth-submit" @click="handleRegister" :disabled="isLoading">
        <text>{{ isLoading ? '注册中...' : '注册' }}</text>
      </button>
    </view>

    <view class="auth-switch">
      <text>已有账号？</text>
      <text class="auth-switch__link" @click="goToLogin">立即登录</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import AuthInputField from '@/components/business/AuthInputField.vue'
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
const passwordStrength = computed(() => getPasswordStrength(formData.password))

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleRegister = async () => {
  if (isLoading.value) return

  if (!formData.phone) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return
  }

  if (!validatePhone(formData.phone)) {
    uni.showToast({ title: '请输入有效的11位手机号', icon: 'none' })
    return
  }

  if (!formData.password) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return
  }

  if (!validatePassword(formData.password)) {
    uni.showToast({ title: '密码必须至少8位且包含字母和数字', icon: 'none' })
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
      authStore.setToken(data.data.token)

      try {
        const userData = await authApi.getProfile()
        if (userData.success && userData.data) {
          authStore.setUserInfo({
            id: userData.data.id,
            phone: userData.data.phone,
            nickname: userData.data.nickname || ''
          })
        } else {
          authStore.setUserInfo({
            id: data.data.userId || 0,
            phone: formData.phone,
            nickname: data.data.nickname || formData.nickname || ''
          })
        }
      } catch {
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
  uni.navigateTo({ url: '/pages/login/login' })
}
</script>
