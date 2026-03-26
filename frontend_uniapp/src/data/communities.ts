export interface CommunityReviewTag {
  text: string
  type: 'green' | 'blue' | 'orange' | 'red' | 'gray'
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

const LOCAL_IMAGE = '/static/logo.png'

export const communities: CommunityItem[] = [
  {
    id: 1,
    name: '阳光锦城',
    district: '朝阳区',
    address: '建国路 88 号',
    rating: 4.9,
    tags: ['近地铁', '物业好', '绿化高'],
    description: '阳光锦城整体维护较好，通勤便利，物业响应速度快，适合上班族长期居住。',
    image: LOCAL_IMAGE,
    qualityScore: 96,
    riskScore: 18,
    riskReason: '个别楼栋晚高峰电梯拥挤',
    highlights: ['通勤方便', '安保到位'],
    metrics: {
      safety: 9.3,
      quietness: 8.4,
      value: 8.6
    },
    reviews: [
      {
        name: '陈静',
        avatar: LOCAL_IMAGE,
        time: '2小时前',
        content: '门禁和巡逻都比较规范，晚上回家有安全感。',
        verified: true,
        tags: [
          { text: '安全系数高', type: 'green' },
          { text: '物业靠谱', type: 'blue' }
        ]
      },
      {
        name: '李莎',
        avatar: LOCAL_IMAGE,
        time: '1天前',
        content: '地铁步行十分钟左右，通勤可控。',
        verified: false,
        tags: [{ text: '通勤友好', type: 'green' }]
      }
    ]
  },
  {
    id: 2,
    name: '云尚国际',
    district: '海淀区',
    address: '中关村南路 21 号',
    rating: 4.7,
    tags: ['配套成熟', '教育资源', '安保严'],
    description: '云尚国际生活配套成熟，周边商超与医疗资源齐全，适合家庭用户。',
    image: LOCAL_IMAGE,
    qualityScore: 91,
    riskScore: 26,
    riskReason: '停车位偏紧张',
    highlights: ['学区资源', '配套完整'],
    metrics: {
      safety: 9.0,
      quietness: 7.9,
      value: 8.0
    },
    reviews: [
      {
        name: '张伟',
        avatar: LOCAL_IMAGE,
        time: '5小时前',
        content: '小区内配套丰富，日常生活很方便。',
        verified: true,
        tags: [{ text: '生活便利', type: 'green' }]
      }
    ]
  },
  {
    id: 3,
    name: '老弄堂公寓',
    district: '西城区',
    address: '鼓楼东大街 7 号',
    rating: 4.2,
    tags: ['烟火气', '老城区', '交通方便'],
    description: '老弄堂公寓周边生活氛围浓厚，商铺多，步行可达地铁站，但楼体较老。',
    image: LOCAL_IMAGE,
    qualityScore: 82,
    riskScore: 42,
    riskReason: '楼体偏老，隔音一般',
    highlights: ['地段优越', '生活便利'],
    metrics: {
      safety: 7.8,
      quietness: 6.9,
      value: 8.4
    },
    reviews: [
      {
        name: '王强',
        avatar: LOCAL_IMAGE,
        time: '2周前',
        content: '地段好但是隔音偏弱，适合对噪音不敏感的人。',
        verified: false,
        tags: [
          { text: '地段好', type: 'green' },
          { text: '隔音一般', type: 'orange' }
        ]
      }
    ]
  },
  {
    id: 4,
    name: '时代绿洲',
    district: '丰台区',
    address: '芳古路 19 号',
    rating: 3.8,
    tags: ['租金友好', '老小区', '交通尚可'],
    description: '时代绿洲租金相对友好，但隔音与公共区域维护表现一般，需实地确认楼栋差异。',
    image: LOCAL_IMAGE,
    qualityScore: 71,
    riskScore: 78,
    riskReason: '多条租客反馈隔音差',
    highlights: ['预算友好', '通勤尚可'],
    metrics: {
      safety: 6.5,
      quietness: 5.4,
      value: 7.6
    },
    reviews: [
      {
        name: '匿名用户',
        avatar: LOCAL_IMAGE,
        time: '刚刚',
        content: '夜间邻里噪音明显，建议看房时晚上来确认。',
        verified: true,
        tags: [{ text: '隔音差', type: 'red' }]
      }
    ]
  },
  {
    id: 5,
    name: '天诚家园',
    district: '通州区',
    address: '九棵树西路 66 号',
    rating: 3.5,
    tags: ['房源多', '价格波动', '中介复杂'],
    description: '天诚家园房源量较多，但中介信息质量参差不齐，需重点核验合同与房源真实性。',
    image: LOCAL_IMAGE,
    qualityScore: 68,
    riskScore: 84,
    riskReason: '历史反馈存在虚假房源',
    highlights: ['房源多', '议价空间'],
    metrics: {
      safety: 6.0,
      quietness: 6.3,
      value: 7.1
    },
    reviews: [
      {
        name: '匿名用户',
        avatar: LOCAL_IMAGE,
        time: '3小时前',
        content: '看房前后图文不一致，签约前务必核验房本信息。',
        verified: true,
        tags: [
          { text: '虚假房源', type: 'red' },
          { text: '黑中介风险', type: 'orange' }
        ]
      }
    ]
  }
]

export const featuredCommunityIds = [1, 2, 3]

export function getCommunityById(id: number): CommunityItem | undefined {
  return communities.find(item => item.id === id)
}

export function getFeaturedCommunities(): CommunityItem[] {
  return featuredCommunityIds
    .map(id => getCommunityById(id))
    .filter((item): item is CommunityItem => !!item)
}

export function getQualityRanking(): CommunityItem[] {
  return [...communities]
    .sort((a, b) => b.qualityScore - a.qualityScore)
    .slice(0, 5)
}

export function getRiskRanking(): CommunityItem[] {
  return [...communities]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5)
}
