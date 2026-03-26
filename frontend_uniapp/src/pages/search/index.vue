<template>
  <view class="container">
    <view class="header">
      <label class="search-wrapper">
        <view class="search-bar">
          <Icon class="app-icon search-icon" name="search" size="inherit" />
          <input
            class="search-input"
            placeholder="搜索地点或房源"
            type="text"
            v-model="searchKeyword"
          />
          <view class="filter-btn" @click="handleFilter">
            <Icon class="app-icon" name="tune" size="inherit" />
          </view>
        </view>
      </label>
    </view>

    <scroll-view class="filter-scroll" scroll-x="true" :show-scrollbar="false">
      <view class="filter-tags">
        <view
          v-for="(tag, index) in filterTags"
          :key="index"
          :class="['filter-tag', { active: activeFilter === index }]"
          :style="{ backgroundColor: activeFilter === index ? '#ee7c2b' : tag.bgColor }"
          @click="selectFilter(index)"
        >
          <text class="tag-text" :style="{ color: activeFilter === index ? '#fff' : '#1b130d' }">
            {{ tag.label }}
          </text>
        </view>
      </view>
    </scroll-view>

    <scroll-view class="content-scroll" scroll-y="true" :show-scrollbar="false">
      <view class="result-header">
        <text class="result-title">找到 {{ propertyList.length }} 套房源</text>
        <view class="sort-btn" @click="handleSort">
          <text class="sort-text">排序</text>
          <Icon class="app-icon sort-icon" name="sort" size="inherit" />
        </view>
      </view>

      <view class="property-list">
        <view
          v-for="(item, index) in propertyList"
          :key="index"
          class="property-card"
          @click="navigateToDetail(item)"
        >
          <view class="card-image-wrapper">
            <image class="card-image" :src="item.image" mode="aspectFill" />
            <view
              class="favorite-btn"
              @click.stop="toggleFavorite(index)"
            >
              <Icon
                class="app-icon favorite-icon"
                :class="{ filled: item.isFavorite }"
                :name="item.isFavorite ? 'favorite' : 'favorite_border'"
                size="inherit"
              />
            </view>
            <view v-if="item.tag" class="card-badge" :style="{ backgroundColor: item.tagColor }">
              <text class="badge-text">{{ item.tag }}</text>
            </view>
          </view>

          <view class="card-content">
            <view class="card-header">
              <view class="title-area">
                <text class="card-title">{{ item.title }}</text>
                <text class="card-location">{{ item.location }}</text>
              </view>
              <view class="rating-box">
                <Icon class="app-icon star-icon" name="star" size="inherit" />
                <text class="rating-text">{{ item.rating }}</text>
              </view>
            </view>

            <view class="card-features">
              <view class="feature-item">
                <Icon class="app-icon feature-icon" name="bed" size="inherit" />
                <text class="feature-text">{{ item.rooms }}</text>
              </view>
              <view class="feature-item">
                <Icon class="app-icon feature-icon" name="bathtub" size="inherit" />
                <text class="feature-text">{{ item.bathrooms }}</text>
              </view>
              <view class="feature-item">
                <Icon class="app-icon feature-icon" name="straighten" size="inherit" />
                <text class="feature-text">{{ item.area }}</text>
              </view>
            </view>

            <view class="card-footer">
              <view class="price-area">
                <text class="price">{{ item.price }}</text>
                <text class="price-unit">/ 月</text>
              </view>
              <text class="detail-btn">查看详情</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="map-fab" @click="handleMap">
      <Icon class="app-icon map-icon" name="map" size="inherit" />
    </view>

    <view class="filter-modal" :class="{ show: showFilterModal }" @click="closeFilterModal">
      <view class="filter-panel" :class="{ show: showFilterModal }" @click.stop>
        <view class="filter-handle">
          <view class="handle-bar"></view>
        </view>
        <view class="filter-header">
          <text class="filter-title">筛选</text>
          <view class="close-btn" @click="closeFilterModal">
            <Icon class="app-icon" name="close" size="inherit" />
          </view>
        </view>

        <scroll-view class="filter-content" scroll-y :show-scrollbar="false">
          <view class="filter-section">
            <text class="section-title">区域</text>
            <view class="area-selector">
              <scroll-view class="area-list" scroll-y :show-scrollbar="false">
                <view
                  v-for="(area, index) in areaList"
                  :key="index"
                  :class="['area-item', { active: selectedArea === index }]"
                  @click="selectArea(index)"
                >
                  <text class="area-text">{{ area.name }}</text>
                </view>
              </scroll-view>
              <scroll-view class="street-list" scroll-y :show-scrollbar="false">
                <label
                  v-for="(street, index) in currentStreets"
                  :key="index"
                  class="street-item"
                  @click="selectStreet(index)"
                >
                  <text class="street-text" :class="{ active: selectedStreet === index }">{{ street }}</text>
                  <view class="radio-dot" :class="{ checked: selectedStreet === index }"></view>
                </label>
              </scroll-view>
            </view>
          </view>

          <view class="filter-section">
            <text class="section-title">地铁线</text>
            <scroll-view class="metro-scroll" scroll-x :show-scrollbar="false">
              <view class="metro-list">
                <view
                  v-for="(line, index) in metroLines"
                  :key="index"
                  class="metro-item"
                  @click="selectMetro(index)"
                >
                  <view
                    class="metro-circle"
                    :class="{ active: selectedMetro === index }"
                    :style="{ backgroundColor: selectedMetro === index ? line.color : line.bgColor }"
                  >
                    <text class="metro-num" :style="{ color: selectedMetro === index ? '#fff' : line.color }">{{ line.num }}</text>
                  </view>
                  <text class="metro-name" :class="{ active: selectedMetro === index }">{{ line.name }}</text>
                </view>
              </view>
            </scroll-view>
          </view>

          <view class="filter-section">
            <view class="section-header">
              <text class="section-title">租金范围</text>
              <text class="price-range">¥{{ rentRange[0] }} - ¥{{ rentRange[1] }}</text>
            </view>
            <view class="rent-slider-wrapper">
              <slider
                class="rent-slider"
                :min="0"
                :max="15000"
                :step="100"
                :value="rentRange[1]"
                :block-size="24"
                block-color="#ee7c2b"
                backgroundColor="#ffeacc"
                activeColor="#ee7c2b"
                @changing="onRentChange"
                @change="onRentChange"
              />
              <view class="rent-labels">
                <text class="rent-label">¥0</text>
                <text class="rent-label">¥5k</text>
                <text class="rent-label">¥10k</text>
                <text class="rent-label">¥15k+</text>
              </view>
            </view>
          </view>

          <view class="filter-section">
            <text class="section-title">评分要求</text>
            <view class="rating-list">
              <view
                v-for="(rating, index) in ratingOptions"
                :key="index"
                :class="['rating-item', { active: selectedRating === index }]"
                @click="selectRating(index)"
              >
                <text class="rating-value" :class="{ active: selectedRating === index }">{{ rating.value }}</text>
                <view class="rating-stars">
                  <Icon
                    v-for="n in rating.stars"
                    :key="n"
                    class="app-icon rating-star"
                    :class="{ active: selectedRating === index }"
                    name="star"
                    size="inherit"
                  />
                </view>
              </view>
            </view>
          </view>
        </scroll-view>

        <view class="filter-footer">
          <text class="reset-btn" @click="resetFilters">重置</text>
          <view class="confirm-btn" @click="confirmFilters">
            <text class="confirm-text">查看房源</text>
            <view class="confirm-badge">
              <text class="badge-num">{{ propertyList.length }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Icon from '@/components/ui/Icon.vue'

interface Property {
  id: number
  title: string
  location: string
  image: string
  rating: string
  rooms: string
  bathrooms: string
  area: string
  price: string
  tag?: string
  tagColor?: string
  isFavorite: boolean
}

const searchKeyword = ref('朝阳区, 北京')
const activeFilter = ref(0)
const showFilterModal = ref(false)
const selectedArea = ref(0)
const selectedStreet = ref(1)
const selectedMetro = ref(3)
const selectedRating = ref(2)
const rentRange = ref([2000, 8000])

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as any
  if (currentPage?.options?.showFilter === 'true') {
    showFilterModal.value = true
  }
})

