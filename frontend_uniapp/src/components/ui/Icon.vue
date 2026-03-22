<template>
  <text :class="iconClasses" :style="iconStyle" @click="handleClick">
    {{ iconContent }}
  </text>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const iconMap: Record<string, string> = {
  home: '\u2302',
  cottage: '\u2302',
  community: '\u25CE',
  explore: '\u25CE',
  message: '\u2709',
  chat_bubble: '\u2709',
  profile: '\u25C9',
  person: '\u25C9',
  face: '\u263A',
  account_circle: '\u25C9',
  search: '\u2315',
  filter: '\u2261',
  tune: '\u2261',
  sort: '\u21C5',
  'arrow-right': '\u203A',
  arrow_forward: '\u203A',
  arrow_forward_ios: '\u203A',
  chevron_right: '\u203A',
  'arrow-left': '\u2039',
  arrow_back: '\u2039',
  'arrow-up': '\u2303',
  'arrow-down': '\u2304',
  close: '\u2715',
  check: '\u2713',
  check_circle: '\u2713',
  radio_button_unchecked: '\u25CB',
  plus: '+',
  add: '+',
  minus: '\u2212',
  edit: '\u270E',
  edit_square: '\u270E',
  delete: '\u232B',
  share: '\u2197',
  more: '\u22EF',
  loading: '\u27F3',
  success: '\u2714',
  warning: '\u26A0',
  error: '\u2716',
  info: '\u2139',
  location: '\u2316',
  location_on: '\u2316',
  navigation: '\u27A4',
  near_me: '\u27A4',
  map: '\u25A7',
  phone: '\u260E',
  email: '\u2709',
  time: '\u23F0',
  calendar: '\uD83D\uDCC5',
  star: '\u2605',
  heart: '\u2665',
  favorite: '\u2665',
  favorite_border: '\u2661',
  bookmark: '\uD83D\uDD16',
  tag: '\uD83C\uDFF7',
  image: '\u25A3',
  camera: '\u25C9',
  bed: '\u25A4',
  bathtub: '\u25A1',
  straighten: '\u2194',
  settings: '\u2699',
  help: '?',
  logout: '\u21A6',
  safety: '\u26E8',
  shield: '\u26E8',
  about: 'i',
  park: '\u2663',
  lock: '\uD83D\uDD12',
  visibility: '\u25C9',
  visibility_off: '\u25CC',
  wechat: '\u5FAE'
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

const iconContent = computed(() => iconMap[props.name] || '\u2022')

const iconClasses = computed(() => {
  const classes = ['ui-icon']
  if (props.customClass) classes.push(props.customClass)
  return classes.join(' ')
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  const sizeValue = typeof props.size === 'number' ? `${props.size}rpx` : props.size
  style.fontSize = sizeValue
  style.fontFamily = 'inherit'
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