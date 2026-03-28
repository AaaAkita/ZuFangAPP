<template>
  <view class="biz-auth-input">
    <view class="biz-auth-input__icon">
      <Icon :name="icon" :size="34" />
    </view>
    <input
      :value="modelValue"
      class="biz-auth-input__field"
      :placeholder="placeholder"
      :type="type"
      :password="password"
      :maxlength="maxlength"
      placeholder-class="input-placeholder"
      @input="onInput"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <view v-if="showToggle" class="biz-auth-input__toggle" @click="$emit('toggle-password')">
      <Icon :name="password ? 'visibility_off' : 'visibility'" :size="30" />
    </view>
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'

interface Props {
  modelValue: string
  placeholder: string
  icon: string
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'nickname'
  password?: boolean
  maxlength?: number
  showToggle?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  password: false,
  maxlength: -1,
  showToggle: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'toggle-password'): void
  (e: 'focus'): void
  (e: 'blur'): void
}>()

const onInput = (event: Record<string, any>) => {
  emit('update:modelValue', String(event?.detail?.value ?? ''))
}
</script>

<style scoped lang="scss">
.biz-auth-input {
  height: 98rpx;
  border-radius: 98rpx;
  border: 3rpx solid #f4d1c6;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 26rpx;
}

.biz-auth-input:focus-within {
  border-color: #e07a5f;
}

.biz-auth-input__icon {
  color: rgba(224, 122, 95, 0.6);
  margin-right: 12rpx;
}

.biz-auth-input__field {
  flex: 1;
  font-size: 28rpx;
  color: #4a403a;
}

.biz-auth-input__toggle {
  color: #8c817d;
  margin-left: 8rpx;
  padding: 8rpx;
}
</style>