const filterTags = ref([
  { label: '全部', bgColor: '#fff5e6' },
  { label: '近地铁', bgColor: '#fff5e6' },
  { label: '租金低', bgColor: '#e0f2f1' },
  { label: '精装修', bgColor: '#e3f2fd' },
  { label: '押一付一', bgColor: '#f3e5f5' }
])

const areaList = ref([
  { name: '朝阳区', streets: ['不限', '三里屯', '望京', '国贸', '双井', '大悦城'] },
  { name: '海淀区', streets: ['不限', '中关村', '五道口', '西二旗', '上地', '苏州街'] },
  { name: '通州区', streets: ['不限', '梨园', '果园', '九棵树', '临河里'] },
  { name: '西城区', streets: ['不限', '西单', '金融街', '什刹海', '阜成门'] },
  { name: '丰台区', streets: ['不限', '方庄', '丽泽', '总部基地', '草桥'] },
  { name: '大兴区', streets: ['不限', '亦庄', '黄村', '旧宫', '西红门'] }
])

const metroLines = ref([
  { num: '全部', name: '不限', color: '#9a6c4c', bgColor: '#f3ece7' },
  { num: '1', name: '1号线', color: '#E4002B', bgColor: 'rgba(228, 0, 43, 0.05)' },
  { num: '2', name: '2号线', color: '#0047BB', bgColor: 'rgba(0, 71, 187, 0.05)' },
  { num: '4', name: '4号线', color: '#007A33', bgColor: '#007A33' },
  { num: '5', name: '5号线', color: '#AA0061', bgColor: 'rgba(170, 0, 97, 0.05)' },
  { num: '6', name: '6号线', color: '#D98628', bgColor: 'rgba(217, 134, 40, 0.05)' },
  { num: '8', name: '8号线', color: '#00966C', bgColor: 'rgba(0, 150, 108, 0.05)' }
])

