<template>
  <view class="biz-property-card card-shell card-shell--flat" @click="$emit('select')">
    <view class="biz-property-card__image-wrap">
      <image class="biz-property-card__image" :src="property.image" mode="aspectFill" />
      <view class="biz-property-card__fav" @click.stop="$emit('toggle-favorite')">
        <Icon :name="property.isFavorite ? 'favorite' : 'favorite_border'" :size="34" />
      </view>
      <view v-if="property.tag" class="biz-property-card__badge" :style="{ backgroundColor: property.tagColor || '#ffffff' }">
        <text>{{ property.tag }}</text>
      </view>
    </view>

    <view class="biz-property-card__body">
      <view class="biz-property-card__top">
        <view class="biz-property-card__title-wrap">
          <text class="biz-property-card__title">{{ property.title }}</text>
          <text class="biz-property-card__location">{{ property.location }}</text>
        </view>
        <view class="biz-property-card__rating">
          <Icon name="star" :size="24" color="#ee7c2b" />
          <text>{{ property.rating }}</text>
        </view>
      </view>

      <view class="biz-property-card__features">
        <text>{{ property.rooms }}</text>
        <text>{{ property.bathrooms }}</text>
        <text>{{ property.area }}</text>
      </view>

      <view class="biz-property-card__bottom">
        <view>
          <text class="biz-property-card__price">{{ property.price }}</text>
          <text class="biz-property-card__unit">/ 月</text>
        </view>
        <text class="biz-property-card__detail">查看详情</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { PropertyItem } from '@/data'

interface Props {
  property: PropertyItem
}

defineProps<Props>()

defineEmits<{
  (e: 'toggle-favorite'): void
  (e: 'select'): void
}>()
</script>

<style scoped lang="scss">
.biz-property-card {
  overflow: hidden;
}

.biz-property-card__image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
}

.biz-property-card__image {
  width: 100%;
  height: 100%;
  border-radius: 18rpx;
}

.biz-property-card__fav {
  position: absolute;
  top: 18rpx;
  right: 18rpx;
  width: 58rpx;
  height: 58rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.85);
  color: #9a6c4c;
}

.biz-property-card__badge {
  position: absolute;
  left: 20rpx;
  bottom: 18rpx;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  color: #1b130d;
}

.biz-property-card__body {
  padding: 18rpx 0 0;
}

.biz-property-card__top {
  display: flex;
  justify-content: space-between;
  gap: 12rpx;
}

.biz-property-card__title-wrap {
  min-width: 0;
}

.biz-property-card__title {
  display: block;
  font-size: 30rpx;
  color: #1b130d;
  font-weight: 700;
}

.biz-property-card__location {
  display: block;
  margin-top: 4rpx;
  font-size: 24rpx;
  color: #9a6c4c;
}

.biz-property-card__rating {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  padding: 4rpx 10rpx;
  border-radius: 14rpx;
  background: #f3ece7;
  color: #1b130d;
  font-size: 22rpx;
}

.biz-property-card__features {
  margin-top: 12rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 18rpx;
  color: #9a6c4c;
  font-size: 22rpx;
}

.biz-property-card__bottom {
  margin-top: 14rpx;
  padding-top: 12rpx;
  border-top: 2rpx solid #f3ece7;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.biz-property-card__price {
  font-size: 34rpx;
  font-weight: 700;
  color: #ee7c2b;
}

.biz-property-card__unit {
  font-size: 22rpx;
  color: #9a6c4c;
}

.biz-property-card__detail {
  font-size: 24rpx;
  color: #ee7c2b;
  font-weight: 600;
}
</style>
