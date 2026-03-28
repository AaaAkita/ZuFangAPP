import mockDbJson from './mock-db.json'
import type {
  CommunityItem,
  HomeData,
  MessageData,
  MockDbSchema,
  PlaceholderData,
  ProfileData,
  PropertyItem,
  ReviewPublishData,
  ReviewsPageData,
  SearchData
} from './types'

const mockDb = mockDbJson as unknown as MockDbSchema

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

export const getMockDb = (): MockDbSchema => clone(mockDb)

export const getAppData = () => clone(mockDb.app)
export const getCommunities = (): CommunityItem[] => clone(mockDb.communities)
export const getFeaturedCommunityIds = (): number[] => [...mockDb.featuredCommunityIds]
export const getHomeData = (): HomeData => clone(mockDb.home)
export const getSearchData = (): SearchData => clone(mockDb.search)
export const getProfileData = (): ProfileData => clone(mockDb.profile)
export const getMessageData = (): MessageData => clone(mockDb.message)
export const getAboutData = (): PlaceholderData => clone(mockDb.about)
export const getSafetyData = (): PlaceholderData => clone(mockDb.safety)
export const getReviewsPageData = (): ReviewsPageData => clone(mockDb.reviewsPage)
export const getReviewPublishData = (): ReviewPublishData => clone(mockDb.reviewPublish)

export const getProperties = (): PropertyItem[] => clone(mockDb.search.properties)