const ratingOptions = ref([
  { value: '3.5+', stars: 1 },
  { value: '4.0+', stars: 2 },
  { value: '4.5+', stars: 3 },
  { value: '5.0', stars: 4 }
])

const currentStreets = ref(areaList.value[0].streets)

const propertyList = ref<Property[]>([
  {
    id: 1,
    title: '阳光充足一居室',
    location: '朝阳区, 北京',
    image: '/static/logo.png',
    rating: '4.92',
    rooms: '1 室',
    bathrooms: '1 卫',
    area: '45m²',
    price: '¥5,200',
    tag: '优选房源',
    tagColor: 'rgba(255, 255, 255, 0.9)',
    isFavorite: true
  },
  {
    id: 2,
    title: '运河旁宽敞Loft',
    location: '通州区, 北京',
    image: '/static/logo.png',
    rating: '4.85',
    rooms: '2 室',
    bathrooms: '2 卫',
    area: '80m²',
    price: '¥8,450',
    isFavorite: false
  },
  {
    id: 3,
    title: '温馨单身公寓',
    location: '海淀区, 北京',
    image: '/static/logo.png',
    rating: 'New',
    rooms: '开间',
    bathrooms: '1 卫',
    area: '30m²',
    price: '¥3,950',
    tag: '新上房源',
    tagColor: 'rgba(238, 124, 43, 0.9)',
    isFavorite: false
  }
])

const selectFilter = (index: number) => {
  activeFilter.value = index
}

const toggleFavorite = (index: number) => {
  propertyList.value[index].isFavorite = !propertyList.value[index].isFavorite
}

const handleFilter = () => {
  showFilterModal.value = true
}

