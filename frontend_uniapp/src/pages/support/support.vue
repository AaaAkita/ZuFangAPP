<template>
  <view class="page-support page-shell">
    <GlobalBack />

    <view class="page-title-wrap">
      <text class="page-title">{{ supportData.title }}</text>
    </view>

    <view class="support-channel-list">
      <SettingsActionItem
        v-for="channel in supportData.channels"
        :key="channel.id"
        :item="mapChannelToSettingItem(channel)"
        @action="handleChannelAction(channel.action)"
        @toggle="noop"
      />
    </view>

    <view class="support-faq card-shell">
      <text class="support-faq__title">常见问题</text>
      <view
        v-for="item in supportData.faqs"
        :key="item.id"
        class="support-faq__item"
      >
        <view class="support-faq__q" @click="toggleFaq(item.id)">
          <text>{{ item.question }}</text>
          <Icon :name="expandedFaqId === item.id ? 'arrow-up' : 'arrow-down'" :size="22" color="#64748b" />
        </view>
        <text v-if="expandedFaqId === item.id" class="support-faq__a">{{ item.answer }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import Icon from '@/components/ui/Icon.vue'
import SettingsActionItem from '@/components/business/SettingsActionItem.vue'
import { getSupportData, type AppAction, type SettingsItem, type SupportChannel } from '@/data'

const supportData = computed(() => getSupportData())
const expandedFaqId = ref<number | null>(supportData.value.faqs[0]?.id || null)

const mapChannelToSettingItem = (channel: SupportChannel): SettingsItem => ({
  id: channel.id,
  label: channel.name,
  description: channel.description,
  icon: channel.icon,
  type: 'action'
})

const handleChannelAction = (action: AppAction) => {
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

const toggleFaq = (id: number) => {
  expandedFaqId.value = expandedFaqId.value === id ? null : id
}

const noop = () => {}
</script>

<style scoped lang="scss">
.support-channel-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.support-faq {
  margin-top: 18rpx;
}

.support-faq__title {
  display: block;
  font-size: 30rpx;
  font-weight: 700;
  color: #1e293b;
}

.support-faq__item {
  margin-top: 14rpx;
  padding-top: 14rpx;
  border-top: 1rpx solid rgba(15, 23, 42, 0.08);
}

.support-faq__q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12rpx;
  font-size: 25rpx;
  font-weight: 600;
  color: #334155;
}

.support-faq__a {
  display: block;
  margin-top: 8rpx;
  font-size: 23rpx;
  line-height: 1.6;
  color: #64748b;
}
</style>
