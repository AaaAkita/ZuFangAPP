import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';

type SeedUser = {
  phone?: string;
  wechatOpenid?: string;
  nickname: string;
  avatar?: string;
  city: string;
  province: string;
  role?: 'user' | 'admin';
};

async function bootstrapPrisma() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

async function main() {
  const prisma = await bootstrapPrisma();
  const defaultPassword = await bcrypt.hash('12345678', 10);

  try {
    console.log('[seed] start');

    // Reset demo data for deterministic local integration.
    await prisma.adClick.deleteMany();
    await prisma.adImpression.deleteMany();
    await prisma.ad.deleteMany();
    await prisma.commentReply.deleteMany();
    await prisma.commentLike.deleteMany();
    await prisma.commentReport.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.searchHistory.deleteMany();
    await prisma.hotSearch.deleteMany();
    await prisma.userFavorite.deleteMany();
    await prisma.userViewHistory.deleteMany();
    await prisma.message.deleteMany();
    await prisma.contractVerification.deleteMany();
    await prisma.file.deleteMany();
    await prisma.community.deleteMany();
    await prisma.user.deleteMany();

    const users: SeedUser[] = [
      {
        phone: '13800138001',
        nickname: '小明',
        city: '北京',
        province: '北京',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      },
      {
        phone: '13800138002',
        nickname: '小雨',
        city: '北京',
        province: '北京',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      },
      {
        wechatOpenid: 'wx_openid_demo_10001',
        nickname: '微信用户A',
        city: '北京',
        province: '北京',
      },
    ];

    const createdUsers = await Promise.all(
      users.map((user) =>
        prisma.user.create({
          data: {
            phone: user.phone,
            password: user.phone ? defaultPassword : null,
            nickname: user.nickname,
            avatar: user.avatar,
            city: user.city,
            province: user.province,
            role: user.role ?? 'user',
            wechatOpenid: user.wechatOpenid,
          },
        }),
      ),
    );

    const [u1, u2] = createdUsers;

    const communities = await Promise.all([
      prisma.community.create({
        data: {
          name: '万科星城',
          province: '北京市',
          city: '北京市',
          district: '朝阳区',
          address: '朝阳北路 112 号',
          longitude: 116.5123,
          latitude: 39.9234,
          propertyType: '住宅',
          buildYear: 2018,
          developer: '万科',
          propertyCompany: '万科物业',
          propertyFee: 3.5,
          greenRate: 35.2,
          plotRate: 2.2,
          totalBuildings: 18,
          totalHouseholds: 1650,
          parkingSpaces: 1800,
          description: '地铁近，居住体验均衡，配套完善。',
          coverImage:
            'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80',
          images: [
            'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
          ],
          tags: ['地铁近', '物业好', '适合家庭'],
          highlights: ['近地铁', '物业响应快', '通勤便利'],
          facilities: {
            subway: ['6号线青年路'],
            school: ['朝阳一小'],
          },
          qualityScore: 91.3,
          riskScore: 19.6,
          riskReason: '近两个月无明显投诉。',
          safetyScore: 4.6,
          quietnessScore: 4.3,
          valueScore: 4.2,
          ratingAvg: 4.5,
          ratingCount: 12,
          commentCount: 12,
          viewCount: 2450,
          favoriteCount: 380,
          isRecommended: true,
          recommendOrder: 1,
          status: 1,
        },
      }),
      prisma.community.create({
        data: {
          name: '龙湖天街公寓',
          province: '北京市',
          city: '北京市',
          district: '海淀区',
          address: '中关村南大街 88 号',
          longitude: 116.3178,
          latitude: 39.9761,
          propertyType: '公寓',
          buildYear: 2016,
          developer: '龙湖',
          propertyCompany: '龙湖物业',
          propertyFee: 4.2,
          greenRate: 22.8,
          plotRate: 3.2,
          totalBuildings: 6,
          totalHouseholds: 980,
          parkingSpaces: 780,
          description: '配套全，商业方便，但高峰时段噪音偏大。',
          coverImage:
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
          images: [
            'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
          ],
          tags: ['商业配套', '通勤方便'],
          highlights: ['商业成熟', '地铁换乘便捷'],
          facilities: {
            subway: ['4号线人民大学'],
          },
          qualityScore: 82.4,
          riskScore: 41.1,
          riskReason: '偶发噪音投诉。',
          safetyScore: 4.2,
          quietnessScore: 3.6,
          valueScore: 4.0,
          ratingAvg: 4.1,
          ratingCount: 9,
          commentCount: 9,
          viewCount: 1980,
          favoriteCount: 255,
          isRecommended: true,
          recommendOrder: 2,
          status: 1,
        },
      }),
      prisma.community.create({
        data: {
          name: '老城家园',
          province: '北京市',
          city: '北京市',
          district: '丰台区',
          address: '南三环西路 299 号',
          longitude: 116.2852,
          latitude: 39.8567,
          propertyType: '住宅',
          buildYear: 1998,
          developer: '城建集团',
          propertyCompany: '街道物业',
          propertyFee: 1.2,
          greenRate: 12.1,
          plotRate: 2.8,
          totalBuildings: 22,
          totalHouseholds: 2050,
          parkingSpaces: 600,
          description: '价格低但房龄老，隔音与停车问题较多。',
          coverImage:
            'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1200&q=80',
          images: [
            'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80',
          ],
          tags: ['房龄老', '停车紧张'],
          highlights: ['租金低', '生活成本低'],
          facilities: {
            subway: ['10号线角门西'],
          },
          qualityScore: 56.2,
          riskScore: 84.7,
          riskReason: '近三个月多次出现漏水和押金纠纷反馈。',
          safetyScore: 3.1,
          quietnessScore: 2.8,
          valueScore: 3.7,
          ratingAvg: 2.9,
          ratingCount: 15,
          commentCount: 15,
          viewCount: 3760,
          favoriteCount: 105,
          isRecommended: false,
          recommendOrder: 0,
          status: 1,
        },
      }),
    ]);

    await prisma.comment.createMany({
      data: [
        {
          userId: u1.id,
          communityId: communities[0].id,
          content: '物业维修速度快，整体居住体验不错。',
          rating: 5,
          status: 1,
          tags: ['物业靠谱', '环境好'],
          isAnonymous: false,
          isVerified: true,
          likeCount: 12,
          images: [],
          videos: [],
        },
        {
          userId: u2.id,
          communityId: communities[1].id,
          content: '交通方便，但晚上临街房间噪音会明显一些。',
          rating: 4,
          status: 1,
          tags: ['交通方便', '噪音一般'],
          isAnonymous: true,
          isVerified: false,
          likeCount: 5,
          images: [],
          videos: [],
        },
        {
          userId: u2.id,
          communityId: communities[2].id,
          content: '押金退还沟通成本高，建议签约前把条款写清楚。',
          rating: 2,
          status: 1,
          tags: ['押金风险', '合同细看'],
          isAnonymous: false,
          isVerified: true,
          likeCount: 38,
          images: [],
          videos: [],
        },
      ],
    });

    await prisma.hotSearch.createMany({
      data: [
        { keyword: '万科星城', searchCount: 128, rank: 1 },
        { keyword: '地铁近', searchCount: 102, rank: 2 },
        { keyword: '押金纠纷', searchCount: 86, rank: 3 },
      ],
    });

    console.log('[seed] done');
    console.log('[seed] login user: 13800138001 / 12345678');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error('[seed] failed', error);
  process.exit(1);
});