const closeFilterModal = () => {
  showFilterModal.value = false
}

const selectArea = (index: number) => {
  selectedArea.value = index
  currentStreets.value = areaList.value[index].streets
  selectedStreet.value = 0
}

const selectStreet = (index: number) => {
  selectedStreet.value = index
}

const selectMetro = (index: number) => {
  selectedMetro.value = index
}

const selectRating = (index: number) => {
  selectedRating.value = index
}

const onRentChange = (e: any) => {
  rentRange.value[1] = e.detail.value
}

const resetFilters = () => {
  selectedArea.value = 0
  selectedStreet.value = 0
  selectedMetro.value = 0
  selectedRating.value = 0
  rentRange.value = [0, 15000]
  currentStreets.value = areaList.value[0].streets
}

const confirmFilters = () => {
  showFilterModal.value = false
  uni.showToast({ title: '筛选已应用', icon: 'success' })
}

const handleSort = () => {
  uni.showToast({ title: '排序选项', icon: 'none' })
}

const handleMap = () => {
  uni.showToast({ title: '地图查看', icon: 'none' })
}

const navigateToDetail = (item: Property) => {
  uni.showToast({ title: `查看: ${item.title}`, icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';
.container {
  min-height: 100vh;
  background-color: #fcfaf8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  padding: calc(var(--status-bar-height, 0px) + 30rpx) 24rpx 16rpx;
  background-color: #fcfaf8;
  z-index: 10;
  box-sizing: border-box;
}

.search-wrapper {
  display: flex;
  width: 100%;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 94rpx;
  background-color: #ffffff;
  border-radius: 48rpx;
  border: 2rpx solid #f3ece7;
  padding: 0 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}

.search-bar:focus-within {
  border-color: rgba(238, 124, 43, 0.5);
  box-shadow: 0 4rpx 20rpx rgba(238, 124, 43, 0.1);
}

.search-icon {
  font-size: 36rpx;
  color: #ee7c2b;
}

.search-input {
  flex: 1;
  font-size: $font-size-body;
  color: #1b130d;
  padding: 0 14rpx;
  min-width: 0;
}

.search-input::placeholder {
  color: #9a6c4c;
}

.filter-btn {
  width: 54rpx;
  height: 54rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3ece7;
  border-radius: 50%;
}

.filter-btn .app-icon {
  font-size: 32rpx;
  color: #1b130d;
}

.filter-scroll {
  white-space: nowrap;
  padding: 8rpx 24rpx 18rpx;
  background-color: #fcfaf8;
  box-sizing: border-box;
}

.filter-tags {
  display: flex;
  gap: 12rpx;
}

.filter-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56rpx;
  padding: 0 24rpx;
  border-radius: 40rpx;
  flex-shrink: 0;
}

.filter-tag.active {
  box-shadow: 0 8rpx 24rpx rgba(238, 124, 43, 0.3);
}

.tag-text {
  font-size: $font-size-body-sm;
  font-weight: 500;
}

.content-scroll {
  flex: 1;
  padding: 0 24rpx;
  box-sizing: border-box;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12rpx;
  column-gap: 16rpx;
}

.result-title {
  font-size: $font-size-h2;
  font-weight: bold;
  color: #1b130d;
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 4rpx;
  color: #ee7c2b;
  font-weight: 500;
}

.sort-text {
  font-size: $font-size-body;
}

.sort-icon {
  font-size: 32rpx;
}

.property-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 56rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) + 56rpx);
}

.property-card {
  background-color: #ffffff;
  border-radius: 30rpx;
  border: 1rpx solid #f3ece7;
  overflow: hidden;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.04);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  padding: 12rpx;
  padding-bottom: 0;
  box-sizing: border-box;
}

.card-image {
  width: 100%;
  height: 100%;
  border-radius: 22rpx;
  object-fit: cover;
}

.favorite-btn {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 50%;
}

.favorite-icon {
  font-size: 34rpx;
  color: #9a6c4c;
}

