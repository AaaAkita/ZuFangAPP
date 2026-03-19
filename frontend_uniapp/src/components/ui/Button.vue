<template>
  <button
    :class="buttonClasses"
    :style="buttonStyle"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <view v-if="loading" class="btn-loading">
      <view class="loading-spinner"></view>
    </view>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'text'
type ButtonSize = 'large' | 'medium' | 'small'

interface Props {
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  block?: boolean
  customStyle?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  block: false,
  customStyle: () => ({})
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

const buttonClasses = computed(() => {
  const classes = ['ui-button']
  classes.push(`ui-button--${props.type}`)
  classes.push(`ui-button--${props.size}`)
  if (props.block) {
    classes.push('ui-button--block')
  }
  if (props.disabled || props.loading) {
    classes.push('ui-button--disabled')
  }
  return classes.join(' ')
})

const buttonStyle = computed(() => {
  return props.customStyle
})

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all $duration-normal $easing-default;
  font-family: inherit;
  line-height: $line-height-normal;
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
}

// 按钮类型
.ui-button--primary {
  background: linear-gradient(135deg, $color-primary 0%, $color-primary-dark 100%);
  color: $color-text-inverse;
  box-shadow: $shadow-primary;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, $color-primary-light 0%, $color-primary 100%);
  }
}

.ui-button--secondary {
  background-color: $color-bg-secondary;
  color: $color-text-primary;
  border: 2rpx solid $color-border;
  
  &:hover:not(:disabled) {
    background-color: $color-bg-tertiary;
    border-color: $color-border-dark;
  }
}

.ui-button--text {
  background-color: transparent;
  color: $color-primary;
  padding-left: $spacing-sm;
  padding-right: $spacing-sm;
  
  &:hover:not(:disabled) {
    background-color: $color-primary-bg;
  }
}

// 按钮尺寸
.ui-button--small {
  min-height: 56rpx;
  padding: $spacing-xs $spacing-sm;
  font-size: $font-size-caption;
  font-weight: $font-weight-medium;
  border-radius: $border-radius-sm;
}

.ui-button--medium {
  min-height: 72rpx;
  padding: $spacing-sm $spacing-md;
  font-size: $font-size-body;
  font-weight: $font-weight-medium;
  border-radius: $border-radius-md;
}

.ui-button--large {
  min-height: 88rpx;
  padding: $spacing-md $spacing-lg;
  font-size: $font-size-h3;
  font-weight: $font-weight-semibold;
  border-radius: $border-radius-lg;
}

// 块级按钮
.ui-button--block {
  display: flex;
  width: 100%;
}

// 禁用状态
.ui-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  
  &:active {
    transform: none !important;
  }
}

// 加载状态
.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 32rpx;
  height: 32rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// 响应式调整
@media screen and (max-width: 375px) {
  .ui-button--small {
    min-height: 48rpx;
    padding: 6rpx 12rpx;
  }
  
  .ui-button--medium {
    min-height: 64rpx;
    padding: 12rpx 20rpx;
  }
  
  .ui-button--large {
    min-height: 80rpx;
    padding: 16rpx 28rpx;
  }
}
</style>
