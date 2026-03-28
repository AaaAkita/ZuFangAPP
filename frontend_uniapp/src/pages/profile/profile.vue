<template>
  <view class="page-profile page-shell">
    <GlobalBack />

    <view class="profile-header">
      <text class="page-title">{{ profileData.title }}</text>
      <view class="profile-header__edit" @click="navigateTo('/pages/settings/settings')">
        <Icon name="edit" :size="34" />
      </view>
    </view>

    <view class="profile-user">
      <UserAvatar :src="userAvatar" :size="220" :online="true" />
      <text class="profile-user__name">{{ userDisplayName }}</text>
      <text class="profile-user__join">{{ userJoinDate }}</text>
    </view>

    <view class="profile-stats">
      <ProfileStatCard
        v-for="item in profileData.stats"
        :key="item.id"
        :item="item"
        @click="handleMenuClick(item.route)"
      />
    </view>

    <view class="profile-menu-list">
      <ProfileMenuItem
        v-for="item in profileData.menus"
        :key="item.id"
        :item="item"
        @click="handleMenuClick(item.route)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/utils/auth'
import { getProfileData } from '@/data'
import Icon from '@/components/ui/Icon.vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import ProfileMenuItem from '@/components/business/ProfileMenuItem.vue'
import ProfileStatCard from '@/components/business/ProfileStatCard.vue'
import UserAvatar from '@/components/business/UserAvatar.vue'

const authStore = useAuthStore()
const profileData = computed(() => getProfileData())

const userDisplayName = computed(() => authStore.userNickname || profileData.value.defaultDisplayName)
const userAvatar = computed(() => authStore.userInfo?.avatar || profileData.value.defaultAvatar)
const userJoinDate = computed(() => {
  if (authStore.userInfo?.createdAt) {
    return '2024年加入租客社区'
  }
  return profileData.value.joinDateFallback
})

onMounted(() => {
  if (!authStore.isLoggedIn) {
    uni.showToast({ title: '请先登录', icon: 'none' })
    setTimeout(() => uni.navigateTo({ url: '/pages/login/login' }), 1000)
  }
})

const tabBarPages = [
  '/pages/home/home',
  '/pages/community/community',
  '/pages/message/message',
  '/pages/profile/profile'
]

const navigateTo = (url: string) => {
  if (tabBarPages.includes(url)) {
    uni.switchTab({ url })
  } else {
    uni.navigateTo({ url })
  }
}

const handleMenuClick = (route?: string) => {
  if (!route) {
    uni.showToast({ title: '功能建设中', icon: 'none' })
    return
  }
  navigateTo(route)
}
</script>
