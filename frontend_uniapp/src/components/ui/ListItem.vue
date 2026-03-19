<template>
  <view :class="listItemClasses" :style="listItemStyle" @click="handleClick">
    <!-- 左侧区域 -->
    <view v-if="$slots.left || icon" class="list-item-left">
      <slot name="left">
        <view v-if="icon" class="list-item-icon" :style="iconStyle">
          <text :class="['iconfont', icon]"></text>
        </view>
      </slot>
    </view>
    
    <!-- 内容区域 -->
    <view class="list-item-content">
      <slot name="content">
        <text v-if="title" class="list-item-title" :style="titleStyle">{{ title }}</text>
        <text v-if="description" class="list-item-description" :style="descriptionStyle">{{ description }}</text>
      </slot>
    </view>
    
    <!-- 右侧区域 -->
    <view class="list-item-right">
      <slot name="right">
        <text v-if="extra" class="list-item-extra" :style="extraStyle">{{ extra }}</text>
        <view v-if="arrow" class="list-item-arrow">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // 内容
  title?: string
  description?: string
  extra?: string
  
  // 图标
  icon?: string
  
  // 状态
  arrow?: boolean
  disabled?: boolean
  
  // 样式
  customClass?: string
  customStyle?: Record<string, string>
  
  // 字体大小
  titleSize?: string
  descriptionSize?: string
  extraSize?: string
  
  // 颜色
  titleColor?: string
  descriptionColor?: string
  extraColor?: string
  iconColor?: string
  iconBgColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  extra: '',
  icon: '',
  arrow: false,
  disabled: false,
  customClass: '',
  customStyle: () => ({}),
  titleSize: '',
  descriptionSize: '',
  extraSize: '',
  titleColor: '',
  descriptionColor: '',
  extraColor: '',
  iconColor: '',
  iconBgColor: ''
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

const listItemClasses = computed(() => {
  const classes = ['ui-list-item']
  if (props.disabled) {
    classes.push('ui-list-item--disabled')
  }
  if (props.arrow) {
    classes.push('ui-list-item--arrow')
  }
  if (props.customClass) {
    classes.push(props.customClass)
  }
  return classes.join(' ')
})

const listItemStyle = computed(() => {
  return props.customStyle
})

const titleStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.titleSize) style.fontSize = props.titleSize
  if (props.titleColor) style.color = props.titleColor
  return style
})

const descriptionStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.descriptionSize) style.fontSize = props.descriptionSize
  if (props.descriptionColor) style.color = props.descriptionColor
  return style
})

const extraStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.extraSize) style.fontSize = props.extraSize
  if (props.extraColor) style.color = props.extraColor
  return style
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.iconColor) style.color = props.iconColor
  if (props.iconBgColor) style.backgroundColor = props.iconBgColor
  return style
})

const handleClick = (event: Event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.ui-list-item {
  display: flex;
  align-items: center;
  min-height: 96rpx;
  padding: $spacing-sm $spacing-md;
  background-color: $color-bg-secondary;
  transition: background-color $duration-fast $easing-default;
  
  &:active:not(.ui-list-item--disabled) {
    background-color: $color-bg-tertiary;
  }
}

.ui-list-item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ui-list-item--arrow {
  padding-right: $spacing-sm;
}

// 左侧区域
.ui-list-item-left {
  flex-shrink: 0;
  margin-right: $spacing-md;
  display: flex;
  align-items: center;
}

.ui-list-item-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: $border-radius-md;
  background-color: $color-primary-bg;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-primary;
  font-size: $font-size-h2;
}

// 内容区域
.ui-list-item-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ui-list-item-title {
  font-size: $font-size-body;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
  line-height: $line-height-tight;
  @include text-truncate;
}

.ui-list-item-description {
  margin-top: $spacing-xs;
  font-size: $font-size-caption;
  color: $color-text-secondary;
  line-height: $line-height-normal;
  @include text-truncate-lines(2);
}

// 右侧区域
.ui-list-item-right {
  flex-shrink: 0;
  margin-left: $spacing-md;
  display: flex;
  align-items: center;
}

.ui-list-item-extra {
  font-size: $font-size-caption;
  color: $color-text-tertiary;
  margin-right: $spacing-sm;
}

.ui-list-item-arrow {
  color: $color-text-tertiary;
  font-size: $font-size-body;
}

// 响应式调整
@media screen and (max-width: 375px) {
  .ui-list-item {
    min-height: 88rpx;
    padding: $spacing-xs $spacing-sm;
  }
  
  .ui-list-item-icon {
    width: 64rpx;
    height: 64rpx;
    font-size: $font-size-h3;
  }
  
  .ui-list-item-title {
    font-size: $font-size-body-sm;
  }
  
  .ui-list-item-description {
    font-size: $font-size-tiny;
  }
}
</style>