.favorite-icon.filled {
  color: #ee7c2b;
  font-variation-settings: 'FILL' 1;
}

.card-badge {
  position: absolute;
  bottom: 18rpx;
  left: 26rpx;
  padding: 8rpx 20rpx;
  border-radius: 40rpx;
  backdrop-filter: blur(10px);
}

.badge-text {
  font-size: $font-size-body-sm;
  font-weight: bold;
  color: #1b130d;
}

.card-content {
  padding: 22rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title-area {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: $font-size-h2;
  font-weight: bold;
  color: #1b130d;
  line-height: 1.3;
}

.card-location {
  font-size: $font-size-body-sm;
  color: #9a6c4c;
  margin-top: 6rpx;
}

.rating-box {
  display: flex;
  align-items: center;
  gap: 6rpx;
  background-color: #f3ece7;
  padding: 6rpx 12rpx;
  border-radius: 14rpx;
}

.star-icon {
  font-size: 24rpx;
  color: #ee7c2b;
  font-variation-settings: 'FILL' 1;
}

.rating-text {
  font-size: $font-size-body-sm;
  font-weight: bold;
  color: #1b130d;
}

.card-features {
  display: flex;
  gap: 20rpx;
  margin-top: 2rpx;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.feature-icon {
  font-size: 24rpx;
  color: #9a6c4c;
}

.feature-text {
  font-size: $font-size-caption;
  font-weight: 500;
  color: #9a6c4c;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 8rpx;
  padding-top: 16rpx;
  border-top: 2rpx solid #f3ece7;
}

.price-area {
  display: flex;
  align-items: baseline;
}

.price {
  font-size: $font-size-h1;
  font-weight: bold;
  color: #ee7c2b;
}

.price-unit {
  font-size: $font-size-body-sm;
  color: #9a6c4c;
}

.detail-btn {
  font-size: $font-size-body-sm;
  font-weight: 600;
  color: #ee7c2b;
}

.map-fab {
  position: fixed;
  right: 24rpx;
  bottom: calc(constant(safe-area-inset-bottom) + 36rpx);
  bottom: calc(env(safe-area-inset-bottom) + 36rpx);
  width: 94rpx;
  height: 94rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1b130d;
  border-radius: 50%;
  box-shadow: 0 16rpx 48rpx rgba(238, 124, 43, 0.3);
  z-index: 100;
}

.map-icon {
  font-size: 44rpx;
  color: #ffffff;
  font-variation-settings: 'FILL' 1;
}

.filter-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: rgba(62, 45, 35, 0.3);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.filter-modal.show {
  opacity: 1;
  visibility: visible;
}

.filter-panel {
  background-color: #fcfaf8;
  border-radius: 64rpx 64rpx 0 0;
  box-shadow: 0 -16rpx 60rpx rgba(0, 0, 0, 0.12);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.filter-panel.show {
  transform: translateY(0);
}

.filter-handle {
  display: flex;
  justify-content: center;
  padding: 24rpx 0 16rpx;
}

.handle-bar {
  width: 96rpx;
  height: 12rpx;
  background-color: #f3ece7;
  border-radius: 6rpx;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 48rpx;
  border-bottom: 2rpx solid #f3ece7;
}

.filter-title {
  font-size: $font-size-hero;
  font-weight: bold;
  color: #1b130d;
}

.close-btn {
  padding: 8rpx;
  border-radius: 50%;
}

.close-btn .app-icon {
  font-size: 40rpx;
  color: #9a6c4c;
}

.filter-content {
  flex: 1;
  padding: 32rpx 48rpx;
  overflow-y: auto;
}

.filter-section {
  margin-bottom: 64rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: $font-size-h2;
  font-weight: bold;
  color: #1b130d;
  margin-bottom: 24rpx;
}

.section-header .section-title {
  margin-bottom: 0;
}

.price-range {
  font-size: $font-size-h1;
  font-weight: bold;
  color: #ee7c2b;
}

.area-selector {
  display: flex;
  height: 384rpx;
  gap: 32rpx;
}

.area-list {
  width: 33%;
  border-right: 2rpx solid #f3ece7;
  padding-right: 16rpx;
}

.area-item {
  padding: 20rpx 24rpx;
  border-radius: 24rpx;
  margin-bottom: 8rpx;
}

.area-item.active {
  background-color: rgba(255, 234, 204, 0.4);
}

.area-text {
  font-size: $font-size-h3;
  color: #9a6c4c;
}

.area-item.active .area-text {
  color: #ee7c2b;
  font-weight: bold;
}

.street-list {
  flex: 1;
  padding-left: 16rpx;
}

.street-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx;
}

.street-text {
  font-size: $font-size-h3;
  color: #1b130d;
}

.street-text.active {
  font-weight: 500;
  color: #ee7c2b;
}

.radio-dot {
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  border: 4rpx solid #d4b8a3;
  position: relative;
}

.radio-dot.checked {
  border-color: #ee7c2b;
}

.radio-dot.checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16rpx;
  height: 16rpx;
  background-color: #ee7c2b;
  border-radius: 50%;
}

.metro-scroll {
  margin: 0 -16rpx;
  padding: 0 16rpx;
}

.metro-list {
  display: flex;
  gap: 32rpx;
  padding-bottom: 16rpx;
}

.metro-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  flex-shrink: 0;
  width: 104rpx;
}

