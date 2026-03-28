<template>
  <view class="page-settings page-shell">
    <GlobalBack />

    <view class="page-title-wrap">
      <text class="page-title">{{ settingsData.title }}</text>
    </view>

    <view class="settings-sections">
      <view
        v-for="section in sections"
        :key="section.id"
        class="settings-section"
      >
        <text class="settings-section__title">{{ section.title }}</text>
        <view class="settings-section__list">
          <SettingsActionItem
            v-for="item in section.items"
            :key="item.id"
            :item="item"
            @toggle="toggleSetting(section.id, item.id, $event)"
            @action="handleItemAction(item)"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import SettingsActionItem from '@/components/business/SettingsActionItem.vue'
import { getSettingsData, type AppAction, type SettingsSection, type SettingsItem } from '@/data'

const settingsData = computed(() => getSettingsData())
const sections = ref<SettingsSection[]>(
  settingsData.value.sections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({ ...item }))
  }))
)

const resolveAction = (action?: AppAction) => {
  if (!action) {
    uni.showToast({ title: '功能开发中', icon: 'none' })
    return
  }

  if (action.mode === 'toast') {
    uni.showToast({ title: action.toastText || '功能开发中', icon: 'none' })
    return
  }

  if (!action.url) {
    uni.showToast({ title: '功能开发中', icon: 'none' })
    return
  }

  if (action.mode === 'switchTab') {
    uni.switchTab({ url: action.url })
    return
  }

  uni.navigateTo({ url: action.url })
}

const handleItemAction = (item: SettingsItem) => {
  if (item.type === 'switch') {
    return
  }
  resolveAction(item.action)
}

const toggleSetting = (sectionId: number, itemId: number, event: any) => {
  const targetSection = sections.value.find((section) => section.id === sectionId)
  const targetItem = targetSection?.items.find((item) => item.id === itemId)
  if (!targetItem) return

  const checked = !!event?.detail?.value
  targetItem.value = checked
  uni.showToast({
    title: checked ? '已开启' : '已关闭',
    icon: 'none'
  })
}
</script>

<style scoped lang="scss">
.settings-sections {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 32rpx);
}

.settings-section__title {
  display: block;
  margin-bottom: 10rpx;
  font-size: 24rpx;
  color: #94a3b8;
}

.settings-section__list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
</style>
