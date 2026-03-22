<template>
  <text :class="iconClasses" :style="iconStyle" @click="handleClick">
    {{ iconContent }}
  </text>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const iconMap: Record<string, string> = {
  home: '⌂',
  community: '◍',
  message: '✉',
  profile: '◉',
  search: '⌕',
  'arrow-right': '›',
  'arrow-left': '‹',
  'arrow-up': '⌃',
  'arrow-down': '⌄',
  close: '✕',
  check: '✓',
  plus: '+',
  minus: '−',
  edit: '✎',
  delete: '⌫',
  share: '↗',
  more: '⋯',
  loading: '⟳',
  success: '✔',
  warning: '⚠',
  error: '✖',
  info: 'ℹ',
  location: '⌖',
  phone: '☎',
  email: '✉',
  time: '⏰',
  calendar: '📅',
  star: '★',
  heart: '♥',
  bookmark: '🔖',
  tag: '🏷',
  filter: '≡',
  sort: '⇅',
  image: '▣',
  camera: '◉',
  settings: '⚙',
  help: '?',
  logout: '⇦',
  safety: '⚕',
  about: 'i',
  shield: '⛨',
  park: '♧'
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

const iconContent = computed(() => iconMap[props.name] || '•')

const iconClasses = computed(() => {
  const classes = ['ui-icon']
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  const sizeValue = typeof props.size === 'number' ? `${props.size}rpx` : props.size
  style.fontSize = sizeValue
  if (props.color) style.color = props.color
  Object.assign(style, props.customStyle)
  return style
})

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.ui-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  vertical-align: middle;
  user-select: none;
}

.ui-icon:active {
  opacity: 0.7;
}
</style>
