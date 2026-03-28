<template>
  <view class="page-search page-shell">
    <GlobalBack />

    <view class="search-header">
      <view class="search-input-wrap">
        <Icon name="search" :size="30" color="var(--text-muted)" />
        <input v-model="searchKeyword" class="search-input" placeholder="搜索地点或房源" type="text" />
        <view class="search-filter-btn" @click="openFilter">
          <Icon name="tune" :size="26" color="var(--primary)" />
        </view>
      </view>
    </view>

    <scroll-view class="search-tag-scroll" scroll-x :show-scrollbar="false">
      <view class="search-tag-list">
        <view
          v-for="(tag, index) in filterTags"
          :key="tag.label"
          :class="['search-tag', { active: activeFilter === index }]"
          :style="{ backgroundColor: activeFilter === index ? '#ee7c2b' : tag.bgColor }"
          @click="activeFilter = index"
        >
          <text :style="{ color: activeFilter === index ? '#fff' : '#1b130d' }">{{ tag.label }}</text>
        </view>
      </view>
    </scroll-view>

    <view class="search-result-head">
      <text>找到 {{ propertyList.length }} 套房源</text>
      <view class="search-result-actions">
        <text @click="handleSort">排序</text>
        <text @click="handleMap">地图</text>
      </view>
    </view>

    <scroll-view class="search-content" scroll-y>
      <view class="search-property-list">
        <PropertyCard
          v-for="(item, index) in propertyList"
          :key="item.id"
          :property="item"
          @toggle-favorite="toggleFavorite(index)"
          @select="navigateToDetail(item)"
        />
      </view>
    </scroll-view>

    <view class="search-modal" :class="{ show: showFilterModal }" @click="closeFilterModal">
      <view class="search-modal__panel" @click.stop>
        <SectionHeader title="筛选" />

        <view class="search-filter-section">
          <text class="search-filter-section__title">区域</text>
          <view class="search-area-row">
            <scroll-view class="search-area-list" scroll-y :show-scrollbar="false">
              <view
                v-for="(area, index) in areaList"
                :key="area.name"
                :class="['search-area-item', { active: selectedArea === index }]"
                @click="selectArea(index)"
              >
                {{ area.name }}
              </view>
            </scroll-view>
            <scroll-view class="search-street-list" scroll-y :show-scrollbar="false">
              <view
                v-for="(street, index) in currentStreets"
                :key="street"
                :class="['search-street-item', { active: selectedStreet === index }]"
                @click="selectedStreet = index"
              >
                {{ street }}
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="search-filter-section">
          <text class="search-filter-section__title">地铁线</text>
          <scroll-view scroll-x :show-scrollbar="false">
            <view class="search-metro-list">
              <view
                v-for="(line, index) in metroLines"
                :key="`${line.name}-${line.num}`"
                :class="['search-metro-item', { active: selectedMetro === index }]"
                @click="selectedMetro = index"
              >
                <view class="search-metro-dot" :style="{ backgroundColor: selectedMetro === index ? line.color : line.bgColor }">
                  <text :style="{ color: selectedMetro === index ? '#fff' : line.color }">{{ line.num }}</text>
                </view>
                <text>{{ line.name }}</text>
              </view>
            </view>
          </scroll-view>
        </view>

        <view class="search-filter-section">
          <view class="search-rent-head">
            <text class="search-filter-section__title">租金范围</text>
            <text>¥{{ rentRange[0] }} - ¥{{ rentRange[1] }}</text>
          </view>
          <slider
            :min="0"
            :max="15000"
            :step="100"
            :value="rentRange[1]"
            block-color="#ee7c2b"
            backgroundColor="#ffeacc"
            activeColor="#ee7c2b"
            @changing="onRentChange"
            @change="onRentChange"
          />
        </view>

        <view class="search-filter-section">
          <text class="search-filter-section__title">评分要求</text>
          <view class="search-rating-list">
            <view
              v-for="(rating, index) in ratingOptions"
              :key="rating.value"
              :class="['search-rating-item', { active: selectedRating === index }]"
              @click="selectedRating = index"
            >
              <text>{{ rating.value }}</text>
            </view>
          </view>
        </view>

        <view class="search-filter-footer">
          <text @click="resetFilters">重置</text>
          <button class="search-filter-confirm" @click="confirmFilters">查看房源</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Icon from '@/components/ui/Icon.vue'
import GlobalBack from '@/components/ui/GlobalBack.vue'
import PropertyCard from '@/components/business/PropertyCard.vue'
import SectionHeader from '@/components/business/SectionHeader.vue'
import { getSearchData, type PropertyItem } from '@/data'

const searchData = computed(() => getSearchData())

const searchKeyword = ref(searchData.value.defaultKeyword)
const activeFilter = ref(0)
const showFilterModal = ref(false)
const selectedArea = ref(0)
const selectedStreet = ref(1)
const selectedMetro = ref(3)
const selectedRating = ref(2)
const rentRange = ref<[number, number]>([...searchData.value.rentRangeDefault] as [number, number])

const filterTags = computed(() => searchData.value.filterTags)
const areaList = computed(() => searchData.value.areas)
const metroLines = computed(() => searchData.value.metroLines)
const ratingOptions = computed(() => searchData.value.ratingOptions)
const propertyList = ref<PropertyItem[]>(searchData.value.properties)
const currentStreets = ref(areaList.value[0]?.streets || [])

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1] as Record<string, any>
  if (currentPage?.options?.showFilter === 'true') {
    showFilterModal.value = true
  }
})

const toggleFavorite = (index: number) => {
  const target = propertyList.value[index]
  if (!target) return
  target.isFavorite = !target.isFavorite
}

const openFilter = () => {
  showFilterModal.value = true
}

const closeFilterModal = () => {
  showFilterModal.value = false
}

const selectArea = (index: number) => {
  selectedArea.value = index
  currentStreets.value = areaList.value[index]?.streets || []
  selectedStreet.value = 0
}

const onRentChange = (event: Record<string, any>) => {
  rentRange.value = [rentRange.value[0], Number(event?.detail?.value || 0)]
}

const resetFilters = () => {
  selectedArea.value = 0
  selectedStreet.value = 0
  selectedMetro.value = 0
  selectedRating.value = 0
  rentRange.value = [0, 15000]
  currentStreets.value = areaList.value[0]?.streets || []
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

const navigateToDetail = (item: PropertyItem) => {
  uni.showToast({ title: `查看: ${item.title}`, icon: 'none' })
}
</script>
