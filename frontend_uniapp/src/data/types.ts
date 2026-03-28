export type TagType = 'green' | 'blue' | 'orange' | 'red' | 'gray'

export interface CommunityReviewTag {
  text: string
  type: TagType
}

export interface CommunityReview {
  name: string
  avatar: string
  time: string
  content: string
  verified: boolean
  tags: CommunityReviewTag[]
}

export interface CommunityMetrics {
  safety: number
  quietness: number
  value: number
}

export interface CommunityItem {
  id: number
  name: string
  district: string
  address: string
  rating: number
  tags: string[]
  description: string
  image: string
  qualityScore: number
  riskScore: number
  riskReason: string
  highlights: string[]
  metrics: CommunityMetrics
  reviews: CommunityReview[]
}

export interface HomeBanner {
  tag: string
  title: string
  subtitle: string
  points: string[]
  buttonText: string
  image: string
}

export interface WarningItem {
  id: number
  name: string
  time: string
  subtitle: string
  description: string
  level: 'orange' | 'red'
  tags: string[]
}

export interface HomeLatestReview {
  id: number
  name: string
  avatar: string
  verified: boolean
  time: string
  targetName: string
  content: string
  tags: string[]
}

export interface HomeData {
  searchPlaceholder: string
  recommendedCommunityIds: number[]
  banner: HomeBanner
  warnings: WarningItem[]
  latestReviews: HomeLatestReview[]
}

export interface SearchFilterTag {
  label: string
  bgColor: string
}

export interface SearchArea {
  name: string
  streets: string[]
}

export interface SearchMetroLine {
  num: string
  name: string
  color: string
  bgColor: string
}

export interface SearchRatingOption {
  value: string
  stars: number
}

export interface PropertyItem {
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

export interface SearchData {
  defaultKeyword: string
  filterTags: SearchFilterTag[]
  areas: SearchArea[]
  metroLines: SearchMetroLine[]
  ratingOptions: SearchRatingOption[]
  rentRangeDefault: [number, number]
  properties: PropertyItem[]
}

export interface ProfileStatItem {
  id: number
  value: string
  label: string
  icon: string
  route?: string
}

export interface ProfileMenuItem {
  id: number
  label: string
  icon: string
  theme: 'orange' | 'blue' | 'gray' | 'green'
  route?: string
}

export interface ProfileData {
  title: string
  defaultDisplayName: string
  defaultAvatar: string
  joinDateFallback: string
  stats: ProfileStatItem[]
  menus: ProfileMenuItem[]
}

export type AppActionMode = 'navigateTo' | 'switchTab' | 'toast'

export interface AppAction {
  mode: AppActionMode
  url?: string
  toastText?: string
}

export interface ProfileReviewItem {
  id: number
  communityName: string
  time: string
  content: string
  likes: number
  verified: boolean
  tags: string[]
}

export interface ProfileReviewsData {
  title: string
  subtitle: string
  reviews: ProfileReviewItem[]
}

export interface FavoritesData {
  title: string
  subtitle: string
  properties: PropertyItem[]
}

export interface SettingsItem {
  id: number
  label: string
  description: string
  icon: string
  type: 'switch' | 'action'
  value?: boolean
  action?: AppAction
}

export interface SettingsSection {
  id: number
  title: string
  items: SettingsItem[]
}

export interface SettingsData {
  title: string
  sections: SettingsSection[]
}

export interface SupportChannel {
  id: number
  name: string
  description: string
  icon: string
  action: AppAction
}

export interface FaqItem {
  id: number
  question: string
  answer: string
}

export interface SupportData {
  title: string
  channels: SupportChannel[]
  faqs: FaqItem[]
}

export interface MessageData {
  title: string
  items: MessageItem[]
}

export type MessageCategory = 'system' | 'interaction'

export type MessageActionMode = AppActionMode

export type MessageTabKey = 'all' | MessageCategory

export type MessageAction = AppAction

export interface MessageItem {
  id: number
  title: string
  content: string
  time: string
  category: MessageCategory
  unread: boolean
  avatar?: string
  sender?: string
  tag?: string
  action: MessageAction
}

export interface PlaceholderData {
  title: string
  description: string
  buttonText: string
}

export interface ReviewsPageData {
  title: string
  reviews: CommunityReview[]
}

export interface ReviewPublishData {
  title: string
  scoreLabel: string
  contentLabel: string
  contentPlaceholder: string
  submitText: string
  defaultScore: number
  minScore: number
  maxScore: number
}

export interface AppData {
  city: string
  locationSubtitle: string
  defaultImage: string
}

export interface MockDbSchema {
  app: AppData
  featuredCommunityIds: number[]
  communities: CommunityItem[]
  home: HomeData
  search: SearchData
  profile: ProfileData
  profileReviews: ProfileReviewsData
  favorites: FavoritesData
  settings: SettingsData
  support: SupportData
  message: MessageData
  about: PlaceholderData
  safety: PlaceholderData
  reviewsPage: ReviewsPageData
  reviewPublish: ReviewPublishData
}
