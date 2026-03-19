<template>
  <text
    :class="iconClasses"
    :style="iconStyle"
    @click="handleClick"
  >
    {{ iconContent }}
  </text>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 图标映射表
const iconMap: Record<string, string> = {
  // 导航图标
  'home': '\ue900',
  'community': '\ue901',
  'message': '\ue902',
  'profile': '\ue903',
  'search': '\ue904',
  
  // 操作图标
  'arrow-right': '\ue905',
  'arrow-left': '\ue906',
  'arrow-up': '\ue907',
  'arrow-down': '\ue908',
  'close': '\ue909',
  'check': '\ue90a',
  'plus': '\ue90b',
  'minus': '\ue90c',
  'edit': '\ue90d',
  'delete': '\ue90e',
  'share': '\ue90f',
  'more': '\ue910',
  
  // 状态图标
  'loading': '\ue911',
  'success': '\ue912',
  'warning': '\ue913',
  'error': '\ue914',
  'info': '\ue915',
  
  // 功能图标
  'location': '\ue916',
  'phone': '\ue917',
  'email': '\ue918',
  'time': '\ue919',
  'calendar': '\ue91a',
  'star': '\ue91b',
  'heart': '\ue91c',
  'bookmark': '\ue91d',
  'tag': '\ue91e',
  'filter': '\ue91f',
  'sort': '\ue920',
  'image': '\ue921',
  'camera': '\ue922',
  'settings': '\ue923',
  'help': '\ue924',
  'logout': '\ue925',
  'safety': '\ue926',
  'about': '\ue927'
}

interface Props {
  name: string
  size?: string | number
  color?: string
  customClass?: string
  customStyle?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  size: 32,
  color: '',
  customClass: '',
  customStyle: () => ({})
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

const iconContent = computed(() => {
  return iconMap[props.name] || props.name
})

const iconClasses = computed(() => {
  const classes = ['ui-icon', 'iconfont']
  if (props.customClass) {
    classes.push(props.customClass)
  }
  return classes.join(' ')
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  
  // 处理size
  const sizeValue = typeof props.size === 'number' ? `${props.size}rpx` : props.size
  style.fontSize = sizeValue
  
  // 处理color
  if (props.color) {
    style.color = props.color
  }
  
  // 合并自定义样式
  Object.assign(style, props.customStyle)
  
  return style
})

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1;
  vertical-align: middle;
}

// 点击效果
.ui-icon:active {
  opacity: 0.7;
}
</style>
