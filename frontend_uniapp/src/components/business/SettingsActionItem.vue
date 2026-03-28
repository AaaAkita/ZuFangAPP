<template>
  <view class="biz-settings-item card-shell card-shell--flat" @click="$emit('action')">
    <view class="biz-settings-item__left">
      <view class="biz-settings-item__icon">
        <Icon :name="item.icon" :size="28" />
      </view>
      <view class="biz-settings-item__text-wrap">
        <text class="biz-settings-item__label">{{ item.label }}</text>
        <text class="biz-settings-item__desc">{{ item.description }}</text>
      </view>
    </view>

    <switch
      v-if="item.type === 'switch'"
      :checked="!!item.value"
      color="#ee7c2b"
      @change.stop="$emit('toggle', $event)"
    />
    <Icon v-else name="arrow-right" :size="28" color="#94a3b8" />
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { SettingsItem } from '@/data'

interface Props {
  item: SettingsItem
}

defineProps<Props>()

defineEmits<{
  (e: 'action'): void
  (e: 'toggle', event: any): void
}>()
</script>

<style scoped lang="scss">
.biz-settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18rpx 20rpx;
}

.biz-settings-item__left {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.biz-settings-item__icon {
  width: 66rpx;
  height: 66rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  background: rgba(241, 245, 249, 0.9);
}

.biz-settings-item__text-wrap {
  min-width: 0;
}

.biz-settings-item__label {
  display: block;
  font-size: 27rpx;
  font-weight: 600;
  color: #1e293b;
}

.biz-settings-item__desc {
  display: block;
  margin-top: 4rpx;
  font-size: 21rpx;
  color: #94a3b8;
}
</style>