.metro-circle {
  width: 104rpx;
  height: 104rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.metro-circle.active {
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

.metro-num {
  font-size: $font-size-h2;
  font-weight: bold;
}

.metro-name {
  font-size: $font-size-caption;
  color: #9a6c4c;
  font-weight: 500;
}

.metro-name.active {
  color: #007A33;
  font-weight: bold;
}

.rent-slider-wrapper {
  padding: 16rpx 8rpx;
}

.rent-slider {
  width: 100%;
}

.rent-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 16rpx;
}

.rent-label {
  font-size: $font-size-body-sm;
  color: #9a6c4c;
  font-weight: 500;
}

.rating-list {
  display: flex;
  gap: 16rpx;
}

.rating-item {
  flex: 1;
  padding: 24rpx 16rpx;
  border-radius: 24rpx;
  background-color: #f3ece7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  border: 2rpx solid transparent;
  transition: all 0.2s ease;
}

.rating-item.active {
  background-color: #ee7c2b;
  box-shadow: 0 8rpx 24rpx rgba(238, 124, 43, 0.3);
  transform: scale(1.05);
}

.rating-value {
  font-size: $font-size-h3;
  font-weight: bold;
  color: #9a6c4c;
}

.rating-value.active {
  color: #ffffff;
}

.rating-stars {
  display: flex;
  gap: -8rpx;
}

.rating-star {
  font-size: 24rpx;
  color: rgba(154, 108, 76, 0.5);
  font-variation-settings: 'FILL' 1;
}

.rating-star.active {
  color: #ffffff;
}

.filter-footer {
  display: flex;
  align-items: center;
  gap: 48rpx;
  padding: 48rpx;
  padding-bottom: 64rpx;
  border-top: 2rpx solid #f3ece7;
  background-color: #fcfaf8;
  border-radius: 0 0 64rpx 64rpx;
}

.reset-btn {
  font-size: $font-size-h3;
  color: #9a6c4c;
  font-weight: 500;
  padding: 0 16rpx;
}

.confirm-btn {
  flex: 1;
  height: 112rpx;
  background-color: #ee7c2b;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  box-shadow: 0 8rpx 24rpx rgba(238, 124, 43, 0.3);
}

.confirm-text {
  font-size: $font-size-h2;
  font-weight: bold;
  color: #ffffff;
}

.confirm-badge {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4rpx 16rpx;
  border-radius: 24rpx;
}

.badge-num {
  font-size: $font-size-body-sm;
  color: #ffffff;
}
</style>

