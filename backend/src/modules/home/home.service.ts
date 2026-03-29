import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}

  async getHomeData() {
    const [recommended, riskWarnings, latestComments, hotSearches] =
      await this.prisma.$transaction([
        this.prisma.community.findMany({
          where: { status: 1, deletedAt: null, isRecommended: true },
          orderBy: [{ recommendOrder: 'asc' }, { qualityScore: 'desc' }],
          take: 6,
        }),
        this.prisma.community.findMany({
          where: { status: 1, deletedAt: null },
          orderBy: [{ riskScore: 'desc' }, { commentCount: 'desc' }],
          take: 4,
        }),
        this.prisma.comment.findMany({
          where: { status: 1, deletedAt: null, parentId: null },
          orderBy: { createdAt: 'desc' },
          take: 6,
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
                avatar: true,
              },
            },
            community: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),
        this.prisma.hotSearch.findMany({
          orderBy: [{ searchCount: 'desc' }, { updatedAt: 'desc' }],
          take: 8,
          select: {
            keyword: true,
            searchCount: true,
          },
        }),
      ]);

    return {
      recommendedCommunities: recommended.map((item) => ({
        id: Number(item.id),
        name: item.name,
        district: item.district,
        address: item.address,
        coverImage: item.coverImage,
        ratingAvg: Number(item.ratingAvg),
        qualityScore: Number(item.qualityScore),
        riskScore: Number(item.riskScore),
        riskReason: item.riskReason,
        highlights: item.highlights ?? [],
      })),
      riskWarnings: riskWarnings.map((item) => ({
        id: Number(item.id),
        name: item.name,
        district: item.district,
        riskScore: Number(item.riskScore),
        riskReason: item.riskReason || '近期风险反馈较多',
      })),
      latestReviews: latestComments.map((item) => ({
        id: Number(item.id),
        communityId: Number(item.communityId),
        communityName: item.community.name,
        content: item.content,
        rating: item.rating,
        createdAt: item.createdAt,
        tags: item.tags ?? [],
        verified: item.isVerified,
        user: {
          id: Number(item.user.id),
          nickname: item.isAnonymous ? '匿名用户' : item.user.nickname || '匿名用户',
          avatar: item.isAnonymous ? '' : item.user.avatar || '',
        },
      })),
      hotSearches,
    };
  }
}
