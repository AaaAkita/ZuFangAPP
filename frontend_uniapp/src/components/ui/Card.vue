<template>
  <view :class="cardClasses" :style="cardStyle">
    <view v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <text class="card-title">{{ title }}</text>
        <text v-if="subtitle" class="card-subtitle">{{ subtitle }}</text>
      </slot>
    </view>
    
    <view class="card-body">
      <slot></slot>
    </view>
    
    <view v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat'

interface Props {
  variant?: CardVariant
  title?: string
  subtitle?: string
  padding?: 'none' | 'small' | 'medium' | 'large'
  customClass?: string
  customStyle?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'medium',
  customClass: '',
  customStyle: () => ({})
})

const cardClasses = computed(() => {
  const classes = ['ui-card', `ui-card--${props.variant}`, `ui-card--padding-${props.padding}`]
  if (props.customClass) {
    classes.push(props.customClass)
  }
  return classes.join(' ')
})

const cardStyle = computed(() => {
  return props.customStyle
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.ui-card {
  background-color: $color-bg-secondary;
  border-radius: $border-radius-lg;
  overflow: hidden;
  transition: box-shadow $duration-normal $easing-default;
}

// 变体样式
.ui-card--default {
  box-shadow: $shadow-sm;
  border: 1rpx solid $color-border-light;
}

.ui-card--outlined {
  box-shadow: none;
  border: 2rpx solid $color-border;
}

.ui-card--elevated {
  box-shadow: $shadow-md;
  border: none;
}

.ui-card--flat {
  box-shadow: none;
  border: none;
  background-color: $color-bg-tertiary;
}

// 内边距
.ui-card--padding-none {
  .card-header,
  .card-body,
  .card-footer {
    padding: 0;
  }
}

.ui-card--padding-small {
  .card-header,
  .card-body,
  .card-footer {
    padding: $spacing-sm;
  }
}

.ui-card--padding-medium {
  .card-header,
  .card-body,
  .card-footer {
    padding: $spacing-md;
  }
}

.ui-card--padding-large {
  .card-header,
  .card-body,
  .card-footer {
    padding: $spacing-lg;
  }
}

// 头部样式
.card-header {
  border-bottom: 1rpx solid $color-border-light;
  
  &:empty {
    display: none;
  }
}

.card-title {
  display: block;
  font-size: $font-size-h3;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  line-height: $line-height-tight;
}

.card-subtitle {
  display: block;
  margin-top: $spacing-xs;
  font-size: $font-size-caption;
  color: $color-text-secondary;
  line-height: $line-height-normal;
}

// 内容区域
.card-body {
  flex: 1;
  min-height: 0;
}

// 底部样式
.card-footer {
  border-top: 1rpx solid $color-border-light;
  
  &:empty {
    display: none;
  }
}

// 响应式调整
@media screen and (max-width: 375px) {
  .ui-card--padding-medium {
    .card-header,
    .card-body,
    .card-footer {
      padding: $spacing-sm;
    }
  }
  
  .ui-card--padding-large {
    .card-header,
    .card-body,
    .card-footer {
      padding: $spacing-md;
    }
  }
}
</style>

